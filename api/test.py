import requests

BASE = "http://127.0.0.1:5000/"

response = requests.put(BASE + "video/3", {"name": "Test 3", "likes": 0, "views": 8273})
print(response.json())

