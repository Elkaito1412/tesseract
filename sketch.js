var maxcells = 50; //maximum number of cells after reaching this number cells will grow withoutdoing mitozis
var deaths = 0; //a variable for displaying the number of death
var cells = []; //the array containing cells
var virus = []; //the array containing viruses
function setup(){
 createCanvas(550,550);
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
  if(alcls == 0){document.getElementById('end').innerHTML = 'Viruses win';}//display viruses win
  else if(alvrs == 0){document.getElementById('end').innerHTML = 'Cells win';}//display cells win
  else{document.getElementById('end').innerHTML = 'viruses attack';}//display viruses attacking if the game is still running
  }
////////////////////////////////////////////////////////////////Making a cell object//////////////////////////////
var Cell = function(x,y){
  this.x = x; //x position of the cell
  this.y = y; //y position of the cell
  this.grow = random(0.05,0.08); //making a random growth speed so the cells will split at different times
  this.w = 30;  //the initial width of each cell
  this.avx = random(0,100); //the offset used in noise() for getting x position
  this.avy = random(0,100); //the offset used in noise() for getting y position
  this.deth = random(0,20); //a random chance of death between 0 and 10 i will explain it later
  this.n = 10;  //the radius of the nucleus of the cell
  this.ngrow = random(0.01,0.03);//a random growth speed for the nucleus
}
this.ngrow = random(0.01,0.03); //growth speed of the nucleus
////////////////////////////////////////////////////////:Displaying the cells/////////////////////////////////////
function show(){
  for(i=0;i<cells.length;i++){ //for loop to draw cell by cell
    stroke(200); //the stroke color , the stroke is the cell membrane if it's what it is called
    strokeWeight(2);  //the size of the stroke
    fill(map(cells[i].w,30,50,0,255),map(cells[i].n,0,20,0,255),0,150); //filling the cell with a color depending on cell and nucleus radius
    ellipse(cells[i].x,cells[i].y,cells[i].w,cells[i].w); //drawing the cell
    fill(255);//filling the nucleus
    noStroke();//no stroke for the nucleus
    ellipse(cells[i].x,cells[i].y,cells[i].n,cells[i].n);//drawing the nucleus
    cells[i].w += cells[i].grow;//incrementing the cell radius by the growth value
    cells[i].x += map(noise(cells[i].avx),0,1,-1,1);//moving the cell in a random x direction using the noise
    cells[i].y += map(noise(cells[i].avy),0,1,-1,1);//moving the cell in a random y direction using the noise
    cells[i].avx += 0.001;//incrementing the xoffset used to get the noise value
    cells[i].avy += 0.001;//incrementing the yoffset used to get the noise value
    cells[i].n += cells[i].ngrow;//incrementing the nucleus radius by the nucleus growth speed
    if(cells[i].n == cells[i].w/2){cells[i].n -= cells[i].n/2;}//check if the nucleus is bigger than half the cell
  }
}
///////////////////////////////////////////////////Function for life cycle of a cell//////////////////////////////
  function cycle(){//this is the function containing the cell life cycle
    for(i=0;i<cells.length;i++){//again looping thru all the cells
      if(round(cells[i].deth) == 19){//checking if the rounded value of deth variable wich is random for each cell is equal to 9, this is just to add a chance for the cell to die when it is separated from the mother cell
        cells[i].grow = -0.1;//making the cell shrink
        cells[i].ngrow = -0.03;//also the nucleus
        if(cells[i].w < 5){//checking if the cell's width is less than 5
        cells.splice(i,1);//removing the cell from the array , means deleting it
        deaths++;//add one to the deaths count
      }
      }
      else if(cells[i].x > width/2 || cells[i].x < -width/2){//check the intersection with the sides
        cells[i].x = -cells[i].x ;//the cell will go to the oder side
      }
      else if(cells[i].y > height/2 || cells[i].y < -height/2){//check the intersection with top and bottom
        cells[i].y = -cells[i].y ;//the cell will go to the oder side
      }
      else if(cells.length < maxcells && cells[i].w > 50){//ckeck if the cell is big enough to split
        cells.push(new Cell(cells[i].x,cells[i].y));//create a child cell
        cells.push(new Cell(cells[i].x,cells[i].y));//create a child cell
        cells.splice(i,1);//kill the mother cell
      }
        else if(cells.length >= maxcells){//if the nomber of cells is bigger than the max cells
          if(cells[i].w >= 50){cells[i].w -= cells[i].grow; cells[i].n -= cells[i].ngrow;}//make the cell's radius stay at 49
        }
    }
  }
  /////////////////////////////////////////////virus building function/////////////////////////////
    function Virus(x,y){
      this.x = x;//the x position of the virus
      this.y = y;//the y position of the virus
      this.avx = random(0,100);//the xoffset of the noise used to move the virus
      this.avy = random(0,100);//the yoffset of the noise used to move the virus
      this.n = 10;//the radius of the virus
      this.age = 0;//the age of the virus
      this.mtz = 0;//the time counter to the virus mitozis inside a cell
    }
    ///////////////////////////////////////////function infect///////////////////////////////////////
      function infect(){
        for (var i = 0; i < virus.length; i++) {//looping thru all the viruses
                        ///////////////Displaying viruses//////////////////
          fill(255,0,0);//filling the virus with the red color
          ellipse(virus[i].x,virus[i].y,virus[i].n,virus[i].n);//drawing the virus
          virus[i].x += map(noise(virus[i].avx),0,1,-1,1);//moving the x of the virus using the noise()
          virus[i].y += map(noise(virus[i].avy),0,1,-1,1);//moving the y of the virus using the noise()
          virus[i].avx += 0.001;//adding 0.001 to the noise() offset
          virus[i].avy += 0.001;//adding 0.001 to the noise() offset
          virus[i].age += 0.01;//adding 0.01 to the age of the virus
                        //////////////checking intersection with borders/////////////
           if(virus[i].x > width/2 || virus[i].x < -width/2){//if the virus hits the sides of the canvas
             virus[i].x = -virus[i].x ;//returning the virus to the oder side
           }
           else if(virus[i].y > height/2 || virus[i].y < -height/2){//if the virus hits the top and bottom of the canvas
             virus[i].y = -virus[i].y ;//returning the virus to the oder side
           }
                      ////////////////checking intersection with each cell/////////////:
           for(var n = 0; n < cells.length ;n++){//looping thru all the cells
             //checking intersection with every cell
             if(virus[i].y > cells[n].y-cells[n].w/2 && virus[i].y < cells[n].y+cells[n].w/2 && virus[i].x > cells[n].x-cells[n].w/2 && virus[i].x < cells[n].x+cells[n].w/2){
             //when the virus enters to the cell
             virus[i].x = cells[n].x;//making the virus stay inside the cell
             virus[i].y = cells[n].y;//making the virus stay inside the cell
             virus[i].age = 0;//resetting the age of the virus
             virus[i].mtz += 0.1;//starting to increment the mitozis time
             cells[n].w -= random(0.05,0.08) ;//decrementing the cell's radius
             cells[n].n -=  random(0.01,0.03) ;//decrementing the cell's nucleus's radius
             if(cells[n].w < 10){//check if the cell's radius is less than 10 to kill the cell
               cells.splice(n,1);//kill the cell
               deaths++;//add 1 to the deaths count
               virus.push(new Virus(virus[i].x,virus[i].y));//making a new virus
               virus.push(new Virus(virus[i].x,virus[i].y));//making a new virus
               virus[i].mtz = 0;//resetting mitozis timer
             }
             ///////////Time for virus mitozis//////////////////////
             if(virus[i].mtz > 50){//check the mitozis timer of the viruses inside the cells
               virus.push(new Virus(virus[i].x+20,virus[i].y+20));//making a new virus
               virus.push(new Virus(virus[i].x-20,virus[i].y-20));//making a new virus
               virus[i].mtz = 0;//reseting the mitozis timer for the mother virus
}
             //end of when the virus enters the cell
           }
           }
                          ////////////Virus age limit/////////////////////:
           if(virus[i].age > random(4,6)){//checking if the virus's age exceded the limit age wich is a random number
            virus.splice(i,1);//kill the virus
          }
      }
      //end of for loop
      }
    ///////////////////////////////////////////////////////////////////////////////////////////////
      function mouseClicked(){//handles the event of the mouse is clicked
        virus.push(new Virus(mouseX-width/2,mouseY-height/2));//making a new virus in the pressed area
      }
      function movirus(){//moving the virus in the mouse direction
        for (var i = 0; i < virus.length; i++) {//looping thru all viruses
          if(virus[i].x!=mouseX-width/2){//checking if the virus's x already equals the mouse's x
            if(virus[i].x<mouseX-width/2){  virus[i].x += 1 ;}//if the virus's x is less than the mouse's x
            else if(virus[i].x>mouseX-width/2){  virus[i].x -= 1;}//if the virus's x is bigger than the mouse's x
        }
          if(virus[i].y!=mouseY-height/2){//checking if the virus'y already equals the mouse'y
            if(virus[i].y<mouseY-height/2){virus[i].y += 1;}//if the virus's y is less than the mouse's y
            if(virus[i].y>mouseY-height/2){virus[i].y -= 1;}//if the virus's y is bigger than the mouse's y
          }
        }
      }
