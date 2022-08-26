
import requests
url = "https://www.foodandco.fi/modules/json/json/Index?costNumber=3067&language=en"

r = requests.get(url)
arr =  r.json()['MenusForDays']
for d in arr:
    print( d['Date'])
    menus = d['SetMenus']
    for m in menus:
        for c in m['Components']:
            print (c)
    print()