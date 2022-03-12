var drawingCanvas;
var drawnFlower=false;

document.addEventListener('touchstart', this.touchstart, {
    passive: false
  });
  document.addEventListener('touchmove', this.touchmove, {
    passive: false
  });

  function touchstart(e) {
    if (!isSharing) {
      e.preventDefault();
      console.log("preventing");
    }

  }
  
  function touchmove(e) {
  if (!isSharing) {
      e.preventDefault();
      console.log("preventing");

    }
  }

let sketch = function(p) {

var petal;
var buttons = [];
var colorSelected;

var activeButton;
var submitButton;

var mic;

var cnv;
var micOn = false;
var drawingBoxSize;
var bg;
var buttonColors;
var flowerSwipe;
var whichTable;

p.touchstart = function(e) {
  if (!isSharing) {
e.preventDefault();
console.log("preventing");

  }
}

p.touchmove = function(e) {
  if (!isSharing) {
    e.preventDefault();
    console.log("preventing");

  }
    }
p.preload = function() {

}

p.setup = function() {
drawingCanvas = p.createCanvas(window.innerWidth,window.innerHeight);
drawingCanvas.parent("drawing");

petal = createGraphics(450, 900);
//petal.pixelDensity(devicePixelRatio);
petal.pixelDensity(2);
//p.pixelDensity(2);
p.noSmooth();
petal.noSmooth();
p.frameRate(100);
colorSelected=0;


p.textFont('Short Stack');
for (var i=0; i<8; i++) {
    buttons[i]=createButton("CLEAR");
    buttons[i].parent("buttonContainer");

}

buttons[0].mouseClicked(function() {
    colorSelected=0;
    p.restyleButtons();
});
buttons[1].mouseClicked(function() {
    colorSelected=1;
    p.restyleButtons();
});
buttons[2].mouseClicked(function() {
    colorSelected=2;
    p.restyleButtons();
});
buttons[3].mouseClicked(function() {
    colorSelected=3;
    p.restyleButtons();
});
buttons[4].mouseClicked(function() {
    colorSelected=4;
    p.restyleButtons();
});
buttons[5].mouseClicked(function() {
    colorSelected=5;
    p.restyleButtons();
});
buttons[6].mouseClicked(function() {
    colorSelected=6;
    p.restyleButtons();
});
            
buttons[7].mouseClicked(p.clearCanvas);

buttons[0].touchStarted(function() {
    colorSelected=0;
    p.restyleButtons();
});
buttons[1].touchStarted(function() {
    colorSelected=1;
    p.restyleButtons();
});
buttons[2].touchStarted(function() {
    colorSelected=2;
    p.restyleButtons();
});
buttons[3].touchStarted(function() {
    colorSelected=3;
    p.restyleButtons();
});
buttons[4].touchStarted(function() {
    colorSelected=4;
    p.restyleButtons();
});
buttons[5].touchStarted(function() {
    colorSelected=5;
    p.restyleButtons();
});
buttons[6].touchStarted(function() {
    colorSelected=6;
    p.restyleButtons();
});
            
buttons[7].touchStarted(p.clearCanvas);


p.restyleButtons();

buttonColors = [];
buttonColors[0]= color(102,230,183);
buttonColors[1]= color(250,246,105);
buttonColors[2]= color(238,171,180);
buttonColors[3]= color(31,33,120);
buttonColors[4]= color(229,77,104);
buttonColors[5]= color(135,186,240);
buttonColors[6]= color(137,94,243);

p.clearCanvas();

drawingBoxSize= min(p.width,p.height)*0.3;

flowerSwipe=0;

}

p.draw = function() {

  if (!isDrawing) {
    return;
  }

    p.clear();
    p.fill(0,0,0,100);
    p.noStroke();
    p.rect(max(p.width/2-p.height/2,p.width*.025),p.height*.025,min(p.height,p.width*0.95),p.height*.95, p.height*.025);

    p.textFont('Short Stack');
  p.textAlign(CENTER);
p.noStroke();
p.fill(255);
p.textSize(min(p.width,p.height)/15);
var textOffset = p.height/10;
//p.text("Draw your flower petal,",p.width/2,textOffset);
p.textSize(min(p.width,p.height)/22);
//p.text("Then swipe your flower up to share!",p.width/2,textOffset+min(p.width,p.height)/18);

 /*var vol = mic.getLevel();

  if (vol > .35 && drawnFlower) {
    sendFlower();
  }
  */
   
  if (flowerSwipe > p.height/4 && drawnFlower) {
    p.sendFlower();

  }
   // text(vol,10,10);
    // noFill();
    p.strokeWeight(2);
    p.stroke(0);
    drawingBoxSize=min(p.height/4,p.width/3.5);
    var petalBoxOffsetX = (p.width/2+max(p.width/2-p.height/2,p.width*.025))/2-drawingBoxSize/2;
    var petalBoxOffsetY = (0*textOffset+min(p.width,p.height)/18+
    (height-(.2*min(height,width))-drawingBoxSize*2))*.35;
    p.fill(0,0,0,20);
    p.image(petalGuide,petalBoxOffsetX, petalBoxOffsetY, drawingBoxSize, drawingBoxSize*2);
    p.image(petal, petalBoxOffsetX, petalBoxOffsetY, drawingBoxSize, drawingBoxSize*2);

    if (mouseIsPressed && mouseX >petalBoxOffsetX && mouseX < (petalBoxOffsetX+drawingBoxSize) 
    && mouseY >petalBoxOffsetY && mouseY < (petalBoxOffsetY+drawingBoxSize*2)
    && pmouseX >petalBoxOffsetX && pmouseX < (petalBoxOffsetX+drawingBoxSize) 
    && pmouseY >petalBoxOffsetY && pmouseY < (petalBoxOffsetY+drawingBoxSize*2)) {
      drawnFlower=true;
        petal.strokeWeight(25/150*drawingBoxSize);
        petal.strokeWeight(25);
       // petal.strokeWeight(30/150*drawingBoxSize);

        petal.stroke(buttonColors[colorSelected]);
        let mx = map(mouseX,petalBoxOffsetX,petalBoxOffsetX+drawingBoxSize,0,450);
        let my = map(mouseY,petalBoxOffsetY,petalBoxOffsetY+drawingBoxSize*2,0,900);
        let pmx = map(pmouseX,petalBoxOffsetX,petalBoxOffsetX+drawingBoxSize,0,450);
        let pmy = map(pmouseY,petalBoxOffsetY,petalBoxOffsetY+drawingBoxSize*2,0,900);
        petal.line(mx,my,pmx,pmy);
    }

    for (var currFlower = 0; currFlower<1; currFlower++) {
        var petalCount = 9 + floor(3*sin(radians(currFlower*235)));
        var flowerScale = (.5 + .05*sin(radians(currFlower*70)))/3;
        for (var i = 0; i < petalCount; i++) {
            p.push();
//          var volShift = pow((vol*3),3)*height/2;
var volShift =0;
          p.translate(p.width-petalBoxOffsetX-drawingBoxSize/2*1.25,petalBoxOffsetY+drawingBoxSize-volShift-flowerSwipe);
          p.rotate(radians(i / petalCount * 360 + (5) * sin(radians(2 * i / petalCount * 360 + frameCount + currFlower*40))));
          p.translate(-drawingBoxSize/4*.9, -drawingBoxSize*.9);
          p.image(petal, 0, 0, drawingBoxSize/2*.9, drawingBoxSize*.9);
          p.pop();
        }
      }
}

p.sendFlower = function() {
    //proof of concept that we can use dataURL to store and send images
    //This will be replaced with websockets code to send from one sketch to another 
  var d = new Date();
var petal1= createGraphics(150,300);
petal1.pixelDensity(1);
petal1.image(petal,0,0,150,300);
sharedFlower = petal1;
    var data = {
      id : 0,
      petal : petal1.elt.toDataURL(),
      date: d.toLocaleString(),
      table: whichTable
    };
    socket.emit('flower',data);
    console.log("sending");
    petal.clear();
    drawnFlower = false;
    flowerSwipe=0;
    setTimeout(function() {newFlower(data);},1000);
//showDrawing();
//beginFlower();
    }

    p.mouseDragged = function() {
      if (p.mouseX>p.width/2) {
        if (drawnFlower) {
        flowerSwipe+=(p.pmouseY-p.mouseY);
        }
      }
    //  mic.input.context.resume();
      return false;
    }

p.windowResized = function() {
    drawingCanvas = p.resizeCanvas(window.innerWidth,window.innerHeight);
    p.restyleButtons();
    //drawingCanvas.parent("drawing");
    }

  p.clearCanvas = function() {
        petal.clear();
        // petal = createGraphics(150, 300);
        // petal.pixelDensity(1);
        flowerSwipe=0;
    }

    p.restyleButtons = function() {
        var padding = (.025*min(p.height,p.width));
        
        document.getElementById("buttonContainer").style.borderradius = min(p.height,p.width)/10/4+"px";
  
        document.getElementById("buttonContainer").style.left= p.width/2-(.8/1.2*min(p.height,p.width)+48)/2-padding+"px";   
        
        document.getElementById("buttonContainer").style.padding= padding+"px";
        //document.getElementById("buttonContainer").style.lineheight= padding+"px";
        document.getElementById("buttonContainer").style.paddingTop= padding/2+"px";       
  
        if (width> height) {
        document.getElementById("buttonContainer").style.top= p.height-(.35*p.height)-padding+"px"; 
        } else {
          document.getElementById("buttonContainer").style.top= p.height-(.35*p.height)-padding+"px"; 

        }
       document.getElementById("buttonContainer").style.fontSize= min(p.height,p.width)/10/3+"px";       
  

        buttons[0].style("background-color","rgb(102,230,183)");
        buttons[1].style("background-color","rgb(250,246,105)");
        buttons[2].style("background-color","rgb(238,171,180)");
        buttons[3].style("background-color","rgb(31,33,120)");
        buttons[4].style("background-color","rgb(229,77,104)");
        buttons[5].style("background-color","rgb(135,186,240)");
        buttons[6].style("background-color","rgb(137,94,243)");
        buttons[7].style("background-color","rgba(90,191,220,0)");
        buttons[7].style("font-size",min(p.height,p.width)/12/5+"px");
  
        for (var i=0; i<8; i++) {
    
            buttons[i].style("height",min(p.height,p.width)/12+"px");
            buttons[i].style("width",min(p.height,p.width)/12+"px");
            buttons[i].style("border-radius",min(p.height,p.width)/10/4+"px");
            buttons[i].style("color","rgba(0,0,0,0)");
            buttons[i].style("border","none");
            buttons[i].style("border-color","rgb(0,0,0)");
              }
              buttons[7].style("color","rgb(255,255,255)");
              buttons[7].style("border","solid 2px");
              buttons[7].style("border-color","rgb(255,255,255)");
              if (colorSelected>-1&& colorSelected < 7) {
              buttons[colorSelected].style("border","solid "+12*min(adjustedScale,.5)+"px white");
            }
      }
}

let myp5;