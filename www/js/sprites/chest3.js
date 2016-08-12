define(function(require) {

	var Phaser = require('phaser');

	function Chest3Sprite( game, x, y ) {
		Phaser.Sprite.call(this, game, x, y, 'chest3');
	
        this.relativeBodyPoints = [
            [ 0, 39 ],
            [ 23, 121 ],
            [ 36, 118 ],
            [ 34, 112 ],
            [ 177, 80 ],
            [ 178, 86 ],
            [ 191, 82 ],
            [ 172, 0 ],
            [ 0, 39 ]
        ];
        this.bodyPolygon = new Phaser.Polygon(this.relativeBodyPoints);
        this.speed = 1;
        this.speedX = 0;
	}

	Chest3Sprite.prototype = Object.create( Phaser.Sprite.prototype );
	Chest3Sprite.prototype.constructor = Chest3Sprite;

	Chest3Sprite.prototype.update = function() {
        var self = this;
		this.position.x += this.speedX;
		this.position.y += this.speed;

        this.absoluteBodyPoints = this.relativeBodyPoints.map(function(point) {
            return [ point[0] + self.x, point[1] + self.y ];
        });
        this.absoluteBodyPolygon = new Phaser.Polygon(this.absoluteBodyPoints);
	};

	return Chest3Sprite;
});

