
define( function( require ) {
	'use strict';

	var Phaser = require( 'phaser' ),
		$ = require( 'jquery' ),
		FishSprite = require( 'sprites/fish' ),
		WormSprite = require( 'sprites/worm' );

	function GameLoopState()
	{
		this.rnd = new Phaser.RandomDataGenerator();
			
		this.bgItems = [];
		this.fgItems = [];
		
		this.BOTTOM_LAYER_SPEED = 0.5;
		this.INITIAL_SECONDS_LEFT = 60;
        
        this.hud = null;
	}

    GameLoopState.prototype.init = function(args) {
        var defaults = {
            score: 0,
            level: 0,
        };
        var fullArgs = args || defaults;
        this.score = fullArgs.score;
        this.level = fullArgs.level + 1;
        this.numWormsPickedUp = 0;
    };

	GameLoopState.prototype.preload = function() { 
		this.preloadBackground();
		this.game.load.image( 'worm', 'img/worm.png' );
		this.game.load.image( 'stones1', 'img/props/prop_piedras_1.png' ); 
		this.game.load.image( 'stones2', 'img/props/prop_piedras_2.png' ); 
		this.game.load.image( 'stones3', 'img/props/prop_piedras_3.png' ); 
		this.game.load.image( 'chest1', 'img/props/prop_cofre_1.png' ); 
		this.game.load.image( 'chest3', 'img/props/prop_cofre_3.png' ); 
		
        this.game.load.image( 'stopwatch', 'img/stopwatch.png' ); 

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

		this.gameTimer = this.game.time.create( false );
		this.gameTimer.start();

		this.createBackground();
		this.createPlayer();
		this.createHud();
		this.createButtons();

		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.t1 = this.game.time.events.loop( Phaser.Timer.SECOND * 5 - (this.level * 1000), this.addRandomItem, this );
		this.t2 = this.game.time.events.loop( Phaser.Timer.SECOND * 3 + (this.level * 100), this.addWormItem, this );
		this.t3 = this.game.time.events.loop( Phaser.Timer.SECOND * 2, function() { this.distance += 0.5; }, this );
		this.t4 = this.game.time.events.loop( Phaser.Timer.SECOND + (this.level * 200), function() { this.energy--; }, this );
	};
	
	GameLoopState.prototype.createHud = function() {
		var game = this.game;
		var style = { font: "20px Arial", fill: "#ffffff", align: "center" };
		this.secondsText = game.add.text( 5, 10, this.secondsLeft, style);
		this.scoreText = game.add.text( 100, 10, this.score, style);
		this.distanceText = game.add.text( 185, 10, this.distance + 'm', style);
		this.energyText = game.add.text( 250, 10, this.energy + '%', style);

        this.hud = game.add.group();
        this.hud.add(this.secondsText);
        this.hud.add(this.scoreText);
        this.hud.add(this.distanceText);
        this.hud.add(this.energyText);
	};

	GameLoopState.prototype.createBackground = function() {
		this.game.stage.backgroundColor = '#6ED2E5';
		this.bg = this.game.add.tileSprite(
			0, 0,
			320, 480,
			//this.game.cache.getImage( 'tileBackground' ).height,
			'tileBackground' );
		this.bg.autoScroll( 0, 0.5 /*this.BOTTOM_LAYER_SPEED*/ );
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
		item = this.game.add.sprite( 200, y, 'right_arrow' );		
		item.inputEnabled = true;
		item.events.onInputDown.add( function() { self.cursors.right.isDown = true; } );
		item.events.onInputUp.add( function() { self.cursors.right.isDown = false; } );
	};

	GameLoopState.prototype.createStaticRandomItem = function() {
		var x = this.rnd.integerInRange( -64, this.game.stage.width - 64 ),
			y = this.rnd.integerInRange( -64, -512 ),
			item = this.game.add.sprite( x, y, 'staticElements', this.rnd.integerInRange( 0, 32 ) );

		item.alpha = 0.35;
		item.scale.x = item.scale.y = 0.8;

		return item;
	};

    GameLoopState.prototype.addWormItem = function() {
        this.addFgItem({type: 'worm', sprite: 'worm'});
    };

	GameLoopState.prototype.addRandomItem = function() {
		var items = [
            { type: 'chest', sprite: 'chest1' },
            { type: 'chest', sprite: 'chest3' },
            { type: 'stone', sprite: 'stones1' },
            { type: 'stone', sprite: 'stones2' },
            { type: 'stone', sprite: 'stones3' },
		];
		var randomSpriteName = items[ this.rnd.integerInRange( 0, items.length - 1 ) ];
        this.addFgItem(randomSpriteName);
    };

    GameLoopState.prototype.addFgItem = function(randomSpriteName) {
		var x = this.rnd.integerInRange( -20, 270 );

		var imageInfo = this.game.cache.getImage( randomSpriteName.sprite );

		var item = null;
		if( 'worm' === randomSpriteName.type ) {
			item = new WormSprite( this.game, x, -imageInfo.height );
			this.game.add.existing( item );
		}
		else {
			item = this.game.add.sprite( x, -imageInfo.height, randomSpriteName.sprite );
//			this.game.physics.arcade.enable( item );
//			item.body.velocity.y = 60; 
		}
        item.objectType = randomSpriteName.type;
		// Kill the item when it's no longer visible 
		item.checkWorldBounds = true;
		item.outOfBoundsKill = true;
		item.events.onOutOfBounds.add( function( item ) {
			item.kill();
		//	item.destroy();
		}, item );

		this.fgItems.push( item );

		this.fish.bringToTop();
        this.game.world.bringToTop(this.hud);
	};

	GameLoopState.prototype.update = function() {
		var game = this.game;

		this.secondsLeft = this.INITIAL_SECONDS_LEFT - this.gameTimer.seconds.toFixed( 0 );

		for( var i = 0; i < this.fgItems.length; i++ ) {
//			this.game.physics.arcade.collide( this.fish, this.fgItems[ i ], this.blockHit, null, this );
			var item = this.fgItems[i];
            item.y++;
			this.blockHit(this.fish, item);
		}

        var gameData = { score: this.score, level: this.level };

		if( this.distance === 15 || this.numWormsPickedUp >= 10) {
            this.destroyAllItems();
			this.game.state.start('levelComplete', true, false, gameData);
			return;
		}

		if( this.energy < 0 || this.secondsLeft === 0) {
            this.destroyAllItems();
			this.game.state.start('gameOver', true, false, gameData);
			return;
		}
		
		this.secondsText.text = this.secondsLeft;
        var secondsColor = null;
        if(this.secondsLeft < 10) {
            secondsColor = '#FF6347';
        } else if(this.secondsLeft  < 25) {
            secondsColor = '#FFA500';
        } else {
            secondsColor = '#FFFFFF';
        }
        this.secondsText.addColor(secondsColor, 0);
		this.scoreText.text = this.score;
		this.distanceText.text = this.distance + 'm';
        this.distanceText.addStrokeColor(this.distance > 10 ? '#000000' : '#ffffff' , 0);
		this.energyText.text = this.energy + '%';
        this.energyText.addColor(this.energy < 50 ? '#ff0000' : '#ffffff' , 0);

		this.fish.updateState( this.cursors );
	};

	GameLoopState.prototype.render = function() {
		this.updateBackground();
		//this.game.debug.spriteBounds(sprite);
		//this.game.debug.spriteCorners(sprite, true, true);
	};

	GameLoopState.prototype.updateBackground = function() {
		var self = this;
        var item = null;
		this.bg.tilePosition.y += this.BOTTOM_LAYER_SPEED;

		if( this.bgItems.length < 5 ) {
			item = this.createStaticRandomItem();
			this.bgItems.push( item );
		}
		for( var i = 0; i < this.bgItems.length; i++ ) {
			item = this.bgItems[ i ];
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

	GameLoopState.prototype.destroyAllItems = function() {
        this.fgItems.forEach(function(item) {
            item.kill();
            item.destroy();
        });
        this.fgItems = [];
        this.game.time.events.remove(this.t1);
        this.game.time.events.remove(this.t2);
        this.game.time.events.remove(this.t3);
        this.game.time.events.remove(this.t4);
    };
	GameLoopState.prototype.blockHit = function( fish, item ) {
        if(!Phaser.Rectangle.intersects(fish.getBounds(), item.getBounds()) || item.hitted) {
            return;
        }
        item.hitted = true;
		if( item.key === 'chest1' ) {
			this.energy -= 15;
		}
		if( item.key === 'chest3' ) {
			this.energy -= 30;
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
		if( item instanceof WormSprite ) {
			this.score += 1;
			this.energy += 10;
		}

		this.energy = Math.min( this.energy, 100 );

		if(item.objectType === 'worm') {
            this.numWormsPickedUp++;
		    item.kill();
        } else {
            this.game.camera.shake(0.02, 200);
        }

	};

	return GameLoopState;
});

