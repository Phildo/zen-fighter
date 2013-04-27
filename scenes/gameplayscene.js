var GamePlayScene = function(game, canv)
{
  var p1;
  var p2;
  var offsetx;
  var offsety;
  var kcontroller;
  var aicontroller;
  var cascade;
  var cascadeIndex = 0;

  var getRandomCascade = function()
  {
    return {"x":Math.floor(Math.random()*16),"y":Math.floor(Math.random()*8)};
  }

  this.ready = function()
  {
    offsetx = 0;
    offsety = 120;
    p1 = new Player(canv);
    p1.x = 40;
    p2 = new Player(canv);
    p2.x = canv.canvas.width-40;
    p1.opponent = p2;
    p2.opponent = p1;
    kcontroller = new KeyController(p1);
    aicontroller = new AIController(p2);

    cascade = []
    for(var i = 0; i < 40; i++)
      cascade[i] = getRandomCascade();
  };

  this.tick = function()
  {
    canv.context.fillStyle = "#000000";

    //ground
    canv.context.strokeStyle = "#000000";
    canv.context.beginPath();
    canv.context.moveTo(0,canv.canvas.height-offsety);
    canv.context.lineTo(canv.canvas.width,canv.canvas.height-offsety);
    canv.context.stroke();

    //cascade
    canv.context.fillStyle = "rgba(0,0,0,0.05)";
    if(cascade[cascadeIndex].y == 0)
      cascade[cascadeIndex].x = Math.floor(Math.random()*16);
    canv.context.fillRect(cascade[cascadeIndex].x*40,cascade[cascadeIndex].y*40,40,40);
    cascade[cascadeIndex].y = (cascade[cascadeIndex].y+1)%8
    cascadeIndex = (cascadeIndex+1)%40;

    kcontroller.tick();
    aicontroller.tick();

    p1.tick();
    p2.tick();

    p1.draw(offsetx, offsety);
    p2.draw(offsetx, offsety);
  };

  this.cleanup = function()
  {

  };
};
