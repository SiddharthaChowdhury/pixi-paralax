window.addEventListener("keydown", event => onKeyDown(event));

function onKeyDown (event) {
    switch(event.keyCode) {
        case 40:
            rollingPlayer();
            break;
        case 38:
            jumpingPlayer();
            break;
        case 39:
            shooting();
            break;
    }
    
}
