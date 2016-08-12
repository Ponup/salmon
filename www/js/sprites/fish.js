
define( function( require ) {

	var Phaser = require( 'phaser' );

	function FishSprite( game )
	{
		Phaser.Sprite.call( this, game, game.world.centerX, game.world.height - 90, 'fish', 0 );

		this.animations.add( 'left', [ 3, 2, 1, 0, 1, 2, 3 ], 8,  false );
		this.animations.add( 'idle', [ 9, 10, 11, 12 ], 8,  true );
		this.animations.add( 'right',[ 5, 6, 7, 8, 7, 6, 5 ], 8,  false );
		this.anchor.set( 0.5, 0.5 );
		this.reset( game.world.centerX, game.world.height - 70 );

        this.relativeBodyPoints= [
            [ 35, 8 ],
            [ 20, 27 ],
            [ 21, 67 ],
            [ 12, 88 ],
            [ 36, 114 ],
            [ 60, 86 ],
            [ 50, 67 ],
            [ 51, 28 ],
            [35, 8]
        ];
        this.bodyPolygon = new Phaser.Polygon(this.relativeBodyPoints);
	}

	FishSprite.prototype = Object.create( Phaser.Sprite.prototype );
	FishSprite.prototype.constructor = FishSprite;

	FishSprite.prototype.updateState = function( cursors )
	{
		var leftOrRight = false;
        var self = this;

        if(this.debugEnabled) {
            this.drawSilhouette();
        }

        this.absoluteBodyPoints = this.relativeBodyPoints.map(function(point) {
            return [ point[0] + self.x - ( self.width >> 1 ), point[1] + self.y - ( self.height >> 1 ) ];
        });

		if (cursors.left.isDown) {
			leftOrRight = true;
			this.animations.play( 'left' );
			this.x -= 5;
		}
		else if (cursors.right.isDown) {
			leftOrRight = true;
			this.animations.play( 'right' );
			this.x += 5;
		}
		if( false === leftOrRight ) {
			this.animations.play( 'idle' );
		}
	};

	return FishSprite;
});

