
define( function( require ) {
	'use strict';

	var context = require( 'data/context' ),
		text = null;

	function GameLostState()
	{
	}

	GameLostState.prototype.create = function() {
		game = context.game;
		game.stage.setBackgroundColor(0x2d2d2d);

		text = game.add.text(game.world.centerX, game.world.centerY, 'Game over' );

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
	};

	GameLostState.prototype.update = function() {
		text.angle += 0.05;
	};

	return GameLostState;
});
