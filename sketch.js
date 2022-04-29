var img;
var size;


var button1
var slider1;

var button2;

var button3;
var slider3;

var button4;
var slider4;

var button5;
var slider5;

var button6;
var slider6;

var grid = [];

function preload()
{
  img = loadImage('duck.jpg');
  
}

function load()
{
  grid = [];
  
  for (var y = 0; y < height; y++)
  {
    grid.push([]);
    for (var x = 0; x < width; x++)
    {
      grid[y].push(get(y,x))
    }
  }
}

function setup() {
  size = squareCanvas()
  background(100);
  image(img,0,0,size,size)
  button1 = createButton('Pixelate');
  button1.position(0, 0);
  button1.size(130)
  button1.mousePressed(pixelate);
  slider1 = createSlider(1,20,10,1)
  slider1.position(0,20)
  button2 = createButton('Blur');
  button2.position(130, 0);
  button2.size(130)
  button2.mousePressed(blur);
  
  button3 = createButton('Smart Blur');
  button3.position(130*2, 0);
  button3.size(130)
  button3.mousePressed(smartblur);
  
  slider3 = createSlider(1,20,3,1)
  slider3.position(130*2,20)
  
  button4 = createButton('Invert');
  button4.position(130*3, 0);
  button4.size(130)
  button4.mousePressed(inver);
  
  
  button5 = createButton('Threshold');
  button5.position(130*4, 0);
  button5.size(130)
  button5.mousePressed(thresh);
  slider5 = createSlider(0,1,0.4,0.01)
  slider5.position(130*4,20)
  
  button6 = createButton('Contrast');
  button6.position(130*5, 0);
  button6.size(130)
  button6.mousePressed(contrast);
  slider6 = createSlider(0,3,1,0.01)
  slider6.position(130*5,20)
  load();
  frameRate(10)
  button7 = createButton('Sort');
  button7.position(130*6, 0);
  button7.size(130)
  button7.mousePressed(sort2d);
}

function draw() {
  
}

function smartblur()
{
  
  filter(BLUR, slider3.value())
}
function inver()
{
  
  filter(INVERT)
}
function thresh()
{
  //image(img,0,0,size,size)
  filter(THRESHOLD,slider5.value())
}
function contrast()
{
  //image(img,0,0,size,size)
  amount = slider6.value()
  for (var y = 0; y < height; y++)
  {
    for (var x = 0; x < width; x++)
    {
      var r = grid[y][x][0]
      r = ((r-128)*amount)+128
      var g = grid[y][x][1]
      g = ((g-128)*amount)+128
      var b = grid[y][x][2]
      b = ((b-128)*amount)+128
      var clr = color(r,g,b)
      
      
      set(y,x,clr)
    }
  }
  updatePixels()
}

function blur()
{
  console.time("loadTime")
  load();
  console.timeEnd("loadTime")
  console.time("time")
  for (var y = 1; y < height-1; y++)
  {
    for (var x = 1; x < width-1; x++)
    {
      var c1 = grid[y][x]
      var c2 = grid[y][x+1]
      var c3 = grid[y][x+1]
      var c4 = grid[y+1][x]
      var c5 = grid[y-1][x]
      
      
      var r = c1[0]
      r+=c2[0]
      r+=c3[0]
      r+=c4[0]
      r+=c5[0]
      var g = c1[1];
      g+=c2[1]
      g+=c3[1]
      g+=c4[1]
      g+=c5[1]
      var b = c1[2];
      b+=c2[2]
      b+=c3[2]
      b+=c4[2]
      b+=c5[2]
      
      r/=5;
      g/=5;
      b/=5;
      var clr = color(r,g,b)
      
      set(y,x,clr)
    }
  }
  updatePixels();
  console.timeEnd("time")
}

function pixelate()
{
  image(img,0,0,size,size)
  amount = slider1.value()
  for (var y = 0; y < height; y++)
  {
    for (var x = 0; x < width; x++)
    {
      set(y,x,get(round(y/amount)*amount,round(x/amount)*amount))
    }
  }
  updatePixels();
}

function sort2d()
{
  for (var y = 0; y < height; y++)
  {
    grid[y].sort(compare)
  }
  unload()
  
  
  
}


function unload()
{
  for (var y = 0; y < height; y++)
  {
    for (var x = 0; x < width; x++)
    {
      set(y,x,grid[y][x])
    }
  }
  updatePixels();
}

function compare(a,b)
{
  if (g(a)>g(b))
  {
    return -1;
  }else if (g(a)<g(b))
  {
    return 1;
  }else
  {
    return 0;
  }
}

function g(arr)
{
  return (arr[0]+arr[1]+arr[2])/3
}

