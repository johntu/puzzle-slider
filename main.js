document.write("hello");

var t = 0;
var touchStart;
var touchX = null;
var debug = "";
var step = 40;

var touchOffset;

var w = window.innerWidth;
var h = window.innerHeight;
for (var i=0; i<w/2; i++) {
  lineAt(w/2+i, h/2);
  lineAt(w/2-i, h/2);
  i += step*2;
}

function lineAt(x,y) {
  var e = document.createElement("dev");
  e.className = "line";
  e.style.left = x+"px";
  e.style.top = y+"px";
  document.body.appendChild(e);
}

var ballEl = document.getElementById("ball");

var ball = {
  pos: {x:w/2,y:0},
  vel: {x:0,y:0},
}

var target = {x:0,y:0};

function setBallPos(a) {
  ballEl.style.transform = "translate("+window.innerWidth/2+"px,"+(window.innerHeight/2)+"px) rotate("+a+"rad)";
}

function getAngle(p) {
  return Math.atan((p.y-w/2)/(p.x-h/2));
}

timer(update, fixedUpdate);

input.onTouchStart(p => {
  touchX = target.x;
  touchStart = p.x-target.x;
  var a = getAngle(p);
  touchOffset = a;
  // visualize handle point
})

input.onTouchMove(p => {
  debug = p.x;
  t = p.x/5;
  //setBallPos(p.x,p.y);
  //ball.pos.x = p.x;
  touchX = p.x-touchStart;
})

input.onTouchEnd(p => {
  //target.x = window.innerWidth;
  touchX = null;
})

var obj = {
  numberOfSteps: 12,
  angle: 0,
}

function update(d) {
  setBallPos(ball.pos.x);
}

function fixedUpdate(d) {
  ball.vel.x += (target.x - ball.pos.x)*30*d - 20*ball.vel.x*d;
  if (touchX != null)
    ball.vel.x += (touchX - ball.pos.x)*20*d;
  ball.pos.x += ball.vel.x*d;
  
  if (ball.pos.x > target.x+step)
    target.x += step*2;
  if (ball.pos.x < target.x-step)
    target.x -= step*2;
}