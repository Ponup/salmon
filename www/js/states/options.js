
define( function( require ) {
	'use strict';

	var context = require( 'data/context' ),
		gaco = require( 'data/context' ),
		preferences = require( 'data/preferences' );

	function OptionsState()
	{
		this.game = context.game;
	}

	OptionsState.prototype.preload = function() {
		this.game.load.image( 'bg', 'img/menu/bg.png' ); 
		this.game.load.image( 'logo', 'img/menu/logo.png' ); 
		
		this.game.load.spritesheet( 'button', 'img/items/button_spritesheet.png', 65, 65 );
	};

	OptionsState.prototype.create = function() {
		document.title = 'Numbers :: Options';

		this.game = context.game;

		this.game.add.tileSprite( 0, 0, this.game.world.width, this.game.world.height, 'bg' );

		var logo = this.game.add.sprite( this.game.world.centerX, 0, 'logo' );
		logo.anchor.setTo( .5 );

		this.soundsButton = this.game.add.button(this.game.world.centerX, 100, 'button', this.toggleSoundsButton, this );
		this.soundsButton.frame = preferences.isSoundEnabled() ? 1 : 0;
		this.musicButton = this.game.add.button(this.game.world.centerX, 300, 'button', this.toggleMusicButton, this );
		this.musicButton.frame = preferences.isMusicEnabled() ? 1 : 0;

		var optionsText = this.game.add.text( this.game.world.centerX, this.game.world.centerY + 100, 'Options',  { font: "65px Arial", fill: "#ff0044", align: "center" });
		optionsText.anchor.setTo( .5 );
		optionsText.inputEnabled = true;
		optionsText.events.onInputDown.add( function() { this.game.state.start( 'gameLoop' ); }, this ); 
		optionsText.anchor.set(0.5);
		optionsText.align = 'center';

		optionsText.font = 'Arial Black';
		optionsText.fontSize = 50;
		optionsText.fontWeight = 'bold';

		optionsText.strokeThickness = 6;
		
		var soundsText = this.game.add.text( 10, this.game.world.height * .8, 'Sounds' );
		soundsText.inputEnabled = true;
		soundsText.events.onInputDown.add( function() { this.game.state.start( 'scores' ); }, this );
		var musicText = this.game.add.text( 100, this.game.world.height * .8, 'Music' );
		musicText.inputEnabled = true;
		musicText.events.onInputDown.add( function() { this.game.state.start( 'scores' ); }, this );
	};

	OptionsState.prototype.toggleSoundsButton = function() {
		console.log('sound', this.soundsButton.frame);
		this.soundsButton.frame = this.soundsButton.frame === 1 ? 0 : 1;
		preferences.setBooleanProperty( 'soundEnabled', this.soundsButton.frame === 1 );
	};

	OptionsState.prototype.toggleMusicButton = function() {
		this.musicButton.frame = this.musicButton.frame === 1 ? 0 : 1;
		preferences.setBooleanProperty( 'musicEnabled', this.musicButton.frame === 1 );
	};

	OptionsState.prototype.update = function() {
		// text.angle += 0.05;

	};

	return OptionsState;
});

