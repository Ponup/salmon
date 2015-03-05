
require.config({
	baseUrl: 'js/',
	paths: {
		jquery: 'jquery-1.11.1.min',
		underscore: 'underscore-min',
		handlebars: 'handlebars-v2.0.0',
		phaser: 'phaser.min'
	},
        shim: {
        	'phaser': {
        		exports: 'Phaser'
        	}
        },
	urlArgs: 'bust=' + Date.now()
});

define( function( require ) {
	var context = require( 'data/context' ),
		Phaser = require( 'phaser' ),
		MainMenuState = require( 'states/mainMenu' ),
		GameLoopState = require( 'states/gameLoop' ),
		GameOverState = require( 'states/gameOver' ),
		ScoresState = require( 'states/scores' ),
		OptionsState = require( 'states/options' ),
		LevelCompleteState = require( 'states/levelComplete' );
		
	var preload = function() {
		context.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		context.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
	},
	create = function() {
		context.game.scale.startFullScreen(true);
		context.game.state.add( 'mainMenu', MainMenuState, true );
		context.game.state.add( 'gameLoop', GameLoopState, true );
		context.game.state.add( 'gameOver', GameOverState, true );
		context.game.state.add( 'levelComplete', LevelCompleteState, true );
		context.game.state.add( 'options', OptionsState, true );
		context.game.state.add( 'scores', ScoresState, true );
		context.game.state.start( 'mainMenu' );
	};
		
	context.game = new Phaser.Game( 320, 480, Phaser.AUTO, 'gameDiv', { preload: preload, create: create } );
});

