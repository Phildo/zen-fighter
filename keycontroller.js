var KeyController = function(player)
{
  var left  = false;
  var right = false;
  var jump  = false;
  var shield = false;

  function downKey(e)
  {
    switch(e.keyCode)
    {
      case 37: //<-
        left = true;
        break;
      case 39: //->
        right = true;
        break;
      case 32: //space
        jump = true;
        break;
      case 16: //shift
        shield = true;
        break;
    }
  };

  function upKey(e)
  {
    switch(e.keyCode)
    {
      case 37: //<-
        left = false;
        break;
      case 39: //->
        right = false;
        break;
    }
  };

  this.tick = function()
  {
    var x = 0;
    if(left) x -= 1;
    if(right) x += 1;
    player.move(x, jump, shield);

    jump = false;
    shield = false;
  };

  document.addEventListener('keydown', downKey, false);
  document.addEventListener('keyup', upKey, false);
};
