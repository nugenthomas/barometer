var city;

function preload() {
  
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=New York,NY'+
   '&APPID=f02124924447c73bc1d1626b1bee5f45';
  city = loadJSON(url);

}

function setup() {
  
  createCanvas(400,400);


}

function draw() {


}