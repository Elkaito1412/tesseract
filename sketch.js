var maxcells = 50;
var cells = [];
var virus = [];
function setup(){
 createCanvas(600,600);
 cells[0]=new Cell(random(-width/2,width/2),random(-height/2,height/2));
}

function draw(){
  translate(width/2,height/2);
  background(0);
  show();
  cycle();
  infect();
  var alcls = cells.length;
  document.getElementById('all').innerHTML = alcls;
  }
////////////////////////////////////////////////////////////////Making a cell object//////////////////////////////
var Cell = function(x,y){
  this.x = x;
  this.y = y;
  this.grow = random(0.05,0.08);
  this.w = 30;
  this.avx = random(0,100);
  this.avy = random(0,100);
  this.deth = random(0,10);
  this.n = 10;
  this.ngrow = random(0.01,0.03);
}
////////////////////////////////////////////////////////:Displaying the cells/////////////////////////////////////
function show(){
  for(i=0;i<cells.length;i++){
    stroke(150);
    strokeWeight(2);
    fill(255,255,255,50);
    ellipse(cells[i].x,cells[i].y,cells[i].w,cells[i].w);
    fill(255);
    noStroke();
    ellipse(cells[i].x,cells[i].y,cells[i].n,cells[i].n);
    cells[i].w += cells[i].grow;
    cells[i].x += map(noise(cells[i].avx),0,1,-1,1);
    cells[i].y += map(noise(cells[i].avy),0,1,-1,1);
    cells[i].avx += 0.001;
    cells[i].avy += 0.001;
    cells[i].n += cells[i].ngrow;
  }
}
///////////////////////////////////////////////////Function for life cycle of a cell//////////////////////////////
  function cycle(){
    for(i=0;i<cells.length;i++){
      if(round(cells[i].deth) == 19){
        cells[i].w = 0;
        cells[i].grow = 0;
        cells[i].n = 0;
        cells[i].ngrow = 0;
        cells.splice(i,1);
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
          cells.splice(cells.length,1);
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
             cells[n].w -= 2*cells[n].grow ;
             cells[n].n -= 2*cells[n].ngrow ;
             if(cells[n].w < 10){
               cells.splice(n,1);
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
