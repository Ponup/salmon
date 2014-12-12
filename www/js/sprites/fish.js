
define( function( require ) {

	var Phaser = require( 'phaser' );

	function FishSprite( game )
	{
		Phaser.Sprite.call( this, game, game.world.centerX, game.world.centerY, 'fish', 0 );
		game.physics.arcade.enable( this );

		this.animations.add( 'left', [ 2, 1, 0 ], 3, false );
		this.animations.add( 'idle', [ 3 ], 1, true );
		this.animations.add( 'right', [ 4, 5, 6 ], 3, false );
		this.anchor.set( 20, 44 );
		this.reset( game.world.centerX, game.world.centerY );
		this.body.collideWorldBounds = true;
		this.body.fixedRotation = true;
	}

	FishSprite.prototype = Object.create( Phaser.Sprite.prototype );
	FishSprite.prototype.constructor = FishSprite;

	return FishSprite;
});

