var torre,torreimg
var fantasma,fantasmaimg
var state;
var puertaimg
var balconimg
var gruposfalsos
var grupoperder
var grupoventanas
var grupobalcon

function preload(){
torreimg=loadImage("tower.png");
fantasmaimg=loadImage("ghost-standing.png") 
puertaimg=loadImage("door.png")
balconimg=loadImage("climber.png")
}

function setup(){
 createCanvas(400,600);
torre=createSprite(200,300,20,20);
torre.addImage(torreimg)
torre.scale=0.7
fantasma=createSprite(200,450,20,20);
fantasma.addImage(fantasmaimg)  
fantasma.scale=0.4
state="start";
gruposfalsos=new Group();
grupoperder=new Group();
grupoventana=new Group();
grupobalcon=new Group();
}

function draw(){
background(0);
  drawSprites()
  if(state==="start"&&keyDown("space")){
  state="play";
  }
  if(state==="play"){
    torre.velocityY=5;
    puertas()
     fantasma.velocityY=fantasma.velocityY+0.8
  if(keyDown("space")){
    fantasma.velocityY=-6
    
   
  }
    if(fantasma.isTouching(gruposfalsos)){
      fantasma.velocityY=0;
    }
   if(keyDown("left_arrow")){
     fantasma.x=fantasma.x-5;
     
   }
   if(keyDown("right_arrow")){
     fantasma.x=fantasma.x+5;
     
   } 
    if(fantasma.isTouching(grupoperder)) {
      state="end"
    }
  }
   if(state==="end"){
     torre.velocityY=0;
     grupoventana.setVelocityYEach(0)
     grupobalcon.setVelocityYEach(0)
     gruposfalsos.setVelocityYEach(0)
     grupoperder.setVelocityYEach(0)
     fantasma.velocityY=3
    fill("black")
    textSize(30)
    text("Gameover",150,300)
     text("space",150,350)
    if(keyDown("space")){
      restart();
    } 
   }
if(torre.y>400){
  torre.y=torre.height/4
}

}


function puertas(){
  if(frameCount%150===0){
    var puerta=createSprite(random(10,350),0.20,20);
    puerta.addImage(puertaimg);
    puerta.velocityY=5
    puerta.scale=0.7 
    var balcon=createSprite(puerta.x,50,20,20)
    balcon.addImage(balconimg)
    balcon.velocityY=5
    balcon.scale=0.6
    var spritefake=createSprite(puerta.x,40,60,10)
    spritefake.velocityY=5
    gruposfalsos.add(spritefake);
   var spritefake2=createSprite(puerta.x,60,60,10)
   spritefake2.velocityY=5;
    grupoperder.add(spritefake2);
    grupoventana.add(puerta)
    grupobalcon.add(balcon)
    spritefake.visible=false
    spritefake2.visible=false
    
}
}
function restart(){
  state="start"
  grupobalcon.destroyEach();
  grupoventana.destroyEach();
  gruposfalsos.destroyEach();
  grupoperder.destroyEach();
  
}