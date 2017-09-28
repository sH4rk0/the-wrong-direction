/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {
    
        export class Bonus extends Phaser.Sprite {
    
    
            game: Phaser.Game;
            gameState: GameState;
            private vel: number;
           
            private lanes:Array<number>=[460,510,570];
            public lane:number=0;
            public type:any;
            public isDestroyable:boolean=false;
            public score:number;
            public playerDamage:number;
           
           
    
            constructor(game: Phaser.Game, gameState: GameState) {
    
            
                super(game, game.camera.x + 1024 + 100,0,"scooter");
    
                this.game = game;
                this.gameState = gameState;
                
                this.game.physics.arcade.enable(this);
                this.body.immovable = false;
                this.body.allowGravity = false;
                this.anchor.setTo(.5,1);
                this.name="bonus";
               

   
              
               
                this.lane=this.game.rnd.integerInRange(0,2);

                if(this.lane==0){ this.vel=10}else if(this.lane==1){this.vel=10.5} else{ this.vel=11}
                this.y = this.lanes[this.lane];
    
                this.animations.add("run",[0,1],10,true).play();
                    
                       
    
                this.game.add.tween(this).to({ y: this.y - 3 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
                
             
    
                
                game.add.existing(this)
    
            }
    
    
            setValues() {
    
    
                
    
    
            }
    
            update() {
    
    
                if(this.lane==0){ this.vel=this.gameState.back2}else if(this.lane==1){this.vel=this.gameState.back3} else{ this.vel=this.gameState.back4}
                this.x -= this.vel;
    
                if (this.x < this.game.camera.x - 130) { this.kill();this.destroy(); }
    
    
    
    
            }
    
    
    
            explode() {
    
              
               
                this.kill();
                this.destroy();
    
    
    
    
            }
    
            
    
    
    
        }
    }