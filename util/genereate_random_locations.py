import codecs
import json

from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="MyApp")


country = pyc.get_shape("Finland")
points = pyc.geoloc_generation(country, 1000, "Finland")

arr = []
for p in points:
    latitude = str(p["geometry"]["coordinates"][1])
    longitude = str(p["geometry"]["coordinates"][0])
    coordinates = ""+latitude+" , "+longitude
    location = geolocator.reverse(coordinates)
    address = location.raw
    city = address.get('address')
    dict = {}
    try:
        dict["city"] = city['town']
        dict["latitude"] = latitude
        dict["longitude"] = longitude
        arr.append(dict)
    except KeyError:
        try:
            dict["city"] = city['city']
            dict["latitude"] = latitude
            dict["longitude"] = longitude
            arr.append(dict)
        except KeyError:
            print('no city')

print(arr)
jsonstr = json.dumps(arr, ensure_ascii=False)
with open("locations.json", "w") as outfile:
    outfile.write(jsonstr)
