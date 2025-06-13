# Full-Stack Web Application

A modern web application built with **React** (frontend) and **FastAPI** (backend). Supports user authentication using **JWT**, environment-based configuration, and organized modular structure.


---

## Backend Setup (FastAPI)

### Requirements

- Python 3.10+
- pip
- virtualenv (optional)

### Install Dependencies

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### CREATE A .env file inside your backend directory

- SECRET_KEY=your_secret_key_here
- ALGORITHM=HS256
- ACCESS_TOKEN_EXPIRE_MINUTES=30

```bash
uvicorn main:app --reload
```

### FRONT-END 

```bash
cd frontend
npm install
npm run dev
```
