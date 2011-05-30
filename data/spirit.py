import csv
import urllib
import json
import time

# read spirit csv file, geocode each station and print to geojson file
f = open("spirit_sites_March_9_2011.csv")
rdr = csv.reader(f, delimiter=',', quotechar='"')

# file indexes
numIdx = 0
licenseeIdx = 1
siteNameIdx = 2
addressIdx = 3
cityIdx = 4
stateIdx = 5
zipIdx = 6

def geocode(address, city, state, zip):
    time.sleep(1)
    #proxies = {'http': 'http://bcpxy.nycnet:8080'}
    proxies = {}

    addressString = address + " " + city + ", " + state + " " + zip
    params = urllib.urlencode({'address': addressString, 'sensor': 'false'})
    f = urllib.urlopen("http://maps.googleapis.com/maps/api/geocode/json?%s" % params, proxies=proxies)
    jsonResponse = f.read()
    response = json.loads(jsonResponse)
    
    status = response['status']
    if status == 'OK' :
        numResults = len(response['results'])
        if numResults > 1 :
            print "ERROR: multiple results found for " + addressString
        result = response['results'][0]
        formattedAddress = result['formatted_address']
        lat = result['geometry']['location']['lat']
        lng = result['geometry']['location']['lng']
        return {'formattedAddress':formattedAddress, 'lat':lat, 'lng':lng}
    else :
        print "ERROR: " + status + " for " + addressString
    
rowNum = 0

geoJson = {'type':'FeatureCollection','features':[]}

for line in rdr :
    # skip header row
    if rowNum == 0 :
        rowNum += 1
        continue
        
    if len(line) > numIdx :
        num = line[numIdx]

    if len(line) > licenseeIdx :
        licensee = line[licenseeIdx]
        
    if len(line) > siteNameIdx :
        siteName = line[siteNameIdx]
        
    if len(line) > addressIdx :
        address = line[addressIdx]
        
    if len(line) > cityIdx :
        city = line[cityIdx]

    if len(line) > stateIdx :
        state = line[stateIdx]
    
    if len(line) > zipIdx :
        zip = line[zipIdx]
    
    geocodeResult = geocode(address, city, state, zip)
    spiritStation = {'type':'Feature'}
    spiritStation['geometry'] = {'type':'Point', 'coordinates':[geocodeResult['lng'], geocodeResult['lat']]}
    spiritStation['properties'] = {'num':num, 'licensee':licensee, 'siteName':siteName, 'address':address, 'city':city, 'state':state, 'zip':zip, 'formattedAddress':geocodeResult['formattedAddress']}
    geoJson['features'].append(spiritStation)
        
    rowNum += 1

actualJson = json.dumps(geoJson)
geoJsonFile = open('spirit.geojson','w')
geoJsonFile.write(actualJson)