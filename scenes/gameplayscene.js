var GamePlayScene = function(game, canv)
{
  var p1;
  var p2;
  var offsetx;
  var offsety;
  var kcontroller;
  var aicontroller;
  var cascade;
  var cascadeIndex = 0;

  var getRandomCascade = function()
  {
    return {"x":Math.floor(Math.random()*16),"y":Math.floor(Math.random()*8),"solid":Math.round(Math.random())};
  }

  this.ready = function()
  {
    offsetx = 0;
    offsety = 120;
    p1 = new Player(canv, false);
    p1.x = 40;
    p2 = new Player(canv, true);
    p2.x = canv.canvas.width-40;
    p1.opponent = p2;
    p2.opponent = p1;
    kcontroller = new KeyController(p1);
    aicontroller = new AIController(p2);

    cascade = []
    for(var i = 0; i < 80; i++)
      cascade[i] = getRandomCascade();
  };

var frame = 0;
  this.tick = function()
  {
    frame++;
    canv.context.fillStyle = "#000000";

    //ground
    canv.context.strokeStyle = "#000000";
    canv.context.beginPath();
    canv.context.moveTo(0,canv.canvas.height-offsety);
    canv.context.lineTo(canv.canvas.width,canv.canvas.height-offsety);
    canv.context.stroke();

    //cascade
    canv.context.fillStyle = "rgba(0,0,0,0.05)";
    canv.context.strokeStyle = "rgba(0,0,0,0.1)";
    for(var i = 0; i < 4; i++)
    {
      if(cascade[cascadeIndex*(i+1)].y == 0)
        cascade[cascadeIndex*(i+1)].x = Math.floor(Math.random()*16);
      if(cascade[cascadeIndex*(i+1)].solid) canv.context.fillRect(cascade[cascadeIndex*(i+1)].x*40,cascade[cascadeIndex*(i+1)].y*40,40,40);
      else                                  canv.context.strokeRect(cascade[cascadeIndex*(i+1)].x*40,cascade[cascadeIndex*(i+1)].y*40,40,40);
      cascade[cascadeIndex*(i+1)].y = (cascade[cascadeIndex*(i+1)].y+1)%8
      cascadeIndex = (cascadeIndex+1)%20;
    }
  
    kcontroller.tick();
    aicontroller.tick();

    p1.tick();
    p2.tick();

    var osx;
    var obx;
    if(p1.xvel > 0)      { osx = p1.x-p1.xvel; obx = p1.x;         }
    else if(p1.xvel < 0) { osx = p1.x;         obx = p1.x-p1.xvel; }
    else                 { osx = p1.x;         obx = p1.x;         }
    var osy;
    var oby;
    if(p1.yvel > 0)      { osy = p1.y-p1.yvel; oby = p1.y;         }
    else if(p1.yvel < 0) { osy = p1.y;         oby = p1.y-p1.yvel; }
    else                 { osy = p1.y;         oby = p1.y;         }

    var tsx;
    var tbx;
    if(p2.xvel > 0)      { tsx = p2.x-p2.xvel; tbx = p2.x;         }
    else if(p2.xvel < 0) { tsx = p2.x;         tbx = p2.x-p2.xvel; }
    else                 { tsx = p2.x;         tbx = p2.x;         }
    var tsy;
    var tby;
    if(p2.yvel > 0)      { tsy = p2.y-p2.yvel; tby = p2.y;         }
    else if(p2.yvel < 0) { tsy = p2.y;         tby = p2.y-p2.yvel; }
    else                 { tsy = p2.y;         tby = p2.y;         }

    var oyint = (p1.y-p1.yvel)+(((p1.x-p1.xvel)/p1.xvel)*p1.yvel);
    var oslope = p1.yvel/p1.xvel;
    var tyint = (p2.y-p2.yvel)+(((p2.x-p2.xvel)/p2.xvel)*p2.yvel);
    var tslope = p2.yvel/p2.xvel;

    var xint = (oyint-tyint)/(tslope-oslope);
    var yint = oslope*xint+oyint;
    if(p1.xvel == 0) xint = p1.x;
    if(p2.xvel == 0) xint = p2.x;
    if(p1.yvel == 0) yint = p1.y;
    if(p2.yvel == 0) yint = p2.y;


    
    if(frame == 100)
    {
      console.log("OneX:"+osx+"-"+obx+" OneY:"+osy+"-"+oby);
      console.log("TwoX:"+tsx+"-"+tbx+" TwoY:"+tsy+"-"+tby);
      console.log("IntX:"+xint+" IntY:"+yint);
    }
    if(xint >= osx && xint <= obx && yint >= osy && yint <= oby &&
       xint >= tsx && xint <= tbx && yint >= tsy && yint <= tby)
    {
      console.log('collide');
      //collide
      p1.x = xint;
      p1.y = yint;
      if(p1.xvel == 0) p1.xvel = 0.1;
      if(p1.yvel == 0) p1.yvel = 0.1;
      p1.xvel *= -1;
      p1.yvel *= -1;

      if(p2.xvel == 0) p2.xvel = -0.1;
      if(p2.yvel == 0) p2.yvel = 0.1;
      p2.x = xint;
      p2.y = yint;
      p2.xvel *= -1;
      p2.yvel *= -1;
    }

    p1.draw(offsetx, offsety);
    p2.draw(offsetx, offsety);
  };

  this.cleanup = function()
  {

  };
};
