from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mistralai import Mistral
import os
from mangum import Mangum
from dotenv import load_dotenv
import uvicorn


load_dotenv()
api_key = os.environ['MISTRAL_KEY']
MISTRAL_MODEL_NAME = "mistral-medium-latest"

# System prompts
SYSTEM_SUMMARY_PROMPT = (
    "You are a helpful assistant. Summarize the following text clearly and concisely, preserving key information but removing redundancy and irrelevant details."
)

SYSTEM_NATIONALITY_PROMPT = (
    "You are a helpful assistant. From the given text, extract all mentioned nationalities. Return them as a list of strings without duplicates and seperated with a new line. Return only the nationalities mentioned. If you do not recognise any nationalities, answer with no nationalities detected"
)

SYSTEM_ANALYZE_PROMPT = (
    "You are a helpful assistant. Summarize the following text clearly and concisely, preserving key information but removing redundancy and irrelevant details. Then on a new line, from the given text, extract all mentioned nationalities. Return them as a list of strings without duplicates and seperated with a new line. Return only the nationalities mentioned. If you do not recognise any nationalities, answer with no nationalities detected"
)

app = FastAPI()


# Allow requests from your frontend (e.g. React dev server)
origins = [
    "http://localhost:5173",  # React development server
    # Add more origins if needed, e.g. production URLs
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Allowed origins
    allow_credentials=True,           # Allow cookies, auth headers
    allow_methods=["*"],              # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],              # Allow all headers
)


mistral_client = Mistral(api_key=api_key)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/summarize")
def summarize(payload: dict):
    response = mistral_client.chat.complete(
        model=MISTRAL_MODEL_NAME,
        messages=[
            {"role": "system", "content": SYSTEM_SUMMARY_PROMPT},
            {"role": "user", "content": payload.get('text', 'I have sent nothing')}
        ]
    )
    return {"summary": response.choices[0].message.content}


@app.post("/find_nationalities")
def find_nationalities(payload: dict):
    response = mistral_client.chat.complete(
        model=MISTRAL_MODEL_NAME,
        messages=[
            {"role": "system", "content": SYSTEM_NATIONALITY_PROMPT},
            {"role": "user", "content": payload.get('text', 'I have sent nothing')}
        ]
    )
    return {"nationalities": response.choices[0].message.content}

@app.post("/analyze")
def analyze(payload: dict):
    response = mistral_client.chat.complete(
        model=MISTRAL_MODEL_NAME,
        messages=[
            {"role": "system", "content": SYSTEM_ANALYZE_PROMPT},
            {"role": "user", "content": payload.get('text', 'I have sent nothing')}
        ]
    )
    return {"analysis": response.choices[0].message.content}

handler = Mangum(app)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)