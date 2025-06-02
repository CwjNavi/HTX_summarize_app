from flask import Flask, request, jsonify
from mistralai import Mistral
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

api_key = os.environ['MISTRAL_KEY']
MISTRAL_MODEL_NAME = "mistral-medium-latest"

mistral_client = Mistral(api_key=api_key)

@app.route("/")
def root():
    return jsonify({"Hello": "World"})

@app.route("/summarize", methods=["POST"])
def summarize():
    text = request.json.get("text", "")
    response = mistral_client.chat.complete(
        model=MISTRAL_MODEL_NAME,
        messages=[
            {"role": "system", "content": "You are a helpful assistant. Summarize the following text clearly and concisely."},
            {"role": "user", "content": text}
        ]
    )
    return jsonify({"summary": response.choices[0].message.content})

@app.route("/find_nationalities", methods=["POST"])
def find_nationalities():
    text = request.json.get("text", "")
    response = mistral_client.chat.complete(
        model=MISTRAL_MODEL_NAME,
        messages=[
            {"role": "system", "content": "Extract all nationalities as a list. If none, return 'no nationalities detected'."},
            {"role": "user", "content": text}
        ]
    )
    return jsonify({"nationalities": response.choices[0].message.content})

@app.route("/analyze", methods=["POST"])
def analyze():
    text = request.json.get("text", "")
    response = mistral_client.chat.complete(
        model=MISTRAL_MODEL_NAME,
        messages=[
            {"role": "system", "content": "Summarize the text and extract nationalities as a list."},
            {"role": "user", "content": text}
        ]
    )
    return jsonify({"analysis": response.choices[0].message.content})
