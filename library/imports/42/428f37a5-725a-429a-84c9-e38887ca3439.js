"use strict";
cc._RF.push(module, '428f3elclpCmoTJ44iHyjQ5', 'Glb');
// scripts/Glb.js

'use strict';

var obj = {
    RANDOM_MATCH: 1, // 随机匹配
    PROPERTY_MATCH: 2, // 属性匹配
    MAX_PLAYER_COUNT: 3,
    channel: 'Matchvs',
    platform: 'alpha',
    gameID: 215225,
    gameVersion: 1,
    appKey: '4e062ee45b8743aeaa34d51c3c49dd64#C',
    isWX: false,
    matchType: 1,
    tagsInfo: { "title": "A" },
    frameInfo: { "title": "frameInfo" },
    userID: 0,
    name: "",
    avatar: "",
    ARROW_LEFT: 1,
    ARROW_RIGHT: 2,
    ARROW_STOP: 0,
    playerUserIds: [],
    isRoomOwner: false,
    syncFrame: false,
    FRAME_RATE: 20,
    roomID: 0,
    playertime: 60,
    isGameOver: false,
    NEW_STAR_POSITION: 0,
    number1: "",
    number2: "",
    number3: "",
    ownew: 0, //只为做分数展示时判断使用
    mapType: "",
    FPS: 30 //数据帧每秒采样次数
};

module.exports = obj;

// window['obj'] = obj; //这步不能少

cc._RF.pop();