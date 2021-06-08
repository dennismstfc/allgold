from flask import Blueprint, jsonify, request
from . import db
from .models import Product, Station

main = Blueprint('main', __name__)

@main.route('/add_station', methods=['POST'])
def add_station():
    station_data = request.get_json()

    new_station = Station(location=station_data['location'], longitude=station_data['longitude'], latitude=station_data['latitude'], type=station_data['type'], description=station_data['description'])

    db.session.add(new_station)
    db.session.commit()

    return 'Done', 201

@main.route('/stations/<id>', methods=['DELETE'])
def delete_station():
    station = Station.query.get(id)
    if station is None:
        return {"error": "not found"}
    db.session.delete(station)
    db.session.commit()

    return 'Deleted', 202
    

@main.route('/stations')
def stations():

    station_list = Station.query.all()
    stations = []

    for station in station_list:
        stations.append({'location': station.location, 'longitude': station.longitude, 'latitude': station.latitude, 'type': station.type, 'description': station.description})

    return jsonify({'stations' : stations})


@main.route('/add_product', methods=['POST'])
def add_product():
    product_data = request.get_json()

    new_product = Product(name=product_data['name'], durability=product_data['durability'], price=product_data['price'])

    db.session.add(new_product)
    db.session.commit()

    return 'Done', 201


@main.route('/products')
def products():

    product_list = Product.query.all()
    products = []

    for product in product_list:
        products.append({'name': product.name, 'durability': product.durability, 'price': product.price})

    return jsonify({'products' : products})

