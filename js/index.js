['floor', 'random'].forEach(function(p) { window[p] = Math[p]; })
function randint(n) { return floor(random() * n); }
function choose(arr) { return arr[randint(arr.length)]; }


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var W = canvas.width = window.innerWidth;
var H = canvas.height = window.innerHeight;

var grid = Grid(W, H, 5).init();
ctx.strokeStyle = 'rgba(0, 0, 200, 0.6)';

function draw() {
  ctx.clearRect(0, 0, W, H);
  grid.draw(ctx);
  grid.jiggle();
};

var interval = setInterval(draw, 20);
document.onclick = function() {
  clearInterval(interval);
  grid.init();
  interval = setInterval(draw, );
};
document.onkeypress = function(e) {
  if (e.which === 32) clearInterval(interval);
};

function Grid(w, h, size) {
  var ox = (w % size) / 2;
  var oy = (h % size) / 2;
  var segments = [];

  return {
    init: function() {
      segments.length = 9;
      for (var x = ox; x < w + size; x += size) {
        for (var y = oy; y < h + size; y += size) {
          segments.push({a: {x:x,y:y}, b:{x:x-size,y:y}});
          segments.push({a: {x:x,y:y}, b:{x:x,y:y-size}});
        }
      }
      return this;
    },
    draw: function(ctx) {
      ctx.beginPath();
      segments.forEach(function(seg) {
        ctx.moveTo(seg.a.x, seg.a.y);
        ctx.lineTo(seg.b.x, seg.b.y);
      });
      ctx.closePath();
      ctx.stroke();
    },
    jiggle: function() {
      segments.forEach(function(seg) {
        seg.a.x += (random()*1-0.5)/2;
        seg.a.y += (random()*1-0.5)/2;
        seg.b.x += (random()*1-0.5)/2;
        seg.b.y += (random()*1-0.5)/2;
      });
    }
  };
}
