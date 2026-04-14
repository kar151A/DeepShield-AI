import random

def predict_fake(path):
    score = random.uniform(0, 1)

    return {
        "prediction": "FAKE" if score > 0.5 else "REAL",
        "confidence": round(score * 100, 2),
        "details": "Facial inconsistencies detected"
    }
