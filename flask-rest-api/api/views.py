from flask import Blueprint, json, jsonify, request
from . import db
from .models import Inventory, Product, Refill, Sale, Seller, Station

main = Blueprint('main', __name__)

# Add a station
@main.route('/add_station', methods=['POST'])
def add_station():
    station_data = request.get_json()

    check_coordinates_taken = Station.query.filter_by(longitude=station_data['longitude'], latitude=station_data['latitude']).first()
    if check_coordinates_taken:
        return 'Station with that position already exits', 405
    
    check_if_seller_exists = Seller.query.filter_by(seller_id=station_data['seller_id']).first()
    if not check_if_seller_exists:
        return 'There is no seller with that ID', 405

    new_station = Station(location=station_data['location'], longitude=station_data['longitude'], latitude=station_data['latitude'], type=station_data['type'], description=station_data['description'], seller_id=station_data['seller_id'])

    db.session.add(new_station)
    db.session.commit()

    return 'Done', 200

# Update Station
@main.route('/stations/<int:id>', methods=['PUT'])
def update_station(id):
    station_data = request.get_json()
    station_to_update = Station.query.get(id)

    if station_to_update is None:
        return 'Cannot find station with that ID', 405
 
    station_to_update.location = station_data['location']
    station_to_update.longitude = station_data['longitude']
    station_to_update.latitude = station_data['latitude']
    station_to_update.description = station_data['description']
    station_to_update.type = station_data['type']

    db.session.commit()

    return 'Updated', 200


# Delete Station
@main.route('/stations/<int:id>', methods=['DELETE'])
def delete_station(id):
    station = Station.query.get(id)
    if station is None:
        return 'Cannot find station with that ID', 405
    db.session.delete(station)
    db.session.commit()

    return 'Deleted', 202
    
# Return all stations as an array
@main.route('/stations', methods=['GET'])
def stations():
    station_list = Station.query.all()
    stations = []

    for station in station_list:
        stations.append({'station_id':station.station_id,'seller_id':station.seller_id ,'location': station.location, 'longitude': station.longitude, 'latitude': station.latitude, 'type': station.type, 'description': station.description})

    return jsonify({'stations' : stations})

# Return the best selling stations
@main.route('/stations/top_stations', methods=['GET'])
def top_stations():
    products_with_sales = db.session.query(Sale, Product).join(Sale).all()
    filtered_stations = []

    for item in products_with_sales:
        filtered_stations.append({'location': Station.query.filter_by(station_id=item.Sale.station_id).first().location, 'amount': item.Sale.amount_sold * item.Product.price})

    return jsonify({'stations': filtered_stations})    

# Return single Station by ID
@main.route('/stations/<int:id>', methods=['GET'])
def get_single_station(id):
    station = Station.query.get(id)

    if station is None:
        return 'Cannot find station with that ID', 404

    station_return = [{'station_id':station.station_id,'location': station.location, 'longitude': station.longitude, 'latitude': station.latitude, 'type': station.type, 'description': station.description}]

    return jsonify({'stations': station_return})


# PRODUCT
@main.route('/add_product', methods=['POST'])
def add_product():
    product_data = request.get_json()

    new_product = Product(name=product_data['name'], durability=product_data['durability'], price=product_data['price'])

    db.session.add(new_product)
    db.session.commit()

    return 'Done', 201

@main.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    if product is None:
        return {"error": "not found"}
    db.session.delete(product)
    db.session.commit()

    return 'Deleted', 202

@main.route('/products', methods=['GET'])
def products():

    product_list = Product.query.all()
    products = []

    for product in product_list:
        products.append({'product_id':product.product_id, 'name': product.name, 'durability': product.durability, 'price': product.price})

    return jsonify({'products' : products})

# Get all top products
@main.route('/products/top_products', methods=['GET'])
def top_products():
    products_with_sales = db.session.query(Sale, Product).join(Sale).all()
    filtered_products = []
    
    for item in products_with_sales:
        filtered_products.append({'name': Product.query.filter_by(product_id=item.Sale.product_id).first().name, 'amount': item.Sale.amount_sold})
    
    return jsonify({'products': filtered_products})

@main.route('/products/<int:id>', methods=['GET'])
def get_single_product(id):
    product = Product.query.get(id)

    if product is None:
        return 'Cannot find product with that ID', 404

    product_return = [{'product_id':product.product_id,'name': product.name, 'durability': product.durability, 'price': product.price}]

    return jsonify({'products': product_return})


# SALE
@main.route('/add_sale', methods=['POST'])
def add_sale():
    sale_data = request.get_json()

    station = Station.query.filter_by(station_id=sale_data['station_id']).first()
    if not station:
        print("Cannot find station with that ID")
        return 'Cannot find station with that ID', 404
    
    product = Product.query.filter_by(product_id=sale_data['product_id']).first()
    if not product:
        print("Cannot find product with that ID")
        return 'Cannot find product with that ID', 404
    
    inventory = Inventory.query.filter_by(station_id=sale_data['station_id'], product_id=sale_data['product_id']).first()
    
    if inventory:
        amount_of_available_products = inventory.current_amount
        if amount_of_available_products < 0:
            print("Inventory is, empty cannot progress to a sale")
            return 'Inventory is empty, cannot progress to a sale', 405
        else:
            new_amount = int(amount_of_available_products) - int(sale_data['amount_sold'])
            if new_amount < 10:
                print("Low on stock")
                pending_refill = Refill.query.filter_by(station_id=sale_data['station_id'], product_id=sale_data['product_id']).first()
                if pending_refill:
                    pending_refill.amount= 30-int(new_amount)
                    db.session.commit()
                else:
                    print("New refill incoming")
                    new_refill = Refill(station_id=sale_data['station_id'], product_id=sale_data['product_id'], amount= 30 - int(new_amount))
                    db.session.add(new_refill)
                    db.session.commit()

            if new_amount < 0:
                print("Not enough products available to make the pending sale")
                return 'Not enough products available to make the pending sale', 405
            else:
                inventory.current_amount = new_amount
                seller = Station.query.filter_by(station_id=sale_data['station_id']).first().seller_id
                new_sale = Sale(station_id=sale_data['station_id'], product_id=sale_data['product_id'], seller_id=seller, amount_sold=sale_data['amount_sold'])
                db.session.add(new_sale)
                db.session.commit()
                print("Items sucessfully purchased")
                return 'Items successfully purchased!', 200

    else:
        print("Cannot find product")
        return 'Cannot find that product', 405


@main.route('/sales/<int:id>', methods=['DELETE'])
def delete_sale(id):
    sale = Sale.query.get(id)
    if sale is None:
        return {"error": "not found"}
    db.session.delete(sale)
    db.session.commit()

    return 'Deleted', 202

@main.route('/sales', methods=['GET'])
def sales():
    sale_list = Sale.query.all()
    sales = []

    for sale in sale_list:
        sales.append({'sale_id':sale.sale_id, 'station_id':sale.station_id, 'product_id':sale.product_id, 'amount_sold':sale.amount_sold})

    return jsonify({'sales' : sales})
 

@main.route('/sales/last_50', methods=['GET'])
def last_50_sales():
    sales_with_products = db.session.query(Sale, Product).join(Sale).order_by(-Sale.sale_id).limit(50)
    last_50_sales = []

    for item in sales_with_products:
        last_50_sales.append({'location':Station.query.filter_by(station_id=item.Sale.station_id).first().location, 'name':item.Product.name, 'amount_sold':item.Sale.amount_sold, 'profit': round(item.Sale.amount_sold * item.Product.price, 2)})

    return jsonify({'sales': last_50_sales})


@main.route('/sales/<int:id>', methods=['GET'])
def get_single_sale(id):
    sale = Sale.query.get(id)

    if sale is None:
        return 'Cannot find sale with that ID', 404

    sale_return = [{'sale_id':sale.sale_id, 'station_id':sale.station_id, 'product_id':sale.product_id, 'amount_sold':sale.amount_sold}]

    return jsonify({'sales': sale_return})


# INVENTORY
@main.route('/add_inventory', methods=['POST'])
def add_inventory():
    inventory_data = request.get_json()

    new_inventory = Inventory(station_id=inventory_data['station_id'], product_id=inventory_data['product_id'], current_amount=inventory_data['current_amount'])

    db.session.add(new_inventory)
    db.session.commit()

    return 'Done', 201

@main.route('/inventories/<int:id>', methods=['DELETE'])
def delete_inventory(id):
    inventory = Inventory.query.get(id)
    if inventory is None:
        return {"error": "not found"}
    db.session.delete(inventory)
    db.session.commit()

    return 'Deleted', 202

@main.route('/inventories', methods=['GET'])
def inventories():
    inventory_list = Inventory.query.all()
    inventories = []

    for inventory in inventory_list:
        inventories.append({'inventory_id':inventory.inventory_id, 'station_id':inventory.station_id, 'product_id':inventory.product_id, 'current_amount':inventory.current_amount})

    return jsonify({'inventories' : inventories})

@main.route('/inventories/<int:id>', methods=['GET'])
def get_single_inventory(id):
    inventory = Inventory.query.get(id)

    if inventory is None:
        return 'Cannot find inventory with that ID', 404

    inventory_return = [{'inventory_id':inventory.inventory_id, 'station_id':inventory.station_id, 'product_id':inventory.product_id, 'current_amount':inventory.current_amount}]

    return jsonify({'inventories': inventory_return})    

# SELLER
@main.route('/add_seller', methods=['POST'])
def add_seller():
    seller_data = request.get_json()

    new_seller = Seller(first_name=seller_data['first_name'], last_name=seller_data['last_name'])

    db.session.add(new_seller)
    db.session.commit()

    return 'Done', 201

@main.route('/sellers/<int:id>', methods=['DELETE'])
def delete_seller(id):
    seller = Seller.query.get(id)
    if seller is None:
        return {"error": "not found"}
    db.session.delete(seller)
    db.session.commit()

    return 'Deleted', 202

@main.route('/sellers', methods=['GET'])
def sellers():

    seller_list = Seller.query.all()
    sellers = []

    for seller in seller_list:
        sellers.append({'seller_id':seller.seller_id, 'first_name':seller.first_name, 'last_name':seller.last_name})

    return jsonify({'sellers' : sellers})

# Get top sellers
@main.route('/sellers/top_sellers', methods=['GET'])
def top_sellers():
    product_with_sales = db.session.query(Sale, Product).join(Sale).all()
    filtered_sellers =[]
    
    for item in product_with_sales:
        filtered_sellers.append({'name': Seller.query.filter_by(seller_id=item.Sale.seller_id).first().first_name + " " + Seller.query.filter_by(seller_id=item.Sale.seller_id).first().last_name,'amount': round(item.Sale.amount_sold * item.Product.price, 2)})
    
    return jsonify({'sellers': filtered_sellers})

@main.route('/sellers/<int:id>', methods=['GET'])
def get_single_seller(id):
    seller = Seller.query.get(id)

    if seller is None:
        return 'Cannot find seller with that ID', 405

    seller_return = [{'seller_id':seller.seller_id, 'first_name':seller.first_name, 'last_name':seller.last_name}]

    return jsonify({'sellers': seller_return})
   

# Refill
main.route('/add_refill', methods=['POST'])
def add_refill():
    refill_data = request.get_json()

    new_refill = Refill(amount=refill_data['amount'])

    db.session.add(new_refill)
    db.session.commit()

    return 'Done', 201

@main.route('/refills/<int:id>', methods=['DELETE'])
def delete_refill(id):
    refill = Refill.query.get(id)
    if refill is None:
        return {"error": "not found"}
    db.session.delete(refill)
    db.session.commit()

    return 'Deleted', 202

@main.route('/refills', methods=['GET'])
def refills():

    refill_list = Refill.query.all()
    refills = []

    for refill in refill_list:
        refills.append({'refill_id':refill.refill_id, 'station_id':refill.station_id, 'product_id':refill.product_id, 'amount':refill.amount})

    return jsonify({'refills' : refills})

@main.route('/refills/<int:id>', methods=['GET'])
def get_single_refill(id):
    refill = Refill.query.get(id)

    if refill is None:
        return 'Cannot find refill with that ID', 405

    refill_return = [{'refill_id':refill.refill_id, 'station_id':refill.station_id, 'product_id':refill.product_id, 'amount':refill.amount}]

    return jsonify({'refills': refill_return})

