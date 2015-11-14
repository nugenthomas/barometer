var city;
var sunrise;
var sunset;
var temperature;
var wind=0;
var windPulse = "fadein";
var longitude;
var latitude;
var pressure;
var humidity;
var icon;
var mintemp;
var maxtemp;


function preload() {
  
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=Los Angeles,CA'+
   '&APPID=f02124924447c73bc1d1626b1bee5f45';
  city = loadJSON(url);

  //load images
  sunsymbol = loadImage ("images/sun.png");
  moonsymbol = loadImage ("images/moon.png");
  icon = loadImage ("images/icon.png");

}

function setup() {
  
  createCanvas(400,400);

  sunrise = new Date(city.sys.sunrise*1000);
  sunset = new Date(city.sys.sunset*1000);
  temperature = Math.round(city.main.temp-273.15);
  longitude = city.coord.lon;
  latitude = city.coord.lat;
  pressure = city.main.pressure;
  humidity = city.main.humidity;
  mintemp = Math.round(city.main.temp_min-273.15);
  maxtemp = Math.round(city.main.temp_max-273.15);
}

function draw() {

	background(150,200,random(wind-10,wind+10));

		if (windPulse == "fadein"){
		 	wind += city.wind.speed;
		 } else if (windPulse == "fadeout"){
		 	wind -= city.wind.speed;
		 }

		if(wind > 255){
			windPulse = "fadeout";
		} else if(wind < 0){
			windPulse = "fadein";
		}

	textFont("karla");
	textSize(16);
	fill("Black")
	text("Los Angeles, California.",3,22);

	textSize(18);
	textFont("karla");
	textAlign(LEFT);

	//coordinate
	textSize(16);
	text(-longitude, 3,39);
	text(latitude, 100,39);
	textSize(12.5);
	text("°W",48,39);
	text("°N",143,39);
	//sunrise
	textSize(18)
	fill("#FCD262");
	noStroke();
	rect(0,50,400,40);
	fill("#FFFFFF");
	text(sunrise.toLocaleTimeString(),18,77);
	image(sunsymbol,355,47, sunsymbol.width/13, sunsymbol.height/13);

	//sunset
	fill("#24291B");
	rect(0,300,400,40);
	fill("white");
	text(sunset.toLocaleTimeString(),18,327);
	image(moonsymbol, 361,302, moonsymbol.width/28, moonsymbol.height/28);

	//temperature
	textSize(13);
	fill("black");
	textStyle(BOLD);
	text("Current Temperature:",19,120);
	text("Pressure:",19,265);
	text("Humidity:",19, 290);
	//text("Max/Min Temp:", 19, 180);
	text(humidity, 87,290);
	text(pressure, 87,265);

	textSize(85);
	fill("black");
	text(temperature,43,220);

	textSize(27);
	textStyle(BOLD);
	text("°C",135,172);

	//max and min temp
	textSize(16);
	text(maxtemp, 257, 173);
	text(mintemp, 203,220);

	image(icon, 210,152,icon.width/11, icon.height/11);











}