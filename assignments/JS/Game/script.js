var girl= document.getElementById("girl");
idleImageNumber = 1;
idleAnimationNumber = 0;

function idleAnimation(){
    idleImageNumber = idleImageNumber + 1;

    if (idleImageNumber == 11 ){
        idleImageNumber = 1;
    }

    girl.src = "resources/idle (" + idleImageNumber + ").png";
}

function idleAnimationStart(){
    idleAnimationNumber = setInterval(idleAnimation,200);
}

runImageNumber = 1;
runAnimationNumber = 0;

function runAnimation(){

    // runImageNumber = runImageNumber + 1;
    //
    // if (runImageNumber == 9){
    //     runImageNumber = 1;
    // }
    //
    // girl.src = "resources/run("+runImageNumber+").png";

    runImageNumber = runImageNumber + 1;

    if (runImageNumber == 9 ){
        runImageNumber = 1;
    }

    girl.src = "resources/run (" + runImageNumber + ").png";

}

function runAnimationStart(){
   runAnimationNumber = setInterval(runAnimation,100);
    clearInterval(idleAnimationNumber);
}

jumpImageNumber = 1;
jumpAnimationNumber = 0;
girlMarginTop = 300;

function jumpAnimation(){

    jumpImageNumber = jumpImageNumber + 1;

    if (jumpImageNumber <= 6){
        girlMarginTop = girlMarginTop - 20;
        girl.style.marginTop = girlMarginTop + "px";
    }

    if (jumpImageNumber >= 7){
        girlMarginTop = girlMarginTop + 20;
        girl.style.marginTop = girlMarginTop + "px";
    }

    if (jumpImageNumber == 11 ){
        jumpImageNumber = 1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = 0;
        runImageNumber = 0;
        runAnimationStart();
    }

    girl.src = "resources/jump (" + jumpImageNumber + ").png";
}

function jumpAnimationStart(){
    clearInterval(idleAnimationNumber);
    runImageNumber=0;
    clearInterval(runAnimationNumber);
    jumpAnimationNumber = setInterval(jumpAnimation,100);
}

function keyCheck(event) {
    // alert(event.which);
    // enter=13
    //    space=32

    var keyCode = event.which;

    if (keyCode == 13) {
        if (runAnimationNumber == 0) {
            runAnimationStart();
        }

    if (moveBackgroundAnimationId == 0) {
        moveBackgroundAnimationId = setInterval(moveBackground, 100);
    }
}

    if (keyCode == 32){
        if (jumpAnimationNumber == 0) {
            jumpAnimationStart();
        }

        if (moveBackgroundAnimationId == 0) {
            moveBackgroundAnimationId = setInterval(moveBackground, 100);
        }
    }
}

var backgroundImagePositionX = 0;
var moveBackgroundAnimationId = 0;

function moveBackground(){

    backgroundImagePositionX = backgroundImagePositionX - 20;

    document.getElementById("background").style.backgroundPositionX = backgroundImagePositionX + "px";
}

boxMarginLeft = 500;

function createBoxes(){

    for (var i = 0; i < 10; i++) {

        var box = document.createElement("div");
        box.className = "box";
        document.getElementById("background").appendChild(box);
        box.style.marginLeft = boxMarginLeft + "px";

        // boxMarginLeft = boxMarginLeft + 1000;

        if ( i < 5){
            boxMarginLeft = boxMarginLeft + 500;
        }

        if ( i>=5){
            boxMarginLeft = boxMarginLeft + 250;
        }
    }
}