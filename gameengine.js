// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

var music = new Audio("./temp.mp3"); 

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


function Timer() {
    this.gameTime = 0;
    this.maxStep = 5;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.entities = [];
    this.entities.Character = null;
    this.showOutlines = false;
    this.a = null;
    this.d = null;
    this.s = null;
    this.c = null;
    this.r = null;
    this.l = null;
    this.p = null;
    this.space = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.count = 0;
    this.music = false;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    var that = this;
    var bg = new Background(this);
    var ghost = new Ghost(this);
    var bird = new Bird(this);
    var screen = new StartScreen(this, ASSET_MANAGER.getAsset("./img/background.jpg"));
    var bird2 = new Bird2(this);
    var bird4 = new Bird4(this);
    var bird6 = new Bird6(this);
    



            var dino = new Dino(this);
            

            this.addEntity(screen); 
            //this.addEntity(bg);

            this.addEntity(dino); 
            this.addEntity(bird); 
            this.addEntity(bird2);
            this.addEntity(bird4);
            this.addEntity(bird6);
            this.addEntity(ghost);
    
            this.ctx.canvas.addEventListener("click", function (e) {
                if(that.count === 0) {
                    that.count++;
                    music.play();
                }
                var man = new Man(that, e.clientX,e.clientY);
                that.addEntity(man);
                

        
        
                         
                
        
            }, false);
            

    

}

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    if(this.entities.Character != null) {
        this.entities.Character.draw(this.ctx);
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;
    if(this.entities.Character != null) {
        this.entities.Character.update();
    }
    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.space = null;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}
