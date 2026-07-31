// 1. Global variables
let hairs = [];

const NUM_HAIRS = 250;
const SEGMENTS = 18;
const SEGMENT_LENGTH = 8;


// 2. p5 setup
function setup(){
    createCanvas(windowWidth, windowHeight);

    for(let x=80; x<width-80; x+=5){
        hairs.push(new Hair(x,120));
    }
}


// 3. p5 draw loop
function draw(){

    background(248,246,242);

    for(let hair of hairs){
        hair.update();
        hair.display();
    }
}


// 4. Hair class
class Hair{

    constructor(x,y){

        this.root=createVector(x,y);

        this.points=[];

        for(let i=0;i<SEGMENTS;i++){

            this.points.push(
                createVector(
                    x,
                    y+i*SEGMENT_LENGTH
                )
            );

        }
    }


    update(){

        // physics goes here

    }


    display(){

        // drawing goes here

    }

}
