from fastapi import FastAPI, Request
from transformers import pipeline

app = FastAPI()
emotion_classifier = pipeline('text-classification', model='bhadresh-savani/distilbert-base-uncased-emotion')

@app.post("/analyze")
async def analyze(request: Request):
    data = await request.json()
    text = data["text"]
    result = emotion_classifier(text)
    return {"emotion": result[0]["label"], "score": float(result[0]["score"])}
