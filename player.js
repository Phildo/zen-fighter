var Player = function(canv)
{
  this.x = 0;
  this.y = 0;
  this.xvel = 0;
  this.yvel = 0;

  this.tick = function()
  {
    this.x += this.xvel;
    this.y += this.yvel;
  };

  this.draw = function(offsetx, offsety)
  {
    canv.context.fillRect(offsetx+this.x-5,canv.canvas.height-(offsety+this.y+10),10,10);
  };

  this.move = function(x)
  {
    this.xvel += x;
    if(this.xvel > 5) this.xvel = 5;
    if(this.xvel < -5) this.xvel = -5;

    if(x == 0) this.xvel/=1.2;
    if(this.xvel > -0.05 && this.xvel < 0.05) this.xvel = 0;
  };
};
