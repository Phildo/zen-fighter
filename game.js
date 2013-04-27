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
    scenes[currentScene].tick();
    stage.draw();
  };

  this.nextScene = function()
  {
    scenes[currentScene].cleanup();
    currentScene++;
    scenes[currentScene].ready();
  };
};
