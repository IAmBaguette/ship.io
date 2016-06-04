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