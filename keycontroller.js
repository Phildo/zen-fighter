var KeyController = function(player)
{
  var x = 0;
  function downKey(e)
  {
    alert(e.keyCode);
    switch(e.keyCode)
    {
      case 37: //a
        x = -0.3;
        break;
      case 39: //d
        x = 0.3;
        break;
      case 32: //space
        break;
    }
  };

  function upKey(e)
  {
    switch(e.keyCode)
    {
      case 37: //a
        x = 0.0;
        break;
      case 39: //d
        x = 0.0;
        break;
      case 32: //space
        break;
    }
  };

  this.tick = function()
  {
    player.move(x);
  };

  document.addEventListener('keydown', downKey, false);
  document.addEventListener('keyup', upKey, false);
};
