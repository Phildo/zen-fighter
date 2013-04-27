var AIController = function(player)
{
  var x = 0;

  this.tick = function()
  {
    player.move(x);
  };
};
