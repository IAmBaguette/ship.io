var player = (function (state, player = {}) {
    boat.call(this, state, player);
    this.input = this.state.input;
});

player.prototype = Object.create(boat.prototype);
player.prototype.constructor = player;

player.prototype.update = function () {
    if (this.input.getKey(KeyCode.UpArrow)) {
        // increase movement speed
        this.x += Math.cos(this.rotation) * this.movementSpeed;
        this.y += Math.sin(this.rotation) * this.movementSpeed;
    }
    if (this.input.getKey(KeyCode.DownArrow)) {
        // slow down movement speed
    }

    if (this.input.getKey(KeyCode.LeftArrow)) {
        this.rotation -= this.rotateSpeed;
    }
    if (this.input.getKey(KeyCode.RightArrow)) {
        this.rotation += this.rotateSpeed;
    }
};