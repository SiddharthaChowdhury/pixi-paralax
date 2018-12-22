/*
    ---------------- ANIMATIONS ----------------

    PIXI.AnimatedSprite - http://pixijs.download/dev/docs/PIXI.AnimatedSprite.html
    Smoothie - https://github.com/kittykatattack/smoothie
*/


function runningPlayer () {
    gameState.playerInfo.activeAnimation = animationState.RUNNING;
    var textureArrayRunning = [];

    for (let i = 4; i <= 6; i++) {
        let testure = TextureCache[i+'.png'];
        textureArrayRunning.push(testure);
    }

    let animationRunningSprite = new PIXI.extras.AnimatedSprite(textureArrayRunning);
    animationRunningSprite.position.set(gameState.groundSurface.x, gameState.groundSurface.y);
    animationRunningSprite.anchor.set(0.5);
    animationRunningSprite.animationSpeed = .15;
    animationRunningSprite.play();
    gameState.activeAnimation = animationState.RUNNING;
    flushPlayerContainer();
    player.addChild(animationRunningSprite);
}


function jumpingPlayer () {
    if (gameState.playerInfo.activeAnimation != animationState.RUNNING ) {
        return;
    }
    gameState.playerInfo.activeAnimation = animationState.JUMPING;

    let jumpingSpriteArr = [TextureCache['3.png']];
    let jumpingSprite = new PIXI.extras.AnimatedSprite(jumpingSpriteArr);
    let jumpDelta = 5;

    jumpingSprite.anchor.set(0.5);
    jumpingSprite.position.set(gameState.groundSurface.x, gameState.groundSurface.y);

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
            // console.log("Landing", jumpingSprite.y)
            jumpingSprite.y = gameState.groundSurface.y
            smoothie.pause();
            toDefaultPlayerAnimation();
        }

        if (jumpState === "DOWN") {
            // console.log("falling down", jumpingSprite.y)
            jumpingSprite.y += jumpDelta;

            if (jumpingSprite.y > gameState.groundSurface.y - jumpDelta) {
                jumpState = "LAND";
            }
        }
        
        if (jumpState === "UP") {
            // console.log("going up", jumpingSprite.y)
            jumpingSprite.y -= jumpDelta;
            if (jumpingSprite.y < 160 ) {
                jumpState = "DOWN";
            }
        }

    }

    smoothie.start();
}


function flushPlayerContainer() {
    for (let i = 0; i < player.children.length; i++) {
        player.removeChildAt(i);
    }
}

function toDefaultPlayerAnimation(){
    runningPlayer();
}