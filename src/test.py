from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from transformers import BertTokenizer, BertModel
import torch
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import re
import nltk
import requests
# nltk.download("punkt")
# nltk.download("stopwords")
nltk.download("wordnet")

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "Access-Control-Allow-Origin": "http://localhost:3000"}})

# gsocOrgs = ["creativecommons/quantifying", "creativecommons/creativecommons.github.io-source", "plone/buildout.coredev", "wagtail/wagtail.org", "omegaup/quark"]
gsocOrgs = ["creativecommons/quantifying", "plone/buildout.coredev", "omegaup/quark"]
github_token = "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"
recommended_repositories = []

def preprocess_text(text):
    text = re.sub(r"http\S+|www\S+|https\S+", '', text, flags=re.MULTILINE)
    text = re.sub(r'[^A-Za-z]+', ' ', text)
    text = text.lower()
    words = word_tokenize(text)
    stemmer = PorterStemmer()
    stemmed_words = [stemmer.stem(word) for word in words if word not in stopwords.words('english')]
    text = ' '.join(stemmed_words)
    return text

def preprocess_and_tokenize(text, tokenizer):
    text = text.lower()
    words = word_tokenize(text)
    stemmer = PorterStemmer()
    stemmed_words = [stemmer.stem(word) for word in words if word not in stopwords.words('english')]
    lemmatizer = WordNetLemmatizer()
    lemmatized_words = [lemmatizer.lemmatize(word) for word in stemmed_words]
    text = ' '.join(lemmatized_words)
    tokens = tokenizer(text, padding=True, truncation=True, return_tensors="pt")
    return tokens

@app.route("/api/similarity", methods=["POST"])
@cross_origin(allow_headers=['Content-Type'])
def calculate_similarity():
    data = request.get_json()
    suggestedRepo = []
    recommendedRepo = []
    toComparedIssues = []
    count = 0
    
    for eachRepo in gsocOrgs:
        data['ur'].append(eachRepo)

    for eachCommentedissue in data['ui']:
        toComparedIssues.append(eachCommentedissue)
    for eachissue in data['up']:
        toComparedIssues.append(eachissue)

    for repo in data['ur']:
        response = requests.get(
            f'https://api.github.com/repos/{repo}/issues',
            params={'state': 'open'},
            headers={'Authorization': f'Bearer {github_token}'}
        )
        issues = response.json()
        for issue in issues:
            if "pull_request" not in issue:
                print("............",issue["html_url"])
                obj = {"repo": repo, "issue": issue["title"], "url": issue["html_url"]}
                suggestedRepo.append(obj)

    for known_issue in toComparedIssues:
        for unknown_issue in suggestedRepo:
            not_known_issue = unknown_issue["issue"]
            issue1 = not_known_issue
            issue2 = known_issue
            issue1 = preprocess_text(issue1)
            issue2 = preprocess_text(issue2)
            tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
            model = BertModel.from_pretrained("bert-base-uncased")

            tokens1 = preprocess_and_tokenize(issue1, tokenizer)
            tokens2 = preprocess_and_tokenize(issue2, tokenizer)

            with torch.no_grad():
                embeddings1 = model(**tokens1)["last_hidden_state"]
                embeddings2 = model(**tokens2)["last_hidden_state"]

            embeddings1 = embeddings1.squeeze(0)
            embeddings2 = embeddings2.squeeze(0)
            similarity = cosine_similarity(embeddings1, embeddings2)
            count += 1
            print("similarity of comparision ",count," is : ", similarity[0][0])

            if similarity[0][0] > 0.91:
                recommendedRepo.append(unknown_issue)
    
    serialized_recommended_repos = []
    for repos in recommendedRepo:
        serialized_repo = {
            "repo": repos["repo"],  
            "issue": repos["issue"],  
            "url": repos["url"],  
        }
        serialized_recommended_repos.append(serialized_repo)
    
    print("Recommended Repositories ============> ",serialized_recommended_repos)

    similarity_value = float(similarity[0][0])
    recommended_repositories = serialized_recommended_repos
    response_data = {
        "similarity": similarity_value,
        "recommended_repos": recommended_repositories
    }
    return jsonify(response_data)

@app.route("/api/recommended_repos", methods=["GET"])
@cross_origin()
def get_recommended_repos():
    return jsonify(recommended_repositories)

if __name__ == "__main__":
    app.run(debug=True)
