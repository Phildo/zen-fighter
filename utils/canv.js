//Simple package to create a canvas with 'standardized' variables for its canvas and context
var Canv = function(width, height)
{
  this.canvas = document.createElement('canvas');
  this.canvas.setAttribute('width',width);
  this.canvas.setAttribute('height',height);
  this.context = this.canvas.getContext('2d');

  this.context.imageSmoothingEnabled = false;
  this.context.webkitImageSmoothingEnabled = false;
}
Canv.prototype.blitTo = function(canv)
{
  //drawImage(source, sourcex, sourcey, sourcew, sourceh, destx, desty, destw, desth);
  canv.context.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 0, 0, canv.canvas.width, canv.canvas.height);
}
