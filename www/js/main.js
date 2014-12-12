
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
		ScenesManager = require( 'pew/scenes/manager' ),
		IntroScene = require( 'scenes/intro' ),
		MainMenuScene = require( 'scenes/mainMenu' ),
		GameScene = require( 'scenes/game' ),
		GameLostScene = require( 'scenes/gameLost' ),
		LevelCompleteScene = require( 'scenes/levelComplete' ),
		introScene = new IntroScene();

	context.scenesManager = new ScenesManager();
	context.scenesManager.add( introScene );
	context.scenesManager.add( new MainMenuScene() );
	context.scenesManager.add( new GameScene() );
	context.scenesManager.add( new GameLostScene() );
	context.scenesManager.add( new LevelCompleteScene() );
	context.scenesManager.switchTo( introScene );
});

