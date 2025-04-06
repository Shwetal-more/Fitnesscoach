from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import json
import random

app = Flask(__name__)
CORS(app)

print("✅ Loading model and vectorizer...")
with open('model/vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

with open('model/classifier.pkl', 'rb') as f:
    classifier = pickle.load(f)
print("✅ Model and vectorizer loaded.")

# Load intents JSON with UTF-8 encoding
try:
    with open('data/intents.json', 'r', encoding='utf-8') as f:
        intents = json.load(f)["intents"]
    print("✅ Intents loaded successfully.")
except Exception as e:
    print(f"❌ Error loading intents: {e}")
    intents = []  # fallback to empty so the server doesn't crash

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    message = data.get("message", "")

    if not message.strip():
        return jsonify({"reply": "Please enter a message."})

    X = vectorizer.transform([message])
    predicted_tag = classifier.predict(X)[0]

    for intent in intents:
        if intent["tag"] == predicted_tag:
            response = random.choice(intent["responses"])
            return jsonify({"reply": response})

    return jsonify({"reply": "Sorry, I didn't understand that."})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
