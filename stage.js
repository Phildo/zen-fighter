var Stage = function()
{
  this.drawCanv = new Canv(640,320);
  this.dispCanv = new Canv(640,320);
  this.dispCanv.canvas.style.border = "1px solid black";

  this.draw = function()
  {
    this.drawCanv.blitTo(this.dispCanv);
    this.drawCanv.context.fillStyle = "rgba(255,255,255,0.1)";
    this.drawCanv.context.fillRect(0,0,this.drawCanv.canvas.width,this.drawCanv.canvas.height);
  };

  document.getElementById("stage_container").insertBefore(this.dispCanv.canvas, document.getElementById("shadow"));
};
