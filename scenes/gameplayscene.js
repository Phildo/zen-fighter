var GamePlayScene = function(game, canv)
{
  var p1;
  var p2;
  var offsetx;
  var offsety;
  var kcontroller;
  var aicontroller;
  this.ready = function()
  {
    offsetx = 0;
    offsety = 130;
    p1 = new Player(canv);
    p1.x = 40;
    p2 = new Player(canv);
    p2.x = canv.canvas.width-40;
    kcontroller = new KeyController(p1);
    aicontroller = new AIController(p2);
  };

  this.tick = function()
  {
    canv.context.fillStyle = "#000000";
    canv.context.strokeStyle = "#000000";
    canv.context.beginPath();
    canv.context.moveTo(0,canv.canvas.height-offsety);
    canv.context.lineTo(canv.canvas.width,canv.canvas.height-offsety);
    canv.context.stroke();

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
