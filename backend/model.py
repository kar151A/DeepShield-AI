import cv2
import numpy as np

def predict_fake(path):
    img = cv2.imread(path)

    if img is None:
        return {
            "prediction": "ERROR",
            "confidence": 0,
            "details": "Invalid image"
        }

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Calculate variance (blur detection)
    variance = cv2.Laplacian(gray, cv2.CV_64F).var()

    # Heuristic logic
    if variance < 100:
        prediction = "FAKE"
    else:
        prediction = "REAL"

    return {
        "prediction": prediction,
        "confidence": round(min(variance, 100), 2),
        "details": f"Image sharpness score: {variance:.2f}"
    }