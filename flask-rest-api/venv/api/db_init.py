import random
from faker import Faker
from .models import *
from . import db


class DatabaseInitialization:
	def __init__(self):
		self.faker = Faker()
		self.products = [
			["1 Liter haltbare Milch", 0.99, 30],
			["1 Liter frische Milch", 1.35, 7],
			["250 Gramm Magerquark", 0.79, 12],
			["500 Gramm Naturjoghurt", 1.99, 45],
			["250 Gramm Butter", 1.50, 60],
			["500 ml Buttermilch", 0.99, 14],

		]

	def initialize_products(self):
		for product in self.products:
			new_product = Product(name=product[0], price=product[1], durability=product[2])
			db.session.add(new_product)
		db.session.commit()
	
	def initialize_stations(self, amount):
		sellers = Seller.query.all()
		for _ in range(amount):
			# pick one seller between all
			seller = random.choice(sellers)
			# location_props generates an array with typical 
			location_props = self.faker.location_on_land()
			# location_props[2] means that you are checking the location name
			check_if_exists = Station.query.filter_by(location=location_props[2]).first()
			if check_if_exists:
				continue
			else:
				type = random.choice(['Verkaufsstelle', 'Automat', 'Verkaufsstelle + Automat'])
				new_station = Station(
					location = location_props[2], 
					longitude=location_props[0],
					latitude=location_props[1],
					type=type,
					description="Genereated with faker",
					seller_id=seller.seller_id
					)
				db.session.add(new_station)
				# make sure that seller won't get picked twice
				sellers.remove(seller)
		db.session.commit()


	def initialize_inventories(self, amount):
		amount_of_stations = (db.session.query(Station).order_by(-Station.station_id).first()).station_id
		for _ in range(amount):
			station = random.randint(1, amount_of_stations)
			product = random.randint(1, len(self.products))
			inventory_amount = randint(1, 20)
			check_if_exists = Inventory.query.filter_by(station_id=station, product_id=product) 
			if not check_if_exists:
				new_inventory = Inventory(station_id=station, product_id=product, current_amount=inventory_amount)
				db.session.add(new_inventory) 
			db.session.commit()

	
	def initialize_sellers(self, amount):
		for _ in range(amount):
			first_name = self.faker.first_name()
			last_name = self.faker.last_name()
			new_seller = Seller(first_name=first_name, last_name=last_name)
			db.session.add(new_seller)
		db.session.commit()

	
	def final_initialization(self):
		result = Seller.query.all()
		if not result:
			self.initialize_sellers(600)

		result = Station.query.all()
		if not result:
			self.initialize_stations(600)

		result = Product.query.all()
		if not result:
			self.initialize_products()

		result = Inventory.query.all()
		if not result:
			self.initialize_inventories(1000)
		
		return

db.create_all()