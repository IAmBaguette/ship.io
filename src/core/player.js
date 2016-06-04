var player = (function (state, player) {
    player = player || {};
    boat.call(this, state, player);
    this.input = this.state.input;
});

player.prototype = Object.create(boat.prototype);
player.prototype.constructor = player;

player.prototype.update = function () {
    if (this.input.getKey(KeyCode.UpArrow)) {
        // increase current movement speed
        this.currentMovementSpeed = clamp(this.currentMovementSpeed + this.forwardSpeed, 0, this.topForwardSpeed);
    }
    if (this.input.getKey(KeyCode.DownArrow)) {
        // slow down movement speed
       this.currentMovementSpeed = clamp(this.currentMovementSpeed - this.backwardSpeed, 0, this.topForwardSpeed);
    }

    // IMPORTANT: CHANGE ROTATION SPEED ACCORDING TO MOVEMENT SPEED
    if (this.input.getKey(KeyCode.LeftArrow)) {
        this.rotation -= this.rotateSpeed;
    }
    if (this.input.getKey(KeyCode.RightArrow)) {
        this.rotation += this.rotateSpeed;
    }

    this.x += Math.cos(this.rotation) * this.currentMovementSpeed;
    this.y += Math.sin(this.rotation) * this.currentMovementSpeed;
};