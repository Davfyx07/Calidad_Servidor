import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from flask import Flask
from flask_jwt_extended import JWTManager
from backend.config import Config
from backend.models import db
from app.routes import software_routes


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    JWTManager(app)
    with app.app_context():
        db.create_all() 
    #Migrate(app, db)  

    app.register_blueprint(software_routes, url_prefix='/software')
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
