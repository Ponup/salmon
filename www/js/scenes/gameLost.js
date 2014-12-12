
define( function( require ) {

	var BaseScene = require( 'pew/scenes/base' );

	function GameLostScene()
	{
		BaseScene.call( this );

		this.setId( 'gameLost' );
	}

	GameLostScene.prototype = new BaseScene();
	GameLostScene.prototype.constructor = GameLostScene;

	return GameLostScene;
});
