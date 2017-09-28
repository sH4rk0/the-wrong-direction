
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module k2016Game {
    export class GameOver extends Phaser.State {


       
        private btnGreen: Phaser.Sprite;
        private btnBlue: Phaser.Sprite;
        private btnRed: Phaser.Sprite;

        private cloud1: Phaser.TileSprite;
        private cloud2: Phaser.TileSprite;

        private insulti: Array<string> = [
            "Personaggetto!",
            "Cafone!",
            "Consumatore abusivo di ossigeno!",
            "Imbecille!",
            "Imbecille e cafone!",
            "Personaggetto col sorrisetto!",
            "Cialtrone!",
            "Affannato mentale!",
            "Cialtroneria pura!",
            "Ti devono ammazzare!",
            "Sei peggio di Travaglio!",
            "Sei come GIGGINO o webmaster!",
            "La Bindi ti fa un baffo!",
            "Sei il congiuntivo di\nDi Battista!"

            
        ];


        public player: number;

        constructor() {

            super();


        }


        create() {

            //this.game.world.setBounds(0, 0, 1200, 600);
            //this.game.world.x=0;  
           


            this.game.add.tileSprite(0, 0, 1024, 800, "introSky");


            this.cloud1 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud1');
            this.cloud1.fixedToCamera = true;
            this.cloud2 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud2');
            this.cloud2.fixedToCamera = true;


            this.game.add.tileSprite(0, 298, 1024, 96, 'introRocks');
            this.game.add.tileSprite(0, 331, 1024, 109, 'street1');
            this.game.add.tileSprite(0, 440, 1024, 32, 'street2');
            this.game.add.tileSprite(0, 472, 1024, 53, 'street3');
            this.game.add.tileSprite(0, 523, 1024, 77, 'street4');

            let _podium:Phaser.Sprite=this.game.add.sprite(this.game.world.centerX+50, this.game.world.centerY+200, 'podium');
            _podium.anchor.set(.5);


            let _del:Phaser.Sprite=this.game.add.sprite(0, 0, 'delGameover');
            _del.anchor.set(.5);
            _del.animations.add("cry",[2,0,1,0],5, true).play();

            let _win1:Phaser.Sprite=this.game.add.sprite(562, 380, 'winners');   
            _win1.anchor.set(.5);         
            _win1.frame=this.game.rnd.integerInRange(0,4);

            let _win2:Phaser.Sprite=this.game.add.sprite(630, 440, 'winners');
            _win2.anchor.set(.5); 
            _win2.frame=this.game.rnd.integerInRange(0,4);


            this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+70, 'cup1');
            this.game.add.sprite(this.game.world.centerX-70, this.game.world.centerY+135, 'cup2');
            this.game.add.sprite(this.game.world.centerX+120, this.game.world.centerY+155, 'cup3');
            

            var _style = { font: 'normal 60px', fill: '#ffffff', stroke: '#000000', strokeThickness: 10 };
            var _gameOverText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 130, 'GAME OVER', _style);
            _gameOverText.font = 'Press Start 2P';
            _gameOverText.anchor.set(0.5);

            var deluca = this.game.add.sprite(0, 600, 'delucaMenu');
            deluca.pivot.set(0, deluca.height);


            //btn Green
            this.btnGreen = this.game.add.sprite(900, 40, "btnGreen");
            this.btnGreen.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#368005', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnGreen.addChild(_spriteText);
            this.btnGreen.inputEnabled = true;
            this.btnGreen.events.onInputDown.add(function () {
               // stopSound(gameSound.gameover);
               setScore(0);
               stopSound(gameSound.gameover);
                k2016Game.goState("Game", this.game);
            }, this);

          /*  //btn Blue
            this.btnBlue = this.game.add.sprite(900, 90, "btnBlue");
            this.btnBlue.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#00577f', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'SHARE', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnBlue.addChild(_spriteText);
            this.btnBlue.inputEnabled = true;
            this.btnBlue.events.onInputDown.add(function () {
               // getLoginStatus();
            }, this);

            */

            //btn Red
            this.btnRed = this.game.add.sprite(900, 100, "btnRed");
            this.btnRed.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#851600', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'MENU', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnRed.addChild(_spriteText);
            this.btnRed.inputEnabled = true;
            this.btnRed.events.onInputDown.add(function () {
                stopSound(gameSound.gameover);
                k2016Game.goState("Menu", this.game);
            }, this);


           playSound(gameSound.gameover);

            _style = { font: 'normal 25px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
//console.log(getScore())
let _score:any=getScore()
            let numC:number=(_score.score/100);
            let _text:string="";
            if(numC==0){
                _text = 'Non hai arrotato nessun cafone!\n';
               

                _del.x=640;
                _del.y=440;

                _win2.x=480;
                _win2.y=430;

                
           }else if(numC==1){
                _text = 'Hai arrotato un solo cafone!\n';

                _del.x=640;
                _del.y=440;

                _win2.x=480;
                _win2.y=430;
                

           }else{
                _text = 'Hai arrotato solo ' + numC + ' cafoni!\n';

                _win2.x=630;
                _win2.y=440;

                _del.x=500;
                _del.y=430;
           }

             _text = _text + this.insulti[this.game.rnd.integerInRange(0, this.insulti.length-1)];

            var _gameOverSpeech = this.game.add.text(210, 250, _text, _style);
		    _gameOverSpeech.font='Press Start 2P';


           var _anonymous = getUrlParameter("anonymous") ? true : false;
            if(!_anonymous){saveScore();}
           


    
        }
         

    update(){


        this.cloud1.tilePosition.x -= 0.3;
        this.cloud2.tilePosition.x -= 0.1;

        } 




       





}

    
}