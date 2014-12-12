
define( function( require ) {
	var $ = require( 'jquery' ),
		BaseScene = require( 'pew/scenes/base' ),
		tplHtml = require( 'text!templates/scenes/mainMenu.html' ),
		context = require( 'data/context' ),
		preferences = require( 'data/preferences' );

	function MainMenu()
	{
		BaseScene.call( this );

		this.setId( 'mainMenu' );
	}

	MainMenu.prototype = new BaseScene();
	MainMenu.prototype.constructor = MainMenu;

	MainMenu.prototype.switchFrom = function( prevScene )
	{
		document.title = 'Numbers';
		document.body.innerHTML = tplHtml;

		if( preferences.isMusicEnabled() )
		{
			context.sounds.bgmusic.play();
		}
		
		var $menuLayer = $( document.getElementById( 'menu' ) );

		$menuLayer.on( 'click', '#startGame', function() {
			context.scenesManager.switchTo( 'game' );
		});
		$menuLayer.on( 'click', '#gotoScores', function() {
			context.scenesManager.switchTo( 'scores' );
		});
		$menuLayer.on( 'click', '#gotoOptions', function() {
			context.scenesManager.switchTo( 'options' );
		});

//		window.plugins.socialsharing.available( this.shareIfAvailable );
	};

	MainMenu.prototype.shareIfAvailable = function( isAvailable )
	{
		if( false === isAvailable )
		{
			return;
		}

		var $share = $( document.getElementById( 'share' ) ),
			$options = $( '.actions' );

		$share.removeClass( 'hidden' );

		$options.on( 'click', '#share', function() {
			window.plugins.socialsharing.share( 'Play the @Ponup Numbers game for free in your phone. More info http://ponup.com', '@Ponup Numbers' );
		});
	};

	return MainMenu;
});

