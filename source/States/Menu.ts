/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module k2016Game {
    export class Menu extends Phaser.State {

        private startBtn: Phaser.Sprite;

        private curtainLeft: Phaser.Image;
        private curtainBackLeft: Phaser.Image;
        private curtainRight: Phaser.Image;
        private curtainBackRight: Phaser.Image;
        private curtainTop: Phaser.Image;

        

        private bgPenguins: Phaser.TileSprite;
        private introRocks: Phaser.TileSprite;
        private deathstar: Phaser.Image;
        private destroyer: Phaser.Sprite;

        private deluca: Phaser.Sprite;
        private bunnieBig: Phaser.Sprite;
        private vs: Phaser.Sprite;

        private cloud1: Phaser.TileSprite;
        private cloud2: Phaser.TileSprite;

        

        private how2playGroup: Phaser.Group;
        private creditGroup: Phaser.Group;
        private buttonsGroup: Phaser.Group;

        private gameTitle: Phaser.Text;
        private gameSubTitle: Phaser.Text;

        private introSkip: Phaser.Text;

        private pCounter: number = 0;
        private pStep: number = Math.PI * 3 / 270;

        private btnRed: Phaser.Image;
        private btnBlue: Phaser.Image;
        private btnPurple: Phaser.Image;
        private btnGreen: Phaser.Image;

        private fishfries: Phaser.Image;

        private _countDownDate = new Date("jun 17, 2017 10:30:00").getTime();
        private _timer: any;

        private _timerText: Phaser.Text;
        private _ticketText: Phaser.Text;




        private max: number = 0;



        constructor() {

            super();



        }

        preload() {

        }

        create() {
            //this.game.time.advancedTiming = true;
            setUpGame(this.game);
            setScore(0);
            this.game.world.setBounds(0, 0, 1024, 600);
            this.game.camera.x = 0;
           

            this.bgPenguins = this.game.add.tileSprite(0, 0, 1024, 800, "introSky");
            this.introRocks = this.game.add.tileSprite(0, 298, 1024, 96, 'introRocks');

             this.game.add.tileSprite(0, 331, 1024, 109, 'street1');
            this.game.add.tileSprite(0, 440, 1024, 32, 'street2');
           this.game.add.tileSprite(0, 472, 1024, 53, 'street3');
            this.game.add.tileSprite(0, 523, 1024, 77, 'street4');
          
           
            

            this.cloud1 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud1');
            this.cloud1.fixedToCamera = true;
            this.cloud2 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud2');
            this.cloud2.fixedToCamera = true;

            

            this.deluca = this.game.add.sprite(-300, 600, 'delucaMenu');
            this.deluca.pivot.set(0, this.deluca.height);
            this.game.add.tween(this.deluca).to({ x: 0 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 2000, 0, false);

            this.bunnieBig = this.game.add.sprite(1200, 600, 'evilTraffic');
            this.bunnieBig.pivot.set(0, this.bunnieBig.height);
            this.game.add.tween(this.bunnieBig).to({ x: 800 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 2000, 0, false);

            this.game.physics.arcade.gravity.y = 0;


            this.vs = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'vs');
            this.vs.alpha = 0;
            this.vs.anchor.set(0.5)
            this.vs.scale.set(0.75)
            this.game.add.tween(this.vs).to({ y: this.game.world.centerY + 50, alpha: 1 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 1500, 0, false).onComplete.add(()=>{


                    this.game.add.tween(this.vs.scale).to ( { y:+ .8, x: +.8 }, 3500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);

            });


            //TITLE
            var _style: any = { font: 'normal 50px', fill: '#ffffff', stroke: '#000000', strokeThickness: 10 };
            this.gameTitle = this.game.add.text(this.game.world.centerX, 0, "THE WRONG DIRECTION", _style);
            this.gameTitle.anchor.set(.5);
            this.gameTitle.alpha = 0;
            this.gameTitle.font = 'Press Start 2P';

            //SUBTITLE
            _style = { font: 'normal 25px', fill: '#ff0000', stroke: '#000000', strokeThickness: 8 };
            this.gameSubTitle = this.game.add.text(this.game.world.centerX-100, 140, "Saint Matthew's carnage", _style);
            this.gameSubTitle.anchor.set(.5);
            this.gameSubTitle.alpha = 0;
            this.gameSubTitle.font = 'Press Start 2P';

            //fishfries

            /*  this.fishfries = this.game.add.image(840, -140, "fishfries");
              this.fishfries.anchor.set(.5);
              this.fishfries.alpha = 0;
              
  */

            this.buttonsGroup = this.game.add.group();

            //date
            _style = { font: 'normal 25px', fill: '#ffffff', stroke: '#000000', strokeThickness: 8 };
            let _date = this.game.add.text(this.game.world.centerX, 190, "Every 21 September in Salerno", _style);
            _date.anchor.set(.5);
            _date.alpha = 0;
            _date.font = 'Press Start 2P';
            this.game.add.tween(_date).to({ alpha: 1 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 1500, 0, false);

            _style = { font: 'normal 27px', fill: '#ff0000', stroke: '#ffffff', strokeThickness: 5 };
            let _deluca = this.game.add.text(200, 390, "THE\n GOVERNOR", _style);
            _deluca.anchor.set(0.5);
            _deluca.alpha = 0;
            _deluca.font = 'Press Start 2P';
            this.game.add.tween(_deluca).to({ alpha: 1, x:350 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 1500, 0, false).onComplete.add(()=> {

               this.game.add.tween(_deluca).to ( { x:_deluca.x-30 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);

            });


              _style = { font: 'normal 27px', fill: '#ff0000', stroke: '#ffffff', strokeThickness: 5 };
            let _enemyB = this.game.add.text(800, 300, "EVIL\n TRAFFIC", _style);
            _enemyB.anchor.set(0.5);
            _enemyB.alpha = 0;
            _enemyB.font = 'Press Start 2P';
            this.game.add.tween(_enemyB).to({ alpha: 1, x:660 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 1500, 0, false)
            .onComplete.add(()=> {

               this.game.add.tween(_enemyB).to ( { x:_enemyB.x+30 }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);

            });



            //btn Green
            this.btnGreen = this.game.add.sprite(300, 680, "btnGreen");
            this.btnGreen.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#368005', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnGreen.addChild(_spriteText);
            this.btnGreen.inputEnabled = true;
            this.btnGreen.events.onInputDown.add(function () {

                stopSound(gameSound.intro);

                k2016Game.goState("Game", this.game);
            }, this);

            //btn Blue
            this.btnBlue = this.game.add.sprite(500, 650, "btnBlue");
            this.btnBlue.anchor.setTo(0.5);
            _style = { font: 'normal 17px', fill: '#ffffff', stroke: '#00577f', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'HOW2PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnBlue.addChild(_spriteText);
            this.btnBlue.inputEnabled = true;
            this.btnBlue.events.onInputDown.add(function () {
                this.openHow2play();
            }, this);

            //btn Purple
            this.btnPurple = this.game.add.sprite(700, 650, "btnPurple");
            this.btnPurple.anchor.setTo(0.5);
            _style = { font: 'normal 15px', fill: '#ffffff', stroke: '#5c0077', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'TOP BOORS', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnPurple.addChild(_spriteText);
            this.btnPurple.inputEnabled = true;
            this.btnPurple.events.onInputDown.add(function () {


                this.openCredits();


            }, this);


            this.buttonsGroup.add(this.btnBlue);
            this.buttonsGroup.add(this.btnPurple);
            this.buttonsGroup.add(this.btnGreen);

            /*
              _style = { font: 'normal 15px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            this._ticketText = this.game.add.text(this.game.world.centerX, 565, "Play, share your score on FB, the best will win 1 free Ticket!!", _style);
            this._ticketText.anchor.set(.5);
            this._ticketText.alpha = 0;
            this._ticketText.font = 'Press Start 2P';
             this.game.add.tween( this._ticketText).to({alpha: 1 }, 2000, Phaser.Easing.Cubic.Out, true, 3000);

             this._timerText = this.game.add.text(this.game.world.centerX, 590, "", _style);
              this._timerText.anchor.set(.5);
            this._timerText.alpha = 0;
            this._timerText.font = 'Press Start 2P';
             this.game.add.tween( this._timerText).to({alpha: 1 }, 2000, Phaser.Easing.Cubic.Out, true, 4000);
*/

           




            //how2play screen start
            //------------------------------------------
            this.how2playGroup = this.game.add.group();
            this.how2playGroup.inputEnableChildren = false;

            let layer = this.game.add.image(0, 0, "howToPlay");
            layer.inputEnabled = true;
            layer.events.onInputDown.add(function () {
                this.closeHow2play();
            }, this);



            let player = this.game.add.sprite(this.game.world.centerX, 150, "playerEmpty");

            let car = this.game.add.sprite(0, 0, "playerCar");
            car.anchor.set(.5);

            let deluca=this.game.add.sprite(8,-33,"playerDeluca");
            deluca.anchor.set(.5);
            deluca.scale.set(2);
            deluca.frame=2;
            this.game.add.tween(deluca).to({ y: deluca.y - 3 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);

            let sirena=this.game.add.sprite(-20,-40,"playerSirena");
            sirena.anchor.set(.5);
            sirena.animations.add("run",[0,1,2,3],20,true).play();
            this.game.add.tween(sirena).to({ y: sirena.y - 3.5 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
           

            this.game.add.tween(car).to({ y: car.y - 3.5 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
            let wheels = [];
            wheels.push(this.game.add.sprite(-20, 25, "playerWheel"));
            wheels.push(this.game.add.sprite(45, 25, "playerWheel"));

            wheels[0].anchor.set(.5);
            wheels[1].anchor.set(.5);

            player.addChild(wheels[0]);
            player.addChild(wheels[1]);
            player.addChild(deluca);
            player.addChild(car);
            player.addChild(sirena);

            let boor = this.game.add.sprite(this.game.world.centerX, 290, "scooter");
            boor.animations.add("run",[0,1],10,true).play();
            boor.anchor.set(.5);
            this.game.add.tween(boor).to({ y: boor.y - 2.8 }, 170, Phaser.Easing.Quadratic.Out, true, 0, -1, true);


            this.how2playGroup.add(layer);
            this.how2playGroup.add(player);
            this.how2playGroup.add(boor);
            /*this.how2playGroup.add(deluca);
            this.how2playGroup.add(bunnie);
            this.how2playGroup.add(bunnie2);*/
            this.how2playGroup.x = -1024;
            this.how2playGroup.alpha = 0;

            //how2play screen end
            //------------------------------------------

            //credits screen start
            //------------------------------------------
        /*    this.creditGroup = this.game.add.group();
            this.creditGroup.inputEnableChildren = false;

            var info = this.game.add.image(0, 0, "info");
            info.inputEnabled = true;
            info.events.onInputDown.add(function () {
                this.closeCredits();
            }, this);


            this.creditGroup.add(info);
            this.creditGroup.x = -1024;
            this.creditGroup.alpha = 0;
*/
            //credits screen end
            //------------------------------------------




           





            //setFirstTime(false);
            this.openCurtain();
           // this.countDown();
            // if (getFirstTime()) { this.textWriter(0); } else { this.openCurtain() }
            //this.game.time.events.loop(Phaser.Timer.SECOND, this.countDown, this);

        }


 countDown(): void {

           
           
                let now = new Date().getTime();

                // Find the distance between now an the count down date
                let distance = this._countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Output the result in an element with id="demo"
               this._timerText.text =  days + " DAYS, " + hours + " HOURS, "
                    + minutes + " MINUTES, " + seconds + " SECONDS TO THE EVENT!";

                // If the count down is over, write some text 
                if (distance < 0) {
                    
                    this._timerText.text = "ON FLY!";
                }

           


        }


        render() {



            // this.game.debug.text(this.game.time.fps + "", 2, 14, "#00ff00");
        }

        openCredits() {

             let win = window.open("/halloffame.html", '_blank');
    win.focus(); 

    /*
            this.game.time.events.add(300, function () { playSound(gameSound.lightsaber); }, this);
            this.buttonsGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.creditGroup).to({ x: 0, alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () {

                this.creditGroup.ignoreChildInput = false;

            }, this);
            */
        }


        closeCredits() {

            this.game.time.events.add(300, function () { playSound(gameSound.cafone); }, this);

            this.creditGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.creditGroup).to({ x: -1024, alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () {

                this.buttonsGroup.ignoreChildInput = false;

            }, this)


        }


        openHow2play() {

            this.game.time.events.add(500, function () { playSound(gameSound.chebello); }, this);
            this.buttonsGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.how2playGroup).to({ x: 0, alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true,0);
            tween.onComplete.add(function () {

                this.how2playGroup.ignoreChildInput = false;

            }, this)

        }


        closeHow2play() {

            //this.game.time.events.add(300, function () { playSound(gameSound.bestia); }, this);

            this.how2playGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.how2playGroup).to({ x: -1024, alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true, 0);
            tween.onComplete.add(function () {

                this.buttonsGroup.ignoreChildInput = false;

            }, this)


        }



        openCurtain() {


            setFirstTime(false);
            playSound(gameSound.intro);

            this.game.add.tween(this.gameTitle).to({ y: 80, alpha: 1 }, 1000, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.gameSubTitle).to({ x: this.game.world.centerX, alpha: 1 }, 1000, Phaser.Easing.Cubic.Out, true, 800);
            //this.game.add.tween(this.fishfries).to({ y: 150, alpha: 1 }, 1000, Phaser.Easing.Bounce.Out, true, 1400);


            this.game.add.tween(this.btnGreen).to({ y: 550 }, 1000, Phaser.Easing.Cubic.Out, true, 3000);
            this.game.add.tween(this.btnBlue).to({ y: 550 }, 1000, Phaser.Easing.Cubic.Out, true, 3200);
            this.game.add.tween(this.btnPurple).to({ y: 550 }, 1000, Phaser.Easing.Cubic.Out, true, 3400);


        }

        

        update() {


            this.cloud1.tilePosition.x -= 0.3;
            this.cloud2.tilePosition.x -= 0.1;


        }




    }
}