define(function(require) {

	var Phaser = require('phaser');

	function Stones3Sprite( game, x, y ) {
		Phaser.Sprite.call(this, game, x, y, 'stones3');
	
        this.relativeBodyPoints = [
            [ 0, 26 ],
            [ 0, 44 ],
            [ 17, 40 ],
            [ 30, 76 ],
            [ 53, 80 ],
            [ 82, 64 ],
            [ 87, 70 ],
            [ 103, 70 ],
            [ 110, 61 ],
            [ 81, 29 ],
            [ 107, 11 ],
            [ 107, 2 ],
            [ 89, 1 ],
            [ 41, 24 ],
            [ 0, 26 ],
        ];
        this.bodyPolygon = new Phaser.Polygon(this.relativeBodyPoints);
        this.speed = 0.5;
	}

	Stones3Sprite.prototype = Object.create( Phaser.Sprite.prototype );
	Stones3Sprite.prototype.constructor = Stones3Sprite;

	Stones3Sprite.prototype.update = function() {
        var self = this;
		this.position.y += this.speed;

        this.absoluteBodyPoints = this.relativeBodyPoints.map(function(point) {
            return [ point[0] + self.x, point[1] + self.y ];
        });
        this.absoluteBodyPolygon = new Phaser.Polygon(this.absoluteBodyPoints);
	};

	return Stones3Sprite;
});

