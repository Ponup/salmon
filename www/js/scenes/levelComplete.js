
define( function( require ) {

	var BaseScene = require( 'pew/scenes/base' );

	function LevelCompleteScene()
	{
		BaseScene.call( this );

		this.setId( 'levelComplete' );
	}

	LevelCompleteScene.prototype = new BaseScene();
	LevelCompleteScene.prototype.constructor = LevelCompleteScene;

	return LevelCompleteScene;
});
