import pandas as pd
import joblib
from question import FEATURE_COLUMNS
from config import COURSE_MAP, MODEL_DIR, LIKERT_MAP

def clean_input(val, col_name):
    val = str(val).strip().lower()
    for key in LIKERT_MAP.keys():
        if val in key or key in val: return LIKERT_MAP[key]
    try: return float(val)
    except: return val

def predict():
    try:
        kmeans = joblib.load(f"{MODEL_DIR}/kmeans_model.pkl")
        scaler = joblib.load(f"{MODEL_DIR}/scaler.pkl")
        pt = joblib.load(f"{MODEL_DIR}/pt.pkl") # NEW: Load the transformer
        encoders = joblib.load(f"{MODEL_DIR}/encoders.pkl")
    except:
        print(" Run train_model.py first.")
        return

    user_data = {}
    for col in FEATURE_COLUMNS:
        raw_val = input(f"Enter {col}: ")
        user_data[col] = [clean_input(raw_val, col)]

    user_df = pd.DataFrame(user_data)

    # Apply Encoders
    for col, le in encoders.items():
        if user_df[col].dtype == 'object':
            try: user_df[col] = le.transform([str(user_df[col][0]).lower()])
            except: user_df[col] = 0

    # Apply Scaling AND Transformation
    scaled = scaler.transform(user_df)
    transformed = pt.transform(scaled) # NEW: Transform user input
    cluster = kmeans.predict(transformed)[0]

    print(f"\n Result: Cluster {cluster}")
    print(f"Courses: {COURSE_MAP[cluster]}")

if __name__ == "__main__":
    predict()