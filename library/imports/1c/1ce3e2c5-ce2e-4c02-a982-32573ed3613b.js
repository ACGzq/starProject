"use strict";
cc._RF.push(module, '1ce3eLFzi5MAqmCMlc+02E7', 'main');
// scripts/main.js

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

//let userInfo = require("userInfo");
//let mvs = require("../MatchvsLib/Matchvs");
var GLB = require("Glb");

cc.Class({
    extends: cc.Component,

    properties: {
        play: cc.Button,
        back: cc.Button,
        slider: cc.Slider,
        gameID: 215225,
        volumePower: 0,
        ClientRole: 0,
        talkMode: false,

        isInit: false,
        mvUserID: null,
        mvToken: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        /*this.node.on(cc.Node.EventType.TOUCH_START, (event)=>{
            console.log(event);
        }, this);*/
        // this.initEvent();
        // this.initSDK();
    },


    /**
    * 注册对应的事件监听和把自己的原型传递进入，用于发送事件使用
    */
    initEvent: function initEvent() {},
    removeEvent: function removeEvent() {},
    /**
     * 事件接收方法
     * @param event
     */
    onEvent: function onEvent(event) {
        var eventData = event.data;
        switch (event.type) {

            default:
                console.log(event.type, event);
        }
    },

    /**
     * 登录
     * @param id
     * @param token
     */
    startPlay: function startPlay() {
        console.log("startPlay");
        cc.director.loadScene("game");
    },
    initSDK: function initSDK() {
        console.log("调用初始化");
    },


    leaveRoom: function leaveRoom() {
        console.log("不玩了");
        //engine.prototype.leaveRoom("不玩了");
    },

    start: function start() {},

    /**
     * 生命周期，销毁
     */
    onDestroy: function onDestroy() {
        this.removeEvent();
        console.log("main 页面销毁");
    },
    update: function update(dt) {}
});

cc._RF.pop();