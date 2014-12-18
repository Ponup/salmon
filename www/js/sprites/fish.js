
define( function( require ) {

	var Phaser = require( 'phaser' );

	function FishSprite( game )
	{
		Phaser.Sprite.call( this, game, game.world.centerX, game.world.height - 90, 'fish', 0 );
		game.physics.arcade.enable( this );

		this.animations.add( 'left', [ 2, 1, 0 ], 3, false );
		this.animations.add( 'idle', [ 3 ], 1, true );
		this.animations.add( 'right', [ 4, 5, 6 ], 3, false );
		this.anchor.set( .5, .5 );
		this.body.collideWorldBounds = true;
		this.body.fixedRotation = true;
	}

	FishSprite.prototype = Object.create( Phaser.Sprite.prototype );
	FishSprite.prototype.constructor = FishSprite;

	FishSprite.prototype.updateState = function( cursors )
	{
		var leftOrRight = false;

		if (cursors.left.isDown) {
			leftOrRight = true;
			this.animations.play( 'left' );
			this.body.x -= 5;
		}
		else if (cursors.right.isDown) {
			leftOrRight = true;
			this.animations.play( 'right' );
			this.body.x += 5;
		}
		if( false === leftOrRight ) {
			this.animations.play( 'idle' );
		}

		if (cursors.up.isDown) {
			this.body.y -= 5;
		}
		else if (cursors.down.isDown) {
			this.body.y += 10;
		}
	};

	return FishSprite;
});

