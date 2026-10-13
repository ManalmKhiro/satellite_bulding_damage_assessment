import cv2
import numpy as np
import base64


def image_to_base64(img):

    img = img.convert("RGB")

    img = img.resize((224,224))

    img = np.array(img)

    img = cv2.cvtColor(img,cv2.COLOR_RGB2BGR)

    _,buffer = cv2.imencode(".jpg",img)

    return base64.b64encode(buffer).decode()


def create_heatmap(img):

    img = np.array(img.resize((224,224)))

    gray = cv2.cvtColor(img,cv2.COLOR_RGB2GRAY)

    blur = cv2.GaussianBlur(gray,(21,21),0)

    heatmap = cv2.absdiff(gray,blur)

    heatmap = heatmap.astype(np.float32)

    heatmap /= (heatmap.max()+1e-8)

    heatmap = np.uint8(255*heatmap)

    heatmap = cv2.applyColorMap(heatmap,cv2.COLORMAP_JET)

    original = cv2.cvtColor(img,cv2.COLOR_RGB2BGR)

    overlay = cv2.addWeighted(original,0.6,heatmap,0.4,0)

    _,buffer = cv2.imencode(".jpg",overlay)

    return base64.b64encode(buffer).decode()