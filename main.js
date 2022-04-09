object = [];
status = "";


function preload(){
    sound = loadSound("alert.mp3");
    }

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function modelLoaded(){
    status = true;
    console.log("Model Loaded!!");
    

}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object = results;
    }
}

function draw(){
    image(video,0,0,380,380);
    
    //mage(img, 0, 0, 640, 420); // place this image on the canvas img,x,y,width,ht//

    if(status != ""){
        r = random(255);
        b = random(255);
        g = random(255);
        objectDetector.detect(video , gotResult);
        // exclamation equalto means not equal to//
      for(i=0;i < object.length;i++){
        document.getElementById("status").innerHTML = "Status : Object Detected";
          if(object[i].label == "person"){
            document.getElementById("number_of_objects").innerHTML = "Baby found";
            sound.stop();
          }
         else{
            document.getElementById("number_of_objects").innerHTML = "Baby not found";
            sound.play();
         }

        if(object.length <= 0){
            document.getElementById("number_of_objects").innerHTML = "Baby not detected";
            alertsound.play();
        }
        
        
        
        fill(r,g,b);
        percent = Math.floor(object[i].confidence*100);
        
        text(object[i].label + " " + percent + "%",object[i].x -10,object[i].y - 10);

        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
      }
    }
}
