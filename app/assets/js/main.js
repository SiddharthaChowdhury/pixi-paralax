var
Container               = PIXI.Container,
TestureCache            = PIXI.utils.TextureCache,
TilingSprite            = PIXI.TilingSprite,
autoDetectRenderer      = PIXI.autoDetectRenderer,
loader                  = PIXI.loader,
resources               = loader.resources,
sprites                 = {},
animations              = {},
stage                   = new Container(),
scene                   = new Container(),
player                  = new Container();

let renderer = autoDetectRenderer(512, 256);

function init() {
    renderer.backgroundColor = 0xffffff;
    document.body.appendChild(renderer.view);

    stage.interactive = true;

    loadResource();
    loader.onComplete.add(() => {
        console.log("Loading Complete ...")
    })
}

function loadResource() {
    loader.add('hills', '/image/far_0.png');
    loader.add('clouds', '/image/far_1.png');
    loader.add('playerSpriteSheet','/sprites/playerrun.json');
    loader.on('progress', (_loader, resource) => {
        console.log(`Loading: ${resource.name} (${_loader.progress}%)`);
    });
    loader.load((_loader, resources) => {
        console.log("All files loaded ...");
        setup();
        update();
    })
}

function setup() {

    setupScene();
    setupPlayer();

    stage.addChild(scene);
    stage.addChild(player);

    function setupScene () {
        console.log("TestureCache ", TestureCache);
        console.log("resources ", resources);
        let hills = resources.hills.texture;
        let clouds = resources.clouds.texture;

        sprites.hills = new PIXI.TilingSprite(hills, hills.baseTexture.width, hills.baseTexture.height);
        sprites.clouds = new PIXI.TilingSprite(clouds, clouds.baseTexture.width, clouds.baseTexture.height);

        addToScene(sprites.hills, {x: 0, y: 128}, {x: 0, y: 0})
        addToScene(sprites.clouds, {x: 0, y: 0}, {x: 0, y: 0})
    }

    function setupPlayer () {
        runningPlayer();
    }
    
}

function addToScene(sprite, position, tilePosition = null) {
    sprite.position.x = position.x;
    sprite.position.y = position.y;

    if (tilePosition !== null ) {
        sprite.tilePosition.x = tilePosition.x;
        sprite.tilePosition.y = tilePosition.y;
    }
    
    scene.addChild(sprite);
}

function update() {
    sprites.hills.tilePosition.x -= 0.2;
    sprites.clouds.tilePosition.x -= 0.4;

    renderer.render(stage);

    window.requestAnimationFrame(update);
}

/*
    Animations
    http://pixijs.download/dev/docs/PIXI.AnimatedSprite.html
*/

function runningPlayer () {
    var textureArrayRunning = [];

    for (let i = 4; i <= 6; i++) {
        let testure = TestureCache[i+'.png'];
        textureArrayRunning.push(testure);
    }

    let animatedRunningSprite = new PIXI.extras.AnimatedSprite(textureArrayRunning);
    animatedRunningSprite.position.set(30,230);
    animatedRunningSprite.anchor.set(0.5);
    animatedRunningSprite.animationSpeed = .15;
    animatedRunningSprite.play();

    player.addChild(animatedRunningSprite);
    // update();
}

function jumpingPlayer () {
    ticker = new PIXI.ticker.Ticker();
    ticker.stop();
    ticker.add((deltaTime) => {
        // do something every frame
        console.log("deltaTime "+ deltaTime)
    });
    ticker.start();
}