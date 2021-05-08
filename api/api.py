from flask import Flask, redirect, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stationen.db'
# Initialize the database
db = SQLAlchemy(app)

# Create database model
class Stationen(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    breitengrad = db.Column(db.Integer, nullable=False)
    laengengrad = db.Column(db.Integer, nullable=False)
    standort = db.Column(db.String(100), nullable=False)
    typ = db.Column(db.String(100), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    # Create function to return string when we added a station
    def __repr__(self):
        return '<Station %r>' % self.id 


@app.route('/eroeffnen', methods=['GET', 'POST'])
def eroeffnen():

    if request.method == "POST":
        for x in request.form:
            print(x)
        breitengrad = request.form['breitengrad']
        new_breitengrad = Stationen(breitengrad=new_breitengrad)

        # Push to database
        try:
            db.session.add(new_breitengrad)
            db.session.commit()
            return redirect()
        except:
            return "Error while adding new station"

    else:
        return "Bist der beste"
