
define( function( require ) {
	'use strict';

	var context = require( 'data/context' ),
		gaco = require( 'data/context' ),
		preferences = require( 'data/preferences' ),
		PonupApi = require( 'ponupapi' );

	function ScoresState()
	{
		this.game = context.game;
	}

	ScoresState.prototype.preload = function() {
		this.game.load.image( 'bg', 'img/menu/bg.png' ); 
		this.game.load.image( 'logo', 'img/menu/logo.png' ); 
	};

	ScoresState.prototype.create = function() {
		document.title = 'Salmon :: Scores';

		var self = this;
		this.game = context.game;

		this.bg = this.game.add.tileSprite( 0, 0, this.game.world.width, this.game.world.height, 'bg' );

		var headerFontStyle = { font: "65px Arial", fill: "#ff0044", align: "center" },
			headerText = this.game.add.text( this.game.world.centerX, 100, 'Scores', headerFontStyle );
		headerText.anchor.setTo( .5 );
		headerText.anchor.set(0.5);
		headerText.align = 'center';

		headerText.font = 'Arial Black';
		headerText.fontSize = 50;
		headerText.fontWeight = 'bold';

		headerText.strokeThickness = 6;

		var columns = [ 10, 130, 250 ],
			tableFontStyle = { font: "20px Arial", fill: "#ff0044", align: "center" };
		this.game.add.text( columns[0], 130, 'Player', tableFontStyle );
		this.game.add.text( columns[1], 130, 'Score', tableFontStyle );
		this.game.add.text( columns[2], 130, 'Date', tableFontStyle );


		var scoreFontStyle = { font: "12px Arial", fill: "#000000", align: "center" };

		var yPos = 160;
		PonupApi.retrieveScores( 'salmon', 10, function( scores ) {
			for( var i = 0; i < scores.length; i++ ) {
				var score = scores[ i ];
				self.game.add.text( columns[0], yPos, score['player_name'], scoreFontStyle );
				self.game.add.text( columns[1], yPos, score['value'], scoreFontStyle );
				self.game.add.text( columns[2], yPos, score['registration_time'], scoreFontStyle );
				yPos += 30;
			}
			
			self.bg.inputEnabled = true;
			self.bg.events.onInputDown.add( function() { self.game.state.start( 'mainMenu' ); }, self); 
		} );
	};

	ScoresState.prototype.update = function() {
		// text.angle += 0.05;
	};

	return ScoresState;
});

