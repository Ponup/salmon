
define( function( require ) {
	'use strict';

	var context = require( 'data/context' ),
		preferences = require( 'data/preferences' );

	function MainMenuState( game )
	{
		this.game = game;
	}

	MainMenuState.prototype.preload = function() {
		this.game.load.image( 'bg', 'img/menu/bg.png' ); 
		this.game.load.image( 'logo', 'img/menu/logo.png' ); 
		this.game.load.image( 'bubble', 'img/bubble256.png' );
	};

	MainMenuState.prototype.create = function() {
		if( preferences.isMusicEnabled() )
		{
			context.sounds.bgmusic.play();
		}

		this.addBackground();
		this.addMovingBubbles();
		this.addLogo();

		this.addPlayText();
		this.addSecondaryOptions();

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

	MainMenuState.prototype.addBackground = function() {
		this.game.add.tileSprite( 0, 0, this.game.world.width, this.game.world.height, 'bg' );
	};

	MainMenuState.prototype.addMovingBubbles = function() {
		var delay = 0,
			i = 0;
		for(; i < 20; i++ ) {
			var speed = this.game.rnd.between( 3000, 5000 ),
				sprite = this.game.add.sprite(-50 + this.game.world.randomX, 500, 'bubble' );
			sprite.scale.set( this.game.rnd.realInRange( 0.1, 0.4 ) );
			this.game.add.tween( sprite ).to({ y: -200 }, speed, Phaser.Easing.Circular.In, true, delay, -1, false);
			delay += 240;
		}
	};

	MainMenuState.prototype.addLogo = function() {
		var logo = this.game.add.sprite( this.game.world.centerX, this.game.world.height >> 2, 'logo' );
		logo.anchor.setTo( .5 );
	};

	MainMenuState.prototype.addPlayText = function() {
		var playText = this.game.add.text( this.game.world.centerX, this.game.world.centerY + 100, 'Play',  { font: "bold 50px Arial", fill: "#ff0044", align: "center" });
		playText.anchor.setTo( .5 );
		playText.anchor.set(0.5);
		playText.inputEnabled = true;
		playText.strokeThickness = 6;
		playText.events.onInputDown.add( function() { this.game.state.start( 'gameLoop' ); }, this ); 
	};

	MainMenuState.prototype.addSecondaryOptions = function() {
		var menuY = this.game.world.height * .85;
		var scoresText = this.game.add.text( 30, menuY, 'Scores' );
		scoresText.inputEnabled = true;
		scoresText.events.onInputDown.add( function() { this.game.state.start( 'scores' ); }, this );
		var optionsText = this.game.add.text( 170, menuY, 'Options' );
		optionsText.inputEnabled = true;
		optionsText.events.onInputDown.add( function() { this.game.state.start( 'options' ); }, this );
	};

	return MainMenuState;
});

