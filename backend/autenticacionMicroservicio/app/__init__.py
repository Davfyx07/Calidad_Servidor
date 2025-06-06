from flask import Flask
from app.routes import auth_routes
from backend.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Register routes
    app.register_blueprint(auth_routes, url_prefix='/auth')

    return app