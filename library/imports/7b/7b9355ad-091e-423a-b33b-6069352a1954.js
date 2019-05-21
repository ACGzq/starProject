"use strict";
cc._RF.push(module, '7b935WtCR5COrM7YGk1KhlU', 'AI');
// scripts/AI.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html 
var mathUtil = require("mathUtil");
cc.Class({
    extends: cc.Component,

    properties: {
        ControlOn: false,
        Enemy: cc.Node,
        GameWorld: cc.Node,
        SelfMonster: null,
        bg: cc.Node,
        obstacle1: cc.Node,
        obstacle2: cc.Node,
        obstacle3: cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    setMap: function setMap(game) {
        this.GameWorld = game;
        this.obstacle1 = game.getComponent('game').obstacle1;
        this.obstacle2 = game.getComponent('game').obstacle2;
        this.obstacle3 = game.getComponent('game').obstacle3;
    },
    setEnemy: function setEnemy(enemy) {
        this.Enemy = enemy;
    },
    setSelf: function setSelf(SelfMonster) {
        this.SelfMonster = SelfMonster;
    },
    startControl: function startControl() {
        if (this.ControlOn) return;
        this.ControlOn = true;
        this.bg = cc.find("Canvas/background");
        this.callback = function () {

            if (!this.ControlOn || this.GameWorld.gameOver) {
                // 在第六次执行回调时取消这个计时器
                this.unschedule(this.callback);
            } else {
                if (550 > mathUtil.getDistance(this.SelfMonster.node.getPosition(), this.Enemy.getPosition())) {

                    if (this.SelfMonster.starSprite.children.length - 3 > this.Enemy.children[0].children.length) {
                        var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(), this.Enemy.getPosition(), 0, 2.8, false);
                    } else {
                        var posi = this.SelfMonster.node.getPosition();
                        var angle = 180;
                        if (posi.x > 590 || posi.x <= -590 || posi.y < -590 || posi.y > 590) {
                            if (mathUtil.getAngle(this.GameWorld.node.getPosition(), posi) < mathUtil.getAngle(this.GameWorld.node.getPosition(), this.Enemy.getPosition())) {
                                angle += 90;
                            } else {
                                angle -= 90;
                            }
                        }
                        var newVer2 = mathUtil.turnByAngle(posi, this.Enemy.getPosition(), angle, 2.8, false);
                    }
                } else {
                    var nearStar;
                    var dis = 5000;
                    console.log(this.bg.children.length);
                    var _posi = this.SelfMonster.node.getPosition();
                    for (var i = 0; i < this.bg.children.length; i++) {
                        var star = this.bg.children[i];
                        var dis2 = mathUtil.getDistance(_posi, star.getPosition());
                        if (dis2 < dis) {
                            dis = dis2;
                            nearStar = star;
                        };
                    }
                    if (mathUtil.getDistance(_posi, this.obstacle1.getPosition()) < 200) {
                        var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(), this.obstacle1.getPosition(), 90, 2, false);
                    } else if (mathUtil.getDistance(_posi, this.obstacle2.getPosition()) < 200) {
                        var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(), this.obstacle2.getPosition(), 90, 2, false);
                    } else if (mathUtil.getDistance(_posi, this.obstacle3.getPosition()) < 200) {
                        var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(), this.obstacle3.getPosition(), 90, 2, false);
                    } else {
                        var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(), nearStar.getPosition(), 0, 2, false);
                    }
                }
                this.SelfMonster.move(newVer2.x, newVer2.y);
            }
        };
        this.schedule(this.callback, 1);
    },
    stopControl: function stopControl() {
        this.ControlOn = false;
    },
    log: function log(value) {
        console.log(value);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();