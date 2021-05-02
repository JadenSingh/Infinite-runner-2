var man, man_running, man_jump;
var back,backImage, ground, groundImage;
var invis;
var cactus1,cactus2,tumble, snake, water,waterImage,waterGroup, obstacle, obstacleGroup;
var START=0;
var PLAY=1;
var END=2;
var gamestate=START;
var playbutton, playbuttonImage;
var gameOver, gameOverImage, menu, menuImage;
var score=0, waterbottles=0;
function preload(){
  
  man_running=loadAnimation("running3.png","running2.png","running1.png")
  man_jump=loadAnimation("jump.png");
  groundImage=loadImage("sand.png");
  backImage=loadImage("back.png");
  cactus1=loadImage("cactus1.png");
  cactus2=loadImage("cactus2.png");
  waterImage=loadImage("water.png");
  snake=loadImage("snake.png");
  tumble=loadImage("tumble.png");
  playbuttonImage=loadImage("Playbutton.png");
  gameOverImage=loadImage("gameO.jpeg");
  menuImage=loadImage("menu1.png");
}

function setup(){
  createCanvas(700,500);
  
  back=createSprite(350,250);
  back.addImage(backImage);
  back.scale=0.52;
  
  ground=createSprite(400,430);
  ground.addImage(groundImage);
  ground.scale=1.3;
  ground.velocityX=-4;
  
  man=createSprite(70,360);
  man.addAnimation("running", man_running);
  man.addAnimation("jump", man_jump);
  man.scale=0.12;
  man.setCollider("circle",0,0,120);

  
  
  invis=createSprite(100,430,300,5);
  invis.visible=false;
  
  obstacleGroup= new Group();
  waterGroup= new Group();
  
  playbutton=createSprite(335,400);
  playbutton.addImage(playbuttonImage);
  playbutton.scale=1.5;
  
  gameOver=createSprite(340,180);
  gameOver.addImage(gameOverImage);
  gameOver.scale=2;
  
  menu=createSprite(340,370);
  menu.addImage(menuImage);
  menu.scale=0.4;
  
}

function draw(){
  background("black");
  
  
  if(gamestate===START){
    man.visible=false;
    ground.visible=false;
    back.visible=false;
    gameOver.visible=false;
    menu.visible=false;
    fill("white");
    textSize(40);
    stroke("red");
    text("DESERT RUNNER",160,70);
    if(mousePressedOver(playbutton)){
      
      gamestate=PLAY;
      
    }
  }
  if(gamestate===PLAY){
  
    spawnObstacles();
    spawnWater();
    playbutton.visible=false;
    menu.visible=false;
    back.visible=true;
    ground.visible=true;
    man.visible=true;
    gameOver.visible=false;
    
    if(waterGroup.isTouching(man)){
      waterGroup.destroyEach();
      waterbottles++;
    }
    if(frameCount%5===0){
      score++;
      
    }
    
    if (ground.x < 200){
      ground.x = ground.width/2; 
    }
  man.velocityY=man.velocityY+0.8
  
  man.collide(invis);
  
  if(keyDown("space")&& man.y>=395){
    man.velocityY=-15

    
  }
    if(man.y<390){
      
      man.changeAnimation("jump", man_jump);
    } else {
      
      man.changeAnimation("running", man_running);
    }
    if(obstacleGroup.isTouching(man)){
      gamestate=END;
      
      man.x= 70;
      man.y= 360;
    }
  }
  if(gamestate===END){
    man.visible=false;
    ground.visible=false;
    back.visible=false;
    
    obstacleGroup.destroyEach();
    waterGroup.destroyEach();
    gameOver.visible=true;
    menu.visible=true;
    score=0;
    waterbottles=0;
    if(mousePressedOver(menu)){
      
      gamestate=START;
    }
    
  }
  
    
   
    console.log(gamestate);
  
  
  
  drawSprites();
  if(gamestate===PLAY){
    textSize(30);
    fill("yellow");
    stroke("black");
    text("Score: "+score,20,50);
    textSize(30);
    fill("yellow");
    stroke("black");
    text("Water Bottles: "+waterbottles,20,100);
    
    
  }
}

function spawnObstacles(){
  if (frameCount % 100 === 0){
   var obstacle = createSprite(770,380);
     obstacle.velocityX = -5;
     obstacleGroup.add(obstacle);
     obstacle.setCollider("circle",0,0,150);
    
     var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(cactus1);
        obstacle.scale=0.2;
              break;
      case 2: obstacle.addImage(cactus2);
        obstacle.scale=0.3;
              break;
      case 3: obstacle.addImage(snake);
        obstacle.scale=0.2;
              break;
      case 4: obstacle.addImage(tumble);
        obstacle.scale=0.3;
              break;
              default: break;
    }
  }
  
  
}
function spawnWater(){
  if (frameCount % 160 === 0){
   var water = createSprite(770,380);
    water.addImage(waterImage);
    water.scale=0.05;
     water.velocityX = -5;
     waterGroup.add(water);
    water.y=Math.round(random(260,280));
  }
}