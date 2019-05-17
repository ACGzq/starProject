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
let GLB = require("Glb");
let msg = require("SDKLib/SDKMessage");
let engine = require("SDKLib/MatchvsDemoEngine");
cc.Class({
    extends: cc.Component,

    properties: {
        play:cc.Button,
        back:cc.Button,
        slider: cc.Slider,
        gameID:215225,
        volumePower:0,
        ClientRole:0,
        talkMode:false,

        isInit:false,
        mvUserID:null,
        mvToken:null,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        /*this.node.on(cc.Node.EventType.TOUCH_START, (event)=>{
            console.log(event);
        }, this);*/
       // this.initEvent();
       // this.initSDK();
     },
     
     /**
     * 注册对应的事件监听和把自己的原型传递进入，用于发送事件使用
     */
    initEvent:function () {
        cc.systemEvent.on(msg.MATCHVS_INIT,this.onEvent,this);
        cc.systemEvent.on(msg.MATCHVS_RE_CONNECT,this.onEvent,this);
        cc.systemEvent.on(msg.MATCHVS_ERROE_MSG,this.onEvent,this);
        cc.systemEvent.on(msg.MATCHVS_REGISTER_USER,this.onEvent,this);
        cc.systemEvent.on(msg.MATCHVS_LOGIN,this.onEvent,this);
        cc.systemEvent.on(msg.MATCHVS_WX_BINDING,this.onEvent,this);
        cc.systemEvent.on(msg.MATCHVS_JOIN_ROOM_NOTIFY,this.onEvent,this);
        cc.systemEvent.on(msg.MATCHVS_JOIN_ROOM_RSP,this.onEvent,this);
        cc.systemEvent.on(msg.MATCHVS_CREATE_ROOM,this.onEvent,this);
        cc.systemEvent.on(msg.MATCHVS_LEAVE_ROOM,this.onEvent,this);
        cc.systemEvent.on(msg.MATCHVS_LEAVE_ROOM_NOTIFY,this.onEvent,this);
        //---------AGROA---------
        cc.systemEvent.on(msg.AGROA_JOIN_CHANNEL_SUCCESS,this.onEvent,this);
        cc.systemEvent.on(msg.AGROA_INIT_SUCCESS,this.onEvent,this);
        cc.systemEvent.on(msg.AGROA_AUDIO_VOLUME_INDICATION,this.onEvent,this);
        cc.systemEvent.on(msg.AGROA_USER_JOINED,this.onEvent,this);
        cc.systemEvent.on(msg.AGROA_USER_OFFLINE,this.onEvent,this);
        cc.systemEvent.on(msg.AGROA_ERROR,this.onEvent,this);
    },
    removeEvent:function () {
        cc.systemEvent.off(msg.MATCHVS_INIT,this.onEvent,this);
        cc.systemEvent.off(msg.MATCHVS_RE_CONNECT,this.onEvent,this);
        cc.systemEvent.off(msg.MATCHVS_ERROE_MSG,this.onEvent,this);
        cc.systemEvent.off(msg.MATCHVS_REGISTER_USER,this.onEvent,this);
        cc.systemEvent.off(msg.MATCHVS_LOGIN,this.onEvent,this);
        cc.systemEvent.off(msg.MATCHVS_WX_BINDING,this.onEvent,this);
        cc.systemEvent.off(msg.MATCHVS_JOIN_ROOM_NOTIFY,this.onEvent,this);
        cc.systemEvent.off(msg.MATCHVS_JOIN_ROOM_RSP,this.onEvent,this);
        cc.systemEvent.off(msg.MATCHVS_CREATE_ROOM,this.onEvent,this);
        cc.systemEvent.off(msg.MATCHVS_LEAVE_ROOM,this.onEvent,this);
        cc.systemEvent.off(msg.MATCHVS_LEAVE_ROOM_NOTIFY,this.onEvent,this);
        //---------AGROA---------
        cc.systemEvent.off(msg.AGROA_JOIN_CHANNEL_SUCCESS,this.onEvent,this);
        cc.systemEvent.off(msg.AGROA_INIT_SUCCESS,this.onEvent,this);
        cc.systemEvent.off(msg.AGROA_AUDIO_VOLUME_INDICATION,this.onEvent,this);
        cc.systemEvent.off(msg.AGROA_USER_JOINED,this.onEvent,this);
        cc.systemEvent.off(msg.AGROA_USER_OFFLINE,this.onEvent,this);
        cc.systemEvent.off(msg.AGROA_ERROR,this.onEvent,this);
    },
    /**
     * 事件接收方法
     * @param event
     */
    onEvent:function (event) {
        let eventData = event.data;
        switch (event.type){
            case msg.MATCHVS_INIT:
                console.log('初始化成功'); 
                break;
            case msg.MATCHVS_REGISTER_USER:
                this.mvUserID = eventData.userInfo.id;
                this.mvToken=eventData.userInfo.token;
                this.login();
                break;
            case msg.MATCHVS_LOGIN:
                if (eventData.MsLoginRsp.roomID != null && eventData.MsLoginRsp.roomID !== '0') {
                    engine.prototype.joinRandomRoom(2, this.mvUserID);
                    console.log("开始重连"+ eventData.MsLoginRsp.roomID);
                    engine.prototype.reconnect();
                } else {
                    console.log('恭喜你登录成功，来到Matchvs的世界，你已经成功的迈出了第一步，Hello World');
                    //this.engine.getRoomList();
                    engine.prototype.joinRandomRoom(2, this.mvUserID);
                }
                break;
            case msg.MATCHVS_JOIN_ROOM_RSP:
            console.log("加入房间结果：", eventData);
            console.log("房间ID为:", eventData.userInfoList.roomID);
            
            GLB.roomID = eventData.userInfoList.roomID;
            if (eventData.userInfoList.length == 0) {
                GLB.isRoomOwner = true;
                console.log('joinRoomResponse：房间暂时无其他玩家');
            }else{
                for(var i = 0; i < eventData.userInfoList.length;i++) {
                    console.log('joinRoomResponse：房间的玩家ID有'+eventData.userInfoList[i].userID);
                }
                cc.director.loadScene("game");
            }
                break;
            case msg.MATCHVS_JOIN_ROOM_NOTIFY:
                console.log('joinRoomNotify'+eventData);
                cc.director.loadScene("game");
                break;
            case msg.MATCHVS_CREATE_ROOM:
                console.log("创建指定类型房间回调" + eventData.CreateRoomRsp.status);
                break;
            case msg.MATCHVS_RE_CONNECT:
                GLB.roomID = eventData.userInfoList.roomID;
                if (eventData.userInfoList.owner === GLB.userID) {
                    GLB.isRoomOwner = true;
                } else {
                    GLB.isRoomOwner = false;
                }
                if (eventData.userInfoList.state === 1) {
                    if (eventData.userInfoList.roomProperty === "") {
                        engine.prototype.leaveRoom();
                       // cc.director.loadScene("Lobby");
                    } else  {
                       // cc.director.loadScene('CreateRoom');
                    }
                } else {
                    cc.director.loadScene("Game");
                }
                break;
            case msg.MATCHVS_LEAVE_ROOM_NOTIFY:
            case msg.MATCHVS_LEAVE_ROOM:
                console.log("leave_msg", eventData);
                break;
                
            case msg.MATCHVS_ERROE_MSG:
                console.log("[Err]errCode:"+eventData.errorCode+" errMsg:"+eventData.errorMsg);
                break;
            case msg.AGROA_JOIN_CHANNEL_SUCCESS:
                console.log("event_JOIN_CHANNEL_SUCCESS_channel: " + eventData.channel + " uid: " + eventData.uid + " elapsed: " + eventData.elapsed);
                if(this.talkMode){
                    agora.muteLocalAudioStream(false);
                }
                if(this.ClientRole>0){
                    console.log("ClientRole "+this.ClientRole);
                    agora.setClientRole(this.ClientRole);
                }
                break;
                case msg.AGROA_INIT_SUCCESS:
                console.log("init success SDKversion:"+agora.getVersion());
                break;
            default:
            console.log(event.type,event);
            }
    },
   

    /**
     * 登录
     * @param id
     * @param token
     */
    startPlay: function () {
        console.log("startPlay");
        cc.director.loadScene("game");
    },
     initSDK(){
        console.log("调用初始化");
        var appkey = '4e062ee45b8743aeaa34d51c3c49dd64#C';
        var gameVersion = 1;
        //engine.prototype.init(GLB.channel,GLB.platform,GLB.gameID);
        var agoraAppID = "59dd6d4438a54c36b9ed7425795f3374";
        //response.prototype.bind();
        //agora.init(agoraAppID);
        
    },

    leaveRoom:function(){
        console.log("不玩了");
        //engine.prototype.leaveRoom("不玩了");
    },
    joinOverResponse:function(joinOverRsp){
        // 返回值
        console.log("加入房间结果：", joinOverRsp.status);
        // 负载数据
        console.log("负载信息：", joinOverRsp.cpProto);
        console.log("加入房间结果：" + joinOverRsp.status + "\n负载信息：" + joinOverRsp.cpProto);
    },
    start () {

    },
    /**
     * 生命周期，销毁
     */
    onDestroy () {
        this.removeEvent();
        console.log("main 页面销毁");
    },

     update (dt) {},
});
