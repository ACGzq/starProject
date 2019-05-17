"use strict";
cc._RF.push(module, '6f2f621FMRGe5mBIMgxYumI', 'loudly');
// scripts/loudly.js

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

var msg = require("SDKLib/SDKMessage");
cc.Class({
    extends: cc.Component,

    properties: {
        monsterA: cc.Node,
        monsterB: cc.Node,
        muteButton: cc.Button,
        micButton: cc.Button,
        logstr: cc.Label,
        localUid: 0,
        allUser: [],
        isColliding: false
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;jjjj
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    onKeyUp: function onKeyUp(event) {
        // unset a flag when key released
        console.log("onKeyDown:", event);
        var v2A = 0;
        var v2B = 0;
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                v2A += 5;
                v2B += 1;
                break;
            case cc.macro.KEY.s:
                v2A += 3;
                v2B += 1;
                break;
            case cc.macro.KEY.j:
                v2B += 5;
                v2A += 1;
                break;
            case cc.macro.KEY.k:
                v2B += 3;
                v2A += 1;
                break;
        }
        if (this.isColliding) {
            this.localVolume(v2A - v2B);
            this.remoteVolume(v2B - v2A);
        } else {
            this.localVolume(v2A);
            this.remoteVolume(v2B);
        }
    },
    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.initEvent();
        this.initSDK();
    },

    /**
     * 注册对应的事件监听和把自己的原型传递进入，用于发送事件使用
     */
    initEvent: function initEvent() {
        cc.systemEvent.on(msg.AGROA_JOIN_CHANNEL_SUCCESS, this.onEvent, this);
        cc.systemEvent.on(msg.AGROA_INIT_SUCCESS, this.onEvent, this);
        cc.systemEvent.on(msg.AGROA_AUDIO_VOLUME_INDICATION, this.onEvent, this);
    },
    removeEvent: function removeEvent() {
        cc.systemEvent.off(msg.AGROA_JOIN_CHANNEL_SUCCESS, this.onEvent, this);
        cc.systemEvent.off(msg.AGROA_INIT_SUCCESS, this.onEvent, this);
        cc.systemEvent.off(msg.AGROA_AUDIO_VOLUME_INDICATION, this.onEvent, this);
    },
    /**
     * 事件接收方法
     * @param event
     */
    onEvent: function onEvent(event) {
        var eventData = event.data;
        switch (event.type) {
            case msg.AGROA_INIT_SUCCESS:
                console.log("init success version:" + agora.getVersion());
                this.startPlay();
                break;
            case msg.AGROA_JOIN_CHANNEL_SUCCESS:
                console.log("event_JOIN_CHANNEL_SUCCESS_channel: " + eventData.channel + " uid: " + eventData.uid + " elapsed: " + eventData.elapsed);
                this.logstr.string = "channel: " + eventData.channel + " uid: " + eventData.uid;
                this.localUid = eventData.uid;
                this.allUser.push(eventData.uid);
                this.isColliding = false;
                break;
            case msg.AGROA_AUDIO_VOLUME_INDICATION:
                var userArray = eventData.speakers;
                var v2A = agora.stream.getAudioLevel() * 100;
                var v2B = 0;
                if (eventData.speakerNumber > 0) v2B = userArray[0].volume;
                console.log("v2A = " + v2A + "  v2B = " + v2B);
                if (this.isColliding) {
                    this.localVolume(v2A - v2B);
                    this.remoteVolume(v2B - v2A);
                } else {
                    this.localVolume(v2A);
                    this.remoteVolume(v2B);
                }
                break;
            case msg.AGROA_USER_JOINED:
                this.allUser.push(eventData.uid);
                break;
            case msg.AGROA_USER_OFFLINE:
                var index = this.allUser.indexOf(eventData.uid);
                if (index >= 0) {
                    this.allUser.splice(index, 1);
                }
                break;
            case msg.AGROA_LEAVE_CHANNEL:
                var index = this.allUser.indexOf(eventData.uid);
                this.allUser.splice(index, 1);
            default:
                console.log(event.type, event);
        }
    },
    /*indexOf: function(list,val) { 
    for (var i = 0; i < list.length; i++) { 
    if (list[i] == val) return i; 
    } 
    return -1; 
    },*/
    muteAllRemoteAudio: function muteAllRemoteAudio() {
        var button = this.mutebutton.node.getChildByName("Label").getComponent(cc.Label);
        var flag = button.string == "静音";
        button.string = flag ? "播音" : "静音";
        agora.muteAllRemoteAudioStreams(!flag);
    },
    muteLocalAudio: function muteLocalAudio() {
        var button = this.micButton.node.getChildByName("Label").getComponent(cc.Label);
        var flag = button.string == "关麦";
        button.string = flag ? "开麦" : "关麦";
        agora.muteLocalAudioStream(!flag);
    },
    localVolume: function localVolume(volume) {
        console.log("localVolume = " + volume);
        var action = cc.moveBy(0.2, cc.v2(volume * 5, 0));
        this.monsterA.runAction(action);
    },
    remoteVolume: function remoteVolume(volume, uid) {
        console.log("remoteVolume = " + volume);
        var action = cc.moveBy(0.2, cc.v2(volume * -5, 0));
        this.monsterB.runAction(action);
    },

    /**
     * 登录
     * @param id
     * @param token
     */
    startPlay: function startPlay() {
        console.log("startPlay");

        agora.setChannelProfile(0);
        agora.enableAudioVolumeIndication(50, 3);
        agora.joinChannel("", "acgzq1");
        /* if(this.mvToken!=null&&this.mvUserID!=null){
             GLB.userID = this.mvUserID;
             engine.prototype.login(this.mvUserID,this.mvToken);
         }else{
             engine.prototype.registerUser();
         }*/
    },
    initSDK: function initSDK() {
        console.log("调用初始化");
        var agoraAppID = "59dd6d4438a54c36b9ed7425795f3374";
        response.prototype.bind();
        agora.init(agoraAppID);
    },


    leaveRoom: function leaveRoom() {
        agora.leaveChannel();
    },
    joinOverResponse: function joinOverResponse(joinOverRsp) {
        // 返回值
        console.log("加入房间结果：", joinOverRsp.status);
        // 负载数据
        console.log("负载信息：", joinOverRsp.cpProto);
        console.log("加入房间结果：" + joinOverRsp.status + "\n负载信息：" + joinOverRsp.cpProto);
    },
    start: function start() {},

    /**
     * 生命周期，销毁
     */
    onDestroy: function onDestroy() {
        this.removeEvent();
        console.log("main 页面销毁");
    },
    update: function update(dt) {
        if (Math.abs(this.monsterA.x - this.monsterB.x) <= 78) {
            this.isColliding = true;
        } else {
            this.isColliding = false;
        }
    }
});

cc._RF.pop();