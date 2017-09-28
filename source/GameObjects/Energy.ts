/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>



module k2016Game {


    export class gameEnergy extends Phaser.Sprite {


        private currentState: GameState;
        private energySprite: Phaser.Sprite;
        private carSprite: Phaser.Sprite;
       
        private tween: Phaser.Tween;
        private carTween: Phaser.Tween;
        public signal: Phaser.Signal;
       



        constructor(game: Phaser.Game) {

            super(game, 62, 20,'energyLayer1');

            this.signal = new Phaser.Signal();
            this.currentState = <GameState>this.game.state.getCurrentState();
           

            this.energySprite = this.game.add.sprite(188, 22, "energyLayer2");
            this.energySprite.visible = true;
            this.energySprite.alpha = .9;
            this.addChild(this.energySprite);

            this.carSprite = this.game.add.sprite(188, 42, "smallCar");
            this.addChild(this.carSprite);



            this.currentState.groupHud.add(this);

           // this.energySprite.width=100;


        }

        getValues(){

            //(850-188):100=(this.carSprite.x)-188:x
            //700:100=this.energySprite.width

            return {energy:parseInt(((this.energySprite.width)*100)/700),path: parseInt((((this.carSprite.x-188)*100)/(850-188)) }

        }

        start(){

            this.carTween = this.game.add.tween(this.carSprite).to({ x: 850 }, 100000, Phaser.Easing.Default, true, 0,0,false);
            this.carTween.onComplete.add(()=>{ 

                this.currentState.win();
                   
            });


        }


        addEnergy(amount: number) {

            let total:number=0;
            if((this.energySprite.width+amount)>=700){total=700}else{total=this.energySprite.width+amount}

            this.tween = this.game.add.tween(this.energySprite).to({ width: total }, 200, Phaser.Easing.Quadratic.Out, true, 0,0,false);

            this.tween.onComplete.add(() => {

                if (this.energySprite.width > 700) this.energySprite.width = 700;

            }, this);

        }

        removeEnergy(amount: number) {

            //console.log(amount)
            let total:number=0;
            if((this.energySprite.width-amount)<=0){total=0}else{total=this.energySprite.width-amount}

            if(total==0){

                this.energySprite.width = 0; this.signal.dispatch();
                this.carTween.stop();

            }else{



            }
            this.tween = this.game.add.tween(this.energySprite).to({ width: total }, 200, Phaser.Easing.Quadratic.Out, true, 0,0,false);

           

        }




    }

}