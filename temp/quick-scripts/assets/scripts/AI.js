(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/AI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7b935WtCR5COrM7YGk1KhlU', 'AI', __filename);
// scripts/AI.js

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
cc.Class({
    extends: cc.Component,

    properties: {
        ControlOn: false,
        Enemy: cc.Node,
        GameWorld: cc.Node,
        SelfMonster: null,
        bg: cc.Node
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

    // onLoad () {},
    setMap: function setMap(game) {
        this.GameWorld = game;
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
                        if (pos.x > 590 || pos.x < -590 || pos.y < -590 || pos.y > 590) {
                            mathUtil.getAngle(posi, this.Enemy.getPosition());
                        }
                        var newVer2 = mathUtil.turnByAngle(posi, this.Enemy.getPosition(), 180, 2.8, false);
                    }
                } else {
                    var nearStar;
                    var dis = 5000;
                    console.log(this.bg.children.length);
                    for (var i = 0; i < this.bg.children.length; i++) {
                        var star = this.bg.children[i];
                        var dis2 = mathUtil.getDistance(this.SelfMonster.node.getPosition(), star.getPosition());
                        if (dis2 < dis) {
                            dis = dis2;
                            nearStar = star;
                        };
                    }
                    var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(), nearStar.getPosition(), 0, 2, false);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=AI.js.map
        