from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Dummy data for memo and PDF files
memos = []
pdf_files = {
    "example.pdf": "This is the content of example.pdf",
    "sample.pdf": "This is the content of sample.pdf"
}

@app.route('/memos', methods=['GET'])
def get_memos():
    return jsonify({"memos": memos})

@app.route('/memo', methods=['POST'])
def add_memo():
    data = request.json
    memo_content = data.get('content', '')
    memos.append(memo_content)
    return jsonify({"message": "Memo added successfully"})

@app.route('/memo/<int:memo_id>', methods=['PUT'])
def update_memo(memo_id):
    data = request.json
    new_content = data.get('content', '')
    if memo_id < len(memos):
        memos[memo_id] = new_content
        return jsonify({"message": "Memo updated successfully"})
    else:
        return jsonify({"error": "Memo does not exist"}), 404

@app.route('/pdf/<filename>', methods=['GET'])
def get_pdf(filename):
    if filename in pdf_files:
        content = pdf_files[filename]
        return jsonify({"filename": filename, "content": content})
    else:
        return jsonify({"error": "File not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
