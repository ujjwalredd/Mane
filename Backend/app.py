from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model and vectorizer
with open('/Users/ujjwalreddyks/Desktop/Mane/Mane/Backend/recommendation_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('/Users/ujjwalreddyks/Desktop/Mane/Mane/Backend/vectorizer.pkl', 'rb') as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

# Load property data
property_data = pd.read_csv("/Users/ujjwalreddyks/Desktop/Mane/Mane/Backend/property_list.csv")

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        # Extract user preferences from the request
        data = request.json
        bedroom_preference = data.get('bedrooms')
        property_type = data.get('property_type')
        top_n = data.get('top_n', 5)

        # Generate recommendations
        user_input = f"{property_type} {bedroom_preference} bedrooms"
        user_vector = vectorizer.transform([user_input])
        distances, indices = model.kneighbors(user_vector, n_neighbors=top_n)
        recommendations = property_data.iloc[indices[0]]

        # Return only the Property_IDs as a response
        property_ids = recommendations['Property_ID'].tolist()

        return jsonify({'status': 'success', 'property_ids': property_ids})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
