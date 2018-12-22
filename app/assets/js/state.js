const animationState = {
    RUNNING: "RUNNING",
    JUMPING: "JUMPING",
    ROLLING: "ROLLING",
};

var gameState = {
    sprites: {},
    playerInfo: {
        activeAnimation: animationState.RUNNING, // active player animation state
    },
    groundSurface: {
        x: 30,
        y: 230,
    }
}