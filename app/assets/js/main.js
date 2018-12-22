var
Container               = PIXI.Container,
TextureCache            = PIXI.utils.TextureCache,
TilingSprite            = PIXI.TilingSprite,
autoDetectRenderer      = PIXI.autoDetectRenderer,
loader                  = PIXI.loader,
resources               = loader.resources,
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

    renderer.plugins.interaction.on( 'mousedown', function() { 
        console.log('mousedown');  
        jumpingPlayer();
    });
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
    // player.interactive = true;
    // player.on( 'mousedown', function() { console.log('mousedown') } );

    function setupScene () {
        // console.log("TextureCache ", TextureCache);
        // console.log("resources ", resources);
        let hills = resources.hills.texture;
        let clouds = resources.clouds.texture;

        gameState.sprites.hills = new PIXI.TilingSprite(hills, hills.baseTexture.width, hills.baseTexture.height);
        gameState.sprites.clouds = new PIXI.TilingSprite(clouds, clouds.baseTexture.width, clouds.baseTexture.height);

        addToScene(gameState.sprites.hills, {x: 0, y: 128}, {x: 0, y: 0});
        addToScene(gameState.sprites.clouds, {x: 0, y: 0}, {x: 0, y: 0});
    }

    function setupPlayer () {
        toDefaultPlayerAnimation();
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
    gameState.sprites.hills.tilePosition.x -= 0.2;
    gameState.sprites.clouds.tilePosition.x -= 0.4;

    renderer.render(stage);

    window.requestAnimationFrame(update);
}