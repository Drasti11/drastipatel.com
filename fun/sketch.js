let hairs = [];

const NUM_HAIRS = 250;
const SEGMENTS = 18;
const SEGMENT_LENGTH = 8;

function setup(){

    createCanvas(windowWidth, windowHeight);

    for(let x=80; x<width-80; x+=5){

        hairs.push(new Hair(x,120));
    }

    stroke(40);
    noFill();
}

function draw(){

    background(248,246,242);

    for(let hair of hairs){

        hair.update();
        hair.display();

    }

}

function windowResized(){

    resizeCanvas(windowWidth,windowHeight);

}
