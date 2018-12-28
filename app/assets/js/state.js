const animationState = {
    RUNNING: "RUNNING",
    JUMPING: "JUMPING",
    ROLLING: "ROLLING",
    SHOOTING: "SHOOTING",
};

var state = {
    sprites: {},
    timeSlow: 0,
    playerInfo: {
        activeAnimation: animationState.RUNNING, // active player animation state
        jumpDelta: 5,
        rollDelta: 15,
    },
    groundSurface: {
        x: 30,
        y: 230,
    }
}

var gameState = state;

function setState(change = null) {
    console.log("state OLD: ", gameState);
    if(!change) {
        gameState = state;
    } else {
        gameState = Object.assign({}, gameState, change);
    }
    console.log("state CHANGE: ", gameState);
    // update();

    return;
}