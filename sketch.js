var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var position=0;
var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;

var santa,santaImage;

function preload(){
  santaImage=loadImage("santa.png");
  track=loadImage("images/track.jpg");
  car2_img = loadImage("boyHappy.png");
  car1_img = loadImage("boySad.png");
  car4_img = loadImage("girlHappy.png");
  car3_img = loadImage("girlSad.png");
  
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();
  gift1=new Gift();
  santa=createSprite(200,800,50,50);
  santa.addImage(santaImage);
  santa.scale=0.05;

  feed = createButton("GIVE THE GIFTS");
  feed.position(1100,80);
  feed.mousePressed(giveGifts);
  
  add = createButton("ADD GIFTS");
  add.position(1100,40);
  add.mousePressed(addGift);

 
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
   
  }
  gift1.display();

}
function addGift(){
  position++
  database.ref('/').update({
   gift : position
 })

}
function giveGifts(){
 if(position == 0)
 {
   gift1.updateGiftStock(0);
   car1.addImage(car2_img);
   car3.addImage(car4_img);
 }
 else
 {
   gift1.updateGiftStock(position-1)
   car1.addImage(car1_img);
   car3.addImage(car3_img);
 }
 
 database.ref('/').update({
   gift : gift1.getGiftStock(),
 
 })
}