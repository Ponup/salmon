
define( function( require ) {
	'use strict';

	var text = null;

	function LevelCompleteState()
	{
	}

	LevelCompleteState.prototype.init = function(args) {
        this.args = args;
    };

	LevelCompleteState.prototype.create = function() {
		var self = this;
		this.game.stage.setBackgroundColor(0x2d2d2d);

		text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Level #' + this.args.level + '\n completed!' );

		//	Center align
		text.anchor.set(0.5);
		text.align = 'center';

		//	Font style
		text.font = 'Arial Black';
		text.fontSize = 50;
		text.fontWeight = 'bold';

		//	Stroke color and thickness
		text.stroke = '#000000';
		text.strokeThickness = 6;
		text.fill = '#43d637';

		setTimeout( function() { self.game.state.start( 'gameLoop', true, false, self.args ); }, 2000 );
	};

	LevelCompleteState.prototype.update = function() {
	};

	return LevelCompleteState;
});
