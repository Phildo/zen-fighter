var AIController = function(player)
{
  var x = 0;

  this.tick = function()
  {
    if     (player.x < player.opponent.x) x = 1;
    else if(player.x > player.opponent.x) x = -1;
    else                                  x = 0;

    player.move(x);
  };
};
