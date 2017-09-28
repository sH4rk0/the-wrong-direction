/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {

    export class Enemy extends Phaser.Sprite {


        game: Phaser.Game;
        gameState: GameState;
        private vel: number;
       
        private lanes:Array<number>=[465,517,580];
        public lane:number=0;
        public type:any;
        public isDestroyable:boolean=false;
        public score:number;
        public playerDamage:number;
       
       

        constructor(game: Phaser.Game, gameState: GameState, typeObj:any) {

        
            super(game, game.camera.x + 1024 + 100,0, typeObj.sprite);

            this.type = typeObj;
            this.game = game;
            this.gameState = gameState;

            this.frame=this.type.frame;
            
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;
            this.anchor.setTo(.5,1);

            this.playerDamage=this.type.damage;
            this.name=this.type.sprite;
            this.score=this.type.score;
            this.isDestroyable=this.type.destroyable;
           
            this.lane=this.game.rnd.integerInRange(0,2)
            this.y = this.lanes[this.lane];

       
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