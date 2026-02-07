import os
import shutil
import subprocess

def reset_project():
    print("🧹 Starting Project Reset...")

    # 1. Delete the Models folder to remove old/corrupt files
    if os.path.exists("Models"):
        try:
            shutil.rmtree("Models")
            print("🗑️  Old Models folder deleted.")
        except Exception as e:
            print(f"⚠️  Could not delete Models folder: {e}")
    
    # 2. Re-run Training
    print("\n🧠 Training New Model...")
    try:
        subprocess.run(["python", "train_model.py"], check=True)
    except Exception as e:
        print(f"❌ Training failed: {e}")
        return

    # 3. Re-run Analysis
    print("\n📊 Running Cluster Analysis...")
    try:
        subprocess.run(["python", "analysis.py"], check=True)
    except Exception as e:
        print(f"❌ Analysis failed: {e}")

    print("\n✅ Reset and Training Complete! You can now run 'predict.py'.")

if __name__ == "__main__":
    reset_project()