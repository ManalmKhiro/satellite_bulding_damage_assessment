from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
import numpy as np

from utils.predictor import predict
from utils.damage_predictor import predict_damage

from utils.heatmap import image_to_base64, create_heatmap
from utils.population import estimate_population, affected_population
from utils.statistics import calculate_statistics
from utils.pdf_report import generate_report
from utils.map_storage import save_analysis, load_all_analyses
from utils.location import get_location_name


app = Flask(__name__)
CORS(app)

last_result = None


# =====================================
# SPLIT IMAGE
# =====================================
def split_image(img, size=224):

    img = np.array(img)
    h, w, _ = img.shape

    patches = []

    for y in range(0, h, size):
        for x in range(0, w, size):

            patch = img[y:y+size, x:x+size]

            if patch.shape[0] == size and patch.shape[1] == size:
                patches.append((patch, patch.shape[1], patch.shape[0]))

    return patches


# =====================================
# PREDICT ENDPOINT
# =====================================
@app.route("/predict", methods=["POST"])
def prediction():

    global last_result

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"})

    mode = request.form.get("mode", "single")
    model_name = request.form.get("model", "CNN")
    threshold = int(request.form.get("threshold", 70))
    latitude = request.form.get("latitude")
    longitude = request.form.get("longitude")
    village = get_location_name(
        latitude,
        longitude
    )

    file = request.files["image"]
    img = Image.open(file)

    # =========================
    # SINGLE MODE
    # =========================
    if mode == "single":

        pred = predict(img, model_name)

        damage_percent = 0

        # ===== Missile Damage =====
        if pred["class"] == "Missile-Damaged Building":
            damage_percent = 100

        # ===== Destroyed =====
        elif pred["class"] == "destroyed":
            damage_percent = 100

        # ===== Damaged =====
        elif pred["class"] == "damaged":

            d = predict_damage(img)
            damage_percent = d["damage_percent"]

        # ===== Safe =====
        elif pred["class"] == "no_damage":
            damage_percent = 0

        result = {
            "mode": "single",
            "model": model_name,
            "threshold": threshold,
            "class": pred["class"],
            "damage_percent": damage_percent,
            "confidence": pred["confidence"],
            "originalImage": image_to_base64(img),
            "heatmap": create_heatmap(img),

           "location": {
               "latitude": latitude,
               "longitude": longitude,
               "village": village
           }
        }

        save_analysis(result)

        last_result = result
        return jsonify(result)

    # =========================
    # AREA MODE
    # =========================
    patches = split_image(img)

    buildings = []
    idx = 1

    for patch, w, h in patches:

        p = Image.fromarray(patch)
        pred = predict(p, model_name)

        damage_percent = 0

        # ===== Missile Damage =====
        if pred["class"] == "Missile-Damaged Building":
            damage_percent = 100

        # ===== Destroyed =====
        elif pred["class"] == "destroyed":
            damage_percent = 100

        # ===== Damaged =====
        elif pred["class"] == "damaged":

            d = predict_damage(p)
            damage_percent = d["damage_percent"]

        # ===== Safe =====
        elif pred["class"] == "no_damage":
            damage_percent = 0

        pop = estimate_population(w, h)

        buildings.append({
            "id": idx,
            "class": pred["class"],
            "damage_percent": damage_percent,
            "confidence": pred["confidence"],
            "population": pop["population"],
            "area": pop["area"]
        })

        idx += 1

    # =========================
    # STATISTICS
    # =========================
    stats = calculate_statistics(buildings)
    pop_stats = affected_population(buildings)
    stats.update(pop_stats)

    result = {
        "mode": "area",
        "model": model_name,
        "threshold": threshold,
        "statistics": stats,
        "buildings": buildings,

         "location": {
               "latitude": latitude,
               "longitude": longitude,
               "village": village
           }
    }

    save_analysis(result)

    last_result = result
    return jsonify(result)

# =====================================
# MAP DATA
# =====================================
@app.route("/map-data", methods=["GET"])
def map_data():

    analyses = load_all_analyses()

    return jsonify(analyses)

# =====================================
# REPORT
# =====================================
@app.route("/download-report")
def download_report():

    global last_result

    if last_result is None:
        return jsonify({"error": "No report generated"})

    file = generate_report(last_result)

    return send_file(
        file,
        as_attachment=True,
        download_name="Damage_Report.pdf"
    )


# =====================================
# RUN
# =====================================
if __name__ == "__main__":
    app.run(debug=True, port=5000)