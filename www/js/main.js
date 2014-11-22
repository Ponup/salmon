
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
        }
});

require( [ 'phaser' ], function( Phaser ) {
	var game = new Phaser.Game( 400, 490, Phaser.AUTO, 'gameDiv' );

	var mainState = {

		preload: function() { 
			game.stage.backgroundColor = '#6ED2E5';
			game.load.image( 'fish', 'img/fish.png' ); 
		},

		create: function() { 
			game.physics.startSystem( Phaser.Physics.ARCADE );
			game.physics.startSystem( Phaser.Physics.P2JS );
			game.physics.p2.defaultRestitution = 0.8;

			this.fish = this.game.add.sprite(100, 245, 'fish' );
			this.fish.anchor.set( .5 );

			game.physics.p2.enable( this.fish );
			this.fish.body.setZeroDamping();
			this.fish.body.fixedRotation = true;

			this.cursors = game.input.keyboard.createCursorKeys();
		},

		update: function() {
			this.fish.body.setZeroVelocity();
			if (this.cursors.left.isDown) {
				this.fish.body.moveLeft(400);
			}
			else if (this.cursors.right.isDown) {
				this.fish.body.moveRight(400);
			}
			if (this.cursors.up.isDown) {
				this.fish.body.moveUp(100);
			}
			else if (this.cursors.down.isDown) {
				this.fish.body.moveDown(200);
			}
		},
	};

	game.state.add('main', mainState);  
	game.state.start('main');
} );

