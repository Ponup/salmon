define( function( require ) {
'use strict';

	var Phaser = require( 'phaser' ),
		FishSprite = require( 'sprites/fish' ),
		WormSprite = require( 'sprites/worm' ),
		Chest1Sprite = require( 'sprites/chest1' ),
		Chest3Sprite = require( 'sprites/chest3' ),
		Stones1Sprite = require( 'sprites/stones1' ),
		Stones2Sprite = require( 'sprites/stones2' ),
		Stones3Sprite = require( 'sprites/stones3' );

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

		this.t1 = this.game.time.events.loop( Phaser.Timer.SECOND * 5 - (this.level * 300), this.addRandomItem, this );
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
		var item2 = this.game.add.sprite( 200, y, 'right_arrow' );		
		item2.inputEnabled = true;
		item2.events.onInputDown.add( function() { self.cursors.right.isDown = true; } );
		item2.events.onInputUp.add( function() { self.cursors.right.isDown = false; } );

        var buttonGroup  = this.game.add.group();
        buttonGroup.add(item);
        buttonGroup.add(item2);

        this.game.add.tween(buttonGroup).to(
                { alpha: 0 },
                /* duration */ 4000,
                Phaser.Easing.Linear.None,
                /* autostart */ true,
                /* delay */ this.level === 1 ? 7000 : 2000,
                /* repeat */ 0,
                /* yoyo */ false);
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
		var item = new WormSprite( this.game, 0, 0);
        this.addFgItem(item);
    };

	GameLoopState.prototype.addRandomItem = function() {
		var items = [
            Chest1Sprite, Chest3Sprite,
            Stones1Sprite, Stones2Sprite, Stones3Sprite
		];
		var randomItemType = items[ this.rnd.integerInRange( 0, items.length - 1 ) ];
        var item = new randomItemType(this.game, 0, 0);
        this.addFgItem(item);
    };

    GameLoopState.prototype.addFgItem = function(item) {
		var x = this.rnd.integerInRange( -20, 270 );

		var imageInfo = this.game.cache.getImage( item.key );
        item.x = item.originalx = x;
        item.y = -imageInfo.height;
        item.speed += this.rnd.frac() * this.level;
        
        if('speedX' in item) {
            item.speedX = this.rnd.realInRange(-0.5, 0.5);
        }

		this.game.add.existing( item );

		// Kill the item when it's no longer visible 
		item.checkWorldBounds = true;
		item.events.onOutOfBounds.add( function( item ) {
		    item.destroy();
		}, item );

		this.fgItems.push( item );

		this.fish.bringToTop();
        this.game.world.bringToTop(this.hud);
	};

	GameLoopState.prototype.update = function() {
		var game = this.game;

		this.secondsLeft = this.INITIAL_SECONDS_LEFT - this.gameTimer.seconds.toFixed( 0 );

		for( var i = 0; i < this.fgItems.length; i++ ) {
			var item = this.fgItems[i];
            item.y++;
            if(item.visible) {
			    this.blockHit(this.fish, item);
            }
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
        this.game.debug.bodyInfo(this.fish, 32, 32);
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
				sprite.destroy();
				return false;
			}
			return true;
		} );
	};

	GameLoopState.prototype.destroyAllItems = function() {
        this.fgItems.forEach(function(item) {
            item.destroy();
        });
        this.fgItems = [];
        this.game.time.events.remove(this.t1);
        this.game.time.events.remove(this.t2);
        this.game.time.events.remove(this.t3);
        this.game.time.events.remove(this.t4);
    };

    GameLoopState.prototype.poliContainsFishPoints = function(area, points) {
        for(var i =0 ;i < points.length;i ++) {
                var point = points[i];
                if(area.contains(point[0], point[1])) return true;
        }
        return false;
    };

	GameLoopState.prototype.blockHit = function( fish, item ) {
        if(item.hitted) return;

        if(item.absoluteBodyPoints && !this.poliContainsFishPoints(item.absoluteBodyPolygon, fish.absoluteBodyPoints)) {
            return false;
        }
        if(!item.absoluteBodyPoints && !Phaser.Rectangle.intersects(fish.getBounds(), item.getBounds())) {
            return false;
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
			this.energy += 5;
            this.numWormsPickedUp++;
		    item.kill();
		} else {
            this.game.camera.shake(0.02, 200);
        }

		this.energy = Math.min( this.energy, 100 );
	};

    GameLoopState.prototype.drawSilhouette = function() {
        if(this.graphics) {
            this.graphics.x = this.x - ( this.width >> 1 );
            this.graphics.y = this.y - ( this.height >> 1 );
        } else {
            this.graphics = this.game.add.graphics(this.x >> 1, this.y >> 1);
            this.graphics.lineStyle(4, 0xff0000, 1);
            this.graphics.drawPolygon(this.bodyPolygon.points);
        }
    };

	return GameLoopState;
});

