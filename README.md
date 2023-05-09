# Locago node project

Description...

## How to run

Specify app.properties file in backend folder with the following data:

``sever.port=<PORT_NUM>``

``db.mongo.username=<MONGO_DB_USERNAME>``

``db.mongo.password=<MONGO_DB_PASSWORD>``

``db.postgres.username=<POSTGRES_DB_USERNAME>``

``db.postgres.password=<POSTGRES_DB_PASSWORD>``

### Node backend
1. npm install
2. npm start

### Python ML prediction service
1. pip install -r /path/to/requirements.txt
2. uvicorn main:app --host 0.0.0.0 --port 8001 --reload --debug

### ReactJS frontend
1. npm install
2. npm start

## Architecture

TODO

## Demo

![demo2.gif](assests%2Fdemo2.gif)
