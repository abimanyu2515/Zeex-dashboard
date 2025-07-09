from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, index=True, primary_key=True)
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    password = Column(String, nullable=False)
<<<<<<< HEAD
    role = Column(String, default='viewer') # default role for anyone who signs up
=======
    role = Column(String, default='viewer') # default role for anyone who signs up
    status = Column(String, default='pending')
    is_active = Column(Boolean, default=False)
>>>>>>> fc3b24a (Your message about what you changed)
