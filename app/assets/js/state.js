const animationState = {
    RUNNING: "RUNNING",
    JUMPING: "JUMPING",
    DUCKING: "DUCKING",
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