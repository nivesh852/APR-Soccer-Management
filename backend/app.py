from flask import Flask
from routes.routes import APP

if __name__ == '__main__':
    APP.config["DEBUG"] = True
    APP.run(debug=True)

    # route = RoutingMethods()
