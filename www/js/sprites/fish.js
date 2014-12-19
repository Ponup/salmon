
define( function( require ) {

	var Phaser = require( 'phaser' );

	function FishSprite( game )
	{
		Phaser.Sprite.call( this, game, game.world.centerX, game.world.height - 90, 'fish', 0 );
		game.physics.arcade.enable( this );

		this.animations.add( 'left', [ 3, 2, 1, 0,1,2,3 ], 8,  false );
		this.animations.add( 'idle', [ 9,10,11,12 ], 8,  true );
		this.animations.add( 'right',[ 5, 6 ,7 , 8 ,7,6,5], 8,  false );
		this.anchor.set( .5, .5 );
		this.reset( game.world.centerX, game.world.height - 100 );
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
			// remove temporally the up and down movement
			// this.body.y -= 5;
		}
		else if (cursors.down.isDown) {
			// remove temporally the up and down movement
			// this.body.y += 10;
		}
	};

	return FishSprite;
});

