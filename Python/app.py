from flask import Flask, jsonify, abort,request
import sqlite3
from flask_cors import CORS, cross_origin
import json
import random
import string 

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def CreateAccount(email,password,name):

    token = (''.join(random.choices(string.ascii_uppercase, k=5)))

    conn = sqlite3.connect("account") 
    c = conn.cursor()
    conn.execute(f"INSERT INTO users (token,email,password,name)\
                  VALUES ('{token}', '{email}','{password}','{name}')")
    conn.commit()

    return jsonify({"token": token}), 201


def Auth(email,password):
    res = 'email or password wrong'
    try:
        conn = sqlite3.connect('account') 
        c = conn.cursor()
        for row in c.execute('SELECT * FROM users  '):
            
            if(row[1] == email and row[2]==password):
                res = jsonify({"token": row[0]}), 201
                break
            

    except Exception as error:
        res =  (f"error = {error}")
    return res


def username(token):
    res = jsonify({"name": 'False'}), 201

    
    conn = sqlite3.connect('account') 
    c = conn.cursor()
    for row in c.execute('SELECT * FROM users  '):
            
            if(row[0] == token):
                res = jsonify({"name": row[3]}), 201
                break
    return res


@app.route("/LogIn/", methods=["POST"])
def LogIn():
    record = json.loads(request.data)
    return Auth(record['email'],record['password'])


@app.route("/SignUp/", methods=["POST"])
def SignUp():
    record = json.loads(request.data)
    return CreateAccount(record['email'],record['password'],record['name'])


@app.route("/username/<token>", methods=["GET"])
def Username(token):
    
    return username(token)




if __name__ == "__main__":
    app.run(debug=True)