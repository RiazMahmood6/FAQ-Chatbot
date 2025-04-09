# Chatbot with Sentence Similarity Matching

This is a chatbot that uses sentence similarity to find the most relevant response to user queries. It is built using Flask and utilizes the `sentence-transformers/all-MiniLM-L6-v2` model to compute similarity between user questions and predefined answers.

![Chatbot Preview](https://drive.google.com/file/d/1g0Iq_cjsC9T-lgUt3ck6ELkHO4L-VvTA/view?usp=sharing)

## Features
- Uses `sentence-transformers/all-MiniLM-L6-v2` for sentence similarity.
- Matches user queries with the closest existing question and retrieves the corresponding answer.
- API endpoint to receive user queries and return relevant responses.
- Flask-based backend.
- Hosted on **Render** for live testing.

## Live Demo
Check out the live chatbot here: **[Chatbot Live Demo](https://faq-chatbot-54ee.onrender.com)**

## Installation

### Prerequisites
Make sure you have Python installed (>=3.8).

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the Flask app:
   ```sh
   python app.py
   ```

## Usage

### API Endpoint
The chatbot provides an endpoint to ask questions:

- **Endpoint:** `/ask`
- **Method:** `POST`
- **Request Format:** JSON

#### Example Request:
```json
{
  "question": "What is your price matching policy?"
}
```
#### Example Response:
```json
{
  "answer": "We have a price matching policy where we will match the price of an identical product found on a competitor's website. Please contact our customer support team with the details of the product and the competitor's offer."
}
```

## How It Works
1. User submits a question via the `/ask` endpoint.
2. The chatbot encodes the question and computes cosine similarity with stored question embeddings.
3. It finds the most similar question and retrieves the corresponding answer.
4. If no relevant match is found, it responds with a default message.

## Technologies Used
- Python
- Flask
- `sentence-transformers/all-MiniLM-L6-v2` (for sentence similarity)
- Pandas
- PyTorch

## Contributing
Pull requests are welcome! If you find a bug or have a feature request, please open an issue.

## Contact
For any inquiries, reach out via GitHub issues or email: `rzmahmood6@gmail.com`.

---
Happy coding! 🚀

