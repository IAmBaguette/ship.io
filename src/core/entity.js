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