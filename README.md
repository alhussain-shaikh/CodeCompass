
# CodeCompass: Guiding you to the Right Repository
![Recording 2023-11-26 204651](https://github.com/alhussain-shaikh/CodeCompass/assets/116242196/6426bba6-9e37-46d2-9d41-a03e7150b9fa)

In the dynamic landscape of open-source development, the challenge of efficiently aligning developers with projects that resonate with their expertise persists. 
This Repo introduces CodeCompass, a novel solution addressing this issue by leveraging the GitHub API to personalize project recommendations. 
By analyzing users' historical contributions, including commit history and issue engagement, CodeCompass employs Natural Language Processing (NLP) techniques, such as stemming, lemmatization, and the BERT model, to discern nuanced semantic relationships within issues. 
The system calculates cosine similarity to identify highly correlated issues, surpassing a 90% threshold. The result is a curated list of open-source project issues, presented through a React-based website interface, ensuring not only technical alignment but also resonance with users' past experiences in the GitHub community. 
This intricate interplay of data acquisition, processing, and machine learning techniques establishes CodeCompass as an intuitive and efficient recommendation system, streamlining developer engagement in the open-source community.
 
# Problem Statement
Navigating the vast landscape of open-source projects is a challenge for developers, leading to delays and suboptimal utilization of skills. CodeCompass addresses this by providing a streamlined solution for developers to discover and contribute to projects matching their skills and interests.

# User and Needs
CodeCompass caters to a diverse range of developers, from novices to seasoned contributors. Through surveys and analysis, we understand their programming languages, areas of interest, preferred complexities, and community engagement levels. This enables personalized recommendations for a rich contribution experience.

# Methodology
### Data Collection
CodeCompass utilizes the GitHub API for real-time project information, including metadata, languages used, commit history, and community engagement metrics. This ensures up-to-date and relevant data for accurate recommendations.

### Machine Learning Model
CodeCompass leverages user historical contributions using the GitHub API. It extracts and processes issues, applying NLP techniques for data integrity. The BERT model and cosine similarity calculate issue similarities, resulting in a curated list of recommended open-source project issues aligned with the user's preferences.

### Web-App Development
Developed with React, CodeCompass ensures an intuitive and dynamic user interface. Responsive design optimizes accessibility, and the platform's engaging front end provides an aesthetic experience for users across all skill levels.

### Integration of Machine Learning Model
The machine learning model is seamlessly integrated into the React-based front end, with Flask serving as the backend bridge. This integration facilitates real-time and accurate project suggestions, enhancing CodeCompass's functionality and responsiveness.

### Testing & Running Commands
Thorough testing procedures, including unit testing, integration testing, and end-to-end testing, ensure the robustness and reliability of the recommendation system.
- `npm i` to install packages
- `npm start ` to Run the Web App
- `nodemon server\src\app.ts` to start the Authantication Server via GitHub
- `python3 src\test.py` to  Start the flask App for Recommendation of Project

These above should be running simulatanusly

### Deployment
CodeCompass follows industry-standard practices for deployment on scalable and reliable cloud infrastructure. Continuous integration and automated deployment pipelines minimize downtime and enhance accessibility for users.

### Maintenance
A dedicated maintenance strategy post-deployment includes regular updates, security patches, and performance optimizations. Continuous monitoring and feedback loops ensure a resilient and responsive system for sustained user satisfaction.

# Lemmatization Algorithm

## Overview

Lemmatization is a crucial step in CodeCompass's recommendation system, transforming words into their root forms for effective semantic analysis during the comparison of user issues with suggested GitHub repository issues.

### Lemmatization Steps

1. **Import Required Libraries:**
   - Utilize NLTK for lemmatization (`from nltk.stem import WordNetLemmatizer`).

2. **Define Lemmatizer:**
   - Initialize a WordNetLemmatizer instance (`lemmatizer = WordNetLemmatizer()`).

3. **Preprocess Text Function:**
   - Create a function (`preprocess_text`) for lemmatization.

4. **Lemmatization Process:**
   - The `preprocess_text` function includes:
     - Text Cleaning: Remove URLs, non-alphabetic characters, and convert text to lowercase.
     - Tokenization: Split the text into words.
     - Lemmatization: Apply lemmatization to each word.
     - Reconstruction: Join lemmatized words into a processed text string.

5. **Lemmatization Usage:**
   - Utilized in the main process (`calculate_similarity` function) to preprocess issue text for comparison.

6. **Lemmatizing Issues for Comparison:**
   - During the comparison of known and unknown issues, preprocess the text of each issue.

7. **Similarity Calculation:**
   - Tokenization, BERT embedding generation, and cosine similarity calculation follow the lemmatized text preprocessing.

## BERT Tokenization Algorithm

### BERT Tokenization Steps

1. **Import Required Libraries:**
   - Import transformers library for BERT (`from transformers import BertTokenizer, BertModel`).

2. **Load BERT Tokenizer:**
   - Initialize a BERT tokenizer instance (`tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")`).

3. **Define Function for Text Preprocessing:**
   - Create a function (`preprocess_and_tokenize`) to tokenize and preprocess text using the BERT tokenizer.

4. **Tokenization Process:**
   - The `preprocess_and_tokenize` function:
     - Input Text Encoding: Tokenize input text into word pieces or subwords, apply padding and truncation, and convert to PyTorch tensors.

5. **Usage of BERT Tokenization:**
   - Used in the main process (`calculate_similarity` function) to preprocess issue text for comparison.

6. **BERT Tokenization in Similarity Calculation:**
   - Tokenize the text of each issue during the comparison of known and unknown issues.

7. **BERT Embedding Generation:**
   - Utilize the BERT model to generate embeddings for known and unknown issues.

8. **Cosine Similarity Calculation:**
   - Calculate cosine similarity based on the mean embeddings of known and unknown issues derived from BERT.

## Cosine Similarity

### Cosine Similarity Calculation

- Compute cosine similarity between mean embeddings of known and unknown issues.
- Cosine similarity measures the cosine of the angle between two vectors and ranges from -1 to 1.

### Threshold-Based Recommendations

- The code uses a threshold of 0.80 to determine similarity.
- If the computed cosine similarity is above 0.80, it considers the issues as similar.

### Issue Recommendations

- If the similarity is above the threshold and the unknown issue is not already recommended:
  - Add the unknown issue to the recommended list (`recommendedRepo`).

### Serialization of Recommended Repositories

- Serialize recommended repositories into a structured format (e.g., dictionary) containing repository details like repo name, issue, and URL.

### Response Generation

- Prepare a response JSON object containing:
  - `similarity`: The value of cosine similarity between known and unknown issues.
  - `recommended_repos`: The list of serialized recommended repositories.

### Return Recommendations

- Return the response JSON object (`response_data`) as the result of the API call.
  
# Results 
![screencapture-localhost-3000-2023-11-25-17_26_28](https://github.com/alhussain-shaikh/CodeCompass/assets/116242196/95f8db78-90da-46ce-84bc-a0a62a84628a)
