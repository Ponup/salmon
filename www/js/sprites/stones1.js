define(function(require) {

	var Phaser = require('phaser');

	function Stones1Sprite( game, x, y ) {
		Phaser.Sprite.call(this, game, x, y, 'stones1');
	
        this.relativeBodyPoints = [
            [ 0, 64 ],
            [ 7, 81 ],
            [ 21, 84 ],
            [ 49, 57 ],
            [ 44, 116 ],
            [ 53, 123 ],
            [ 66, 123 ],
            [ 75, 106 ],
            [ 66, 93 ],
            [ 68, 76 ],
            [ 78, 70 ],
            [ 84, 55 ],
            [ 98, 67 ],
            [ 131, 43 ],
            [ 133, 31 ],
            [ 110, 15 ],
            [ 114, 6 ],
            [ 100, 0 ],
            [ 57, 32 ],
            [ 41, 22 ],
            [ 0, 64 ],
        ];
        this.bodyPolygon = new Phaser.Polygon(this.relativeBodyPoints);
        this.speed = 1;
	}

	Stones1Sprite.prototype = Object.create( Phaser.Sprite.prototype );
	Stones1Sprite.prototype.constructor = Stones1Sprite;

	Stones1Sprite.prototype.update = function() {
        var self = this;
		this.position.y += this.speed;

        this.absoluteBodyPoints = this.relativeBodyPoints.map(function(point) {
            return [ point[0] + self.x, point[1] + self.y ];
        });
        this.absoluteBodyPolygon = new Phaser.Polygon(this.absoluteBodyPoints);
	};

	return Stones1Sprite;
});

