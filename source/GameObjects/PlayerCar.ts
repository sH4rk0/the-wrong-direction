/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {


    export class PlayerCar extends Phaser.Sprite {

        game: Phaser.Game;
        gameState: GameState;
        private onGround: boolean = false;
       
       
        private cursors: Phaser.CursorKeys;


        private downButton: Phaser.Key;
        private upButton: Phaser.Key;
        public lane: number = 1;
        public currentLane: number = 1;

        private car: Phaser.Sprite;
        private wheels: Array<Phaser.Sprite>;
        private wAngle: number;
        private started: boolean = false;
        private deluca:Phaser.Sprite;
        private sirena:Phaser.Sprite;

        private swipe:Swipe;

        private carTween: Phaser.Tween;

        private lanes:Array<number>=[425,475,535];

        constructor(game: Phaser.Game, gameState: GameState) {

            super(game, 120, 475, "playerEmpty");



            this.wAngle = 0;
            this.car = this.game.add.sprite(0, 0, "playerCar");
            this.car.anchor.set(.5);
           this.lane=1;
           this.currentLane=1;


            this.deluca=this.game.add.sprite(8,-33,"playerDeluca");
            this.deluca.anchor.set(.5);
            this.deluca.scale.set(2);
            this.deluca.frame=2;
            //this.deluca.animations.add("run",[0,1,2,3,4,5],20,true);
            this.game.add.tween(this.deluca).to({ y: this.deluca.y - 3 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);

            this.sirena=this.game.add.sprite(-20,-40,"playerSirena");
            this.sirena.anchor.set(.5);
            this.sirena.frame=0;
            this.sirena.animations.add("run",[0,1,2,3],20,true);
            this.game.add.tween(this.sirena).to({ y: this.sirena.y - 3.5 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
           

            this.game.add.tween(this.car).to({ y: this.car.y - 3.5 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
            this.wheels = [];
            this.wheels.push(this.game.add.sprite(-20, 25, "playerWheel"));
            this.wheels.push(this.game.add.sprite(45, 25, "playerWheel"));

            this.wheels[0].anchor.set(.5);
            this.wheels[1].anchor.set(.5);

            this.addChild(this.wheels[0]);
            this.addChild(this.wheels[1]);
            this.addChild(this.deluca);
            this.addChild(this.car);
            this.addChild(this.sirena);

           




            this.gameState = gameState;
            this.game.physics.arcade.enableBody(this);

            this.anchor.setTo(.5,1);
            this.alive = false;
            this.onGround = false;
           
       

            this.body.allowGravity = false;
            this.body.collideWorldBounds = false;
            this.body.setSize(30, 45, 140, 50);

            this.animations.add('fly', [1, 2, 3, 4], 12, true);
            this.animations.add('idle', [5, 6, 7, 8], 25, true);

            this.events.onKilled.add(this.onKilled, this);

            this.lane = 1;




            if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {

                this.swipe = new Swipe(this.game);


            }
            else {


                            this.cursors = this.game.input.keyboard.createCursorKeys();
                
                
                            this.downButton = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
                            this.downButton.onDown.add(this.goDown, this);
                
                            this.upButton = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
                            this.upButton.onDown.add(this.goUp, this);



            }


           




            this.game.add.existing(this);




        }

        start() {

           this.tweenAngle(0, 22, 500, 0);
           this.deluca.frame=6;
           this.sirena.play("run")
           //this.deluca.play("run");

        }

       

        gameOver(){
            
            
            this.alpha=0;
                   //this.kill();
                   //this.destroy();
            
            
            
            
                   }
            



        update() {


            this.wheels[0].angle += this.wAngle;
            this.wheels[1].angle += this.wAngle;

            if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {

            let direction = this.swipe.check();
            if (direction!==null) {
              // direction= { x: x, y: y, direction: direction }
              switch(direction.direction) {
                 
                 case this.swipe.DIRECTION_UP: this.goUp(); break;
                 case this.swipe.DIRECTION_DOWN: this.goDown(); break;
                 
              }
            }

        }

           // console.log(this.lane)


        }


        goUp() {
            if (!this.started) return;
            //console.log("up")

            this.lane--;
            if (this.lane < 0) this.lane = 0;

            this.goToLane();


        }


        goDown() {
            if (!this.started) return;
            //console.log("down")

            this.lane++
            if (this.lane > 2) this.lane = 2;
            this.goToLane();

        }

        goToLane(): void {

            if(this.currentLane==this.lane) return;
            this.currentLane = this.lane;

           // this.game.tweens.remove(this.carTween);
            this.carTween = this.game.add.tween(this).to({ y: this.lanes[this.lane] }, 100, Phaser.Easing.Quadratic.Out, true, 0, 0, false);

           


        }






        onKilled() {

            // this.gameState.playerKilled();

        };


        tweenAngle(start: number, end: number, duration: number, delay: number) {

            let _angle: any = { value: start, end: end };

            let _tweenA: Phaser.Tween = this.game.add.tween(_angle).to({ value: _angle.end }, duration, Phaser.Easing.Quadratic.InOut, true, delay, 0, false);

            _tweenA.onComplete.add(() => { this.started = true; });
            _tweenA.onUpdateCallback((tween: Phaser.Tween) => {


                this.wAngle = _angle.value;


            })



        }









    }

}