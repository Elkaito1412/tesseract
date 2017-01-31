var maxcells = 50; //maximum number of cells after reaching this number cells will grow withoutdoing mitozis
var deaths = 0; //a variable for displaying the number of death
var cells = []; //the array containing cells
var virus = []; //the arrayu containing viruses
function setup(){
 createCanvas(500,500);
 cells[0]=new Cell(random(-width/2,width/2),random(-height/2,height/2)); //making the first cell in a random place
}

function draw(){
  translate(width/2,height/2); //i liked to translate the origin to the center of the canvas
  background(0);//it's obvious
  show(); //the function to show all cells
  cycle(); //function for mitozis and deaths also cells movements
  infect(); //function for viruses lifespan and infecting cells and their movements
  if(0<mouseX && mouseX<width && 0<mouseY && mouseY<height){movirus();}//checking if the mouse is on screen to activate virus movements depending on mouse movements
  var alcls = cells.length; // just a variablle containing the number of cells so i can display it
  var alvrs = virus.length; // yeah the same thing but for viruses
  document.getElementById('all').innerHTML = alcls; //displaying the number of cells in the html
  document.getElementById('vrs').innerHTML = alvrs; //displaying the number of viruses
  document.getElementById('dth').innerHTML = deaths; //displaying the number of viruses
  }
////////////////////////////////////////////////////////////////Making a cell object//////////////////////////////
var Cell = function(x,y){
  this.x = x; //x position of the cell
  this.y = y; //y position of the cell
  this.grow = random(0.05,0.08); //making a random growth speed so the cells will split at different times
  this.w = 30;  //the initial width of each cell
  this.avx = random(0,100); //the offset used in noise() for getting x position
  this.avy = random(0,100); //the offset used in noise() for getting y position
  this.deth = random(0,10); //a random chance of death between 0 and 10 i will explain it later
  this.n = 10;  //the radius of the nucleus of the cell
  this.ngrow = random(0.01,0.03);
}
this.ngrow = random(0.01,0.03); //growth speed of the nucleus
////////////////////////////////////////////////////////:Displaying the cells/////////////////////////////////////
function show(){
  for(i=0;i<cells.length;i++){ //for loop to draw cell by cell
    stroke(200); //the stroke color , the stroke is the cell membrane if it's what it is called
    strokeWeight(2);  //the size of the stroke
    fill(255,255,255,100); //filling the cell with a semi-transparent white color
    ellipse(cells[i].x,cells[i].y,cells[i].w,cells[i].w); //drawing the cell
    fill(255);//filling the nucleus
    noStroke();//no stroke for the nucleus
    ellipse(cells[i].x,cells[i].y,cells[i].n,cells[i].n);
    cells[i].w += cells[i].grow;//incrementing the cell radius by the growth value
    cells[i].x += map(noise(cells[i].avx),0,1,-1,1);//moving the cell in a random x direction using the noise
    cells[i].y += map(noise(cells[i].avy),0,1,-1,1);//moving the cell in a random y direction using the noise
    cells[i].avx += 0.001;//incrementing the xoffset used to get the noise value
    cells[i].avy += 0.001;//incrementing the yoffset used to get the noise value
    cells[i].n += cells[i].ngrow;//incrementing the nucleus radius by the nucleus growth speed
  }
}
///////////////////////////////////////////////////Function for life cycle of a cell//////////////////////////////
  function cycle(){//this is the function containing the cell life cycle
    for(i=0;i<cells.length;i++){//again looping thru all the cells
      if(round(cells[i].deth) == 9){//checking if the rounded value of deth variable wich is random for each cell is equal to 9, this is just to add a chance for the cell to die when it is separated from the mother cell
        cells[i].grow = -0.1;//making the cell shrink
        cells[i].ngrow = -0.03;//also the nucleus
        if(cells[i].w < 5){//checking if the cell's width is less than 5
        cells.splice(i,1);//removing the cell from the array , means deleting it
        deaths++;
      }
      }
      else if(cells[i].x > width/2 || cells[i].x < -width/2){
        cells[i].x = -cells[i].x ;
      }
      else if(cells[i].y > height/2 || cells[i].y < -height/2){
        cells[i].y = -cells[i].y ;
      }
      else if(cells.length < maxcells && cells[i].w > 50){
        cells.push(new Cell(cells[i].x,cells[i].y));
        cells.push(new Cell(cells[i].x,cells[i].y));
        cells.splice(i,1);
      }
        else if(cells.length > maxcells){
          cells[i].w = 49;
        }
    }
  }
  /////////////////////////////////////////////virus building function/////////////////////////////
    function Virus(x,y){
      this.x = x;
      this.y = y;
      this.avx = random(0,100);
      this.avy = random(0,100);
      this.deth = random(0,20);
      this.n = 10;
      this.age = 0;
      this.mtz = 0;
    }
    ///////////////////////////////////////////function infect///////////////////////////////////////
      function infect(){
        for (var i = 0; i < virus.length; i++) {
                        ///////////////Displaying viruses//////////////////
          fill(255,0,0);
          ellipse(virus[i].x,virus[i].y,virus[i].n,virus[i].n);
          virus[i].x += map(noise(virus[i].avx),0,1,-1,1);
          virus[i].y += map(noise(virus[i].avy),0,1,-1,1);
          virus[i].avx += 0.001;
          virus[i].avy += 0.001;
          virus[i].age += 0.01;
                        //////////////checking intersection with borders/////////////
           if(virus[i].x > width/2 || virus[i].x < -width/2){
             virus[i].x = -virus[i].x ;
           }
           else if(virus[i].y > height/2 || virus[i].y < -height/2){
             virus[i].y = -virus[i].y ;
           }
                      ////////////////checking intersection with each cell/////////////:
           for(var n = 0; n < cells.length ;n++){
             if(virus[i].y > cells[n].y-cells[n].w/2 && virus[i].y < cells[n].y+cells[n].w/2 && virus[i].x > cells[n].x-cells[n].w/2 && virus[i].x < cells[n].x+cells[n].w/2){
             //when the virus enters to the cell
             virus[i].x = cells[n].x;
             virus[i].y = cells[n].y;
             virus[i].age = 0;
             virus[i].mtz += 0.1;
             cells[n].w -= random(0.05,0.08) ;
             cells[n].n -=  random(0.01,0.03) ;
             if(cells[n].w < 10){
               cells.splice(n,1);
               deaths++;
               virus.push(new Virus(virus[i].x+20,virus[i].y+20));
               virus.push(new Virus(virus[i].x-20,virus[i].y-20));
               virus[i].mtz = 0;
             }
             ///////////Time for virus mitozis//////////////////////
             if(virus[i].mtz > 50){
               virus.push(new Virus(virus[i].x+20,virus[i].y+20));
               virus.push(new Virus(virus[i].x-20,virus[i].y-20));
               virus[i].mtz = 0;
}
             //end of when the virus enters the cell
           }
           }
                          ////////////Virus age limit/////////////////////:
           if(virus[i].age > 5){
            virus.splice(i,1);
          }
      }
      //end of for loop
      }
    ///////////////////////////////////////////////////////////////////////////////////////////////
      function mouseClicked(){
        virus.push(new Virus(mouseX-width/2,mouseY-height/2));
      }
      function movirus(){
        for (var i = 0; i < virus.length; i++) {
          if(virus[i].x!=mouseX-width/2){
            if(virus[i].x<mouseX-width/2){  virus[i].x += 1 ;}
            else if(virus[i].x>mouseX-width/2){  virus[i].x -= 1;}
        }
          if(virus[i].y!=mouseY-height/2){
            if(virus[i].y<mouseY-height/2){virus[i].y += 1;}
            if(virus[i].y>mouseY-height/2){virus[i].y -= 1;}
          }
        }
      }
