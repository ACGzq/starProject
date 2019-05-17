"use strict";
cc._RF.push(module, '774aaG5x6VCs4yxV/ZjK+f9', 'star');
// scripts/star.js

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

// let mvs = require("Matchvs");
// let Glb = require("../Glb");
var objectPool = require("util/objectPool");
var mathUtil = require("util/mathUtil");
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1,
        angle: 0,
        trackRadius: 0,
        game: null,
        isActionOver: true,
        canvas: cc.Node

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
        console.log('star onLoad');
        var self = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // this.canvas = cc.find("Canvas");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            if (event.keyCode == cc.macro.KEY.w) {
                self.startRun();
            }
        }, this);
    },
    Contraction: function Contraction(displacement) {
        var x1 = (this.trackRadius - displacement) * Math.cos(this.angle * Math.PI / 180);
        var y1 = (this.trackRadius - displacement) * Math.sin(this.angle * Math.PI / 180);
        var action = cc.moveTo(0.3, cc.v2(x1, y1));
        var action2 = cc.moveTo(0.3, cc.v2(this.node.x, this.node.y));
        //var reverseAction = action.reverse;
        console.log("this.trackRadius =" + this.trackRadius + "_" + x1 + "," + y1);
        var seq = cc.sequence(action, action2);
        this.node.runAction(seq);
    },
    start: function start() {
        console.log('start');
    },
    onEnable: function onEnable() {
        console.log('onEnable');
        this.canvas = cc.find("Canvas/background");
    },
    update: function update(dt) {},

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function onCollisionEnter(other, self) {
        var timestamp = new Date().getTime();
        console.log('on collision enter');
        //遇到的不是同组的且不是同属的且不是移动的
        if (self.tag != other.tag && self.tag + 10 != other.tag && other.tag != -2) {
            if (self.tag == -2) {
                //移动中的星星
                if (other.tag == 20 || other.tag == 22) {
                    this.node.stopAllActions();
                    self.tag == -1;
                }
            } else if (self.tag == -1) {
                //无主的星星

                if (other.tag == -1) {//撞到无主的星星

                } else if (other.tag < 10) {
                    //撞到玩家的星星
                    self.tag = other.tag;
                    //let p2 =  this.node.convertToWorldSpaceAR(cc.v2(0, 0));
                    //var newVec2 = other.node.parent.convertToNodeSpaceAR(p2);
                    console.log('无主的星星撞到玩家的星星');
                    this.node.parent = other.node.parent;
                    this.node.setPosition(cc.v2(0, 0));
                } else if (other.tag == 20) {
                    //撞到障碍物
                    console.log('starPool.put');
                    objectPool.starPool.put(this.node);
                } else if (other.tag == 22) {//边界

                } else {
                    //撞到玩家
                    self.tag = other.tag - 10;
                    var worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
                    var StarSprite = other.node.getChildByName('StarSprite');
                    var newPos = StarSprite.convertToNodeSpaceAR(worldPos);
                    this.node.parent = StarSprite;
                    this.node.setPosition(newPos);
                    console.log('无主的星星撞到玩家');
                }
            } else {
                //玩家的星星
                console.log('玩家的星星');
                if (other.tag == -1) {//撞到无主的星星

                } else if (other.tag < 10) {
                    //撞到玩家的星星
                    console.log('玩家的星星碰到对方玩家的星星');
                    // objectPool.starPool.put(this.node);
                    var p1 = other.node.convertToWorldSpaceAR(cc.v2(0, 0)); //对方节点
                    var p2 = this.node.convertToWorldSpaceAR(cc.v2(0, 0)); //己方节点
                    var newVec2 = this.canvas.convertToNodeSpaceAR(p2); //星星在画布下的位置
                    this.node.parent = this.canvas;
                    this.node.setPosition(newVec2);
                    var v2 = mathUtil.turnByAngle(p1, p2, 90, 270, false); //反弹向量
                    var action = cc.moveBy(0.3, v2);
                    this.scheduleOnce(function () {
                        self.tag = -2;
                    }, 0.1);
                    this.scheduleOnce(function () {
                        self.tag = -1;
                    }, 0.5);
                    // var finished = cc.callFunc(()=>{
                    //    console.log('动作结束',this);
                    //    self.tag = -1;
                    // }, this, 0);
                    //var myAction = cc.sequence(action, finished);
                    this.runAction(action);
                } else if (other.tag == 20) {
                    //撞到障碍物
                    var _p = other.node.convertToWorldSpaceAR(cc.v2(0, 0));
                    var _p2 = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
                    var _v = mathUtil.turnByAngle(_p, _p2, 90, 270, false); //反弹向量
                    //if(){}
                    var _newVec = this.canvas.convertToNodeSpaceAR(_p2); //星星在画布下的位置
                    //  console.log('玩家的星星撞到障碍物','starTag =' + self.tag + " psoi1" + newVec2);

                    //  console.log('玩家的星星从障碍物反弹到','starTag =' + self.tag + " psoi2" + v2);
                    this.node.parent = this.canvas;
                    this.node.setPosition(_newVec);
                    var action = cc.moveBy(0.3, _v);
                    self.tag = -2;
                    var finished = cc.callFunc(function () {
                        self.tag = -1;
                    }, this, 0);
                    var myAction = cc.sequence(action, finished);
                    this.runAction(myAction);
                } else if (other.tag == 22) {//边界

                } else {
                    //玩家
                    console.log('星星撞到玩家');
                }
            }
        }

        console.log('on collision enter time', timestamp - new Date().getTime());
    },
    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function onCollisionStay(other, self) {
        // console.log('on collision stay');

    },
    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionExit: function onCollisionExit(other, self) {
        console.log('on collision exit');

        if (self.tag != other.tag && self.tag + 10 != other.tag && other.tag != -2) {
            if (self.tag == -2) {
                //移动中的星星
                if (other.tag == 20 || other.tag == 22) {}
            } else if (self.tag == -1) {
                //无主的星星
                if (other.tag == -1) {//撞到无主的星星

                } else if (other.tag < 10) {//撞到玩家的星星

                } else if (other.tag == 20) {//撞到障碍物

                } else if (other.tag == 22) {//边界

                }
            } else {
                //玩家的星星
                if (other.tag == -1) {//撞到无主的星星

                } else if (other.tag < 10) {
                    //撞到玩家的星星
                    self.tag = -2;
                } else if (other.tag == 20) {//撞到障碍物

                } else if (other.tag == 22) {//边界

                }
            }
        }
    },
    runAction: function runAction(action) {
        //this.isActionOver = false;
        /*  let self = this;
          var finished = cc.callFunc(()=>{
              self.isActionOver = true;
          }, this, 0);*/
        this.node.stopAllActions();
        //var myAction = cc.sequence(action, finished);
        this.node.runAction(action);
    }
});

cc._RF.pop();