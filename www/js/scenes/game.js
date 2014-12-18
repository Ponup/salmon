
define( function( require ) {

	var BaseScene = require( 'pew/scenes/base' ),
		Phaser = require( 'phaser' ),
		tplHtml = require( 'text!templates/scenes/game.html' ),
		$ = require( 'jquery' ),
		FishSprite = require( 'sprites/fish' );

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

		this.game = new Phaser.Game( 400, 490, Phaser.AUTO, 'gameDiv' );
		this.rnd = new Phaser.RandomDataGenerator();
		this.items = [];

		var mainState = {

			preload: function() { 
				this.game.load.image( 'flower', 'img/flower.png' ); 
				this.game.load.image( 'background', 'img/bg/game_bg.png' ); 
				this.game.load.image( 'stones1', 'img/props/prop_piedras_1.png' ); 
				this.game.load.image( 'stones2', 'img/props/prop_piedras_2.png' ); 
				this.game.load.image( 'stones3', 'img/props/prop_piedras_3.png' ); 
				this.game.load.image( 'chest1', 'img/props/prop_cofre_1.png' ); 
				this.game.load.image( 'chest2', 'img/props/prop_cofre_2.png' ); 
				this.game.load.image( 'chest3', 'img/props/prop_cofre_3.png' ); 
				this.game.load.spritesheet( 'props', 'img/salmon_props_sprite.png', 128, 128, 30);
				this.game.load.spritesheet( 'fish', 'img/salmon_sprite.png', 72, 120, 13);
			},

			create: function() {
				this.game.physics.startSystem( Phaser.Physics.ARCADE );

				this.createBackground();
				this.createPlayer();

				this.cursors = this.game.input.keyboard.createCursorKeys();

				setInterval( $.proxy( this.addRandomItem, this ), 1200 );
			},

			createBackground: function() {
				this.game.stage.backgroundColor = '#6ED2E5';
				this.bg = this.game.add.tileSprite(
					0, 0,
					this.game.stage.width, this.game.cache.getImage( 'background' ).height,
					'background'
				);
			},

			createPlayer: function() {
				this.fish = new FishSprite( this.game );
				this.game.add.existing( this.fish );
			},

			addRandomItem: function() {
				var x = this.rnd.integerInRange( 20, 400 ),
					y = 0;

				var items = [
					'flower',
					'chest1', 'chest2', 'chest3',
					'stones1', 'stones2', 'stones3'
				];

				var item = flower = this.game.add.sprite( x, y, items[ this.rnd.integerInRange( 0, items.length - 1 ) ] );
				this.game.physics.arcade.collide( this.fish, item, this.blockHit, null, this );

				this.game.physics.arcade.enable( item );

				// Add velocity to the flower to make it move left
				flower.body.velocity.x = this.rnd.integerInRange(-10, 10); 
				flower.body.velocity.y = this.rnd.integerInRange(20, 70); 

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

//				this.items.push( item );
			},

			blockHit: function( fish, flower ) {
				flower.kill();
			}
		};

		this.game.state.add( 'main', mainState );  
		this.game.state.start( 'main' );
	};

	return GameScene;
});

