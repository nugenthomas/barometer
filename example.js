
var nyc;
var wind=0;
var clouds;
var cloudSize = 20;

var randX=0;
var randY=0;

var sunrise;
var sunset;

var windPulse = "fadein";

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
  clouds = nyc.clouds.all;

  //take the window width and divide by the number of clouds so I can see how big I should make my shapes
  cloudSize = 400/clouds;

  //turn my sunrise and sunset numbers into timestamps
  sunset = new Date(nyc.sys.sunset*1000);
  sunrise = new Date(nyc.sys.sunrise*1000);


}

function draw() {

	background(0,0,random(wind-10,wind+10));

	//Use the wind speed to change the background color
	//the faster the wind, the faster it will fade in and out
		 if (windPulse == "fadein"){
		 	wind += nyc.wind.speed;
		 } else if (windPulse == "fadeout"){
		 	wind -= nyc.wind.speed;
		 }

		 //switch between fading in and out when the wind variable 
		 //reaches the color limits of 0 or 255
		if(wind > 255){
			windPulse = "fadeout";
		} else if(wind < 0){
			windPulse = "fadein";
		}

	
		//draw ellipses using the cloud number
		for(var c = 0;c < clouds; c++){
				fill("white");
				ellipse(random(0,400),random(0,400),cloudSize,cloudSize);
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
	var countdown = Date.now()-nyc.sys.sunset*1000;
	text(-countdown, 250,325);

}