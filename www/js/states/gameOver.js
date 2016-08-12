
define( function( require ) {
	'use strict';

	var PonupApi = require( 'ponupapi' );

	function GameLostState() {
	}
    
	GameLostState.prototype.init = function(gameData) {
        this.gameData = gameData;
    };

	GameLostState.prototype.create = function() {
		this.game.stage.setBackgroundColor( 0x2d2d2d );

		this.bg = this.game.add.tileSprite( 0, 0, this.game.world.width, this.game.world.height, 'bg' );
		this.bg.inputEnabled = true;
		this.bg.events.onInputDown.add( function() { this.game.state.start( 'mainMenu' ); }, this ); 

		this.headerSprite = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Game over' );

		this.headerSprite.anchor.set(0.5);
		this.headerSprite.align = 'center';

		this.headerSprite.font = 'Arial Black';
		this.headerSprite.fontSize = 50;
		this.headerSprite.fontWeight = 'bold';

		this.headerSprite.stroke = '#000000';
		this.headerSprite.strokeThickness = 6;
		this.headerSprite.fill = '#43d637';

        var ponupApi = new PonupApi();
		ponupApi.saveScore( 'salmon', {
			'game_level_number': this.gameData.level,
			'player_name': 'Anonymous',
			'value': this.gameData.score
		});
	};

	GameLostState.prototype.update = function() {
		this.headerSprite.angle += 0.05;
	};

	return GameLostState;
});
