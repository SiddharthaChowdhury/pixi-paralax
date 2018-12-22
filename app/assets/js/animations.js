/*
    ---------------- ANIMATIONS ----------------

    PIXI.AnimatedSprite - http://pixijs.download/dev/docs/PIXI.AnimatedSprite.html
    Smoothie - https://github.com/kittykatattack/smoothie
*/


function runningPlayer () {
    gameState.playerInfo.activeAnimation = animationState.RUNNING;
    let textureArrayRunning = [];

    for (let i = 1; i <= 3; i++) {
        let testure = TextureCache['run'+i];
        textureArrayRunning.push(testure);
    }

    let animationRunningSprite = new PIXI.extras.AnimatedSprite(textureArrayRunning);
    animationRunningSprite.position.set(gameState.groundSurface.x, gameState.groundSurface.y);
    animationRunningSprite.anchor.set(0, 1);
    animationRunningSprite.animationSpeed = .15;
    animationRunningSprite.play();

    flushPlayerContainer();
    player.addChild(animationRunningSprite);
}


function jumpingPlayer () {
    if (gameState.playerInfo.activeAnimation != animationState.RUNNING ) {
        return;
    }
    gameState.playerInfo.activeAnimation = animationState.JUMPING;

    let jumpingSpriteArr = [TextureCache['jump']];
    let jumpingSprite = new PIXI.extras.AnimatedSprite(jumpingSpriteArr);
    let jumpDelta = 5;

    var smoothie = new Smoothie({
        engine: PIXI, 
        renderer: renderer,
        root: stage,
        update: update.bind(this),
        fps: 50
    });

    flushPlayerContainer();
    player.addChild(jumpingSprite);
    let jumpState = "UP";

    function update(){
    
        if (jumpState === "LAND") {
            // console.log("Landing", player.y)
            player.y = gameState.groundSurface.y
            smoothie.pause();
            toDefaultPlayerAnimation();
        }

        if (jumpState === "DOWN") {
            // console.log("falling down", player.y)
            player.y += jumpDelta;

            if (player.y > gameState.groundSurface.y - jumpDelta) {
                jumpState = "LAND";
            }
        }
        
        if (jumpState === "UP") {
            // console.log("going up", player.y)
            player.y -= jumpDelta;
            if (player.y < 160 ) {
                jumpState = "DOWN";
            }
        }

    }

    smoothie.start();
}


function rollingPlayer () {
    gameState.playerInfo.activeAnimation = animationState.ROLLING;
    let textureArrayRolling = [];

    for (let i = 1; i <= 6; i++) {
        let testure = TextureCache['roll'+i];
        textureArrayRolling.push(testure);
    }

    let animationRollingSprite = new PIXI.extras.AnimatedSprite(textureArrayRolling);
    animationRollingSprite.animationSpeed = .15;
    animationRollingSprite.loop = false;
    animationRollingSprite.onComplete = () => {
        resetPlayer();
    }
    animationRollingSprite.play();
    flushPlayerContainer();
    player.addChild(animationRollingSprite);
}

function flushPlayerContainer() {
    for (let i = 0; i < player.children.length; i++) {
        player.removeChildAt(i);
    }
}

function toDefaultPlayerAnimation(){
    runningPlayer();
}