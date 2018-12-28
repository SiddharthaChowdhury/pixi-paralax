/*
    ---------------- ANIMATIONS ----------------

    PIXI.AnimatedSprite - http://pixijs.download/dev/docs/PIXI.AnimatedSprite.html
    Smoothie - https://github.com/kittykatattack/smoothie
*/


function runningPlayer () {
    gameState.playerInfo.activeAnimation = animationState.RUNNING;
    let textureArrayRunning = [];

    for (let i = 1; i <= 6; i++) {
        textureArrayRunning.push(TextureCache['run'+i]);
    }

    let animationRunningSprite = new PIXI.extras.AnimatedSprite(textureArrayRunning);
    animationRunningSprite.animationSpeed = (.30 + gameState.timeSlow);
    animationRunningSprite.play();

    flushPlayerContainer();
    
    player.addChild(animationRunningSprite);
}


function jumpingPlayer () {
    if (gameState.playerInfo.activeAnimation != animationState.RUNNING ) {
        return;
    }
    gameState.playerInfo.activeAnimation = animationState.JUMPING;

    let textureArrayJumping = [];
    let testure = TextureCache['jump'];
    textureArrayJumping.push(testure);
    

    let animationJumpingSprite = new PIXI.extras.AnimatedSprite(textureArrayJumping);
    animationJumpingSprite.play();
    

    var smoothie = new Smoothie({
        engine: PIXI, 
        renderer: renderer,
        root: stage,
        update: update.bind(this),
        fps: 50
    });

    flushPlayerContainer();
    player.addChild(animationJumpingSprite);
    let jumpState = "UP";

    function update(){
    
        if (jumpState === "LAND") {
            player.y = gameState.groundSurface.y
            smoothie.pause();
            toDefaultPlayerAnimation();
        }

        if (jumpState === "DOWN") {
            player.y += gameState.playerInfo.jumpDelta;

            if (player.y > gameState.groundSurface.y - gameState.playerInfo.jumpDelta) {
                jumpState = "LAND";
            }
        }
        
        if (jumpState === "UP") {
            player.y -= gameState.playerInfo.jumpDelta;
            if (player.y < 160 ) {
                jumpState = "DOWN";
            }
        }

    }

    smoothie.start();
}


function rollingPlayer () {
    if (gameState.playerInfo.activeAnimation != animationState.RUNNING ) {
        return;
    }
    gameState.playerInfo.activeAnimation = animationState.ROLLING;
    let textureArrayRolling = [];

    for (let i = 1; i <= 10; i++) {
        let testure = TextureCache['roll'+i];
        textureArrayRolling.push(testure);
    }

    let animationRollingSprite = new PIXI.extras.AnimatedSprite(textureArrayRolling);
    animationRollingSprite.animationSpeed = .20 + gameState.timeSlow;
    animationRollingSprite.loop = false;
    animationRollingSprite.onComplete = () => {
        resetPlayer();
    }
    animationRollingSprite.play();
    flushPlayerContainer();

    player.y += (gameState.playerInfo.rollDelta);
    player.addChild(animationRollingSprite);
}

function shooting () {
    if (gameState.playerInfo.activeAnimation != animationState.RUNNING ) {
        return;
    }

    gameState.playerInfo.activeAnimation = animationState.SHOOTING;
    let textureArryShooting = [];

    for (let i = 1; i <= 6; i++) {
        textureArryShooting.push(TextureCache['shoot'+i]);
    }

    setState({timeSlow: -.15})
    let animationShootingSprite = new PIXI.extras.AnimatedSprite(textureArryShooting);
    animationShootingSprite.animationSpeed = .30 + gameState.timeSlow;
    animationShootingSprite.loop = false;
    animationShootingSprite.onComplete = () => {
        setState(null);
        resetPlayer();
    }

    animationShootingSprite.play();

    // console.log("Player getBounds: ", player.getBounds());
    flushPlayerContainer();
    player.addChild(animationShootingSprite);
    // console.log("Player getBounds: ", player.getBounds(), animationShootingSprite.getBounds());
}

function flushPlayerContainer() {
    for (let i = 0; i < player.children.length; i++) {
        player.removeChildAt(i);
    }
}

function toDefaultPlayerAnimation(){
    runningPlayer();
}