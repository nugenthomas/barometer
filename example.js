
var nyc;
var changeColor=0;
var clouds;
var cloudSize;

var sunrise;
var sunset;

function preload() {
	//First I set up my API call
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=New York,US'+
   '&APPID=7bbbb47522848e8b9c26ba35c226c734';

  //then I load the JSON
  nyc = loadJSON(url);

}

function setup() {
  
  createCanvas(400,400);

  //Save the number of clouds and divide by two so the number isn't too high
  clouds = nyc.clouds.all/2;

  //take the window width and divide by the number of clouds so I can see how big I should make my squares
  cloudSize = 400/clouds;

  //turn my sunrise and sunset numbers into timestamps
  sunset = new Date(nyc.sys.sunset*1000);
  sunrise = new Date(nyc.sys.sunrise*1000);

}

function draw() {

	background("white");

	//Use the wind speed to change the color
	//the faster the wind, the faster it will change color
	changeColor += nyc.wind.speed;

		fill("lightblue");

		//create a grid based on the number of clouds
		for(var x = 0;x < clouds; x++){
			for(var y = 0;y< clouds;y++){
				fill(0,0,random(changeColor-10,changeColor+10));
				rect(x*cloudSize,y*cloudSize,cloudSize,cloudSize);
			}
		}

	textSize(22);
	textAlign(LEFT);

	//sunrise
	fill("yellow");
	rect(0,50,400,40);
	fill("black");
	text(sunrise.toLocaleTimeString(), 22,75);

	//sunset
	fill("black");
	rect(0,300,400,40);
	fill("white");
	text(sunset.toLocaleTimeString(), 22,325);

	//Or I could create a countdown clock that counts down the number of seconds:
	var now = new Date();
	var countdown = now.getTime()-sunrise.getTime();
	text(countdown, 250,325);

}