var LoadingScene = function(game, canv)
{
  var tickr;
  var pad;
  var progress;
  var oldw;
  var neww;
  var tickw;
  this.ready = function()
  {
    tickr = 0.005;
    pad = 40;
    progress = 0;
    oldw = 0;
    neww = 0;
    tickw = (canv.canvas.width-(2*pad))*tickr;
    canv.context.fillStyle = "#000000";
    canv.context.font = "20px vg_font";
    canv.context.fillText(".",0,0);
  };

  this.tick = function()
  {
    progress += 0.005;
    oldw = neww;
    neww = progress*(canv.canvas.width-(2*pad));
    canv.context.fillStyle = "#000000";
    canv.context.fillRect(pad+oldw,canv.canvas.height/2,tickw,2);
    canv.context.strokeRect(pad-1,(canv.canvas.height/2)-1,canv.canvas.width-(2*pad)+2,3);
    if(progress >= 1.0) game.nextScene();
  };

  this.cleanup = function()
  {
    progress = 0;
  };
};
