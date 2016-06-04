var boat = (function (state, boat) {
    boat = boat || {};
    entity.call(this, state, boat);
    this.currentMovementSpeed = 0;
    this.setSpeed(boat);
});

boat.prototype = Object.create(entity.prototype);
boat.prototype.constructor = boat;

boat.prototype.setSpeed = function (options) {
    // forwards
    this.forwardSpeed = options.forwardSpeed || this.forwardSpeed || 0;
    this.topForwardSpeed = options.topForwardSpeed || this.topForwardSpeed || 0;
    // backward
    this.backwardSpeed = options.backwardSpeed || this.backwardSpeed || 0;
    this.rotateSpeed = options.rotateSpeed || this.rotateSpeed || 0;
};

boat.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.translate(-this.width / 2, -this.height / 2)
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
};