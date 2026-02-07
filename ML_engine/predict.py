import pandas as pd
import joblib
import numpy as np
from question import FEATURE_COLUMNS
from config import COURSE_MAP, MODEL_DIR, LIKERT_MAP

def clean_input(val, col_name):
    val = str(val).strip().lower()
    
    # 1. Handle Typos in Likert Scale
    # This checks if your typing is "close enough" to the actual word
    for key in LIKERT_MAP.keys():
        if val in key or key in val: # Catches 'netural', 'agre', etc.
            return LIKERT_MAP[key]
    
    # 2. Handle numeric percentages
    try:
        return float(val)
    except:
        # 3. Handle specific categorical columns
        if "Management" in col_name:
            return "management" # Default to management if 'Agree' is typed
        if "Salary" in col_name:
            return "salary" # Default to salary if 'Agree' is typed
        return val

def predict():
    try:
        kmeans = joblib.load(f"{MODEL_DIR}/kmeans_model.pkl")
        scaler = joblib.load(f"{MODEL_DIR}/scaler.pkl")
        encoders = joblib.load(f"{MODEL_DIR}/encoders.pkl")
    except:
        print("❌ Models not found. Run train_model.py first.")
        return

    print("\n--- Career Insight Quiz ---")
    print("Options: Strongly Agree, Agree, Neutral, Disagree, Strongly Disagree")
    
    user_data = {}
    for col in FEATURE_COLUMNS:
        raw_val = input(f"Enter {col}: ")
        user_data[col] = [clean_input(raw_val, col)]

    user_df = pd.DataFrame(user_data)

    # Final Check: Convert any remaining Likert strings that escaped clean_input
    # and encode categorical text columns
    for col in user_df.columns:
        if col in encoders:
            # It's a categorical column (like Management or Technical)
            le = encoders[col]
            val = str(user_df[col][0]).lower()
            try:
                user_df[col] = le.transform([val])
            except:
                user_df[col] = 0 # Default to first class if unknown
        else:
            # It's a numerical/Likert column
            try:
                user_df[col] = pd.to_numeric(user_df[col])
            except:
                user_df[col] = 3.0 # Default to 'Neutral' if everything fails

    # Scale and Predict
    scaled = scaler.transform(user_df)
    cluster = kmeans.predict(scaled)[0]

    print(f"\n✅ Result: We recommend Cluster {cluster}")
    print("Recommended Courses:")
    for course in COURSE_MAP[cluster]:
        print(f" 🚀 {course}")

if __name__ == "__main__":
    predict()