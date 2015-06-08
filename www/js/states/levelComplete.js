
define( function( require ) {
	'use strict';

	var BaseScene = require( 'pew/scenes/base' ),
		context = require( 'data/context' ),
		text = null;

	function LevelCompleteState()
	{
	}

	LevelCompleteState.prototype.create = function() {
		var self = this;
		this.game.stage.setBackgroundColor(0x2d2d2d);

		text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Level complete' );

		//	Center align
		text.anchor.set(0.5);
		text.align = 'center';

		//	Font style
		text.font = 'Arial Black';
		text.fontSize = 50;
		text.fontWeight = 'bold';

		//	Stroke color and thickness
		text.stroke = '#000000';
		text.strokeThickness = 6;
		text.fill = '#43d637';

		setTimeout( function() { self.game.state.start( 'gameLoop' ); }, 2000 );
	};

	LevelCompleteState.prototype.update = function() {
		text.angle += 0.05;
//		text.scale += 0.5;
	};

	return LevelCompleteState;
});
