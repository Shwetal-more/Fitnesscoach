# Fitnesscoach

---

### 🧠 **Project Title:** FitMind Coach – AI Fitness & Wellness Chatbot

---

### 🚀 **Overview:**

**FitMind Coach** is a smart, AI-powered chatbot designed to provide **personalized fitness, health, and motivational support** to users. Built using a hybrid architecture that combines **Node.js for backend**, **Python for machine learning**, and **HTML/CSS/JS for the frontend**, this chatbot serves as a **24/7 fitness companion**—guiding users through workouts, answering health queries, and boosting mental well-being.

---

### 🔧 **Key Features:**

- ✅ **Real-time Fitness Coaching**  
  Responds to queries related to cardio, strength, yoga, mental health, sleep, diet, and more.
  
- ✅ **Voice Input Support**  
  Allows users to interact with the chatbot using their voice for a hands-free experience.

- ✅ **Motivational Messaging**  
  Offers daily encouragement, workout streak tracking, and positive reinforcement.

- ✅ **Custom Training Model**  
  Uses a trained **Logistic Regression model** with `TF-IDF` vectorization for intent classification.

- ✅ **Modular & Expandable**  
  Built to support additional categories like pregnancy fitness, office workouts, post-injury recovery, etc.

---

### 🧩 **Tech Stack:**

- **Frontend:** HTML, CSS, JavaScript, EJS  
- **Backend:** Node.js, Express.js  
- **Machine Learning:** Python, scikit-learn, spaCy  
- **Data Format:** `intents.json` for training patterns and responses  
- **Model Integration:** `train.py` trains the classifier and stores vectorizer & model using `pickle`.

---

### 🗃️ **Folder Structure:**
```
Chatbot/
├── data/
│   └── intents.json
├── model/
│   ├── classifier.pkl
│   └── vectorizer.pkl
├── public/
│   └── script.js, styles.css
├── views/
│   └── index.ejs
├── server.js
├── train.py
├── train.js
├── requirements.txt
└── .env
```

---

### 🧠 **Use Cases:**

- Personal fitness & mental health coaching  
- Guided daily exercises  
- Motivation for consistency  
- Lightweight assistant for beginners and busy individuals

---

Let me know if you'd like this converted into a **readme.md**, **project report**, or even a **poster/presentation** format!
