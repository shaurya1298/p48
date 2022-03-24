var char, charImg
var obstacle,obstacleGroup;
var obstacle1,obstacle2,obstacle3;
var ground,groundImg
var gameOverImg;
var gameOver
var gameState='play'
var score =0;
var restartImg
var restart
var jump
var die
var checkPoint

function preload()
{
charImg = loadImage("character.png.png");
obstacle1 = loadImage("wave 1.png")
obstacle2 = loadImage("wave 2.png")
obstacle3 = loadImage("wave 3.png")
groundImg = loadImage("newGround.png")
gameOverImg = loadImage("game over.jpg")
restartImg = loadImage("newrestart.png")
jump = loadSound("jump.mp3")
die = loadSound("die.mp3")
checkPoint = loadSound("checkPoint.mp3")

}


function setup()

{
    createCanvas(600, 500);
    char = createSprite(70,350,20,50)
    char.addImage(charImg)
    char.scale=0.2;
    char.debug=false;

    ground = createSprite(0,450,width,5)
    ground.addImage(groundImg)
    ground.x = ground.width/2
    ground.velocityX=-10

     gameOver = createSprite(300,250,50,50)
     gameOver.addImage(gameOverImg)
     gameOver.scale=0.2

     restart = createSprite(300,350,50,50)
     restart.addImage(restartImg)
     restart.scale=0.2
      

   obstacleGroup= new Group();
    

    

}
function draw()
{
background(0)  

text(mouseX +" " +mouseY,mouseX,mouseY)
text("Score: "+ score, 500,50);
  


     if(gameState=="play")
     {
        score = score + Math.round(getFrameRate()/60);
        char.visible=true;
        ground.visible=true;
         gameOver.visible=false
         restart.visible=false
        if(keyDown("space")){
            char.velocityX=0
           char.velocityY=-19
            }
            if(keyDown("space")) {
                jump.play();
              }
            char.velocityY = char.velocityY + 0.8
            ground.velocityX=-10
            if (ground.x < 0){
                ground.x = ground.width/4;
              }
              char.collide(ground)
              if(char.isTouching(obstacleGroup)){
                checkPoint.play();
                gameState="end";
               
                
                }
                spawnObstacles()
     }
     else if(gameState=="end")
     {
        char.visible=false
        obstacleGroup.destroyEach()
        ground.visible=false;
        gameOver.visible= true
        restart.visible=true
        if(mousePressedOver(restart))
        {
            jump.play();
            gameState="play"
            gameOver.visible = false;
            restart.visible = false;
            
            obstacleGroup.destroyEach();
            score=0;
        }
     }


drawSprites()
}

function spawnObstacles()
{

    if(frameCount % 60 === 0) {
        var obstacle = createSprite(600,370,10,40);
        obstacle.debug=false;
        obstacle.setCollider("rectangle",0,0,10,20)
        //obstacle.debug = true;
        obstacle.velocityX =-6
        obstacle.scale=0.1;
        //generate random obstacles
        var rand = Math.round(random(1,3));
        switch(rand) {
          case 1: obstacle.addImage(obstacle1);
                  break;
          case 2: obstacle.addImage(obstacle2);
                  break;
          case 3: obstacle.addImage(obstacle3);
                  break;
}

obstacleGroup.add(obstacle)
 }
}

