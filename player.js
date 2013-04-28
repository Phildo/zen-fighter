var Player = function(canv, solid)
{
  this.x = 0;
  this.y = 0;
  this.xvel = 0;
  this.yvel = 0;
  this.sprint = true;
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
    if(solid)
    {
      canv.context.fillStyle = "#000000";
      canv.context.fillRect(offsetx+this.x-5,canv.canvas.height-(offsety+this.y+10),10,10);
    }
    else
    {
      canv.context.strokeStyle = "#000000";
      canv.context.strokeRect(offsetx+this.x-5,canv.canvas.height-(offsety+this.y+10),10,10);
    }
  };

  this.move = function(x, jump, dodge)
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
      this.sprint = true;
      if(this.yvel < -3)
        this.yvel *= -1/4;
      else
        this.yvel = 0;
    }

    if(jump)
    {
      if(this.y == 0) this.yvel = 10;
      else if(this.sprint)
      {
        this.sprint = false;
        dx = this.opponent.x-this.x;
        dy = this.opponent.y-this.y;
        dl = Math.sqrt((dx*dx)+(dy*dy));
          this.xvel = dx/dl*40;
        if(this.opponent.y > this.y)
          this.yvel = dy/dl*10;
        else
          this.yvel = dy/dl*40;
      }
    }
    if(this.sprint && dodge)
    {
      this.sprint = false;
      if(this.y > 0)
      {
        dx = this.opponent.x-this.x;
        dy = this.opponent.y-this.y;
        dl = Math.sqrt((dx*dx)+(dy*dy));
        this.xvel = dx/dl*-12;
        this.yvel = dy/dl*-12;
      }
      else if(this.x > this.opponent.x)
        this.xvel = 40;
      else if(this.x < this.opponent.x)
        this.xvel = -40;
    }

    if(this.x > canv.canvas.width-5)
    {
      this.x = canv.canvas.width-5;
      if(this.xvel > 0) this.xvel *= -1;
    }
    else if(this.x < 5)
    {
      this.x = 5;
      if(this.xvel < 0) this.xvel *= -1;
    }
  };
};
