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

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Load face detector
    face_cascade = cv2.CascadeClassifier(
        "C:\\Users\\karthik\\AppData\\Local\\Programs\\Python\\Python311\\Lib\\site-packages\\cv2\\data\\haarcascade_frontalface_default.xml"
    )

    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    # Draw rectangles
    for (x, y, w, h) in faces:
        face = gray[y:y+h, x:x+w]

        # check sharpness in face
        variance = cv2.Laplacian(face, cv2.CV_64F).var()

        if variance < 100:
            label = "FAKE"
            color = (0, 0, 255)
        else:
            label = "REAL"
            color = (0, 255, 0)

        cv2.rectangle(img, (x, y), (x+w, y+h), color, 2)
        cv2.putText(img, label, (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)

    output_path = "output.jpg"
    cv2.imwrite(output_path, img)

    # If no faces detected → suspicious
    prediction = "FAKE" if len(faces) == 0 else "REAL"

    return {
        "prediction": prediction,
        "confidence": 85,
        "details": f"Faces detected: {len(faces)}",
        "output_image": output_path
    }