define( function( require ) {

	var Phaser = require( 'phaser' );

	function WormSprite( game, x, y )
	{
		Phaser.Sprite.call( this, game, x, y, 'worm' );
	
		this.originalx = x;
		this.tick = 0;
        this.speed = 1;
	}

	WormSprite.prototype = Object.create( Phaser.Sprite.prototype );
	WormSprite.prototype.constructor = WormSprite;

	WormSprite.prototype.update = function()
	{
		var deg = this.tick++ % 360,
			rad =  deg / 180 * Math.PI;
		this.position.x = this.originalx + ( Math.sin( rad ) * 40 );
		this.position.y += this.speed;
	};

	return WormSprite;
});

