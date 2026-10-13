import tensorflow as tf
import numpy as np
from PIL import Image

# =====================================
# LOAD MODEL
# =====================================
MODEL_PATH = "my_model_85.keras"

model = tf.keras.models.load_model(
    MODEL_PATH
)

CLASSES = [
    "Missile-Damaged Building",
    "damaged",
    "destroyed",
    "no_damage",
    
]


# =====================================
# PREPROCESS
# =====================================
def preprocess(image):

    image = image.convert("RGB")

    image = image.resize(
        (224, 224)
    )

    image = np.array(
        image,
        dtype=np.float32
    )

    image = np.expand_dims(
        image,
        axis=0
    )

    return image


# =====================================
# PREDICT
# =====================================
def predict(
    image,
    model_name="CNN"
):

    processed = preprocess(
        image
    )

    prediction = model.predict(
        processed,
        verbose=0
    )

    idx = int(
        np.argmax(
            prediction
        )
    )

    confidence = float(
        np.max(
            prediction
        )
    )

    return {

        "class":
        CLASSES[idx],

        "confidence":
        round(
            confidence,
            4
        ),

        "model":
        model_name
    }