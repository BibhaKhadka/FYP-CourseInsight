import pandas as pd
import matplotlib.pyplot as plt
import joblib
import os
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import silhouette_score
from question import FEATURE_COLUMNS
from config import N_CLUSTERS, RANDOM_STATE, DATA_PATH, MODEL_DIR

def train():
    if not os.path.exists(DATA_PATH):
        print(f"❌ Error: {DATA_PATH} not found!")
        return

    df = pd.read_csv(DATA_PATH).dropna()
    X = df[FEATURE_COLUMNS].copy()

    # Encode categorical text to numbers
    encoders = {}
    for col in X.columns:
        if X[col].dtype == "object":
            le = LabelEncoder()
            X[col] = le.fit_transform(X[col].astype(str).str.lower())
            encoders[col] = le

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Elbow Method Plot
    wcss = []
    for i in range(1, 11):
        km = KMeans(n_clusters=i, init='k-means++', n_init=10, random_state=RANDOM_STATE)
        km.fit(X_scaled)
        wcss.append(km.inertia_)
    
    os.makedirs(MODEL_DIR, exist_ok=True)
    plt.plot(range(1, 11), wcss, marker='o')
    plt.title('Elbow Method')
    plt.savefig(f"{MODEL_DIR}/elbow_plot.png")

    # Final Model
    kmeans = KMeans(n_clusters=N_CLUSTERS, init='k-means++', n_init=20, max_iter=1000, random_state=RANDOM_STATE)
    clusters = kmeans.fit_predict(X_scaled)
    
    print(f"✨ Training Success! Silhouette Score: {silhouette_score(X_scaled, clusters):.4f}")

    joblib.dump(kmeans, f"{MODEL_DIR}/kmeans_model.pkl")
    joblib.dump(scaler, f"{MODEL_DIR}/scaler.pkl")
    joblib.dump(encoders, f"{MODEL_DIR}/encoders.pkl")
    print("✅ Assets saved in Models/")

if __name__ == "__main__":
    train()