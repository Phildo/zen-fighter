var Game = function()
{
  var stage = new Stage();
  var scenes = [new NullScene(this, stage.drawCanv), new LoadingScene(this, stage.drawCanv), new GamePlayScene(this, stage.drawCanv)];
  var currentScene = 0;

  this.begin = function()
  {
    this.nextScene();
    tick();
  };

  var tick = function()
  {
    requestAnimFrame(tick,stage.dispCanv.canvas);
    //setTimeout(tick, 100);
    scenes[currentScene].tick();
    stage.draw();
  };

  this.nextScene = function()
  {
    scenes[currentScene].cleanup();
    stage.drawCanv.context.fillStyle = "#000000";
    stage.drawCanv.context.fillRect(0,0,stage.drawCanv.canvas.width,stage.drawCanv.canvas.height);
    currentScene++;
    scenes[currentScene].ready();
  };
};
