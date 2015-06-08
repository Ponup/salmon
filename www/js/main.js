
require.config({
	baseUrl: 'js/',
	paths: {
		jquery: '../bower_components/jquery/dist/jquery.min',
		underscore: 'underscore-min',
		handlebars: 'handlebars-v2.0.0',
		phaser: 'phaser.min',
		ponupapi: '../bower_components/ponup-api-js/api'
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
		PonupApi = require( 'ponupapi' ),
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

	context.ponupApi = new PonupApi();
	// context.ponupApi.setBaseUrl( 'http://localhost:8080' );
	
	document.addEventListener( 'deviceready', function() {	

		context.game = new Phaser.Game( 320, 480, Phaser.AUTO, 'gameDiv', { preload: preload, create: create } );

		document.addEventListener( 'backbutton', function() {
			if( 'mainMenu' === context.game.state.current )
				navigator.app.exitApp();
			else
				context.game.state.start( 'mainMenu' );
		}, false );

	});
});

