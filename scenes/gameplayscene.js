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
  var hit;
  var hiti;

  var getRandomCascade = function()
  {
    return {"x":Math.floor(Math.random()*16),"y":Math.floor(Math.random()*8),"solid":Math.round(Math.random())};
  }

  this.ready = function()
  {
    hit = [];
    for(var i = 0; i < 10; i++)
      hit[i] = new Audio('assets/hit.mp3');
    hiti = 0;
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

  var osx;
  var obx;
  var osy;
  var oby;
  var tsx;
  var tbx;
  var tsy;
  var tby;
  var oyint;
  var tyint;
  var oslope;
  var tslope;
  var xint;
  var yint;
  var txvel;
  var tyvel;
  this.tick = function()
  {
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

    //Detect collisions
    if     (p1.xvel > 0) { osx = p1.x        -5; obx = p1.x+p1.xvel+5; }
    else if(p1.xvel < 0) { osx = p1.x+p1.xvel-5; obx = p1.x        +5; }
    else                 { osx = p1.x        -5; obx = p1.x        +5; }
    if     (p1.yvel > 0) { osy = p1.y        -5; oby = p1.y+p1.yvel+5  }
    else if(p1.yvel < 0) { osy = p1.y+p1.yvel-5; oby = p1.y        +5; }
    else                 { osy = p1.y        -5; oby = p1.y        +5; }

    if     (p2.xvel > 0) { tsx = p2.x        -5; tbx = p2.x+p2.xvel+5; }
    else if(p2.xvel < 0) { tsx = p2.x+p2.xvel-5; tbx = p2.x        +5; }
    else                 { tsx = p2.x        -5; tbx = p2.x        +5; }
    if     (p2.yvel > 0) { tsy = p2.y        -5; tby = p2.y+p2.yvel+5; }
    else if(p2.yvel < 0) { tsy = p2.y+p2.yvel-5; tby = p2.y        +5; }
    else                 { tsy = p2.y        -5; tby = p2.y        +5; }

    oyint = p1.y-((p1.x/p1.xvel)*p1.yvel);
    tyint = p2.y-((p2.x/p2.xvel)*p2.yvel);
    oslope = p1.yvel/p1.xvel;
    tslope = p2.yvel/p2.xvel;

    xint = (oyint-tyint)/(tslope-oslope);
    yint = (oslope*xint)+oyint;
    if(p1.xvel == 0) { xint = p1.x; yint = tslope*xint + tyint; }
    if(p2.xvel == 0) { xint = p2.x; yint = oslope*xint + oyint; }
    if(oslope == tslope) { xint = p1.x+(p1.xvel/2); yint = p1.y+(p1.yvel/2); }
    
   /*//useful debugging
    if(Math.abs(p1.x-p2.x) < 10 && Math.abs(p1.y-p2.y) < 10)
    {
      document.getElementById('debug').innerHTML += "("+p1.x+","+p1.y+")<br />"+p1.yvel+"/"+p1.xvel+"<br />"+oslope+"x + "+oyint+"<br /><br />";
      console.log("OneX:"+osx+" - "+obx+" OneY:"+osy+" - "+oby+" OneS:"+oslope+" OneYInt:"+oyint);
      console.log("TwoX:"+tsx+" - "+tbx+" TwoY:"+tsy+" - "+tby+" TwoS:"+tslope+" TwoYInt:"+tyint);
      console.log("IntX:"+xint+" IntY:"+yint);
      console.log("---------");
    }
  */
    
    if(xint >= osx && xint <= obx && yint >= osy && yint <= oby &&
       xint >= tsx && xint <= tbx && yint >= tsy && yint <= tby)
    {
      //console.log('collide- '+xint+','+yint);
      hit[hiti].play();
      hiti = (hiti+1)%10;
      if(p1.x > p2.x) { p1.x = xint+5; p2.x = xint-5; }
      else            { p1.x = xint-5; p2.x = xint+5; }
      if(p1.y > p2.y) { p1.y = yint+5; p2.y = yint-5; }
      else            { p1.y = yint-5; p2.y = yint+5; }

      p1.score += Math.round(Math.abs(p1.xvel)+Math.abs(p1.yvel));
      p2.score += Math.round(Math.abs(p2.xvel)+Math.abs(p2.yvel));

      txvel = p1.xvel;
      tyvel = p1.yvel;
      p1.xvel = p2.xvel;
      p1.yvel = p2.yvel;
      p2.xvel = txvel;
      p2.yvel = tyvel;

      p1.sprint = true;
      p2.sprint = true;
    }

    p1.tick();
    p2.tick();

    p1.draw(offsetx, offsety);
    p2.draw(offsetx, offsety);
  };

  this.cleanup = function()
  {

  };
};
