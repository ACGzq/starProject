"use strict";
cc._RF.push(module, 'c9916w74nxBj6rQfTRhbj4+', 'game');
// scripts/game.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var mathUtil = require("util/mathUtil");
var objectPool = require("util/objectPool");
cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
        camera: cc.Node,
        monster: cc.Node,
        monsterScript: cc.Node,
        controlOrignPosX: 0,
        controlOrignPosY: 0,
        moveSpeedX: 0,
        moveSpeedY: 0,
        fastSpeed: 2,
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        monsterPrefab: {
            default: null,
            type: cc.Prefab
        },
        obstacle1: cc.Node,
        obstacle2: cc.Node,
        obstacle3: cc.Node,
        totalPlay: 0,
        allPlay: [cc.Prefab],
        allStar: [cc.Prefab],
        play1Stars: [cc.Prefab],
        playNo: 0,
        gameOver: false,
        standing: cc.Node,
        resultLabel: cc.Label
        //enemyPrefab: cc.Prefab,

        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        console.log('game onLoad');
        this.resultLabel.string = "you lost";
        this.node.getChildByName('background').on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.getChildByName('background').on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.getChildByName('background').on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.getChildByName('background').on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        this.initGame();
    },
    reStarGame: function reStarGame() {
        this.gameOver = false;
        console.log("this.allPlay.length=", this.allPlay.length);
        for (var i = 0; i < this.allPlay.length; i++) {
            var monster = this.allPlay[i];
            if (monster != null && monster != undefined && !monster.isValid) {
                //monster.getComponent('monster').removeAllStar();
                // objectPool.recoveryPlay(monster);
                monster.destroy();
            }
        }
        this.standing.setPosition(cc.v2(320, 2000));
        cc.director.loadScene('game');
    },
    start: function start() {
        var self = this;
        this.schedule(function () {
            var bg = self.node.children[0];
            for (var i = 0; i < bg.children.length; i++) {
                var star = bg.children[i];
                star.getComponent('cc.Collider').tag = -1;
            }
        }, 5);
    },

    /**
     * 生命周期，销毁
     */
    onDestroy: function onDestroy() {},
    initGame: function initGame() {
        console.log('initGame');
        for (var i = 0; i < this.totalPlay; i++) {

            this.allPlay[i] = this.createMonster(10 + i);
            if (i == this.playNo) {
                this.monster = this.allPlay[i];
                this.monsterScript = this.monster.getComponent('monster');
                this.monsterScript.isCurrentPlayer = true;
                this.camera.setPosition(this.monster.getPosition());
            } else {
                this.allPlay[i].getComponent('monster').AiOn();
            }
        }
        //console.log(this.monster);
        for (var ii = 0; ii < 24; ii++) {
            this.allStar[ii] = this.createStar();
        }
    },

    createMonster: function createMonster(tag) {
        var monster = null;
        monster = objectPool.createPlay(this.monsterPrefab);
        this.node.addChild(monster);
        monster.getComponent('cc.Collider').tag = tag;
        monster.getComponent('monster').game = this;

        if (this.allPlay.length > 0) {
            var pos = this.getRandomPosition(0, 0, 1200, 1200);
            for (var i = 0; i < this.allPlay.length; i++) {
                var play = this.allPlay[i];
                while (mathUtil.getDistance(pos, play.getPosition()) < 300) {
                    pos = this.getRandomPosition(0, 0, 1200, 1200);
                }
            }
        } else {
            monster.setPosition(this.getRandomPosition(0, 300 - 600 * (tag - 10), 1200, 300));
        }
        //monster.setPosition(this.getRandomPosition(0,300-600*(tag-10),1200,300));
        return monster;
    },
    createStar: function createStar() {
        var star = null;
        star = objectPool.createStar(this.starPrefab);
        try {
            this.bg.addChild(star);
        } catch (e) {
            return star;
        }
        star.getComponent('cc.Collider').tag = -1;
        star.getComponent('star').game = this;
        star.setPosition(this.getRandomPosition(0, 0, 1200, 1200));
        return star;
    },
    getRandomPosition: function getRandomPosition(x, y, w, h) {
        var positionX = Math.floor(x + (Math.random() - 0.5) * w);
        var positionY = Math.floor(y + (Math.random() - 0.5) * h);
        var newV2 = cc.v2(positionX, positionY);
        if (mathUtil.getDistance(newV2, this.obstacle1.getPosition()) < 200 || mathUtil.getDistance(newV2, this.obstacle2.getPosition()) < 200 || mathUtil.getDistance(newV2, this.obstacle3.getPosition()) < 200) {
            return this.getRandomPosition(x, y, w, h);
        } else {
            return newV2;
        }
    },
    updataMonsterStar: function updataMonsterStar(tag) {
        console.log("updataMonsterStar=", tag);
        this.allPlay[tag].getComponent('monster').reArrangeStar();
    },

    touchStart: function touchStart(event) {
        console.log('点击了');
        this.controlOrignPosX = event.getLocationX();
        this.controlOrignPosY = event.getLocationY();
    },
    touchMove: function touchMove(event) {

        if (this.monster != null || this.monster != undefined) {
            if (this.gameOver) {
                this.monsterScript.move(0, 0);
            } else {
                this.moveSpeedX = (event.getLocationX() - this.controlOrignPosX) / 10;
                if (this.moveSpeedX > this.fastSpeed) {
                    this.moveSpeedX = this.fastSpeed;
                } else if (this.moveSpeedX < this.fastSpeed * -1) {
                    this.moveSpeedX = this.fastSpeed * -1;
                }
                this.moveSpeedY = (event.getLocationY() - this.controlOrignPosY) / 10;
                if (this.moveSpeedY > this.fastSpeed) {
                    this.moveSpeedY = this.fastSpeed;
                } else if (this.moveSpeedY < this.fastSpeed * -1) {
                    this.moveSpeedY = this.fastSpeed * -1;
                }
                this.monsterScript.move(this.moveSpeedX, this.moveSpeedY);
            }
        }
    },
    touchEnd: function touchEnd(event) {
        if (this.monster != null || this.monster != undefined) {
            this.moveSpeedX = 0;
            this.moveSpeedY = 0;
            this.monsterScript.move(this.moveSpeedX, this.moveSpeedY);
        }
    },
    addStarToMonster: function addStarToMonster(node, tag) {
        this.monster.getComponent('monster').addStar(node);
    },
    update: function update(dt) {
        //  var posX = this.monster.x + this.moveSpeedX;
        //  var posY = this.monster.y + this.moveSpeedY;

        /*   for(var i = 0;i<this.play1Stars.length;i++){
              var x = this.play1Stars[i].x;
              var y = this.play1Stars[i].y;
              //console.log("monster ("+this.monster.x+","+this.monster.y+")");
              //两点间距离
              var dist = Math.sqrt(Math.pow((posX-x),2)+Math.pow((posY-y),2));
             // console.log(dist);
              
          };*/
        //this.monsterScript.move(this.moveSpeedX,this.moveSpeedY);
        //this.monster.setPosition(new cc.v2(posX,posY));
        if (this.monster != null || this.monster != undefined) {
            this.camera.setPosition(this.monster.getPosition());
        }
    },
    finishPlay: function finishPlay(tag) {
        console.log('tag=', tag);
        this.allPlay.splice(tag - 10, 1);
        if (this.gameOver) return;
        var self = this;
        this.gameOver = true;
        this.scheduleOnce(function () {
            for (var i = 0; i < self.bg.children.length; i++) {
                objectPool.recoveryStar(self.bg.children[i]);
            }

            console.log('tag =' + tag + "_self.playNo=" + self.playNo);
            if (self.allPlay.length == 0) {
                console.log('a standoff');
                self.resultLabel.string = "a standoff";
            } else if (tag == self.playNo + 10) {
                console.log('you lost');
                self.resultLabel.string = "you lost";
            } else {
                console.log('you win');
                self.resultLabel.string = "you win";
            }
            var action = cc.moveTo(0.5, self.camera.convertToWorldSpaceAR(cc.v2(0, 0)));
            self.standing.runAction(action);
        }, 1);
    }
});

cc._RF.pop();