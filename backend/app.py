from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/refine', methods=['POST'])
def refine_prompt():
    data = request.get_json() or {}
    user_id = data.get('user_id', 'default')
    prompt = data.get('prompt', '')
    history = data.get('history', [])
    # Here you would call your LLM agent to refine the prompt using the prompt and history
    refined_prompt = f"Please provide a clear and detailed answer to the following question: {prompt}"
    return jsonify({'refined_prompt': refined_prompt})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
