/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {
    
        export class End extends Phaser.Sprite {
    
    
            game: Phaser.Game;
            gameState: GameState;
           
           
    
            constructor(game: Phaser.Game, gameState: GameState) {
    
                super(game, 1024 + 100,410, "goal");
    
                this.game = game;
                this.gameState = gameState;
                
                game.add.existing(this)
    
            }
    
    
            update() {
    
                this.x -= this.gameState.back4
    
    
            }
    
    
           
    
    
    
           
    
            
    
    
    
        }
    }