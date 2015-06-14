
define( function( require ) {
	'use strict';

	var context = require( 'data/context' ),
		preferences = require( 'data/preferences' );

	function ScoresState( game ) {
		this.game = game;
	}

	ScoresState.prototype.preload = function() {
		this.game.load.image( 'bg', 'img/menu/bg.png' ); 
		this.game.load.image( 'logo', 'img/menu/logo.png' ); 
	};

	ScoresState.prototype.create = function() {
		document.title = 'Salmon :: Scores';

		var self = this,
			columns = [ 20, 130, 240 ];

		this.addBackground();
		this.addHeader();

		this.addTableHeader( columns );


		context.ponupApi.retrieveScores( 'salmon', 10, function( scores ) {
			self.addTableRows( columns, scores );
		} );
	};

	ScoresState.prototype.update = function() {
	};

	ScoresState.prototype.addBackground = function() {
		this.bgSprite = this.game.add.tileSprite( 0, 0, this.game.world.width, this.game.world.height, 'bg' );
	};

	ScoresState.prototype.addHeader = function() {
		var headerFontStyle = {
			font: "bold 50px Arial",
			fill: "#ff0044",
			align: "center" };
		this.headerSprite = this.game.add.text( this.game.world.centerX, -50, 'Scores', headerFontStyle );
		this.headerSprite.anchor.setTo(.5);
		this.headerSprite.anchor.set(0.5);
		this.headerSprite.align = 'center';
		this.headerSprite.strokeThickness = 6;

		this.game.add.tween( this.headerSprite ).to({ y: 70 }, 1700, Phaser.Easing.Bounce.Out, true);
	};

	ScoresState.prototype.addTableHeader = function( columns ) {
		var firstRowY = 110,
			tableFontStyle = { font: "20px Arial", fill: "#ff0044", align: "center" };
		this.game.add.text( columns[0], firstRowY, 'Player', tableFontStyle );
		this.game.add.text( columns[1], firstRowY, 'Score', tableFontStyle );
		this.game.add.text( columns[2], firstRowY, 'Date', tableFontStyle );
	};

	ScoresState.prototype.addTableRows = function( columns, scores ) {
		var yPos = 140,
			scoreFontStyle = { font: "12px Arial", fill: "#000000", align: "center" };
		for( var i = 0; i < scores.length; i++ ) {
			var score = scores[ i ];
			this.game.add.text( columns[0], yPos, score['player_name'], scoreFontStyle );
			this.game.add.text( columns[1], yPos, score['value'], scoreFontStyle );
			this.game.add.text( columns[2], yPos, score['registration_time']['date'], scoreFontStyle );
			yPos += 30;
		}
		
		this.bgSprite.inputEnabled = true;
		this.bgSprite.events.onInputDown.add( function() { this.game.state.start( 'mainMenu' ); }, this); 
	};

	return ScoresState;
});

