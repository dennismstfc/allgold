from . import db

class Station(db.Model):
    station_id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(50), nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    sale = db.relationship('Sale')
    inventory = db.relationship('Inventory')
    


class Product(db.Model):
    product_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    durability = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    inventory = db.relationship('Inventory')
    


class Sale(db.Model):
    sales_id = db.Column(db.Integer, primary_key=True)
    station_id = db.Column(db.Integer, db.ForeignKey('station.station_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.product_id'), nullable=False)
    amount_sold = db.Column(db.Integer, nullable=False)


class Inventory(db.Model):
    inventory_id = db.Column(db.Integer, primary_key=True)
    station_id = db.Column(db.Integer, db.ForeignKey('station.station_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.product_id'), nullable=False)
    current_amout = db.Column(db.Integer, nullable=False)


class Seller(db.Model):
    seller_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)



class Refill(db.Model):
    refill_id = db.Column(db.Integer, primary_key=True)
    station_id = db.Column(db.Integer, db.ForeignKey('station.station_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.product_id'), nullable=False)
    amount = db.Column(db.Integer, nullable=False)