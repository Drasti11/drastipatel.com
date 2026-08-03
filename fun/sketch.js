let hairs = [];

let hairCount = 25000;
let segments = 6;
let segmentLength = 12;

let oldMouse;
let mouseVelocity;

let fingers = [-20,-10,0,10,20];

let relaxation = 0.002;

let openHand;
let strokeHand;

function preload(){

    openHand = loadImage("openhand.png");
    strokeHand = loadImage("strokehand.png");

}

function setup() {

  createCanvas(windowWidth, windowHeight);

  noCursor();

  // create hair roots across a head shape

  for (let i = 0; i < hairCount; i++) {

    let x = random(width);
    let y = random(height);

    hairs.push(new Hair(x,y,i));

  }

  oldMouse = createVector(mouseX, mouseY);

}


function draw() {

  mouseVelocity = createVector(
  mouseX - oldMouse.x,
  mouseY - oldMouse.y
);

oldMouse.set(mouseX, mouseY);

  background(183,142,101);
  stroke(80,40);
  strokeWeight(random(0.3,1));


  for (let hair of hairs) {

    hair.update();
    hair.display();

  }

  drawHand();

}

function drawHand(){

    let hand;

    if(mouseIsPressed){

        hand = strokeHand;

    } else {

        hand = openHand;

    }


    image(
    hand,
    mouseX - 20,
    mouseY - 10,
    60,
    60
    );

}


class Hair {


  constructor(x,y,id){

    this.root = createVector(x,y);

    this.id=id;

    this.points=[];

    this.offset=random(1000);

    this.combed = false;

    


    // create strand

    for(let i=0;i<segments;i++){

      this.points.push(
        createVector(
          x,
          createVector(
            x + cos(this.offset)*i*segmentLength,
            y + sin(this.offset)*i*segmentLength
)        )
      );

    }


    // natural rest shape

    this.rest=[];

    for(let i=0;i<segments;i++){

      this.rest.push(
        createVector(
          x + sin(i*0.35+this.offset)*8,
          y+i*segmentLength
        )
      );

    }

  }



  update(){


    // root never moves

    this.points[0]=this.root.copy();



    // follow rest position

    for(let i=1;i<segments;i++){

      let p=this.points[i];

      let target=this.rest[i].copy();


      // Perlin noise movement

      target.x += 
        map(
          noise(
            this.offset,
            frameCount*0.002,
            i
          ),
          0,1,
          -20,
          20
        );
        


      // spring back

        if(this.combed){

    p.lerp(target, relaxation);

}
else{

    p.lerp(target,0.05);

}

    }



// HAND / FINGERS

if(mouseIsPressed){

    for(let finger of fingers){

        let fingerPos = createVector(
            mouseX + finger,
            mouseY
        );


        for(let i=1;i<segments;i++){

            let p=this.points[i];

            let distance=p.dist(fingerPos);


            if(distance < 8){

                let pull=mouseVelocity.copy();

                pull.mult(1.5);

                p.add(pull);

                this.rest[i].add(pull);

            }

        }

    }

}


    // keep length

    for(let n=0;n<3;n++){

      for(let i=1;i<segments;i++){

        let previous=this.points[i-1];

        let current=this.points[i];


        let direction=p5.Vector.sub(
          current,
          previous
        );


        direction.setMag(segmentLength);


        this.points[i]=p5.Vector.add(
          previous,
          direction
        );

      }

    }


  }



  display(){

    stroke(30,80);
    strokeWeight(1);

    noFill();


    beginShape();

    for(let p of this.points){

      curveVertex(
        p.x,
        p.y
      );

    }

    endShape();


  }


}