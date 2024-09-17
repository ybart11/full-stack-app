# main configuration of our application
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# cross origin request, allows us to send request to this backend from different URL
from flask_cors import CORS 

# init the flask application, access an ORM (object relational mapping)
app = Flask(__name__)

# Allow us to send cross origin request to OUR app
CORS(app)

## init some database things
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"

# False to not track all the modifications we make to database
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Create instance of database which gives us access to db
db = SQLAlchemy(app)