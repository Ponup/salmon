
define( function( require ) {
	'use strict';

	var context = require( 'data/context' ),
		preferences = require( 'data/preferences' );

	function OptionsState( game )
	{
		this.game = game;
	}

	OptionsState.prototype.preload = function() {
		this.game.load.image( 'bg', 'img/menu/bg.png' ); 
		this.game.load.image( 'logo', 'img/menu/logo.png' ); 
		
		this.game.load.spritesheet( 'button', 'img/items/button_spritesheet.png', 65, 65 );
	};

	OptionsState.prototype.create = function() {
		document.title = 'Salmon :: Options';

		this.bg = this.game.add.tileSprite( 0, 0, this.game.world.width, this.game.world.height, 'bg' );

		var headerFontStyle = { font: "65px Arial", fill: "#ff0044", align: "center" },
			headerText = this.game.add.text( this.game.world.centerX, 100, 'Options', headerFontStyle );
		headerText.anchor.setTo( .5 );
		headerText.anchor.set(0.5);
		headerText.align = 'center';

		headerText.font = 'Arial Black';
		headerText.fontSize = 50;
		headerText.fontWeight = 'bold';

		headerText.strokeThickness = 6;

		var soundsText = this.game.add.text( 40, 190, 'Sounds' );
		soundsText.inputEnabled = true;
		soundsText.events.onInputDown.add( function() { this.game.state.start( 'scores' ); }, this );
		this.soundsButton = this.game.add.button( 150, 170, 'button', this.toggleSoundsButton, this );
		this.soundsButton.frame = preferences.isSoundEnabled() ? 1 : 0;

		var musicText = this.game.add.text( 40, 300, 'Music' );
		musicText.inputEnabled = true;
		musicText.events.onInputDown.add( function() { this.game.state.start( 'scores' ); }, this );
		this.musicButton = this.game.add.button( 150, 280, 'button', this.toggleMusicButton, this );
		this.musicButton.frame = preferences.isMusicEnabled() ? 1 : 0;

		this.bg.inputEnabled = true;
		this.bg.events.onInputDown.add( function() { this.game.state.start( 'mainMenu' ); }, this ); 
	};

	OptionsState.prototype.toggleSoundsButton = function() {
		this.soundsButton.frame = this.soundsButton.frame === 1 ? 0 : 1;
		preferences.setBooleanProperty( 'soundEnabled', this.soundsButton.frame === 1 );
	};

	OptionsState.prototype.toggleMusicButton = function() {
		this.musicButton.frame = this.musicButton.frame === 1 ? 0 : 1;
		preferences.setBooleanProperty( 'musicEnabled', this.musicButton.frame === 1 );
	};

	return OptionsState;
});

