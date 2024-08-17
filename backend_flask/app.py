from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS for frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Configure the MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['chatgpt']

# Secret key for JWT
app.config['JWT_SECRET_KEY'] = 'ADBHJBHJ2@^nkj!k44446'

# Initialize JWT manager
jwt = JWTManager(app)

# User registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if db.users.find_one({'username': data['username']}):
        return jsonify({"message": "Username already exists"}), 409
    hashed_password = generate_password_hash(data['password'])
    new_user = {
        'username': data['username'],
        'password': hashed_password,
        'is_admin': False,
        'business': data['business'],
        'created_at': datetime.utcnow()
    }
    db.users.insert_one(new_user)
    return jsonify({"message": "User created successfully"}), 201

# User login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = db.users.find_one({'username': data['username'], 'business': data['business']})
    if user and check_password_hash(user['password'], data['password']):
        access_token = create_access_token(identity=str(user['_id']))
        return jsonify(access_token=access_token), 200
    return jsonify({"message": "Invalid credentials or business"}), 401

# Get User Info
@app.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(current_user_id)})
    return jsonify({
        "id": str(user['_id']),
        "username": user['username'],
        "is_admin": user['is_admin'],
        "business": user['business'],  # Added business field in response
        "created_at": user['created_at'].isoformat()
    }), 200


# Admin login
@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    user = db.users.find_one({'username': data['username'], 'is_admin': True})
    if user and check_password_hash(user['password'], data['password']):
        access_token = create_access_token(identity=str(user['_id']))
        return jsonify(access_token=access_token, business=user['business']), 200
    return jsonify({"message": "Invalid credentials"}), 401


# Todos management
@app.route('/todos', methods=['GET', 'POST', 'DELETE'])
@jwt_required()
def todos():
    current_user_id = get_jwt_identity()
    user = db.users.find_one({'_id': ObjectId(current_user_id)})

    if request.method == 'GET':
        # Fetch todos based on user's business
        query = {'business': user['business']}
        if user.get('is_admin'):
            # Admins can see all todos, optionally filter by business if needed
            query = {}
        todos = list(db.todos.find(query))
        return jsonify([{
            "id": str(todo['_id']),
            "title": todo['title'],
            "description": todo.get('description', ''),
            "business": todo.get('business', '')
        } for todo in todos]), 200

    elif request.method == 'POST':
        data = request.get_json()
        
        # Ensure business field is included
        new_todo = {
            'title': data['title'],
            'description': data.get('description', ''),
            'user_id': current_user_id,
            'business': user['business']  # Add business field
        }
        
        try:
            result = db.todos.insert_one(new_todo)
            return jsonify({"message": "Todo created successfully", "id": str(result.inserted_id)}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    elif request.method == 'DELETE':
        data = request.get_json()
        todo_id = data.get('id')
        if not todo_id:
            return jsonify({"message": "Todo ID is required"}), 400

        try:
            # Ensure the todo belongs to the user's business
            query = {'_id': ObjectId(todo_id), 'business': user['business']}
            if user.get('is_admin'):
                # Admins can delete any todo
                query = {'_id': ObjectId(todo_id)}

            result = db.todos.delete_one(query)
            if result.deleted_count == 0:
                return jsonify({"message": "Todo not found or you're not authorized to delete this todo"}), 404
            
            return jsonify({"message": "Todo deleted successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
           

# Admin registration
@app.route('/admin/register', methods=['POST'])
def admin_register():
    data = request.get_json()
    if db.users.find_one({'username': data['username']}):
        return jsonify({"message": "Username already exists"}), 409
    hashed_password = generate_password_hash(data['password'])
    new_admin = {
        'username': data['username'],
        'password': hashed_password,
        'is_admin': True,
        'business': data['business']
    }
    db.users.insert_one(new_admin)
    return jsonify({
        "message": "Admin created successfully",
        "business": new_admin['business']
    }), 201

# Error handling for database connection issues
@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
