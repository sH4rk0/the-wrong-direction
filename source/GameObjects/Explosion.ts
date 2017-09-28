/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {

    export class Explosion extends Phaser.Sprite {


        game: Phaser.Game;
        gameState: GameState;
        x: number;
        y: number;
        

        constructor(game: Phaser.Game, gameState: GameState, x: number, y: number, name: string, type: string) {


            super(game, x, y, name);

            this.game = game;
            this.gameState = gameState;

           // playSound(gameSound.explosion);

           
            this.anchor.set(.5,1);
          
        
            this.scale.set(2);

            let anim = this.animations.add('boom', null, 20,false).play();
            anim.onComplete.add(function () { this.kill();this.destroy(); }, this)
            game.add.existing(this);

            /*
           if (type == "player") {

                if(!isMobile()){

               
                for (var i = 0; i < 5; i++) {

                    this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "trash" + (i + 1), "enemy"));

                } 
            }

                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaArm", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaArm", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaBody", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaHead", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaLeg", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaLeg", "player"));

                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip1", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip2", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip2", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip3", "player"));
                this.gameState.groupAll.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip4", "player"));



            }
*/



        }


        update() { 


            this.x -= this.gameState.back3;



        }

        



    }
}