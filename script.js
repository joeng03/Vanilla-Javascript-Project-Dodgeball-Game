/*background: linear-gradient(to right,pink,blue,violet,black);
/-webkit-text-fill-color: transparent;
    -webkit-background-clip: text;*/
var object=document.getElementById('object')
const color=['red','orange','yellow','green','blue','purple','black','brown','pink']
/*document.getElementById('btn').onclick=function(){
  CreateElement()

}*/

const width=window.innerWidth;
const height=window.innerHeight;
var direction=[-200,30];
object.onmouseover= function(event){
  let shiftX = event.clientX - object.getBoundingClientRect().left;
  let shiftY = event.clientY - object.getBoundingClientRect().top;
    object.style.position='absolute';
    object.style.zIndex=5;
    document.body.append(object);
  function moveAt(pageX, pageY) {
    object.style.left = pageX - shiftX+ 'px';
    object.style.top = pageY - shiftY+ 'px';
  }
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  /*object.onmouseout =function() {
    document.removeEventListener('mousemove', onMouseMove);
    object.onmouseup = null;
  }*/
  }
  var x_position=900;
  var y_position=300;
  const size=60;
  var ball=document.createElement('DIV');
  ball.style.backgroundColor=color[getRandomNumber()]
  ball.style.position='absolute';
  ball.style.borderRadius='50%';
  ball.style.width=size/2+'px';
  ball.style.height=size/2+'px';
  ball.style.left=x_position+'px';
  ball.style.top=y_position+'px';
  document.body.appendChild(ball);
  move_collide(ball,direction,duration=1000);
function move_by_vector(element,direction,duration=1000) {
   var elStyle = window.getComputedStyle(element);
   var x_isNegated =(direction[0]<0)?true:false;
   var y_isNegated =(direction[1]<0)?true:false;
   var x_coord= elStyle.getPropertyValue('left').replace("px", "");
   var y_coord= elStyle.getPropertyValue('top').replace("px", "");
   var x_destination = Number(x_coord) + direction[0];
   var y_destination = Number(y_coord) + direction[1];
   var x_frameDistance = direction[0]/ (duration / 10);
   var y_frameDistance = direction[1] / (duration / 10);
   var x_finished=false;
   var y_finished=false;
   function moveAFrame() {
      elStyle = window.getComputedStyle(element);
      if(!x_finished){
      x_coord = elStyle.getPropertyValue('left').replace("px", "");
      var x_newLocation = Number(x_coord) + x_frameDistance;
      var x_beyondDestination = ( (!x_isNegated && x_newLocation>=x_destination) || (x_isNegated && x_newLocation<=x_destination) );}
      
      if(!y_finished){
      y_coord = elStyle.getPropertyValue('top').replace("px", "");
      var y_newLocation = Number(y_coord) + y_frameDistance;
      var y_beyondDestination = ( (!y_isNegated && y_newLocation>=y_destination) || (y_isNegated && y_newLocation<=y_destination) );}

      if (x_beyondDestination) {
         element.style['left'] = x_destination + "px";
         x_finished=true;
      }
      else {
         element.style['left'] = x_newLocation + "px";
      }
      if (y_beyondDestination) {
         element.style['top'] = y_destination + "px";
         x_finished=true;
      }
      else {
         element.style['top'] = y_newLocation + "px";
      }
      if(x_finished && y_finished){
        clearInterval(movingFrames);
      }
   }
   var movingFrames = setInterval(moveAFrame, 10);
}
function move(element,direction,duration=1000){
   var elStyle = window.getComputedStyle(element);
   var x_coord= elStyle.getPropertyValue('left').replace("px", "");
   var y_coord= elStyle.getPropertyValue('top').replace("px", "");
   var x_frameDistance = direction[0]/ (duration / 10);
   var y_frameDistance = direction[1] / (duration / 10);
   function moveAFrame() {
      elStyle = window.getComputedStyle(element);
      x_coord = elStyle.getPropertyValue('left').replace("px",""); 
      var x_newLocation = Number(x_coord) + x_frameDistance;
      y_coord = elStyle.getPropertyValue('top').replace("px", "");
      var y_newLocation = Number(y_coord) + y_frameDistance;
      if(x_newLocation<=0||x_newLocation>=width){
        x_frameDistance*=-1;
    }
      else if(y_newLocation<=0||y_newLocation>=height){
          y_frameDistance*=-1;
      }
      else{
        element.style['left'] = x_newLocation + "px";
        element.style['top'] = y_newLocation + "px";
      }
      }

  var movingFrames = setInterval(moveAFrame, 10);  
  }
  
function move_collide(element,direction,duration=1000){
   var elStyle = window.getComputedStyle(element);
   var x_coord= elStyle.getPropertyValue('left').replace("px", "");
   var y_coord= elStyle.getPropertyValue('top').replace("px", "");
   var x_frameDistance = direction[0]/ (duration / 10);
   var y_frameDistance = direction[1] / (duration / 10);
   function moveAFrame() {
      elStyle = window.getComputedStyle(element);
      x_coord = elStyle.getPropertyValue('left').replace("px",""); 
      var x_newLocation = Number(x_coord) + x_frameDistance;
      
      y_coord = elStyle.getPropertyValue('top').replace("px", "");
      var y_newLocation = Number(y_coord) + y_frameDistance;
      
      loc=object.getBoundingClientRect()
      if(x_newLocation>=loc.left&&x_newLocation<=loc.right&&y_newLocation<=loc.bottom&&y_newLocation>=loc.top){
        //element.parentNode.removeChild(element);
        window.location.href='over.html';
      }
      else if(x_newLocation<=0||x_newLocation>=width){
        element.parentNode.removeChild(element);
        x_position=900;
        y_position=(height)*Math.random();
        direction[0]=direction[0]*1.2;
        direction[1]=direction[1]*1.2*rand();
        var ball=document.createElement('DIV');
        ball.style.backgroundColor=color[getRandomNumber()]
        ball.style.position='absolute';
        ball.style.borderRadius='50%';
        ball.style.width=size/2+'px';
        ball.style.height=size/2+'px';
        ball.style.left=x_position+'px';
        ball.style.top=y_position+'px';
        document.body.appendChild(ball);
        clearInterval(movingFrames);
        move_collide(ball,direction,duration=1000);
      }
      else if(y_newLocation<=0||y_newLocation>=height){
          y_frameDistance*=-1;
      }
      else{
        element.style['left'] = x_newLocation + "px";
        element.style['top'] = y_newLocation + "px";
      }
      }
  
  var movingFrames = setInterval(moveAFrame, 10);
    }



function is_border(elem){
  elem_style=window.getComputedStyle(elem);
  if(elem_style.getPropertyValue('left')<=0||elem_style.getPropertyValue('left')>=width){
    return 1;
  }
  else if(elem_style.getPropertyValue('top')<=0||elem_style.getPropertyValue('top')>=height){
    return 2;
  }
  else return 0;
}


function getRandomNumber(){
  return Math.floor(Math.random()*color.length);
}
function rand(){
  return Math.random()>=0.5?1:-1;
}

function game(){

}