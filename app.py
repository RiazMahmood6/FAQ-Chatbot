from flask import Flask, render_template, jsonify, request
import pandas as pd
from datasets import load_dataset

app = Flask(__name__)

# Load dataset
dataset = load_dataset("dltdojo/ecommerce-faq-chatbot-dataset")
df = pd.DataFrame(dataset['train'])
df.dropna(inplace=True)
df = df.drop(columns=['a_hant', 'q_hant'], errors='ignore')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_random_data')
def get_random_data():
    if df.empty:
        return jsonify({"error": "No data available"})
    
    sample_size = min(5, len(df))
    sample_data = df.sample(sample_size).to_dict(orient='records')
    return jsonify(sample_data)

@app.route('/ask', methods=['POST'])
def ask():
    user_question = request.json.get("question", "").lower()
    
    best_match = df[df['question'].str.lower() == user_question]
    
    if not best_match.empty:
        answer = best_match.iloc[0]['answer']
    else:
        answer = "Sorry, I don't know the answer."

    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(debug=True)
