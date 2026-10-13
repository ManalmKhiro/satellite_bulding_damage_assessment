import tensorflow as tf
import numpy as np
from PIL import Image

MODEL_PATH = "model_damadge.keras"

model = tf.keras.models.load_model(MODEL_PATH)

CLASSES = ["20_damaged", "40_damaged", "70_damaged"]


# =========================
# PREPROCESS
# =========================
def preprocess(image):
    image = image.convert("RGB")
    image = image.resize((224, 224))
    image = np.array(image, dtype=np.float32)

    # 🔥 مهم جداً لو الموديل متدرّب على normalized images
    image = image / 255.0

    image = np.expand_dims(image, axis=0)
    return image


# =========================
# PREDICT DAMAGE
# =========================
def predict_damage(image):

    x = preprocess(image)
    pred = model.predict(x, verbose=0)

    idx = int(np.argmax(pred))

   
    if idx >= len(CLASSES):
        return {"damage_percent": 0}

    damage_label = CLASSES[idx]
    damage_percent = int(damage_label.split("_")[0])

    return {
        "damage_percent": damage_percent
    }