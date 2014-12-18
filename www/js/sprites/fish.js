
define( function( require ) {

	var Phaser = require( 'phaser' );

	function FishSprite( game )
	{
		Phaser.Sprite.call( this, game, game.world.centerX, game.world.centerY, 'fish', 0 );
		game.physics.arcade.enable( this );

		this.animations.add( 'left', [ 3, 2, 1, 0,1,2,3 ], 8,  false );
		this.animations.add( 'idle', [ 9,10,11,12 ], 8,  true );
		this.animations.add( 'right',[ 5, 6 ,7 , 8 ,7,6,5], 8,  false );
		this.anchor.set( 20, 44 );
		this.reset( game.world.centerX, game.world.centerY );
		this.body.collideWorldBounds = true;
		this.body.fixedRotation = true;
	}

	FishSprite.prototype = Object.create( Phaser.Sprite.prototype );
	FishSprite.prototype.constructor = FishSprite;

	return FishSprite;
});

