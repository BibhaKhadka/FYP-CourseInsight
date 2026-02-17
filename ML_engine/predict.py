import pandas as pd
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS  # Required for React to talk to Flask
from question import FEATURE_COLUMNS
from config import COURSE_MAP, MODEL_DIR, LIKERT_MAP

app = Flask(__name__)
CORS(app)  # Enables Cross-Origin Resource Sharing

# --- Load Models Once at Startup ---
try:
    kmeans = joblib.load(f"{MODEL_DIR}/kmeans_model.pkl")
    scaler = joblib.load(f"{MODEL_DIR}/scaler.pkl")
    pt = joblib.load(f"{MODEL_DIR}/pt.pkl")
    encoders = joblib.load(f"{MODEL_DIR}/encoders.pkl")
    print("AI Engine: Models loaded successfully.")
except Exception as e:
    print(f"Error: Could not load models. Run train_model.py first. Details: {e}")

def clean_input(val):
    """Matches text responses to numerical values or converts to float."""
    val = str(val).strip().lower()
    for key in LIKERT_MAP.keys():
        if val in key or key in val: 
            return LIKERT_MAP[key]
    try: 
        return float(val)
    except: 
        return 0  # Default fallback

@app.route('/predict', methods=['POST'])
def predict_endpoint():
    try:
        # Get data from React Frontend
        json_data = request.get_json()
        if not json_data:
            return jsonify({"error": "No data provided"}), 400

        # Prepare user data dictionary based on FEATURE_COLUMNS
        user_data = {}
        for col in FEATURE_COLUMNS:
            # Get value from JSON, default to 0 if missing
            raw_val = json_data.get(col, 0)
            user_data[col] = [clean_input(raw_val)]

        user_df = pd.DataFrame(user_data)

        # Apply Encoders for categorical features
        for col, le in encoders.items():
            if col in user_df.columns and user_df[col].dtype == 'object':
                try: 
                    user_df[col] = le.transform([str(user_df[col][0]).lower()])
                except: 
                    user_df[col] = 0

        # [span_2](start_span)Apply Scaling and Power Transformation[span_2](end_span)
        scaled = scaler.transform(user_df)
        transformed = pt.transform(scaled) 
        
        # [span_3](start_span)[span_4](start_span)Predict Cluster using Euclidean Distance logic[span_3](end_span)[span_4](end_span)
        cluster_id = int(kmeans.predict(transformed)[0])
        recommended_courses = COURSE_MAP.get(cluster_id, ["General IT Studies"])

        return jsonify({
            "cluster": cluster_id,
            "courses": recommended_courses,
            "status": "success"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # [span_5](start_span)Start the Flask server on port 5000[span_5](end_span)
    app.run(host='0.0.0.0', port=5000, debug=True)