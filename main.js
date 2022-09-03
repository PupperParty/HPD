hedwig = "Hedwig.mp3";
pp = "PP.mp3";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY =  0;
scoreleftWrist = 0;
scoreleftWrist = 0;
song_status = "";

function preload() {
    hedwig = loadSound("Hedwig.mp3");
    pp = loadSound("PP.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0, 0, 600, 500);
    
    fill("#08FF08");
    stroke("#08FF08");

   if(scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    hedwig.stop();
    if(song_status = false) {
        song_status = pp.isPlaying();
        document.getElementById("played_song").innerHTML = "Song playing : Peter Pan Theme";
       }
   }
   
   if(scoreRightWrist > 0.2) {
    circle(rightWristX, rightWristY, 20);
    pp.stop();
    if(song_status = false) {
        song_status = hedwig.isPlaying();
        document.getElementById("played_song").innerHTML = "Song playing : Hedwig's Theme";
    }
   }
   
}
function play(){
    song.play();
}
function modelLoaded(){
    console.log('Posenet is Initialized');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score
        scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

    }
}
