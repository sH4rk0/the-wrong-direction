
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module k2016Game {
        export class GameState extends Phaser.State {


                private introSky: Phaser.TileSprite;
                private introCloud1: Phaser.TileSprite;
                private introCloud2: Phaser.TileSprite;
                private introRocks: Phaser.TileSprite;
                private introRoad: Phaser.TileSprite;

                private street1: Phaser.TileSprite;
                private street2: Phaser.TileSprite;
                private street3: Phaser.TileSprite;
                private street4: Phaser.TileSprite;
                
                private backTween: Phaser.Tween 

                private energyObj: gameEnergy;


                public ground: Phaser.Sprite;
                public player: PlayerCar;

                public start: boolean;

                private back1: number;

                public back2: number;
                public back3: number;
                public back4: number;

                private back5: number;

                private score: Phaser.Text;
                private realScore: number = 0;


                public groupAll: Phaser.Group;

                public groupHud: Phaser.Group;

                private randomBonusSpawnTime: number;
                private randomEnemySpawnTime: number;

                private randomEnemySpawnTimeLevel: number;

                private level: number = 0;
                private velLevel: number = 0;


                private readyText: Phaser.Text;
                private readyOnce: boolean = false;

                private gameTheme: Phaser.Sound;
                private gameTimer: Phaser.Timer;

                private scoreObj:{ score:0,ratio:0,path:0,energy:0};
                private ratio:number=0;

                private enemyType: Array<any> = [


                        {
                                sprite: "block1",
                                frame: 0,
                                //animation: { frames: [0], rate: 20 },
                                damage: 200,
                                destroyable: true
                        },

                        {
                                sprite: "block1",
                                frame: 2,
                                damage: 150,
                                destroyable: true
                        },

                        {
                                sprite: "block1",
                                frame: 1,
                                damage: 100,
                                destroyable: true
                        },

                      

                        {
                                sprite: "block1",
                                frame: 3,
                                damage: 50,
                                destroyable: true
                        }



                ];



                constructor() {

                        super();




                }

                preload() {

                }

                create() {

                        //   console.log(getScore())
                        //   console.log("setscore")
                        setScore({ score:0,ratio:0,path:0,energy:0});
                        this.realScore = 0;
                        this.back1 = 0;
                        this.back2 = 0;
                        this.back3 = 0;
                        this.back4 = 0;
                        this.back5 = 0;
                        this.level = 0;

                        this.gameTimer = this.game.time.create(false);
                        this.gameTimer.loop(10000, this.updateLevel, this);



                        this.randomBonusSpawnTime = this.game.time.now;
                        this.randomEnemySpawnTime = this.game.time.now;

                        this.game.stage.backgroundColor = "#4488AA";
                        this.game.physics.startSystem(Phaser.Physics.ARCADE);
                        this.game.physics.arcade.gravity.y = 2000;

                        this.introSky = this.game.add.tileSprite(0, -50, 1024, 650, 'introSky');
                        this.introSky.fixedToCamera = true;

                        this.introCloud1 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud1');
                        this.introCloud1.fixedToCamera = true;
                        this.introCloud1.tilePosition.x = 0;

                        this.introCloud2 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud2');
                        this.introCloud2.fixedToCamera = true;
                        this.introCloud2.tilePosition.x = 0;

                        this.introRocks = this.game.add.tileSprite(0, 298, 1024, 96, 'introRocks');
                        this.introRocks.fixedToCamera = true;

                        this.street1 = this.game.add.tileSprite(0, 331, 1024, 109, 'street1');
                        this.street1.fixedToCamera = true;

                        this.street2 = this.game.add.tileSprite(0, 440, 1024, 32, 'street2');
                        this.street2.fixedToCamera = true;

                        this.street3 = this.game.add.tileSprite(0, 472, 1024, 53, 'street3');
                        this.street3.fixedToCamera = true;

                        this.street4 = this.game.add.tileSprite(0, 523, 1024, 77, 'street4');
                        this.street4.fixedToCamera = true;



                        this.ground = this.game.add.sprite(this.game.world.centerX, 510, this.game.cache.getBitmapData('ground'));
                        this.physics.arcade.enable(this.ground);
                        this.ground.anchor.setTo(0.5, 0.5);
                        this.ground.body.immovable = true;
                        this.ground.fixedToCamera = true;
                        this.ground.visible = false;
                        this.ground.body.allowGravity = false;

                        var _style = { font: 'normal 40px', fill: '#ffffff', stroke: '#1d5779', strokeThickness: 10 };
                        this.readyText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'Tap to start!', _style);
                        this.readyText.font = 'Press Start 2P';
                        this.readyText.anchor.set(0.5);


                        this.groupAll = this.game.add.group();
                        this.groupHud = this.game.add.group();

                        this.energyObj = new gameEnergy(this.game);
                        this.energyObj.signal.add(this.gameOver, this);

                        _style = { font: 'normal 25px', fill: '#ffffff', stroke: '#aaaaaa', strokeThickness: 5 };
                        this.score = this.game.add.text(85, 60, '0', _style);
                        this.score.font = 'Press Start 2P';
                        this.score.anchor.set(0);
                        this.groupHud.add(this.score);

                        this.groupHud.fixedToCamera = false;

                        this.player = new PlayerCar(this.game, this);
                        this.groupAll.add(this.player);

                        stopSound(gameSound.intro);
                        playSound(gameSound.ingame);
                        

                        this.game.input.onDown.addOnce(function () { this.start = true; }, this);

                       


                }


                update() {



                        this.introCloud1.tilePosition.x -= 0.07;
                        this.introCloud2.tilePosition.x -= 0.03;

                        //make it only one time                

                        if (this.start) {


                                if (!this.readyOnce) {

                                        this.gameTimer.start();
                                        this.energyObj.start();
                                        this.readyOnce = true;
                                        this.readyText.text = "GO!!!!";
                                        this.game.add.tween(this.readyText).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.In, true, 0);

                                       this.tweenScroll({ back1: 0, back2: 0, back3: 0, back4: 0, back5: 0 }, { back1: 13, back2: 13, back3: 13.5, back4: 14, back5: 1 }, 1000);

                                      // this.tweenScroll({ back1: 0, back2: 0, back3: 0, back4: 0, back5: 0 }, { back1: 30, back2: 30, back3: 30.5, back4: 31, back5: 1 }, 100000);
                                       
                                        this.player.start();

                                        this.randomBonusSpawnTime = this.game.time.now + 2000;

                                }

                             
                                this.game.physics.arcade.overlap(this.groupAll, this.player, this.collisionHandler, null, this);

                                this.spawn();

                        }
                        this.groupAll.sort('y', Phaser.Group.SORT_ASCENDING);
                        this.updateBackckgroud();



                }

                updateLevel() {

                       // console.log("update level")
                        if (this.start) {

                                
                                this.level++;
                                this.velLevel = this.level;
                                
                                if (this.velLevel == 9) this.velLevel = 8;

                               // console.log("level:", this.level, this.velLevel);
                                let _mol: number = .15;
                                this.tweenScroll({ back1: this.back1, back2: this.back2, back3: this.back3, back4: this.back4, back5: 1 }, { back1: this.back1 + (this.velLevel * _mol), back2: this.back2 + (this.velLevel * _mol), back3: this.back3 + (this.velLevel * _mol), back4: this.back4 + (this.velLevel * _mol), back5: 1 }, 5000);

                        }


                }

                spawn() {


                        if ((this.randomBonusSpawnTime < this.game.time.now) && this.start) {
                                this.randomBonusSpawnTime = this.game.time.now + this.getSpawnLevel();


                                //let type: any = this.enemyType[this.game.rnd.integerInRange(0, this.enemyType.length - 1)];

                                if (this.game.rnd.integerInRange(0, 100) > 80) {

                                        this.groupAll.add(new Bonus(this.game, this));
                                        this.ratio++;
                                } else {

                                        let type: any = this.enemyType[this.game.rnd.integerInRange(0, this.enemyType.length - 1)];

                                        this.groupAll.add(new Enemy(this.game, this, type));
                                }


                        }


                }



                getSpawnLevel(): number {

                        let _s:number=Math.abs((550 - (this.level * 37)))
                        if (_s<100) _s=100;
                       // console.log(_s)
                        return _s
                }

                collisionHandler(_player: PlayerCar, _enemy: Enemy) {

                        //return;
                        //console.log(_player.currentLane, _enemy.lane)

                        if (_player.lane == _enemy.lane) {


                                if (_enemy.name == "bonus") {


                                        this.tweenScore(100);
                                        _enemy.kill();
                                        _enemy.destroy();

                                        let bonusS:number=this.game.rnd.integerInRange(0,2);
                                        if(bonusS==0){  playSound(gameSound.bonus);}else if(bonusS==1){playSound(gameSound.cafone);} else{playSound(gameSound.cafonemotorizzato);}
                                      

                                        let blood: Phaser.Sprite = this.game.add.sprite(_enemy.x - 50, _enemy.y - 50, "blood");

                                        blood.animations.add("schizzo", [0, 1, 2, 3, 4, 5, 6, 7], 30, false).onComplete.add((sprite) => { sprite.kill(); sprite.destroy(); }, blood);
                                        blood.play("schizzo");
                                        blood.anchor.set(.5);

                                } else {


                                        if (_enemy.isDestroyable) {

                                                // this.tweenScore(_enemy.score);
                                                this.energyObj.removeEnergy(_enemy.playerDamage)

                                               //this.energyObj.removeEnergy(1)

                                                this.game.camera.flash();
                                                playSound(gameSound.explosion);
                                                this.game.time.events.add(150, function () { playSound(gameSound.bestia); }, this);
                                               
                                                this.groupAll.add(new Explosion(this.game, this, _enemy.x, _enemy.y, "exp3", _enemy.name));
                                        
                                                _enemy.explode();
                                                

                                        } else if (!_enemy.isDestroyable) {
                                                this.gameOver(_enemy);


                                        }


                                }

                        }



                }



                tweenScore(end: number) {



                        var obj = this.score;

                        var scoreValue = { score: 0, end: end, start: this.realScore };
                        this.realScore = this.realScore + end;

                        var scoreTween = this.game.add.tween(scoreValue).to({ score: scoreValue.end }, 200, Phaser.Easing.Quadratic.Out);

                        scoreTween.onUpdateCallback(function () { obj.text = (scoreValue.start + Math.round(scoreValue.score)) + ""; });
                        scoreTween.onComplete.add(function () { obj.text = "" + (scoreValue.start + scoreValue.end); }, this);
                        scoreTween.start();

                };


                render() {
                        //this.game.debug.text('Elapsed seconds: ' +   this.game.time.elapsedSecondsSince(this.game.time.now), 32, 32);
                        // this.game.debug.bodyInfo(this.player, 32, 32);
                        //this.game.debug.body(this.player);



                }





                updateBackckgroud() {


                        this.street1.tilePosition.x -= this.back1;
                        this.street2.tilePosition.x -= this.back2;
                        this.street3.tilePosition.x -= this.back3;
                        this.street4.tilePosition.x -= this.back4;

                        this.introRocks.tilePosition.x -= this.back5;


                }





                win() {

                        console.log("win");
                        this.game.tweens.remove(this.backTween);
                        this.gameTimer.destroy();
                        this.start = false;
                        this.readyOnce = false;

                        let vals=this.energyObj.getValues();
                        
                       ((parseInt(this.score.text)/100)*100)/this.ratio
                        setScore({ score:parseInt(this.score.text),ratio:  parseInt(((parseInt(this.score.text)/100)*100)/this.ratio),path:vals.path,energy:vals.energy} );

                        console.log(getScore());

                        this.game.time.events.add(1000, () => {
                                
                                                              
                                this.tweenScroll({ back1: this.back1, back2: this.back2, back3: this.back3, back4: this.back4, back5: 1 }, { back1: 0, back2: 0, back3: 0, back4: 0, back5: 0 }, 3000);

                                this.groupAll.add(new End(this.game, this));
                                


                                this.game.add.tween(this.player).to({x:1100},2000, Phaser.Easing.Quadratic.In,true,0,0,false).onComplete.add(()=>{
                                        
                                         this.game.camera.fade(0xffffff,1000,true);
                                         this.game.time.events.add(1000,()=>{
                                                 stopSound(gameSound.ingame);
                                                goState("Gamewin", this.game);
                         
                                         })
                                        
                                     },this);


                               // this.player.win();


                                                        },this);

                        //this.tweenScroll({ back1: this.back1, back2: this.back2, back3: this.back3, back4: this.back4, back5: 1 }, { back1: 0, back2: 0, back3: 0, back4: 0, back5: 0 }, 3000);

                        //this.player.tweenAngle(22, 0, 1000, 0);


                }

                gameOver(_enemy: Enemy) {

                        console.log("gameover")
                        this.start = false;
                        this.readyOnce = false;
                        this.game.tweens.remove(this.backTween);
                        this.gameTimer.destroy();
                       

                      
                       /* if (_enemy != undefined) {
                                this.groupAll.add(new Explosion(this.game, this, _enemy.x, _enemy.y, "exp3", "player"));
                                _enemy.kill();
                                _enemy.destroy()
                        }*/



                        //this.gameTheme.stop();

                        this.start = false;
                        this.groupAll.add(new Explosion(this.game, this, this.player.x+30, this.player.y+50, "exp3", "player"));
                        this.player.gameOver();
                        this.tweenScroll({ back1: this.back1, back2: this.back2, back3: this.back3, back4: this.back4, back5: 1 }, { back1: 0, back2: 0, back3: 0, back4: 0, back5: 0 }, 1000);

                         let vals=this.energyObj.getValues();
                        
                       ((parseInt(this.score.text)/100)*100)/this.ratio
                        setScore({ score:parseInt(this.score.text),ratio:  parseInt(((parseInt(this.score.text)/100)*100)/this.ratio),path:vals.path,energy:vals.energy} );

                        console.log(getScore());

                        this.game.time.events.add(1000, () => {
                                stopSound(gameSound.ingame);
                                goState("Gameover", this.game);
                        })
                        //goState("Gameover", this.game);


                };

                tweenScroll(_start: any, _end: any, _time: number): void {

                       // console.log("tweenscroll",_end)
                        var backValue: any = _start;
                        var backEnd: any = _end;
                        this.backTween= this.game.add.tween(backValue).to(backEnd, _time, Phaser.Easing.Quadratic.Out);

                        this.backTween.onUpdateCallback(function () {

                                this.back1 = backValue.back1;
                                this.back2 = backValue.back2;
                                this.back3 = backValue.back3;
                                this.back4 = backValue.back4;
                                this.back5 = backValue.back5;

                        }, this);

                        this.backTween.start();
                }



        }


}