import json
import os
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Path to your intents file
INTENTS_PATH = "C:\Users\ADMIN\Downloads\Chatbot\data\intents.json"

# Ensure the file exists
if not os.path.exists(INTENTS_PATH):
    raise FileNotFoundError(f"'{INTENTS_PATH}' not found. Make sure the file exists in the same folder as train.py")

# Load intents.json with utf-8 encoding
with open(INTENTS_PATH, encoding='utf-8') as file:
    data = json.load(file)

# Prepare data
X_texts = []
y_labels = []

for intent in data["intents"]:
    for pattern in intent["patterns"]:
        X_texts.append(pattern)
        y_labels.append(intent["tag"])

# Vectorize text
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(X_texts)

# Train classifier
classifier = LogisticRegression()
classifier.fit(X, y_labels)

# Create model directory if not exists
if not os.path.exists("model"):
    os.makedirs("model")

# Save the vectorizer and model
with open("model/vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

with open("model/classifier.pkl", "wb") as f:
    pickle.dump(classifier, f)

print("✅ Model trained and saved successfully.")
