var backImg,backgr;
var player,player_running;
var ground,groundImg;

var foodGroup,bananaImg;
var obstaclesGroup,obstacleImg;

var gameOver;
var score=0;

function preload() {

backImg=loadImage("jungle.jpg");
player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImg=loadImage("banana.png");
obstacleImg=loadImage("stone.png");
gameImg=loadImage("gameOver.png");

  }

function setup() {
  createCanvas(800, 400);

backgr=createSprite(0,0,800,400);
backgr.addImage(backImg);
backgr.scale=1.5;
backgr.x=backgr.width/2;
backgr.velocityX=-4;
  
player=createSprite(100,340,20,50);
player.addAnimation("Running",player_running);
player.scale=0.1;
  
ground=createSprite(400,350,800,10);
ground.velocityX=-4;
ground.x=ground.width/2;
ground.visible=false;

gameOver=createSprite(400,200);
gameOver.addImage(gameImg);
gameOver.visible=false;

foodGroup=new Group();
obstaclesGroup=new Group();
  
score=0;
  
}

function draw() {
  background(225);
  

  if(backgr.x<0){
    backgr.x=backgr.width/2;
  }
    if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    if(ground.x<100){
      ground.x=ground.width/2;
  }
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score=score+2;
  }
switch(score){
case 10:player.scale=0.12;
      break;
case 20:player.scale=0.14;
      break;
case 30:player.scale=0.16;
      break;
case 40:player.scale=0.18;
      break;
      default:break;
  }

  player.velocityY=player.velocityY + 0.8;
  
  
  score = score + Math.round(getFrameRate()/60);
  if(keyDown("space")){
    player.velocityY=-12;
  }

  player.collide(ground);
  spawnFood();
  spawnObstacles();
  
  if(obstaclesGroup.isTouching(player)){
    player.scale=0.08;
    score=score-2;
  }
  
  if(obstaclesGroup.isTouching(player)){

  }
  
  drawSprites();
  
  stroke(0);
  textSize(20);
  fill("white");
  text("Score:" + score,500,500);
  
}
function spawnFood(){
  if(frameCount%80===0){
    var banana=createSprite(600,250,40,10);
    banana.y=random(120,200);
    banana.addImage(bananaImg);
    banana.scale=0.05;
    banana.velocityX=-5;
    banana.lifetime=300;
    player.depth=banana.depth+1;
    
    foodGroup.add(banana)
  }
}

function spawnObstacles(){
  if(frameCount%300===0){
    var obstacle=createSprite(800,350,10,40);
    obstacle.velocityX=-6;
    obstacle.addImage(obstacleImg);
    obstacle.scale=0.2;
    obstacle.lifetime=300;
    
    obstaclesGroup.add(obstacle);
  }
}