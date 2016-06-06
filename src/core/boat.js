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
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.translate(0, -this.height / 2)
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.width - (this.width * 0.33), 0);
    ctx.lineTo(this.width, this.height / 2);
    ctx.lineTo(this.width - (this.width * 0.33), this.height);
    ctx.lineTo(0, this.height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore()
};