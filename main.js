

// #region Animation
function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    //this.addEntity(new StartScreen(gameEngine, ASSET_MANAGER.getAsset("./img/background.jpg")));
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}
// #endregion

// #region Background
Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "SaddleBrown";
    ctx.fillRect(0,500,1200,300);
    
    Entity.prototype.draw.call(this);
}
// #endregion 

// Beginning StartScreen
function StartScreen(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

StartScreen.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

StartScreen.prototype.update = function () {
};





//Dino region
function Dino(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 0, 0, 960 / 5, 576 / 3, 0.3, 10, true, false);
    this.WalkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dinoReverse.png"), 0, 0, 960 / 5, 576 / 3, 0.3, 10, true, true);
    this.TurnLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, false);
    this.TurnRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, true);
    this.jumping = false;
    this.speed = 50;
    this.radius = 0;
    this.ground = 462;
    this.walkLeft = true;
    this.walkRight = false; 
    this.jumpTime = 0;
    Entity.call(this, game, 100, 480);

}

Dino.prototype = new Entity();
Dino.prototype.constructor = Dino;

Dino.prototype.update = function() {
    
        if(this.walkLeft) {
            this.x -= this.game.clockTick * this.speed;
            if(this.x <= 100) {
                this.walkLeft = false;
                this.walkRight = true;
            }
        }
        else {
            this.x += this.game.clockTick * this.speed;
            if(this.x >= 1000) {
                this.walkRight = false;
                this.walkLeft = true;
            }
        }

        if(this.walkLeft) {
            this.x -= this.game.clockTick * this.speed;
            if(this.x <= 100) {
                this.walkLeft = false;
                this.walkRight = true;
            }
        }
        else {
            this.x += this.game.clockTick * this.speed;
            if(this.x >= 1000) {
                this.walkRight = false;
                this.walkLeft = true;
            }
        }

    Entity.prototype.update.call(this);

}

Dino.prototype.draw = function (ctx) {
    if(this.walkLeft) {
        this.WalkLeftAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
        // this.walkRightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}
//end region

//Ghost region
//576 x 384
function Ghost(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/ghost.png"), 0, 0, 576 / 9, 384 / 6, 0.5, 9, true, false);
    this.WalkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ghost2.png"), 0, 64, 576/ 9, 384 / 6, 0.5, 9, true, true);
    //this.TurnLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, false);
    //this.TurnRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, true);
    this.jumping = false;
    this.speed = 60;
    this.radius = 0;
    this.ground = 462;
    this.walkLeft = true;
    this.walkRight = false; 
    this.jumpTime = 0;
    Entity.call(this, game, 100, 400);

}

Ghost.prototype = new Entity();
Ghost.prototype.constructor = Ghost;

Ghost.prototype.update = function() {
    
        if(this.walkLeft) {
            this.x -= this.game.clockTick * this.speed;
            if(this.x <= 100) {
                this.walkLeft = false;
                this.walkRight = true;
            }
        }
        else {
            this.x += this.game.clockTick * this.speed;
            if(this.x >= 1000) {
                this.walkRight = false;
                this.walkLeft = true;
            }
        }

        if(this.walkLeft) {
            this.x -= this.game.clockTick * this.speed;
            if(this.x <= 100) {
                this.walkLeft = false;
                this.walkRight = true;
            }
        }
        else {
            this.x += this.game.clockTick * this.speed;
            if(this.x >= 1000) {
                this.walkRight = false;
                this.walkLeft = true;
            }
        }

    Entity.prototype.update.call(this);

}

Ghost.prototype.draw = function (ctx) {
    if(this.walkLeft) {
        this.WalkLeftAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
        // this.walkRightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}
//568 x 839
//Ghost region
//576 x 384
function Bird2(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/bird2.png"), 0, 0, 880 / 8, 1280 / 10, 0.5, 80, true, false);
    //this.WalkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ghost2.png"), 0, 64, 576/ 9, 384 / 6, 0.5, 9, true, true);
    //this.TurnLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, false);
    //this.TurnRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, true);
    this.jumping = false;
    this.speed = 300;
    this.radius = 0;
    this.ground = 462;
    this.walkLeft = true;
    this.walkRight = false; 
    this.jumpTime = 0;
    Entity.call(this, game, 300, 225);

}

Bird2.prototype = new Entity();
Bird2.prototype.constructor = Bird2;

Bird2.prototype.update = function() {
    

    Entity.prototype.update.call(this);

}

Bird2.prototype.draw = function (ctx) {
    if(this.walkLeft) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
        // this.walkRightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}
function Bird(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/bird.png"), 0, 0, 880 / 8, 1280 / 10, 0.5, 80, true, false);
    //this.WalkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ghost2.png"), 0, 64, 576/ 9, 384 / 6, 0.5, 9, true, true);
    //this.TurnLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, false);
    //this.TurnRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, true);
    this.jumping = false;
    this.speed = 100;
    this.radius = 0;
    this.ground = 462;
    this.walkLeft = true;
    this.walkRight = false; 
    this.jumpTime = 0;
    Entity.call(this, game, 30, 225);

}

Bird.prototype = new Entity();
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
    

    Entity.prototype.update.call(this);

}

Bird.prototype.draw = function (ctx) {
    if(this.walkLeft) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
        // this.walkRightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}

function Bird4(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/bird4.png"), 0, 0, 880 / 8, 1280 / 10, 0.5, 80, true, false);
    //this.WalkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ghost2.png"), 0, 64, 576/ 9, 384 / 6, 0.5, 9, true, true);
    //this.TurnLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, false);
    //this.TurnRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, true);
    this.jumping = false;
    this.speed = 100;
    this.radius = 0;
    this.ground = 462;
    this.walkLeft = true;
    this.walkRight = false; 
    this.jumpTime = 0;
    Entity.call(this, game, 900, 225);

}

Bird4.prototype = new Entity();
Bird4.prototype.constructor = Bird4;

Bird4.prototype.update = function() {
    

    Entity.prototype.update.call(this);

}

Bird4.prototype.draw = function (ctx) {
    if(this.walkLeft) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
        // this.walkRightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}

function Bird6(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/bird6.png"), 0, 0, 880 / 8, 1280 / 10, 0.5, 80, true, false);
    //this.WalkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ghost2.png"), 0, 64, 576/ 9, 384 / 6, 0.5, 9, true, true);
    //this.TurnLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, false);
    //this.TurnRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, true);
    this.jumping = false;
    this.speed = 100;
    this.radius = 0;
    this.ground = 462;
    this.walkLeft = true;
    this.walkRight = false; 
    this.jumpTime = 0;
    Entity.call(this, game, 1100, 225);

}

Bird6.prototype = new Entity();
Bird6.prototype.constructor = Bird6;

Bird6.prototype.update = function() {
    

    Entity.prototype.update.call(this);

}

Bird6.prototype.draw = function (ctx) {
    if(this.walkLeft) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
        // this.walkRightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}


function Man(game, x, y) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/man.png"), 0, 0, 880 / 8, 1280 / 10, 0.5, 80, true, false);
    //this.WalkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/ghost2.png"), 0, 64, 576/ 9, 384 / 6, 0.5, 9, true, true);
    //this.TurnLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, false);
    //this.TurnRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/dino.png"), 192, 0, 960 / 5, 576 / 3, 0.3, 3, true, true);
    this.jumping = false;
    this.speed = 100;
    this.radius = 0;
    this.ground = 462;
    this.walkLeft = true;
    this.walkRight = false; 
    this.jumpTime = 0;
    Entity.call(this, game, x, y);

}

Man.prototype = new Entity();
Man.prototype.constructor = Man;

Man.prototype.update = function() {
    

    Entity.prototype.update.call(this);

}

Man.prototype.draw = function (ctx) {
    if(this.walkLeft) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        //this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
        // this.walkRightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);



}


// the "main" code begins here
// #region Main
var ASSET_MANAGER = new AssetManager();

//ASSET_MANAGER.queueDownload("./img/traps.png");
ASSET_MANAGER.queueDownload("./img/dino.png");
ASSET_MANAGER.queueDownload("./img/dinoReverse.png");
ASSET_MANAGER.queueDownload("./img/background.jpg");
ASSET_MANAGER.queueDownload("./img/ghost.png");
ASSET_MANAGER.queueDownload("./img/ghost2.png");
ASSET_MANAGER.queueDownload("./img/bird.png");
ASSET_MANAGER.queueDownload("./img/bird2.png");
ASSET_MANAGER.queueDownload("./img/bird4.png");
ASSET_MANAGER.queueDownload("./img/bird6.png");
ASSET_MANAGER.queueDownload("./img/man.png");


ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    

    var gameEngine = new GameEngine();
   
    gameEngine.init(ctx);
    gameEngine.start();
 
});
