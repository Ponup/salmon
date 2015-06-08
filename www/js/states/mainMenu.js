
define( function( require ) {
	'use strict';

	var context = require( 'data/context' ),
		preferences = require( 'data/preferences' );

	function MainMenuState()
	{
		this.game = context.game;
	}

	MainMenuState.prototype.preload = function() {
		this.game.load.image( 'bg', 'img/menu/bg.png' ); 
		this.game.load.image( 'logo', 'img/menu/logo.png' ); 
	};

	MainMenuState.prototype.create = function() {

		if( preferences.isMusicEnabled() )
		{
			context.sounds.bgmusic.play();
		}

		this.game = context.game;

		this.game.add.tileSprite( 0, 0, this.game.world.width, this.game.world.height, 'bg' );

		var logo = this.game.add.sprite( this.game.world.centerX, this.game.world.height >> 2, 'logo' );
		logo.anchor.setTo( .5 );

		var playText = this.game.add.text( this.game.world.centerX, this.game.world.centerY + 100, 'Play',  { font: "65px Arial", fill: "#ff0044", align: "center" });
		playText.anchor.setTo( .5 );
		playText.inputEnabled = true;
		playText.events.onInputDown.add( function() { this.game.state.start( 'gameLoop' ); }, this ); 

		var menuY = this.game.world.height * .85;
		var scoresText = this.game.add.text( 30, menuY, 'Scores' );
		scoresText.inputEnabled = true;
		scoresText.events.onInputDown.add( function() { this.game.state.start( 'scores' ); }, this );
		var optionsText = this.game.add.text( 170, menuY, 'Options' );
		optionsText.inputEnabled = true;
		optionsText.events.onInputDown.add( function() { this.game.state.start( 'options' ); }, this );
		
		playText.anchor.set(0.5);
		playText.align = 'center';

		playText.font = 'Arial Black';
		playText.fontSize = 50;
		playText.fontWeight = 'bold';

		playText.strokeThickness = 6;

		window.plugins.socialsharing.available( this.shareIfAvailable );
	};

	MainMenuState.prototype.shareIfAvailable = function( isAvailable )
	{
		if( false === isAvailable ) {
			return;
		}

		var shareText = this.game.add.text( 140, this.game.world.height * .8, 'Share' );
		shareText.inputEnabled = true;
		shareText.events.onInputDown.add( function() { 
			window.plugins.socialsharing.share( 'Play the @Ponup Salmon game for free in your phone. More info http://ponup.com', '@Ponup Salmon' );
			}, this );
	};

	MainMenuState.prototype.update = function() {
		// text.angle += 0.05;

	};

	return MainMenuState;
});

