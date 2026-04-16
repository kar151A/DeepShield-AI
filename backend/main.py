from fastapi import FastAPI, File, UploadFile
import shutil
from model import predict_fake
from fastapi.responses import FileResponse

app = FastAPI()

@app.get("/")
def home():
    return {"message": "DeepShield AI Backend Running"}

@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = predict_fake(file_path)

    return result