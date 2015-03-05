
define( function( require ) {
	'use strict';

	var Phaser = require( 'phaser' ),
		$ = require( 'jquery' ),
		FishSprite = require( 'sprites/fish' );

	function GameLoopState()
	{
		this.NEW_GAME = 0;
		this.NEW_LEVEL = 1;
		this.startMode = this.NEW_GAME;

		this.rnd = new Phaser.RandomDataGenerator();
			
		this.bgItems = [];
		this.fgItems = [];
		
		this.BOTTOM_LAYER_SPEED = .5;
		this.INITIAL_SECONDS_LEFT = 60;
	}

	GameLoopState.prototype.preload = function() { 
		this.preloadBackground();
		this.game.load.image( 'stones1', 'img/props/prop_piedras_1.png' ); 
		this.game.load.image( 'stones2', 'img/props/prop_piedras_2.png' ); 
		this.game.load.image( 'stones3', 'img/props/prop_piedras_3.png' ); 
		this.game.load.image( 'chest1', 'img/props/prop_cofre_1.png' ); 
		this.game.load.image( 'chest2', 'img/props/prop_cofre_2.png' ); 
		this.game.load.image( 'chest3', 'img/props/prop_cofre_3.png' ); 

		// Virtual keys
		this.game.load.image( 'left_arrow', 'img/buttons/left-arrow.png' ); 
		this.game.load.image( 'right_arrow', 'img/buttons/right-arrow.png' ); 

		this.game.load.spritesheet( 'staticElements', 'img/props/salmon_props_sprite.png', 128, 128, 32 );
		this.game.load.spritesheet( 'fish', 'img/salmon_sprite.png', 72, 120, 13);
	};

	GameLoopState.prototype.preloadBackground = function() {
		this.game.load.image( 'background', 'img/bg/game_bg.png' ); 
		this.game.load.image( 'tileBackground', 'img/bg/surface_tile.png' ); 
		this.game.load.image( 'topBackground', 'img/bg/game_layer_vignette.png' );
	};

	GameLoopState.prototype.create = function() {
		this.game.physics.startSystem( Phaser.Physics.ARCADE );

		// Game data
		this.secondsLeft = this.INITIAL_SECONDS_LEFT;
		this.distance = 0;
		this.energy = 100;
		if( this.NEW_GAME === this.startMode ) {
			this.score = 0;
		}
		else {
		}

		this.gameTimer = this.game.time.create( false );
		this.gameTimer.start();

		this.createBackground();
		this.createPlayer();
		this.createHud();
		this.createButtons();

		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.game.time.events.loop( Phaser.Timer.SECOND, this.addRandomItem, this );
	};
	
	GameLoopState.prototype.createHud = function() {
		var game = this.game;
		var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
		this.secondsText = game.add.text( 0, 10, this.secondsLeft, style);
		this.scoreText = game.add.text( 200, 10, this.score, style);
		this.scoreText.anchor.set(0.5);
		this.distanceText = game.add.text( 0, 200, this.distance + 'm', style);
		this.energyText = game.add.text( 200, 200, this.energy + '%', style);
	};

	GameLoopState.prototype.createBackground = function() {
		this.game.stage.backgroundColor = '#6ED2E5';
		this.bg = this.game.add.tileSprite(
			0, 0,
			320, 480,
			//this.game.cache.getImage( 'tileBackground' ).height,
			'tileBackground' );
		this.bg.autoScroll( 0, .5 /*this.BOTTOM_LAYER_SPEED*/ );
		this.topBackground = this.game.add.sprite( 0, 0, 'topBackground' );
		this.topBackground.width = 320;
		this.topBackground.height = 480;
		this.bgItems = [];
	};

	GameLoopState.prototype.createPlayer = function() {
		this.fish = new FishSprite( this.game );
		this.game.add.existing( this.fish );
	};
	
	GameLoopState.prototype.createButtons = function() {
		var self = this;
		var y = 400;
		var item = this.game.add.sprite( 0, y, 'left_arrow' );
		item.inputEnabled = true;
		item.events.onInputDown.add( function() { self.cursors.left.isDown = true; } );
		item.events.onInputUp.add( function() { self.cursors.left.isDown = false; } );
		var item = this.game.add.sprite( 200, y, 'right_arrow' );		
		item.inputEnabled = true;
		item.events.onInputDown.add( function() { self.cursors.right.isDown = true; } );
		item.events.onInputUp.add( function() { self.cursors.right.isDown = false; } );
	};

	GameLoopState.prototype.createStaticRandomItem = function() {
		var x = this.rnd.integerInRange( -64, this.game.stage.width - 64 ),
			y = this.rnd.integerInRange( -64, -512 ),
			item = this.game.add.sprite( x, y, 'staticElements', this.rnd.integerInRange( 0, 32 ) );

		item.alpha = .35;
		item.scale.x = item.scale.y = .8;

		return item;
	};

	GameLoopState.prototype.addRandomItem = function() {
		var x = this.rnd.integerInRange( -20, 420 ),
			y = -200;

		var items = [
			'chest1', 'chest2', 'chest3',
			'stones1', 'stones2', 'stones3'
		];
		var randomSpriteName = items[ this.rnd.integerInRange( 0, items.length - 1 ) ];

		this.distance += 0.5;

		var item = this.game.add.sprite( x, y, randomSpriteName );
		this.game.physics.arcade.enable( item );

		// Add velocity to the item to make it move left
		item.body.velocity.y = 60; 

		// Kill the item when it's no longer visible 
		item.checkWorldBounds = true;
		item.outOfBoundsKill = true;
		item.events.onOutOfBounds.add( function( item ) {
			item.kill();
		//	item.destroy();
		}, item );

		this.fgItems.push( item );

		this.fish.bringToTop();
	};

	GameLoopState.prototype.update = function() {
		var game = this.game;
		this.updateBackground();

		this.secondsLeft = this.INITIAL_SECONDS_LEFT - this.gameTimer.seconds.toFixed( 0 );

		for( var i = 0; i < this.fgItems.length; i++ ) {
			this.game.physics.arcade.collide( this.fish, this.fgItems[ i ], this.blockHit, null, this );
		}

		if( this.secondsLeft === 0 ) {
			this.startMode = this.NEW_GAME;
			// this.game.time.events.remove( this.timer );
			this.game.state.start( 'gameOver' );
			return;
		}
		if( this.distance === 20 ) {
			this.startMode = this.NEW_LEVEL;
			this.game.state.start( 'levelComplete' );
			return;
		}
		
		this.secondsText.text = this.secondsLeft;
		this.scoreText.text = this.score;
		this.distanceText.text = this.distance + 'm';
		this.energyText.text = this.energy + '%';

		this.fish.updateState( this.cursors );
	};

	GameLoopState.prototype.updateBackground = function() {
		var self = this;
		this.bg.tilePosition.y += this.BOTTOM_LAYER_SPEED;

		if( this.bgItems.length < 5 ) {
			var item = this.createStaticRandomItem();
			this.bgItems.push( item );
		}
		for( var i = 0; i < this.bgItems.length; i++ ) {
			var item = this.bgItems[ i ];
			item.y += this.BOTTOM_LAYER_SPEED;
		}
		this.bgItems = this.bgItems.filter( function( sprite ) {
			if( sprite.y > 480 ) { // self.game.stage.height
				sprite.kill();
				sprite.destroy();
				return false;
			}
			return true;
		} );
	};

	GameLoopState.prototype.blockHit = function( fish, item ) {
		if( item.key === 'chest1' ) {
			this.score += 10;;
			item.kill();
		}
		if( item.key === 'chest2' ) {
			this.score += 15;;
			item.kill();
		}
		if( item.key === 'chest3' ) {
			this.score += 30;;
			item.kill();
		}
		if( item.key === 'stones1' ) {
			this.energy -= 5;
		}
		if( item.key === 'stones2' ) {
			this.energy -= 10;
		}
		if( item.key === 'stones3' ) {
			this.energy -= 20;
		}
	};

	return GameLoopState;
});

