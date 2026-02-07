import pandas as pd
import joblib
from question import FEATURE_COLUMNS
from config import DATA_PATH, MODEL_DIR, N_CLUSTERS

def analyze():
    df = pd.read_csv(DATA_PATH).dropna()
    kmeans = joblib.load(f"{MODEL_DIR}/kmeans_model.pkl")
    scaler = joblib.load(f"{MODEL_DIR}/scaler.pkl")
    encoders = joblib.load(f"{MODEL_DIR}/encoders.pkl")
    
    X = df[FEATURE_COLUMNS].copy()
    for col, le in encoders.items():
        X[col] = le.transform(X[col].astype(str).str.lower())
    
    X_scaled = scaler.transform(X)
    df['Cluster'] = kmeans.predict(X_scaled)
    
    for i in range(N_CLUSTERS):
        print(f"\n--- Cluster {i} ---")
        print(df[df['Cluster'] == i]['Suggested Job Role'].value_counts().head(2))

if __name__ == "__main__":
    analyze()