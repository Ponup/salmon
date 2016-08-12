define(function(require) {

	var Phaser = require('phaser');

	function Stones2Sprite( game, x, y ) {
		Phaser.Sprite.call(this, game, x, y, 'stones2');
	
        this.relativeBodyPoints = [
            [ 1, 19 ],
            [ 11, 33 ],
            [ 30, 36 ],
            [ 31, 65 ],
            [ 11, 69 ],
            [ 7, 90 ],
            [ 15, 107 ],
            [ 24, 116 ],
            [ 29, 104 ],
            [ 25, 60 ],
            [ 39, 59 ],
            [ 43, 55 ],
            [ 45, 20 ],
            [ 59, 23 ],
            [ 64, 29 ],
            [ 81, 27 ],
            [ 83, 66 ],
            [ 74, 84 ],
            [ 87, 91 ],
            [ 106, 97 ],
            [ 105, 42 ],
            [ 122, 43 ],
            [ 127, 37 ],
            [ 127, 30 ],
            [ 105, 9 ],
            [ 92, 8 ],
            [ 77, 0 ],
            [ 39, 12 ],
            [ 24, 5 ],
            [ 7, 8 ],
            [ 0, 18 ],
        ];
        this.bodyPolygon = new Phaser.Polygon(this.relativeBodyPoints);
        this.speed = 0.8;
	}

	Stones2Sprite.prototype = Object.create( Phaser.Sprite.prototype );
	Stones2Sprite.prototype.constructor = Stones2Sprite;

	Stones2Sprite.prototype.update = function() {
        var self = this;
		this.position.y += this.speed;

        this.absoluteBodyPoints = this.relativeBodyPoints.map(function(point) {
            return [ point[0] + self.x, point[1] + self.y ];
        });
        this.absoluteBodyPolygon = new Phaser.Polygon(this.absoluteBodyPoints);
	};

	return Stones2Sprite;
});

