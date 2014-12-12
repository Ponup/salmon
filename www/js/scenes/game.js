
define( function( require ) {

	var BaseScene = require( 'pew/scenes/base' ),
		tplHtml = require( 'text!templates/scenes/game.html' );

	function GameScene()
	{
		BaseScene.call( this );

		this.setId( 'game' );
	}

	GameScene.prototype = new BaseScene();
	GameScene.prototype.constructor = GameScene;

	GameScene.prototype.switchFrom = function( prevScene )
	{
		document.title = 'Ponup Salmon playing...';
		document.body.innerHTML = tplHtml;

		var Phaser = require( 'phaser' ),
			$ = require( 'jquery' );

		var game = new Phaser.Game( 400, 490, Phaser.AUTO, 'gameDiv' );

		var mainState = {

			preload: function() { 
				game.stage.backgroundColor = '#6ED2E5';
				game.load.image( 'flower', 'img/flower.png' ); 
				game.load.spritesheet( 'fish', 'img/salmon_sprite.png', 71, 120, 7);
			},

			create: function() { 
				game.physics.startSystem( Phaser.Physics.ARCADE );

				this.createPlayer();

				this.cursors = game.input.keyboard.createCursorKeys();

				setInterval( $.proxy( this.addRandomFlower, this ), 1200 );
			},

			createPlayer: function() {
				this.fish = this.game.add.sprite(100, 245, 'fish' );
				this.fish.animations.add( 'left', [ 2, 1, 0 ], 3, false );
				this.fish.animations.add( 'idle', [ 3 ], 1, true );
				this.fish.animations.add( 'right', [ 4, 5, 6 ], 3, false );
				game.physics.arcade.enable( this.fish );
				this.fish.anchor.set( 20, 44 );
				this.fish.body.collideWorldBounds = true;
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
				var leftOrRight = false;
				if (this.cursors.left.isDown) {
					leftOrRight = true;
					this.fish.animations.play( 'left' );
					this.fish.body.x -= 5;
				}
				else if (this.cursors.right.isDown) {
					leftOrRight = true;
					this.fish.animations.play( 'right' );
					this.fish.body.x += 5;
				}
				if( false === leftOrRight ) {
					this.fish.animations.play( 'idle' );
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
	};

	return GameScene;
});

