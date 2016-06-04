var entity = (function (state, entity = {}) {
    this.state = state;
    this.x = entity.x || 0;
    this.y = entity.y || 0;
    this.width = entity.width || 0;
    this.height = entity.height || 0;
    this.rotation = entity.rotation || 0;
});

entity.prototype.update = function () { };

entity.prototype.draw = function (ctx) { };
var boat = (function (state, boat = {}) {
    entity.call(this, state, boat);
    this.movementSpeed = boat.movementSpeed || 0;
    this.rotateSpeed = boat.rotateSpeed || 0;
});

boat.prototype = Object.create(entity.prototype);
boat.prototype.constructor = boat;

boat.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.translate(-this.width / 2, -this.height / 2)
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
};
var player = (function (state, player = {}) {
    boat.call(this, state, player);
    this.input = this.state.input;
});

player.prototype = Object.create(boat.prototype);
player.prototype.constructor = player;

player.prototype.update = function () {
    if (this.input.getKey(KeyCode.UpArrow)) {
        this.x += Math.cos(this.rotation) * this.movementSpeed;
        this.y += Math.sin(this.rotation) * this.movementSpeed;
    }
    if (this.input.getKey(KeyCode.DownArrow)) {
        // slow down
    }

    if (this.input.getKey(KeyCode.LeftArrow)) {
        this.rotation -= this.rotateSpeed;
    }
    if (this.input.getKey(KeyCode.RightArrow)) {
        this.rotation += this.rotateSpeed;
    }
};
var shipio = (function (stella) {
    this.stella = stella;
    this.input = this.stella.input;
    
    this.localPlayer = new player(this, { x: 100, y: 100, width: 100, height: 75, movementSpeed: 3, rotateSpeed: 0.05 });
});

shipio.prototype.update = function () {
    this.localPlayer.update();
};

shipio.prototype.draw = function (ctx) {
    ctx.fillStyle = "white";
    this.localPlayer.draw(ctx);
};