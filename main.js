var noseX = 0;
var noseY = 0;
var difference = 0;
var leftWristX = 0;
var rightWristX = 0;
var img;

function preload()
{
    img = loadImage("angryimg.png");
}

function setup()
{
    video = createCapture(VIDEO);
    video.size(600, 730);
    video.position(200, 100)
    canvas = createCanvas(500, 500)
    canvas.position(1200, 200);

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function modelLoaded()
{
    console.log("Model is loaded!");
}

function draw()
{
    background("#dde3c1")
    document.getElementById("square_side").innerHTML = "Width and height of the square is " + difference + 'px';
    fill("#61ddff")
    stroke("#61ddff")
    imageMode(CENTER)
    image(img , noseX, noseY, difference, difference);
}

function gotPoses(results, error)
{
    if(error)
    {
        console.log(error)
    }
    else if(results.length > 0)
    {
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristX = results[0].pose.leftWrist.x;

        difference = floor(leftWristX - rightWristX);

        //console.log(results)
        console.log("the x of the right wrist is: " + rightWristX);
        console.log("the x of the left wrist is: " + leftWristX);
        console.log("The x of the nose is: " + noseX + "The y of nose is: " + noseY);
        console.log("----------------------------------------------")
    }
}