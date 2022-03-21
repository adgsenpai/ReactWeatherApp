#ADGSTUDIOS - server.py

from flask import Flask,render_template,send_from_directory,request
import weathermod
app = Flask(__name__,template_folder='./pages')

# allows for files to be refreshed in server
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route('/')
def home():
  return render_template('index.html')

@app.route('/api/v1/getweatherinfo',methods=['POST'])
def get_weatherinfo():
  if request.data:
      data = request.get_json()
      lat = data['lat']
      lon = data['long']
                                                     # please dont abuse my API key :-(
      ow = weathermod.OpenWeatherAPI(lat,lon,apikey='366139733cc012b529ea777f0a38fd5d')
      return ow.get_min_weatherinfo()

if __name__ == "__main__":
  app.run(host="0.0.0.0",port=5000)