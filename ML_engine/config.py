# config.py
N_CLUSTERS = 8
RANDOM_STATE = 42
DATA_PATH = "Data/roo_data.csv"
MODEL_DIR = "Models"

# Mapped based on your Cluster Analysis results
COURSE_MAP = {
    0: ["Business Intelligence", "CRM Management", "Data Analytics"],
    1: ["Full Stack Engineering", "Systems Design", "Java Programming"],
    2: ["IT Management", "Enterprise Infrastructure", "Cloud Strategy"],
    3: ["Cybersecurity Fundamentals", "Information Security", "Ethical Hacking"],
    4: ["Web Development (React/Node)", "Network Infrastructure", "Cloud Computing"],
    5: ["UX/UI Design Principles", "Human-Computer Interaction", "Frontend Design"],
    6: ["Database Administration", "IT Project Management", "Agile Leadership"],
    7: ["Technical Engineering", "System Maintenance", "Advanced Troubleshooting"]
}

# Likert Scale Mapping
LIKERT_MAP = {
    "strongly agree": 5,
    "agree": 4,
    "neutral": 3,
    "disagree": 2,
    "strongly disagree": 1
}