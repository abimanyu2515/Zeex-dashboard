import os
from dotenv import load_dotenv
from pathlib import Path

# Go one level up from `config.py` to find `.env` in the `backend/` folder
env_path = Path(__file__).resolve().parent
load_dotenv(dotenv_path=env_path)

# Read config values
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM', 'HS256')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 30))