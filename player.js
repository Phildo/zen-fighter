var Player = function(canv, solid)
{
  this.x = 0;
  this.y = 0;
  this.xvel = 0;
  this.yvel = 0;
  this.sprint = true;
  this.score = 0;
  var dx;
  var dy;
  var dl;
  var jumps = [];
  var jumpsi = 0;
  for(var i = 0; i < 10; i++)
    jumps[i] = new Audio('assets/jump.mp3');
  var attack = [];
  var attacki = 0;
  for(var i = 0; i < 10; i++)
    attack[i] = new Audio('assets/attack.mp3');

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
    canv.context.strokeStyle = "#000000";
    if(solid)
    {
      canv.context.fillRect(offsetx+this.x-5,canv.canvas.height-(offsety+this.y+10),10,10);
      canv.context.fillRect(canv.canvas.width-15,canv.canvas.height-15,10,10);
      canv.context.textAlign = "right";
      canv.context.fillText(this.score,canv.canvas.width-25,canv.canvas.height-5);
    }
    else
    {
      canv.context.strokeRect(offsetx+this.x-5,canv.canvas.height-(offsety+this.y+10),10,10);
      canv.context.strokeRect(5,canv.canvas.height-15,10,10);
      canv.context.textAlign = "left";
      canv.context.fillText(this.score,25,canv.canvas.height-5);
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
      if(this.y == 0)
      {
        jumps[jumpsi].play();
        jumpsi = (jumpsi+1)%10;
        this.yvel = 10;
      }
      else if(this.sprint)
      {
        attack[attacki].play();
        attacki = (attacki+1)%10;
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
      attack[attacki].play();
      attacki = (attacki+1)%10;
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
