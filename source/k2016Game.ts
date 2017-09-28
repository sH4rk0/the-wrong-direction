/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="Lib/jquery.d.ts"/>
/// <reference path="Lib/firebase.d.ts"/>
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>
/// <reference path="States/Menu.ts"/>
/// <reference path="States/Game.ts"/>
/// <reference path="States/GameOver.ts"/>

module k2016Game {

    var _newGame: initGame;
    var _playerScore: number = 0;
    var _firstTime: boolean = true;
    var _level: number = 2;
    var _game: Phaser.Game;
    var _gameSetup: boolean = false;
    var _gameSounds: Array<Phaser.Sound> = [];
    var _ismobile: boolean = true;

    export function setFirstTime(_val: boolean): void { _firstTime = _val; }
    export function getFirstTime(): boolean { return _firstTime; }

    export function getScore(): any { return _playerScore; }
    export function setScore(val: any): void { _playerScore = val; }


    export function setGame(game: Phaser.Game) { _game = game; }
    export function getGame(): Phaser.Game { return _game; }

    export function getSound(_sound: gameSound): Phaser.Sound {

        return _gameSounds[_sound];

    }

    export function playSound(_sound: gameSound): void {

        _gameSounds[_sound].play();

    }

    export function stopSound(_sound: gameSound): void {

        _gameSounds[_sound].stop();

    }

    export function pauseSound(_sound: gameSound): void {

        _gameSounds[_sound].stop();

    }

    export function setSoundVolume(_sound: gameSound, _volume: number): void {

        _gameSounds[_sound].volume = _volume;

    }

    export enum gameSound {
        intro,
        ingame,
        gameover,
        win,
        explosion,
        bonus,
        bestia,
        cafonemotorizzato,
        cafone,
        chebello,
        imbecille,
        ehhh

      
    }

    export function setUpGame(_game: Phaser.Game): void {

        if (!_gameSetup) {

            setGame(_game);

            var _sound: Phaser.Sound;
            for (var i = 0; i < gameData.assets.sounds.length; i++) {
                _sound = _game.add.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].volume, gameData.assets.sounds[i].loop);
                _sound.allowMultiple = true;
                _gameSounds.push(_sound);
            }
            _gameSetup = true;

        }

    }

    export function isMobile(): boolean {

        return _ismobile;
    }

    export function setDevice(isMobile: boolean): void {

        _ismobile = isMobile;
    }

    export function getUrlParameter(sParam: string): any {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };


    export function goState(_state: string, _game: Phaser.Game): void {

        var st = <Phaser.Plugin.StateTransition>_game.plugins.add(Phaser.Plugin.StateTransition);
        if (isMobile()) {

            st.configure({
                duration: 1000,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0 }
            });

        } else {
            st.configure({
                duration: 1000,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0, scale: { x: 1.5, y: 1.5 } }
            });

        }


        st.to(_state);

    }


    export function saveScore(): void {
        
        console.log(getScore());
                $.ajax({
                    url: "http://www.zero89.it/api/jsonp/scores/core.aspx",
                    data: { who: "save", game: "twd", name: "Anonimous", callback: "gamescores", score: JSON.stringify(getScore()) },
                    dataType: "jsonp",
                    type: "POST",
                    jsonpCallback: "gamescores",
                    context: document.body
                }).done( (data)=> { }).fail((err)=>{ console.log(err)});
        
            }


    export class initGame {


        public game: Phaser.Game;

        constructor(width?: number, height?: number) {

            var dpr: number = 1;
            try {
                if (devicePixelRatio != undefined) {
                    dpr = devicePixelRatio || 1;


                    if (!width) {
                        width = screen.width * dpr;
                    }
                    if (!height) {
                        height = screen.height * dpr;
                    }

                }

            } catch (err) { }

            this.game = new Phaser.Game(width, height, Phaser.CANVAS, "", null, false, true);

            this.game.state.add("Boot", Boot, false);
            this.game.state.add("Preloader", Preloader, false);
            this.game.state.add("Menu", Menu, false);
            this.game.state.add("Game", GameState, false);
            this.game.state.add("Gameover", GameOver, false);
            this.game.state.add("Gamewin", Gamewin, false);
            this.game.state.start("Boot");




        }

    }


    window.onresize = () => { }

    window.onload = () => { _newGame = new initGame(1024, 600); }


}

// when the page has finished loading, create our game
var WebFontConfig = {
    active: function () { },
    google: {
        families: ['Press Start 2P']
    }

};


var gameData = {


    assets: {
        spritesheets: [

         
            { name: "exp3", path: "assets/images/game/explosion2.png", width: 80, height: 80, frames: 28 },
            
            { name: "playerDeluca", path: "assets/images/game/player/playerDeluca.png", width: 27, height: 26, frames: 10 },
            { name: "playerSirena", path: "assets/images/game/player/playerSirena.png", width: 20, height: 23, frames: 4 },
           
            { name: "scooter", path: "assets/images/game/vehicles/scooter.png", width: 86, height: 91, frames: 4 },
            { name: "blood", path: "assets/images/game/blood.png", width: 126, height: 126, frames: 8 },

            { name: "block1", path: "assets/images/game/vehicles/block1.png", width: 113, height: 86, frames: 4 },
            { name: "delGameover", path: "assets/images/game/gameover.png", width: 66, height: 132, frames: 4 },

            { name: "winners", path: "assets/images/game/winners.png", width: 100, height: 150, frames: 5 },

            

        ],

        images: [
            { name: "introSky", path: "assets/images/game/sky.png" },
            { name: "introRocks", path: "assets/images/game/rocks.png" },

            { name: "energyLayer1", path: "assets/images/game/energy/energy-layer1.png" },
            { name: "energyLayer2", path: "assets/images/game/energy/energy-layer2.png" },
            { name: "smallCar", path: "assets/images/game/energy/car.png" },


            { name: "cloud1", path: "assets/images/game/cloud1.png" },
            { name: "cloud2", path: "assets/images/game/cloud2.png" },

            { name: "street1", path: "assets/images/game/street1.png" },
            { name: "street2", path: "assets/images/game/street2.png" },
            { name: "street3", path: "assets/images/game/street3.png" },
            { name: "street4", path: "assets/images/game/street4.png" },

            { name: "vs", path: "assets/images/game/menu/vs.png" },
            { name: "howToPlay", path: "assets/images/game/menu/howToPlay.png" },

            { name: "delucaMenu", path: "assets/images/game/menu/deluca-pixelated.png" },

            { name: "btnBlue", path: "assets/images/game/menu/btn-blue.png" },
            { name: "btnRed", path: "assets/images/game/menu/btn-red.png" },
            { name: "btnPurple", path: "assets/images/game/menu/btn-purple.png" },
            { name: "btnGreen", path: "assets/images/game/menu/btn-green.png" },
            { name: "evilTraffic", path: "assets/images/game/menu/evilTraffic.png" },

            { name: "gameoverBg", path: "assets/images/game/menu/bg-halloffame.jpg" },

            { name: "playerEmpty", path: "assets/images/game/player/playerEmpty.png" },
            { name: "playerCar", path: "assets/images/game/player/playerCar.png" },
            { name: "playerWheel", path: "assets/images/game/player/playerWheel.png" },
            { name: "podium", path: "assets/images/game/podium.png" },

            { name: "cup1", path: "assets/images/game/cup1.png" },
            { name: "cup2", path: "assets/images/game/cup2.png" },
            { name: "cup3", path: "assets/images/game/cup3.png" },

            { name: "goal", path: "assets/images/game/goal.png" },

           


        ],

        sounds: [

            { name: "intro", paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"], volume: .3, loop: false },
            { name: "ingame", paths: ["assets/sounds/ingame.ogg", "assets/sounds/ingame.m4a"], volume: .5, loop: true },
            { name: "gameover", paths: ["assets/sounds/gameover.ogg", "assets/sounds/gameover.m4a"], volume: .5, loop: true },

            { name: "win", paths: ["assets/sounds/win.ogg", "assets/sounds/win.m4a"], volume: 1, loop: true },
            { name: "explosion", paths: ["assets/sounds/explosion.ogg", "assets/sounds/explosion.m4a"], volume: .2, loop: false },
            { name: "bonus", paths: ["assets/sounds/bonus.ogg", "assets/sounds/bonus.m4a"], volume: 1, loop: false },   

            { name: "bestia", paths: ["assets/sounds/bestia.ogg", "assets/sounds/bestia.m4a"], volume: 1, loop: false },  
            { name: "cafone-motorizzato", paths: ["assets/sounds/cafone-motorizzato.ogg", "assets/sounds/cafone-motorizzato.m4a"], volume: 1, loop: false }, 
            { name: "cafone", paths: ["assets/sounds/cafone.ogg", "assets/sounds/cafone.m4a"], volume: 1, loop: false }, 
            { name: "chebello", paths: ["assets/sounds/chebello.ogg", "assets/sounds/chebello.m4a"], volume: 1, loop: false }, 
            { name: "imbecille", paths: ["assets/sounds/imbecille.ogg", "assets/sounds/imbecille.m4a"], volume: 1, loop: false }, 
            { name: "ehhh", paths: ["assets/sounds/ehhh.ogg", "assets/sounds/ehhh.m4a"], volume: 1, loop: false }              

        ],

        bitmapfont: [
            //   { name: "commodore", imgpath: "assets/fonts/commodore.png", xmlpath: "assets/fonts/commodore.xml", jsonpath:"assets/fonts/commodore.json" }
        ]

    }

}



