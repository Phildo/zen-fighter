var Player = function(canv)
{
  this.x = 0;
  this.y = 0;
  this.xvel = 0;
  this.yvel = 0;
  var shieldv = 0;
  var sprint = true;
  var dx;
  var dy;
  var dl;

  this.opponent; //Must be set after initialization

  this.tick = function()
  {
    this.x += this.xvel;
    this.y += this.yvel;
  };

  this.draw = function(offsetx, offsety)
  {
    if(this.y < 0) this.y = 0;
    canv.context.fillStyle = "#000000";
    canv.context.fillRect(offsetx+this.x-5,canv.canvas.height-(offsety+this.y+10),10,10);
    canv.context.strokeStyle = "rgba(100,0,0,"+(shieldv/40)+")";
    canv.context.beginPath();
    canv.context.arc(offsetx+this.x,canv.canvas.height-(offsety+this.y+5), 10, 0, 2 * Math.PI, false);
    canv.context.stroke();
  };

  this.move = function(x, jump, shield)
  {
    this.xvel += x*0.3;
    if(this.xvel > 5)  this.xvel = this.xvel-((this.xvel-5)/8);
    if(this.xvel < -5) this.xvel = this.xvel-((this.xvel+5)/8);

    if(x == 0)
    {
      this.xvel/=1.2;
      if(this.xvel > -0.05 && this.xvel < 0.05) this.xvel = 0;
    }

    if(this.y > 0) this.yvel -= 0.3;
    if(this.y < 0) this.y = 0;

    if(this.y == 0)
    {
      sprint = true;
      if(this.yvel < -3)
        this.yvel *= -1/4;
      else
        this.yvel = 0;
    }

    if(jump)
    {
      if(this.y == 0) this.yvel = 10;
      else if(sprint)
      {
        sprint = false;
        dx = this.opponent.x-this.x;
        dy = this.opponent.y-this.y;
        dl = Math.sqrt((dx*dx)+(dy*dy));
        this.xvel = dx/dl*40;
        this.yvel = dy/dl*40;
      }
    }

    if(shield && shieldv == 0)
      shieldv = 40;

    if(shieldv > 0) shieldv--;
  };
};
