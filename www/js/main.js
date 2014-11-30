
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

require( [ 'phaser', 'jquery' ], function( Phaser, $ ) {
	var game = new Phaser.Game( 400, 490, Phaser.AUTO, 'gameDiv' );

	var mainState = {

		preload: function() { 
			game.stage.backgroundColor = '#6ED2E5';
			game.load.image( 'fish', 'img/fish.png' ); 
			game.load.image( 'flower', 'img/flower.png' ); 
		},

		create: function() { 
			game.physics.startSystem( Phaser.Physics.ARCADE );

			this.createPlayer();

			this.cursors = game.input.keyboard.createCursorKeys();

			setInterval( $.proxy( this.addRandomFlower, this ), 1200 );
		},

		createPlayer: function() {
			this.fish = this.game.add.sprite(100, 245, 'fish' );
			game.physics.arcade.enable( this.fish );
			this.fish.anchor.set( 20, 44 );
			this.fish.body.collideWorldBounds=true;
			this.fish.body.fixedRotation = true;
			//this.fish.body.onBeginContact.add(this.blockHit, this);
		},

		addRandomFlower: function() {
			var rnd = new Phaser.RandomDataGenerator();

			var x = rnd.integerInRange( 20, 400 ), y = 0;
			this.flower = flower = this.game.add.sprite( x, y, 'flower' );
			game.physics.arcade.enable( this.flower );

			// Add velocity to the flower to make it move left
			flower.body.velocity.x = rnd.integerInRange(-10, 10); 
			flower.body.velocity.y = rnd.integerInRange(20, 70); 

			// Kill the flower when it's no longer visible 
			flower.checkWorldBounds = true;
			flower.outOfBoundsKill = true;
		},
	
		update: function() {
			if (this.cursors.left.isDown) {
				this.fish.body.x -= 10;
			}
			else if (this.cursors.right.isDown) {
				this.fish.body.x += 5;
			}
			if (this.cursors.up.isDown) {
				this.fish.body.y -= 5;
			}
			else if (this.cursors.down.isDown) {
				this.fish.body.y += 10;
			}

			game.physics.arcade.collide( this.fish, this.flower, this.blockHit, null, this );
		},

		blockHit: function( fish, flower ) {
			flower.kill();
		}
	};

	game.state.add( 'main', mainState );  
	game.state.start( 'main' );
} );

