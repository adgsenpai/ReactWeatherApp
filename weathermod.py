import requests
class OpenWeatherAPI:
    def __init__(self, lat,lon,apikey):
        self.lat = lat
        self.lon = lon
        self.apikey = apikey

    def get_weatherinfo(self):
        url = 'http://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}&units=metric'.format(self.lat,self.lon,self.apikey)
        r = requests.get(url)
        return r.json()
    
    def get_min_weatherinfo(self):
        data = self.get_weatherinfo()
        return {'temp':data['main']['temp'],'weathertype':data['weather'][0]['main'],'cityname':data['name']}