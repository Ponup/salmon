
define( function( require ) {
	var $ = require( 'jquery' ),
		BaseScene = require( 'pew/scenes/base' ),
		tplHtml = require( 'text!templates/scenes/scores.html' ),
		gaco = require( 'data/context' ),
		rankingModel = require( 'data/ranking' ),
		Handlebars = require( 'handlebars' )
	;

	function ScoresScene()
	{
		BaseScene.call( this );

		this.setId( 'scores' );
	}

	ScoresScene.prototype = new BaseScene();
	ScoresScene.prototype.constructor = ScoresScene;

	ScoresScene.prototype.switchFrom = function( prevScene )
	{
		document.title = 'Numbers :: Scores';
		document.body.innerHTML = tplHtml;

		var source = document.getElementById( 'templateSource' ).innerHTML,
		    template = Handlebars.compile( source ),
		    templateVariables = { scores: rankingModel.getScores() }

		document.getElementById( 'table' ).innerHTML = template( templateVariables );

		
		var $scores = $( document.getElementById( 'scores' ) );
		$scores.on( 'click', '#backButton', function() {
			gaco.scenesManager.switchTo( 'mainMenu' );
		});
	};

	return ScoresScene;
});

