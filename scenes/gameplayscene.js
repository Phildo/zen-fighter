var GamePlayScene = function(game, canv)
{
  var p1;
  var p2;
  var offsetx;
  var offsety;
  var kcontroller;
  var aicontroller;
  var cascade;
  var cascadeTimer = 0;

  var getRandomCascade = function()
  {
    return {"x":Math.floor(Math.random()*16),"y":Math.floor(Math.random()*8),"started":false};
  }

  this.ready = function()
  {
    offsetx = 0;
    offsety = 130;
    p1 = new Player(canv);
    p1.x = 40;
    p2 = new Player(canv);
    p2.x = canv.canvas.width-40;
    p1.opponent = p2;
    p2.opponent = p1;
    kcontroller = new KeyController(p1);
    aicontroller = new AIController(p2);

    cascade = []
    for(var i = 0; i < 20; i++)
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
    if(cascadeTimer == 0)
    {
      canv.context.fillStyle = "rgba(0,0,0,0.25)";
      for(var i = 0; i < cascade.length; i++)
      {
        if(cascade[i].y == 0)
        {
          cascade[i].started = true;
          cascade[i].x = Math.floor(Math.random()*16);
        }
        if(cascade[i].started)
          canv.context.fillRect(cascade[i].x*40,cascade[i].y*40,40,40);
        cascade[i].y = (cascade[i].y+1)%8
      }
    }
    cascadeTimer = (cascadeTimer-1)%5;

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
