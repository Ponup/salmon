
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

		this.game = new Phaser.Game( 320, 480, Phaser.AUTO, 'gameDiv' );
		this.rnd = new Phaser.RandomDataGenerator();


		var mainState = {
			
			bgItems: [],
			fgItems: [],
		
			BOTTOM_LAYER_SPEED: .5,

			preload: function() { 
				this.preloadBackground();
				this.game.load.image( 'stones1', 'img/props/prop_piedras_1.png' ); 
				this.game.load.image( 'stones2', 'img/props/prop_piedras_2.png' ); 
				this.game.load.image( 'stones3', 'img/props/prop_piedras_3.png' ); 
				this.game.load.image( 'chest1', 'img/props/prop_cofre_1.png' ); 
				this.game.load.image( 'chest2', 'img/props/prop_cofre_2.png' ); 
				this.game.load.image( 'chest3', 'img/props/prop_cofre_3.png' ); 
				this.game.load.spritesheet( 'props', 'img/salmon_props_sprite.png', 128, 128, 30);
				this.game.load.spritesheet( 'fish', 'img/salmon_sprite.png', 72, 120, 13);
			},

			preloadBackground: function() {
				this.game.load.image( 'background', 'img/bg/game_bg.png' ); 
				this.game.load.image( 'tileBackground', 'img/bg/surface_tile.png' ); 
				this.game.load.image( 'topBackground', 'img/bg/game_layer_vignette.png' );
			},

			create: function() {
				this.game.physics.startSystem( Phaser.Physics.ARCADE );

				this.secondsLeft = 180;
				this.score = 0;

				this.createBackground();
				this.createPlayer();

				this.cursors = this.game.input.keyboard.createCursorKeys();

				setInterval( $.proxy( this.addRandomItem, this ), 1000 );
			},

			createBackground: function() {
				this.game.stage.backgroundColor = '#6ED2E5';
				this.bg = this.game.add.tileSprite(
					0, 0,
					320, 480,
//					this.game.stage.width,
//					this.game.stage.height,
					//this.game.cache.getImage( 'tileBackground' ).height,

					'tileBackground' );
				this.bg.autoScroll( 0, .5 /*this.BOTTOM_LAYER_SPEED*/ );
				this.topBackground = this.game.add.sprite( 0, 0, 'topBackground' );
				this.topBackground.width = 320;
				this.topBackground.height = 480;
				this.bgItems = [];
			},

			createPlayer: function() {
				this.fish = new FishSprite( this.game );
				this.game.add.existing( this.fish );
			},

			createStaticRandomItem: function() {
				var x = this.rnd.integerInRange( -20, 420 ),
					y = -200;

				var items = [
					'chest1', 'chest2', 'chest3',
					'stones1', 'stones2', 'stones3'
				];
				var randomSpriteName = items[ this.rnd.integerInRange( 0, items.length - 1 ) ];
				console.log('randomSpriteName: ' + randomSpriteName);

				var item = this.game.add.sprite( x, y, randomSpriteName );
				item.alpha = .22;
				item.scale.x = item.scale.y = .25;

				return item;
			},

			addRandomItem: function() {
				var x = this.rnd.integerInRange( -20, 420 ),
					y = -200;

				var items = [
					'chest1', 'chest2', 'chest3',
					'stones1', 'stones2', 'stones3'
				];
				var randomSpriteName = items[ this.rnd.integerInRange( 0, items.length - 1 ) ];
				console.log('randomSpriteName: ' + randomSpriteName);

				var item = this.game.add.sprite( x, y, randomSpriteName );
				this.game.physics.arcade.enable( item );

				// Add velocity to the item to make it move left
				item.body.velocity.y = 30; 

				// Kill the item when it's no longer visible 
				item.checkWorldBounds = true;
				item.outOfBoundsKill = true;
				item.events.onOutOfBounds.add( function( item ) {
					item.kill();
				//	item.destroy();
				}, item );

				this.fgItems.push( item );

				this.fish.bringToTop();
			},
		
			update: function() {
				this.updateBackground();

				this.secondsLeft = 180 - parseInt( this.game.time.totalElapsedSeconds() );

				for( var i = 0; i < this.fgItems.length; i++ ) {
					this.game.physics.arcade.collide( this.fish, this.fgItems[ i ], this.blockHit, null, this );
				}

				document.getElementById( 'secondsLeft' ).innerHTML = this.secondsLeft;
				document.getElementById( 'score' ).innerHTML = this.score;

				this.fish.updateState( this.cursors );
			},

			updateBackground: function() {
				this.bg.tilePosition.y += this.BOTTOM_LAYER_SPEED;

				if( this.bgItems.length < 2 ) {
					console.debug( 'Adding static random item' );
					var item = this.createStaticRandomItem();
					this.bgItems.push( item );
				}
				for( var i = 0; i < this.bgItems.length; i++ ) {
					var item = this.bgItems[ i ];
					item.y += this.BOTTOM_LAYER_SPEED;
				}
			},

			blockHit: function( fish, item ) {
					  console.debug(' hizo hit!!');
				this.score += 1;
				item.kill();
			}
		};

		this.game.state.add( 'main', mainState );  
		this.game.state.start( 'main' );
	};

	return GameScene;
});

