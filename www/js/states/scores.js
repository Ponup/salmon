
define( function( require ) {
	'use strict';

	var context = require( 'data/context' ),
		gaco = require( 'data/context' ),
		rankingModel = require( 'data/ranking' ),
		preferences = require( 'data/preferences' );

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

		this.game = context.game;

		this.bg = this.game.add.tileSprite( 0, 0, this.game.world.width, this.game.world.height, 'bg' );

		var headerFontStyle = { font: "65px Arial", fill: "#ff0044", align: "center" },
			playText = this.game.add.text( this.game.world.centerX, 100, 'Scores', headerFontStyle );
		playText.anchor.setTo( .5 );
		playText.anchor.set(0.5);
		playText.align = 'center';

		playText.font = 'Arial Black';
		playText.fontSize = 50;
		playText.fontWeight = 'bold';

		playText.strokeThickness = 6;

		var columns = [ 10, 130, 250 ],
			tableFontStyle = { font: "20px Arial", fill: "#ff0044", align: "center" };
		this.game.add.text( columns[0], 130, 'Player', tableFontStyle );
		this.game.add.text( columns[1], 130, 'Score', tableFontStyle );
		this.game.add.text( columns[2], 130, 'Date', tableFontStyle );

		var yPos = 150,
			scores = rankingModel.getScores();
		// Mock data scores = [{player:"santi",score:14,date:"31/13/31"},{player:"santi",score:14,date:"31/13/31"},{player:"santi",score:14,date:"31/13/31"}];
		for( var i = 0; i < scores.length; i++ ) {
			this.game.add.text( columns[0], yPos, scores[ i ]['player'] );
			this.game.add.text( columns[1], yPos, scores[ i ]['score'] );
			this.game.add.text( columns[2], yPos, scores[ i ]['date'] );
			yPos += 30;
		}
		
		this.bg.inputEnabled = true;
		this.bg.events.onInputDown.add( function() { this.game.state.start( 'mainMenu' ); }, this ); 
	};

	ScoresState.prototype.update = function() {
		// text.angle += 0.05;
	};

	return ScoresState;
});

