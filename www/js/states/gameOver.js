
define( function( require ) {
	'use strict';

	var context = require( 'data/context' ),
		PonupApi = require( 'ponupapi' ),
		text = null;

	function GameLostState()
	{
	}

	GameLostState.prototype.create = function() {
		this.game.stage.setBackgroundColor(0x2d2d2d);

		this.bg = this.game.add.tileSprite( 0, 0, this.game.world.width, this.game.world.height, 'bg' );
		this.bg.inputEnabled = true;
		this.bg.events.onInputDown.add( function() { this.game.state.start( 'mainMenu' ); }, this ); 


		text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Game over' );

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

		PonupApi.saveScore( 'salmon', {
			'game_level_number': context.level,
			'player_name': 'Anonymous',
			'value': context.score
		});
	};

	GameLostState.prototype.update = function() {
		text.angle += 0.05;
	};

	return GameLostState;
});
