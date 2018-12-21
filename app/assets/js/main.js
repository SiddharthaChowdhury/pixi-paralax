var
Container               = PIXI.Container,
TestureCache            = PIXI.utils.TextureCache,
TilingSprite            = PIXI.TilingSprite,
stage                   = new Container(),
autoDetectRenderer      = PIXI.autoDetectRenderer,
loader                  = PIXI.loader,
resources               = loader.resources,
sprites                 = {},
animations              = {};

let renderer = autoDetectRenderer(512, 256);

function init() {
    renderer.backgroundColor = 0xffffff;
    document.body.appendChild(renderer.view);

    stage.interactive = true;
    loadResource();
}

function loadResource() {
    loader.add('hills', '/image/far_0.png');
    loader.add('clouds', '/image/far_1.png');
    loader.add('playerSpriteSheet','/sprites/playerrun.json');
    loader.on('progress', (_loader, resource) => {
        // console.log(`Loading: ${resource.name} (${_loader.progress}%)`);
    });
    loader.load((_loader, resources) => {
        // console.log("All files loaded..")
        setup();
        runningPlayer();
    })
}

function setup() {
    console.log("TestureCache ", TestureCache);
    console.log("resources ", resources);
    let hills = resources.hills.texture;
    let clouds = resources.clouds.texture;

    sprites.hills = new PIXI.TilingSprite(hills, hills.baseTexture.width, hills.baseTexture.height);
    sprites.clouds = new PIXI.TilingSprite(clouds, clouds.baseTexture.width, clouds.baseTexture.height);

    addToStage(sprites.hills, {x: 0, y: 128}, {x: 0, y: 0})
    addToStage(sprites.clouds, {x: 0, y: 0}, {x: 0, y: 0})

    update();
}

function addToStage(sprite, position, tilePosition = null) {
    sprite.position.x = position.x;
    sprite.position.y = position.y;

    if (tilePosition !== null ) {
        sprite.tilePosition.x = tilePosition.x;
        sprite.tilePosition.y = tilePosition.y;
    }
    
    stage.addChild(sprite);
}

function update() {
    sprites.hills.tilePosition.x -= 0.2;
    sprites.clouds.tilePosition.x -= 0.4;

    renderer.render(stage);

    requestAnimationFrame(update);
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

    console.log("testure Frames ", textureArrayRunning)

    let animatedRunningSprite = new PIXI.extras.AnimatedSprite(textureArrayRunning);
    animatedRunningSprite.position.set(30,230);
    animatedRunningSprite.anchor.set(0.5);
    animatedRunningSprite.animationSpeed = .15;
    animatedRunningSprite.play();

    stage.addChild(animatedRunningSprite);
    update();
}
