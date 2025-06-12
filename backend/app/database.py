from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Now fetch the environment variable
DB_URL = os.getenv('DATABASE_URL')

# Confirm it's loaded (optional for debugging)
if DB_URL is None:
    raise ValueError("DATABASE_URL not found. Did you create a .env file?")

# Setup SQLAlchemy
engine = create_engine(DB_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()
