var table;
var apercu;
var graphik;
var yearoffset = 25;    // how far the year labels need to be pushed back
var movies = [];
var margin = 100;       // left and top edge
var lineheight = 650;   // height of budget bars
var gridspace = 130;    // space between budget bars
var startyear = 2008;
var hovered = false;
var b1hovered = false;
var b2hovered = false;
var r = 5;              // scale of radius correlating to how many awards films have won
var bw1 = 200;          // button width 1
var bw2 = 362;          // button width 1
var buttonHeight = 40;
var dash = 40;

const GRIDMID = 400; // midpoint of vertical line grid
const XL = 0;
const SM = 1;
var budgetscale = XL;
var capSM = 30;
var capXL = 250;
var cap = capXL;      // soft float to move dots up and down

// multiple views for different years
var view;
const MAIN = 0;
const y2008 = 1;
const y2009 = 2;
const y2010 = 3;
const y2011 = 4;
const y2012 = 5;
const y2013 = 6;
const y2014 = 7;
const y2015 = 8;
const y2016 = 9;
const y2017 = 10;
const y2018 = 11;
var hover2008 = false;
var hover2009 = false;
var hover2010 = false;
var hover2011 = false;
var hover2012 = false;
var hover2013 = false;
var hover2014 = false;
var hover2015 = false;
var hover2016 = false;
var hover2017 = false;
var hover2018 = false;

function preload() {
  table = loadTable("budgets.csv", "csv", "header");
  apercu = loadFont("fonts/apercu_mono.otf");
  graphik = loadFont("fonts/graphik_medium.otf");
}

function mouseMoved(){
  for (var m = 0; m < movies.length; m++){
    if (abs(movies[m].x - mouseX) < 15 && abs(map(movies[m].budget, 0, cap.get(), GRIDMID + lineheight/2, GRIDMID - lineheight/2) - mouseY < 15)){
      movies[m].hovered = true; 
    } else {
      movies[m].hovered = false;
    }
  }   // $250 budget button
  if (mouseX > margin && mouseX < margin + bw1 && mouseY > 920 - buttonHeight/2 && mouseY < 920 + buttonHeight/2){
  b1hovered = true;
  } else { 
  b1hovered = false;  
  }  // $30 budget button
    if (mouseX > margin + bw1 + 30 && mouseX < margin + bw1 + bw2 + 30 && mouseY > 920 - buttonHeight/2 && mouseY < 920 + buttonHeight/2){
  b2hovered = true;
  } else { 
  b2hovered = false;  
  }
  
  for (var t = 0; t < 11; t++){
  var y = GRIDMID - lineheight/2 - 12;
  if (mouseX > margin + gridspace * t - dash/2 && mouseX < margin + gridspace * t + dash/2 &&
      mouseY > y - 24 && mouseY < y - 9){
               if (t === 0){
        hover2008 = true;
        } else if (t === 1){
        hover2009 = true;
        } else if (t === 2){
        hover2010 = true;
        } else if (t === 3){
        hover2011 = true;
        } else if (t === 4){
        hover2012 = true;
        } else if (t === 5){
        hover2013 = true;
        } else if (t === 6){
        hover2014 = true;
        } else if (t === 7){
        hover2015 = true;
        } else if (t === 8){
        hover2016 = true;
        } else if (t === 9){
        hover2017 = true;
        } else if (t === 10){
        hover2018 = true;
        } else {      
        hover2008 = false;
        hover2009 = false;
        hover2010 = false;
        hover2011 = false;
        hover2012 = false;
        hover2013 = false;
        hover2014 = false;
        hover2015 = false;
        hover2016 = false;
        hover2017 = false;
        hover2018 = false;
        }
      }
  }
        console.log(view);
        console.log(hover2008);
}

function mouseClicked(){
  if (budgetscale === XL && b2hovered === true){
    budgetscale = SM;
    cap.setTarget(capSM);
  } else if (budgetscale === SM && b1hovered === true){
    budgetscale = XL;
    cap.setTarget(capXL);
  }
  if (view === MAIN){
    if (hover2008 === true){
    view = y2008; 
    
    }
  }

}

function setup() {
  createCanvas(1900,1000);
  rectMode(CENTER);
  view = MAIN;
  cap = new SoftFloat(250, 0.2, 0.2);
  
  for (var r = 0; r < table.getRowCount(); r++){
    var movie = {};
    movie.date = parseInt(table.getRow(r).get("date"));
    movie.budget = parseFloat(table.getRow(r).get("budget"));
    movie.title = table.getRow(r).get("title");
    movie.awards = parseInt(table.getRow(r).get("awards"));
    movie.best = table.getRow(r).get("best");
    movie.ratio = parseFloat(table.getRow(r).get("ratio"));
    movie.id = r;
    movie.x = margin + gridspace * abs(startyear - movie.date);
    movie.y = map(movie.budget, 0, cap, GRIDMID + lineheight/2, GRIDMID - lineheight/2);
    movie.hovered = false;
    movies.push(movie);
  }
}


function draw() {
  background(0);
  stroke('#33323D');
  strokeWeight(2);
  noFill();
  cap.update();
  
    for (var t = 0; t < 11; t++){
        // SETTING UP TIME NAVIGATION
        push();
        stroke('#ffffff');
        strokeWeight(2);
        noFill();
        var y = GRIDMID - lineheight/2 - 12;
        line(margin + gridspace * t - dash/2 - 2, y, margin + gridspace * t + dash/2 - 2, y);
        if (mouseX > margin + gridspace * t - dash/2 && mouseX < margin + gridspace * t + dash/2 &&
            mouseY > y - 24 && mouseY < y - 9){
            stroke('#fff000');
            line(margin + gridspace * t - dash/2 - 2, y, margin + gridspace * t + dash/2 - 2, y);
        }
        // console.log(hover2008);
          // str("hover" + 2008 + t) === true;
        pop();
  }
  
// // // // // // // // //  MAIN VIEW  // // // // // // // // // 
if(view === MAIN){
  
  $('h1').text("HOW MUCH DOES IT COST TO BE THE BEST");  
  $('h2').text("A decade of Best Picture winners and nominees by budget");

  for (var g = 0; g < 11; g++){
        // DRAW GRID LINES
        push();
        stroke('#33323D');
        strokeWeight(2);
        noFill();
        line(margin + gridspace * g, GRIDMID + lineheight/2, margin + gridspace * g, GRIDMID - lineheight/2);
        pop();
  }
  
  for (var m = 0; m < movies.length; m++){ 
      // DRAW MOVIE DATA CIRCLES
    if (movies[m].date >= startyear){
      if (movies[m].best != "TRUE"){
        // if (movies[m].hovered === true){ // TITLE ON HOVER: COMMENT OUT, START ON THIS LINE
        //   push();  
        //   fill(130);
        //   noStroke();
        //   textSize(16);
        //   textFont(graphik);
        //   text(movies[m].title, margin + gridspace * abs(startyear - movies[m].date) - 11, 
        //   map(movies[m].budget, 0, cap.get(), GRIDMID + lineheight/2, GRIDMID - lineheight/2)-42);  
        //   pop();
        //   }       // MOVIE TITLE ON HOVER, TO COMMENT OUT, END ON THIS LINE
        fill(60, 60, 70, 170); 
        noStroke();
        ellipse(margin + gridspace * abs(startyear - movies[m].date), 
          map(movies[m].budget, 0, cap.get(), GRIDMID + lineheight/2, GRIDMID - lineheight/2),
          r * movies[m].awards, r * movies[m].awards);
        }
      }
    }
 
   for (var m = 0; m < movies.length; m++){ 
       // DRAW MOVIE DATA CIRCLES / BEST PICTURE WINNERS
    if (movies[m].date >= startyear){
      if (movies[m].best == "TRUE"){
        if (movies[m].hovered === true){
        push();
        strokeWeight(3);
        stroke('#ffffff'); 
        ellipse(margin + gridspace * abs(startyear - movies[m].date), 
              map(movies[m].budget, 0, cap.get(), GRIDMID + lineheight/2, GRIDMID - lineheight/2),
              r * movies[m].awards, r * movies[m].awards);
        pop();
        push();  // MOVIE TITLE ON HOVER
        fill(255);
        noStroke();
        textSize(16);
        textFont(graphik);
        text(movies[m].title, margin + gridspace * abs(startyear - movies[m].date) - 11, 
             map(movies[m].budget, 0, cap.get(), GRIDMID + lineheight/2, GRIDMID - lineheight/2)-42);  
        pop();
        
        push();  // MOVIE BUDGET ON HOVER
        fill('#FAAB19');
        noStroke();
        textSize(32);
        textFont(graphik);
        text("$" + movies[m].budget + "m", margin + gridspace * abs(startyear - movies[m].date) - 32, 
              map(movies[m].budget, 0, cap.get(), GRIDMID + lineheight/2, GRIDMID - lineheight/2) - 60);  
        pop();
        } else {
        push();
        strokeWeight(1.5);
        stroke('#FAAB19');
        noFill();
        ellipse(margin + gridspace * abs(startyear - movies[m].date), 
              map(movies[m].budget, 0, cap.get(), GRIDMID + lineheight/2, GRIDMID - lineheight/2),
              r * movies[m].awards, r * movies[m].awards);
        }
        pop();
      }
    }
  }
    push();                 // draws fill of button shapes
    noStroke();
    fill('#434d66');
    rect(margin + bw1/2, 920, bw1, buttonHeight);
    rect(margin + bw1 + bw2/2 + 30, 920, bw2, buttonHeight);
    pop();
    
    if (budgetscale === SM){ // sets highlight of button and number scale
    strokeWeight(3);
    stroke("#ffffff");
    noFill();
    rect(margin + bw1 + bw2/2 + 30, 920, bw2, buttonHeight);
      for (var y = 0; y < 31; y = y + 5){
      noStroke();
      textSize(18);
      fill("#565569");
      text(30 - y + " mil", 1510, 150 + lineheight/6 * y/5);
      }
    } else if (budgetscale === XL){ // sets highlight of button and number scale
    strokeWeight(3);
    stroke("#ffffff");
    noFill();
    rect(margin + bw1/2, 920, bw1, buttonHeight);
      for (var y = 0; y < 251; y = y + 50){
      noStroke();
      textSize(18);
      fill("#565569");
      text(250 - y + " mil", 1510, 150 + lineheight/5 * y/50);
      }
    }
    
  for (var t = startyear; t < 2019; t++){
    // DRAW DATES
    push();
    fill(255);
    noStroke();
    textFont(apercu);
    textSize(18);
    text(t, margin - yearoffset + gridspace * abs(startyear-t), 120);
    textSize(14);
    text("I'm rolling in cash", margin + 15, 925);
    text("Let's keep this film under $30 million", margin + bw1 + 47, 925);
  }
}
//////////////////////////  MAIN VIEW  //////////////////////////
  
  
////////////////////////// YEAR VIEW  ///////////////////////////  
  if (view !== MAIN ){
    
    $('h1').text("PRICE PER OSCAR NOMINATIONS (in millions)");  
    $('h2').text("the total budget divided by number of film's total nominations");
    background(0);
  }
}
  
//   if (view === y2018){
//     for (var c = 0; c < movies.length; c++){
//     console.log(movies[c].date);
//     }
//   }
  
// }
   

// // SUCKY ATTEMPT TO HIGHLIGHT NONWINNERS 
//   for (var m = 0; m < movies.length; m++){ 
//       // DRAW MOVIE DATA CIRCLES
//     if (movies[m].date >= startyear){
//       if (movies[m].best != "TRUE"){
//         if (movies[m].hovered === false){
//         fill(60, 60, 70, 170); 
//         noStroke();
//         ellipse(margin + gridspace * abs(startyear - movies[m].date), 
//                   map(movies[m].budget, 0, 250, GRIDMID + lineheight/2, GRIDMID - lineheight/2),
//                   r * movies[m].awards, r * movies[m].awards);
//         }
//       }
//     }
//   }      
//   for (var m = 0; m < movies.length; m++){ 
//       // DRAW MOVIE DATA CIRCLES
//     if (movies[m].date >= startyear){
//       if (movies[m].best != "TRUE"){
//         if (movies[m].hovered === true){
//         fill(70, 70, 77, 200);   
//         noStroke();
//         ellipse(margin + gridspace * abs(startyear - movies[m].date), 
//                   map(movies[m].budget, 0, 250, GRIDMID + lineheight/2, GRIDMID - lineheight/2),
//                   r * movies[m].awards, r * movies[m].awards);
//         }
//       }
//     }
//   }  
// // END OF SUCKY ATTEMPT TO HIGHLIGHT NONWINNERS

// LITTLE ENDPOINTS
        // var endpoint = 7; (put this at top)
        // ellipse(margin + gridspace * g, GRIDMID - lineheight/2 - endpoint/2, endpoint, endpoint);
        // ellipse(margin + gridspace * g, GRIDMID + lineheight/2 + endpoint/2, endpoint, endpoint);
        
// SCALE? 
// var scalegap;
// var currentscale;
// var scale1 = ["< 1 mil", "100 mil", "150 mil", "20 mil", "250 mil"];
// // var scale1 = [0,50,100,150,200,250];
// var scale2 = [0.99, 5, 10, 15, 20, 25, 30];

