define(function(require) {

	var Phaser = require('phaser');

	function Chest1Sprite( game, x, y ) {
		Phaser.Sprite.call(this, game, x, y, 'chest1');
	
        this.relativeBodyPoints = [
            [ 0, 56 ],
            [ 0, 77 ],
            [ 28, 105 ],
            [ 35, 115 ],
            [ 54, 171 ],
            [ 74, 184 ],
            [ 88, 184 ],
            [ 197, 136 ],
            [ 183, 75 ],
            [ 159, 51 ],
            [ 149, 25 ],
            [ 126, 0 ],
            [ 0, 58 ],
        ];
        this.bodyPolygon = new Phaser.Polygon(this.relativeBodyPoints);
	}

	Chest1Sprite.prototype = Object.create( Phaser.Sprite.prototype );
	Chest1Sprite.prototype.constructor = Chest1Sprite;

	Chest1Sprite.prototype.update = function() {
        var self = this;
		this.position.y++;

        if(this.graphics) {
            this.graphics.x = this.x;
            this.graphics.y = this.y;
        } else {
            this.graphics = this.game.add.graphics(this.x, this.y);
            this.graphics.lineStyle(4, 0xff0000, 1);
            //    graphics.beginFill(0xFF33ff);
            this.graphics.drawPolygon(this.bodyPolygon.points);
              //  graphics.endFill();
        }

        this.absoluteBodyPoints = this.relativeBodyPoints.map(function(point) {
            return [ point[0] + self.x, point[1] + self.y ];
        });
        this.absoluteBodyPolygon = new Phaser.Polygon(this.absoluteBodyPoints);
	};

	return Chest1Sprite;
});

