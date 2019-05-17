window.__require = function e(o, t, n) {
function s(c, r) {
if (!t[c]) {
if (!o[c]) {
var a = c.split("/");
a = a[a.length - 1];
if (!o[a]) {
var l = "function" == typeof __require && __require;
if (!r && l) return l(a, !0);
if (i) return i(a, !0);
throw new Error("Cannot find module '" + c + "'");
}
}
var p = t[c] = {
exports: {}
};
o[c][0].call(p.exports, function(e) {
return s(o[c][1][e] || e);
}, p, p.exports, e, o, t, n);
}
return t[c].exports;
}
for (var i = "function" == typeof __require && __require, c = 0; c < n.length; c++) s(n[c]);
return s;
}({
Glb: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "428f3elclpCmoTJ44iHyjQ5", "Glb");
o.exports = {
RANDOM_MATCH: 1,
PROPERTY_MATCH: 2,
MAX_PLAYER_COUNT: 3,
channel: "Matchvs",
platform: "alpha",
gameID: 215225,
gameVersion: 1,
appKey: "4e062ee45b8743aeaa34d51c3c49dd64#C",
isWX: !1,
matchType: 1,
tagsInfo: {
title: "A"
},
frameInfo: {
title: "frameInfo"
},
userID: 0,
name: "",
avatar: "",
ARROW_LEFT: 1,
ARROW_RIGHT: 2,
ARROW_STOP: 0,
playerUserIds: [],
isRoomOwner: !1,
syncFrame: !1,
FRAME_RATE: 20,
roomID: 0,
playertime: 60,
isGameOver: !1,
NEW_STAR_POSITION: 0,
number1: "",
number2: "",
number3: "",
ownew: 0,
mapType: "",
FPS: 30
};
cc._RF.pop();
}, {} ],
MatchvsDemoEngine: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "7965fbjtA9KzqRhHqedWKRh", "MatchvsDemoEngine");
var n = e("Matchvs"), s = e("../Glb"), i = e("MatchvsDemoResponse");
function c() {}
c.prototype.init = function(e, o) {
i.prototype.bind();
var t = n.engine.init(n.response, e, o, s.gameID, s.appKey, 1);
console.log("初始化result" + t);
return t;
};
c.prototype.premiseInit = function(e, o) {
i.prototype.bind();
var t = n.engine.premiseInit(n.response, e, o);
console.log("独立部署初始化result" + t);
return t;
};
c.prototype.registerUser = function() {
var e = n.engine.registerUser();
console.log("注册result" + e);
return e;
};
c.prototype.login = function(e, o) {
var t = n.engine.login(e, o, "abcdef");
console.log("登录result" + t);
return t;
};
c.prototype.reconnect = function() {
var e = n.engine.reconnect();
console.log("重连result" + e);
return e;
};
c.prototype.logout = function() {
var e = n.engine.logout("退出游戏");
console.log("退出游戏result" + e);
return e;
};
c.prototype.uninit = function() {
var e = n.engine.uninit();
console.log("反初始化result" + e);
return e;
};
c.prototype.joinRandomRoom = function(e, o) {
var t = n.engine.joinRandomRoom(e, c.prototype.getUserProfile(o));
console.log("随机匹配result" + t);
return t;
};
c.prototype.joinRoomWithProperties = function(e, o) {
var t = n.engine.joinRoomWithProperties(e, c.prototype.getUserProfile(o));
console.log("属性匹配result" + t);
return t;
};
c.prototype.leaveRoom = function() {
var e = {
name: s.name,
profile: "主动离开了房间"
}, o = n.engine.leaveRoom(JSON.stringify(e));
console.log(s.name + "主动离开房间result" + o);
return o;
};
c.prototype.joinOver = function() {
var e = n.engine.joinOver("关闭房间");
console.log("joinOver result" + e);
return e;
};
c.prototype.joinOpen = function() {
var e = n.engine.joinOpen("打开房间");
console.log("joinOpen result" + e);
return e;
};
c.prototype.getRoomListEx = function(e) {
var o = n.engine.getRoomListEx(e);
console.log("加载房间列表扩展接口 result" + o);
return o;
};
c.prototype.joinRoom = function(e, o) {
var t = n.engine.joinRoom(e, c.prototype.getUserProfile(o));
console.log("加入指定房间 result" + t);
return t;
};
c.prototype.createRoom = function(e, o) {
var t = n.engine.createRoom(e, c.prototype.getUserProfile(o));
console.log("创建指定类型房间 result" + t);
return t;
};
c.prototype.kickPlayer = function(e, o) {
var t = {
name: o,
profile: o + "被踢出了房间"
}, s = n.engine.kickPlayer(e, JSON.stringify(t));
console.log(e + "被踢出游戏 result" + s);
return s;
};
c.prototype.setRoomProperty = function(e, o) {
var t = n.engine.setRoomProperty(e, o);
console.log("修改房间属性 result" + t);
return t;
};
c.prototype.getRoomDetail = function(e) {
var o = n.engine.getRoomDetail(e);
console.log("获取房间详情 result" + o);
return o;
};
c.prototype.sendEvent = function(e) {
return n.engine.sendEvent(e).result;
};
c.prototype.sendEventEx = function(e, o) {
return n.engine.sendEventEx(e, o, 1, []).result;
};
c.prototype.setFrameSync = function(e) {
var o = n.engine.setFrameSync(e, 1, {
cacheFrameMS: 0
});
console.log("设置帧率 result：" + o);
return o;
};
c.prototype.sendFrameEvent = function(e) {
return n.engine.sendFrameEvent(e, 0);
};
c.prototype.getUserProfile = function(e) {
var o = {
name: s.name,
avatar: s.avatar,
profile: e
}, t = JSON.stringify(o);
console.log("进入房间负载信息" + t);
return t;
};
o.exports = c;
cc._RF.pop();
}, {
"../Glb": "Glb",
Matchvs: "Matchvs",
MatchvsDemoResponse: "MatchvsDemoResponse"
} ],
MatchvsDemoResponse: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "2a806Ww62NMZoEHb8EOiDat", "MatchvsDemoResponse");
var n = e("Matchvs"), s = e("SDKMessage"), i = e("../Glb");
function c() {}
c.prototype.bind = function() {
n.response.initResponse = this.initResponse.bind(this);
n.response.registerUserResponse = this.registerUserResponse.bind(this);
n.response.loginResponse = this.loginResponse.bind(this);
n.response.logoutResponse = this.logoutResponse.bind(this);
n.response.reconnectResponse = this.reconnectResponse.bind(this);
n.response.errorResponse = this.errorResponse.bind(this);
n.response.joinRoomResponse = this.joinRoomResponse.bind(this);
n.response.joinRoomNotify = this.joinRoomNotify.bind(this);
n.response.leaveRoomResponse = this.leaveRoomResponse.bind(this);
n.response.leaveRoomNotify = this.leaveRoomNotify.bind(this);
n.response.joinOpenResponse = this.joinOpenResponse.bind(this);
n.response.joinOpenNotify = this.joinOpenNotify.bind(this);
n.response.joinOverResponse = this.joinOverResponse.bind(this);
n.response.joinOverNotify = this.joinOverNotify.bind(this);
n.response.getRoomListExResponse = this.getRoomListExResponse.bind(this);
n.response.createRoomResponse = this.createRoomResponse.bind(this);
n.response.kickPlayerResponse = this.kickPlayerResponse.bind(this);
n.response.kickPlayerNotify = this.kickPlayerNotify.bind(this);
n.response.getRoomDetailResponse = this.getRoomDetailResponse.bind(this);
n.response.setRoomPropertyResponse = this.setRoomPropertyResponse.bind(this);
n.response.setRoomPropertyNotify = this.setRoomPropertyNotify.bind(this);
n.response.sendEventResponse = this.sendEventResponse.bind(this);
n.response.sendEventNotify = this.sendEventNotify.bind(this);
n.response.frameUpdate = this.frameUpdate.bind(this);
n.response.networkStateNotify = this.networkStateNotify.bind(this);
n.response.setFrameSyncResponse = this.setFrameSyncResponse.bind(this);
};
c.prototype.initResponse = function(e) {
try {
if (200 === e) {
console.log("初始化成功");
c.prototype.sendEventToUI(s.MATCHVS_INIT, {
status: e,
type: s.MATCHVS_INIT
});
} else console.log("初始化失败" + e);
} catch (e) {
console.log(e.message);
}
};
c.prototype.registerUserResponse = function(e) {
if (0 === e.status) {
console.log("注册成功");
"" !== e.name ? i.name = e.name : i.name = e.userID;
i.avatar = e.avatar;
i.userID = e.userID;
c.prototype.sendEventToUI(s.MATCHVS_REGISTER_USER, {
userInfo: e,
type: s.MATCHVS_REGISTER_USER
});
} else console.log("注册失败" + e.status);
};
c.prototype.loginResponse = function(e) {
if (200 === e.status) {
console.log("登录成功");
c.prototype.sendEventToUI(s.MATCHVS_LOGIN, {
MsLoginRsp: e,
type: s.MATCHVS_LOGIN
});
} else console.log("登录失败" + e.status);
};
c.prototype.logoutResponse = function(e) {};
c.prototype.reconnectResponse = function(e, o, t) {
if (200 === e) {
console.log("重连成功");
o.roomID = t.roomID;
o.roomProperty = t.roomProperty;
o.state = t.state;
o.ownerID = t.ownerID;
c.prototype.sendEventToUI(s.MATCHVS_RE_CONNECT, {
roomUserInfoList: o,
type: s.MATCHVS_RE_CONNECT
});
} else console.log("重连失败" + e);
};
c.prototype.errorResponse = function(e, o) {
console.log("发生错误了！！！");
c.prototype.sendEventToUI(s.MATCHVS_ERROE_MSG, {
errorCode: e,
errorMsg: o,
type: s.MATCHVS_ERROE_MSG
});
};
c.prototype.joinRoomResponse = function(e, o, t) {
if (200 === e) {
console.log("进入房间成功");
o.roomID = t.roomID;
c.prototype.sendEventToUI(s.MATCHVS_JOIN_ROOM_RSP, {
userInfoList: o,
type: s.MATCHVS_JOIN_ROOM_RSP
});
} else console.log("进入房间失败" + e);
};
c.prototype.joinRoomNotify = function(e) {
console.log(e.userID + "加入了房间");
c.prototype.sendEventToUI(s.MATCHVS_JOIN_ROOM_NOTIFY, {
roomUserInfo: e,
type: s.MATCHVS_JOIN_ROOM_NOTIFY
});
};
c.prototype.joinOpenNotify = function(e) {
console.log("房间打开通知");
c.prototype.sendEventToUI(s.MATCHVS_JOIN_OPEN_NOTIFY, {
notify: e,
type: s.MATCHVS_JOIN_OPEN_NOTIFY
});
};
c.prototype.joinOpenResponse = function(e) {
if (200 === e.status) {
console.log("房间打开成功");
c.prototype.sendEventToUI(s.MATCHVS_JOIN_OPEN_RSP, {
rsp: e,
type: s.MATCHVS_JOIN_OPEN_RSP
});
} else console.log("房间打开失败" + e.status);
};
c.prototype.joinOverResponse = function(e) {
if (200 === e.status) {
console.log("房间关闭成功");
c.prototype.sendEventToUI(s.MATCHVS_JOIN_OVER_RSP, {
rsp: e,
type: s.MATCHVS_JOIN_OVER_RSP
});
} else console.log("房间关闭失败" + e.status);
};
c.prototype.joinOverNotify = function(e) {
console.log("房间关闭通知");
c.prototype.sendEventToUI(s.MATCHVS_JOIN_OVER_NOTIFY, {
notify: e,
type: s.MATCHVS_JOIN_OVER_NOTIFY
});
};
c.prototype.leaveRoomResponse = function(e) {
if (200 === e.status) {
console.log("离开房间成功");
c.prototype.sendEventToUI(s.MATCHVS_LEAVE_ROOM, {
leaveRoomRsp: e,
type: s.MATCHVS_LEAVE_ROOM
});
} else console.log("离开房间失败" + e.status);
};
c.prototype.leaveRoomNotify = function(e) {
c.prototype.sendEventToUI(s.MATCHVS_LEAVE_ROOM_NOTIFY, {
leaveRoomInfo: e,
type: s.MATCHVS_LEAVE_ROOM_NOTIFY
});
};
c.prototype.getRoomListExResponse = function(e) {
if (200 === e.status) {
console.log("获取房间列表扩展接口成功");
c.prototype.sendEventToUI(s.MATCHVS_ROOM_LIST_EX, {
rsp: e,
type: s.MATCHVS_ROOM_LIST_EX
});
} else console.log("获取房间列表扩展接口失败 status" + e.status);
};
c.prototype.createRoomResponse = function(e) {
if (200 === e.status) {
console.log("创建指定类型房间接口成功");
c.prototype.sendEventToUI(s.MATCHVS_CREATE_ROOM, {
rsp: e,
type: s.MATCHVS_CREATE_ROOM
});
} else console.log("创建指定类型房间接口失败 status" + e.status);
};
c.prototype.kickPlayerResponse = function(e) {
if (200 === e.status) {
console.log("踢出指定玩家成功");
c.prototype.sendEventToUI(s.MATCHVS_KICK_PLAYER, {
kickPlayerRsp: e,
type: s.MATCHVS_KICK_PLAYER
});
} else console.log("踢出指定玩家失败 status" + e.status);
};
c.prototype.kickPlayerNotify = function(e) {
console.log("踢出指定玩家通知");
c.prototype.sendEventToUI(s.MATCHVS_KICK_PLAYER_NOTIFY, {
kickPlayerNotify: e,
type: s.MATCHVS_KICK_PLAYER_NOTIFY
});
};
c.prototype.setRoomPropertyResponse = function(e) {
if (200 === e.status) {
console.log("修改房间属性成功");
c.prototype.sendEventToUI(s.MATCHVS_SET_ROOM_PROPETY, {
rsp: e,
type: s.MATCHVS_SET_ROOM_PROPETY
});
} else console.log("修改房间属性失败 status" + e.status);
};
c.prototype.setRoomPropertyNotify = function(e) {
console.log("修改房间属性通知");
console.log(e.userID + "修改了房间属性，新的房间属性是" + e.roomProperty);
c.prototype.sendEventToUI(s.MATCHVS_SET_ROOM_PROPETY_NOTIFY, {
rsp: e,
type: s.MATCHVS_SET_ROOM_PROPETY_NOTIFY
});
};
c.prototype.getRoomDetailResponse = function(e) {
if (200 === e.status) {
c.prototype.sendEventToUI(s.MATCHVS_ROOM_DETAIL, {
rsp: e,
type: s.MATCHVS_ROOM_DETAIL
});
console.log("获取房间详情成功");
} else console.log("获取房间详情失败 status " + e.status);
};
c.prototype.sendEventResponse = function(e) {
200 === e.status ? c.prototype.sendEventToUI(s.MATCHVS_SEND_EVENT_RSP, {
sendEventRsp: e,
type: s.MATCHVS_SEND_EVENT_RSP
}) : console.log("发送消息失败 status" + e.status);
};
c.prototype.sendEventNotify = function(e) {
c.prototype.sendEventToUI(s.MATCHVS_SEND_EVENT_NOTIFY, {
eventInfo: e,
type: s.MATCHVS_SEND_EVENT_NOTIFY
});
};
c.prototype.setFrameSyncResponse = function(e) {
c.prototype.sendEventToUI(s.MATCHVS_SET_FRAME_SYNC_RSP, {
rsp: e,
type: s.MATCHVS_SET_FRAME_SYNC_RSP
});
200 === e.status ? console.log("帧率设置成功") : 519 === e.status ? console.log("帧率设置失败,重复设置") : 500 === e.status && console.log("帧率设置失败,帧率需被1000整除");
};
c.prototype.frameUpdate = function(e) {
c.prototype.sendEventToUI(s.MATCHVS_FRAME_UPDATE, {
data: e,
type: s.MATCHVS_FRAME_UPDATE
});
};
c.prototype.networkStateNotify = function(e) {
console.log("netNotify.owner:" + e.owner);
c.prototype.sendEventToUI(s.MATCHVS_NETWORK_STATE_NOTIFY, {
netNotify: e,
type: s.MATCHVS_NETWORK_STATE_NOTIFY
});
};
c.prototype.onMsg = function(e) {
var o = JSON.parse(e);
c.prototype.sendEventToUI(s.MATCHVS_WX_BINDING, {
data: o.data,
type: s.MATCHVS_WX_BINDING
});
};
var r = new Array();
c.prototype.roomUserInfoListChangeNotify = function(e, o, t, n) {
switch (o) {
case "joinRoom":
(r = e).push(t);
break;

case "joinRoomNotify":
r.push(t);
break;

case "leaveRoom":
for (var s = 0; s < r.length; s++) {
if (t.userID === r[s].userID) {
r.length = 0;
break;
}
r[s].userID === t.userID && r.splice(s, 1);
}
}
r.sort(c.prototype.sortNumber);
for (s = 0; s < r.length; s++) n === r[s].userID && c.prototype.swapArray(r, s, 0);
};
c.prototype.sortNumber = function(e, o) {
var t = e.userID, n = o.userID;
return t < n ? -1 : t > n ? 1 : 0;
};
c.prototype.swapArray = function(e, o, t) {
e[o] = e.splice(t, 1, e[o])[0];
return e;
};
c.prototype.sendEventToUI = function(e, o) {
var t = new cc.Event(e, !0);
t.data = o;
cc.systemEvent.dispatchEvent(t);
};
o.exports = c;
cc._RF.pop();
}, {
"../Glb": "Glb",
Matchvs: "Matchvs",
SDKMessage: "SDKMessage"
} ],
Matchvs: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "05271p8jQlJzKigt0eOwo2u", "Matchvs");
var n = void 0, s = {}, i = void 0, c = void 0, r = void 0, a = void 0;
try {
n = new window.MatchvsEngine();
s = new window.MatchvsResponse();
i = window.MsMatchInfo;
c = window.MsCreateRoomInfo;
r = window.MsRoomFilterEx;
a = window.LocalStore_Clear;
} catch (e) {
console.warn("load matchvs fail," + e.message);
}
o.exports = {
engine: n,
response: s,
MsMatchInfo: i,
MsCreateRoomInfo: c,
MsRoomFilterEx: r,
LocalStore_Clear: a
};
cc._RF.pop();
}, {} ],
SDKMessage: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "325deqQeBJE6ZecBu6hYwGc", "SDKMessage");
o.exports = {
MATCHVS_INIT: "MATCHVS_INIT",
MATCHVS_REGISTER_USER: "MATCHVS_REGISTER_USER",
MATCHVS_LOGIN: "MATCHVS_LOGIN",
MATCHVS_RE_CONNECT: "MATCHVS_RE_CONNECT",
MATCHVS_ERROE_MSG: "MATCHVS_ERROE_MSG",
MATCHVS_JOIN_ROOM_RSP: "MATCHVS_JOIN_ROOM_RSP",
MATCHVS_JOIN_ROOM_NOTIFY: "MATCHVS_JOIN_ROOM_NOTIFY",
MATCHVS_LEAVE_ROOM: "MATCHVS_LEAVE_ROOM",
MATCHVS_LEAVE_ROOM_NOTIFY: "MATCHVS_LEAVE_ROOM_NOTIFY",
MATCHVS_JOIN_OVER_RSP: "MATCHVS_JOIN_OVER_RSP",
MATCHVS_JOIN_OVER_NOTIFY: "MATCHVS_JOIN_OVER_NOTIFY",
MATCHVS_JOIN_OPEN_RSP: "MATCHVS_JOIN_OPEN_RSP",
MATCHVS_JOIN_OPEN_NOTIFY: "MATCHVS_JOIN_OPEN_NOTIFY",
MATCHVS_ROOM_LIST_EX: "MATCHVS_ROOM_LIST_EX",
MATCHVS_CREATE_ROOM: "MATCHVS_CREATE_ROOM",
MATCHVS_ROOM_DETAIL: "MATCHVS_ROOM_DETAIL",
MATCHVS_KICK_PLAYER: "MATCHVS_KICK_PLAYER",
MATCHVS_KICK_PLAYER_NOTIFY: "MATCHVS_KICK_PLAYER_NOTIFY",
MATCHVS_SET_ROOM_PROPETY: "MATCHVS_SET_ROOM_PROPETY",
MATCHVS_SET_ROOM_PROPETY_NOTIFY: "MATCHVS_SET_ROOM_PROPETY_NOTIFY",
MATCHVS_SEND_EVENT_RSP: "MATCHVS_SEND_EVENT_RSP",
MATCHVS_SEND_EVENT_NOTIFY: "MATCHVS_SEND_EVENT_NOTIFY",
MATCHVS_FRAME_UPDATE: "MATCHVS_FRAME_UPDATE",
MATCHVS_WX_BINDING: "MATCHVS_WX_BINDING",
MATCHVS_NETWORK_STATE_NOTIFY: "MATCHVS_NETWORK_STATE_NOTIFY",
MATCHVS_SET_FRAME_SYNC_RSP: "MATCHVS_SET_FRAME_SYNC_RSP",
MATCHVS_ROOM_USERLIST_CHANGE_NOTIFY: "MATCHVS_ROOM_USERLIST_CHANGE_NOTIFY",
AGROA_JOIN_CHANNEL_SUCCESS: "join-channel-success",
AGROA_AUDIO_VOLUME_INDICATION: "audio-volume-indication",
AGROA_VOLUME_INDICATION: "volume-indicator",
AGROA_ERROR: "error",
AGROA_LEAVE_CHANNEL: "leave-channel",
AGROA_USER_JOINED: "user-joined",
AGROA_USER_OFFLINE: "user-offline",
AGROA_USER_MUTE_AUDIO: "user-mute-audio",
AGROA_CONNECTION_INTERRUPTED: "connection-interrupted",
AGROA_REQUEST_TOKEN: "request-token",
AGROA_CLIENT_ROLE_CHANGED: "client-role-changed",
AGROA_REJOIN_CHANNEL_SUCCESS: "rejoin-channel-success",
AGROA_AUDIO_QUALITY: "audio-quality",
AGROA_WARNING: "warning",
AGROA_NETWORK_QUALITY: "network-quality",
AGROA_AUDIO_ROUTING_CHANGED: "audio-routing-changed",
AGROA_CONNECTION_LOST: "connection-lost",
AGROA_CONNECTION_BANNED: "connection-banned",
AGROA_INIT_SUCCESS: "init-success",
AGROA_RECORDING_DEVICE_CHANGED: "recording-device-changed",
EVENT_GAME_START: "EVENT_GAME_START",
NEW_STAR_POSITION: "NEW_STAR_POSITION",
PLAYER_POSINTON: "PLAYER_POSINTON",
GAME_START_EVENT: "gameStart",
EVENT_NEW_START: "newStar",
PLAYER_MOVE_EVENT: "playerMove",
EVENT_GAIN_SCORE: "gainScore",
EVENT_PLAYER_POSINTON_CHANGED: "playerPosition",
GAME_RECONNECT: "Reconnect"
};
cc._RF.pop();
}, {} ],
game: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "c9916w74nxBj6rQfTRhbj4+", "game");
var n = e("util/mathUtil"), s = e("util/objectPool");
cc.Class({
extends: cc.Component,
properties: {
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
allPlay: [ cc.Prefab ],
allStar: [ cc.Prefab ],
play1Stars: [ cc.Prefab ],
playNo: 0,
gameOver: !1,
standing: cc.Node,
resultLabel: cc.Label
},
onLoad: function() {
this.enemyPool = new cc.NodePool();
this.resultLabel.string = "you lost";
this.node.getChildByName("background").on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
this.node.getChildByName("background").on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
this.node.getChildByName("background").on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
this.node.getChildByName("background").on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
this.initGame();
},
reStarGame: function() {
this.gameOver = !1;
console.log("this.allPlay.length=", this.allPlay.length);
for (var e = 0; e < this.allPlay.length; e++) {
var o = this.allPlay[e];
if (null != o && void 0 != o) {
o.getComponent("monster").removeAllStar();
s.recoveryPlay(o);
}
}
this.standing.setPosition(cc.v2(320, 2e3));
cc.director.loadScene("game");
},
start: function() {},
onDestroy: function() {},
initGame: function() {
console.log("initGame");
for (var e = 0; e < this.totalPlay; e++) {
this.allPlay[e] = this.createMonster(10 + e);
if (e == this.playNo) {
this.monster = this.allPlay[e];
this.monsterScript = this.monster.getComponent("monster");
this.monsterScript.isCurrentPlayer = !0;
this.camera.setPosition(this.monster.getPosition());
}
}
console.log(this.monster);
for (var o = 0; o < 20; o++) this.allStar[o] = this.createStar();
},
createMonster: function(e) {
var o = null;
o = s.createPlay(this.monsterPrefab);
this.node.addChild(o);
console.log(o);
o.getComponent("cc.Collider").tag = e;
o.getComponent("monster").game = this;
if (this.allPlay.length > 0) for (var t = this.getRandomPosition(0, 0, 1200, 1200), i = 0; i < this.allPlay.length; i++) for (var c = this.allPlay[i]; n.getDistance(t, c.getPosition()) < 300; ) t = this.getRandomPosition(0, 0, 1200, 1200); else o.setPosition(this.getRandomPosition(0, 300 - 600 * (e - 10), 1200, 300));
return o;
},
createStar: function() {
var e = null;
e = s.createStar(this.starPrefab);
this.node.addChild(e);
e.getComponent("cc.Collider").tag = -1;
e.getComponent("star").game = this;
e.setPosition(this.getRandomPosition(0, 0, 1200, 1200));
return e;
},
getRandomPosition: function(e, o, t, s) {
var i = Math.floor(e + (Math.random() - .5) * t), c = Math.floor(o + (Math.random() - .5) * s), r = cc.v2(i, c);
return n.getDistance(r, this.obstacle1.getPosition()) < 200 || n.getDistance(r, this.obstacle2.getPosition()) < 200 || n.getDistance(r, this.obstacle3.getPosition()) < 200 ? this.getRandomPosition(e, o, t, s) : r;
},
updataMonsterStar: function(e) {
console.log("updataMonsterStar=", e);
this.allPlay[e].getComponent("monster").reArrangeStar();
},
touchStart: function(e) {
console.log("点击了");
this.controlOrignPosX = e.getLocationX();
this.controlOrignPosY = e.getLocationY();
},
touchMove: function(e) {
if (null != this.monster || void 0 != this.monster) if (this.gameOver) this.monsterScript.move(0, 0); else {
this.moveSpeedX = (e.getLocationX() - this.controlOrignPosX) / 10;
this.moveSpeedX > this.fastSpeed ? this.moveSpeedX = this.fastSpeed : this.moveSpeedX < -1 * this.fastSpeed && (this.moveSpeedX = -1 * this.fastSpeed);
this.moveSpeedY = (e.getLocationY() - this.controlOrignPosY) / 10;
this.moveSpeedY > this.fastSpeed ? this.moveSpeedY = this.fastSpeed : this.moveSpeedY < -1 * this.fastSpeed && (this.moveSpeedY = -1 * this.fastSpeed);
this.monsterScript.move(this.moveSpeedX, this.moveSpeedY);
}
},
touchEnd: function(e) {
if (null != this.monster || void 0 != this.monster) {
this.moveSpeedX = 0;
this.moveSpeedY = 0;
this.monsterScript.move(this.moveSpeedX, this.moveSpeedY);
}
},
addStarToMonster: function(e, o) {
this.monster.getComponent("monster").addStar(e);
},
update: function(e) {
null == this.monster && void 0 == this.monster || this.camera.setPosition(this.monster.getPosition());
},
finishPlay: function(e) {
console.log("tag=", e);
if (!this.gameOver) {
for (var o = 0; o < this.allStar.length; o++) s.recoveryStar(this.allStar[o]);
var t = this;
this.gameOver = !0;
this.scheduleOnce(function() {
console.log("objectPool.playPool =", s.playPool.size());
console.log("tag =" + e + "_self.playNo=" + t.playNo);
if (2 == s.playPool.size()) {
console.log("a standoff");
t.resultLabel.string = "a standoff";
} else if (e == t.playNo + 10) {
console.log("you lost");
t.resultLabel.string = "you lost";
} else {
console.log("you win");
t.resultLabel.string = "you win";
}
var o = cc.moveTo(.5, t.camera.convertToWorldSpaceAR(cc.v2(0, 0)));
t.standing.runAction(o);
}, 1);
}
}
});
cc._RF.pop();
}, {
"util/mathUtil": void 0,
"util/objectPool": void 0
} ],
ground: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "2f5c1LAzgNPHY8Z+XuQJQYl", "ground");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {},
onCollisionEnter: function(e, o) {},
onCollisionStay: function(e, o) {},
onCollisionExit: function(e, o) {}
});
cc._RF.pop();
}, {} ],
loudly: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "6f2f621FMRGe5mBIMgxYumI", "loudly");
var n = e("SDKLib/SDKMessage");
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
isColliding: !1
},
onKeyUp: function(e) {
console.log("onKeyDown:", e);
var o = 0, t = 0;
switch (e.keyCode) {
case cc.macro.KEY.a:
o += 5;
t += 1;
break;

case cc.macro.KEY.s:
o += 3;
t += 1;
break;

case cc.macro.KEY.j:
t += 5;
o += 1;
break;

case cc.macro.KEY.k:
t += 3;
o += 1;
}
if (this.isColliding) {
this.localVolume(o - t);
this.remoteVolume(t - o);
} else {
this.localVolume(o);
this.remoteVolume(t);
}
},
onLoad: function() {
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
this.initEvent();
this.initSDK();
},
initEvent: function() {
cc.systemEvent.on(n.AGROA_JOIN_CHANNEL_SUCCESS, this.onEvent, this);
cc.systemEvent.on(n.AGROA_INIT_SUCCESS, this.onEvent, this);
cc.systemEvent.on(n.AGROA_AUDIO_VOLUME_INDICATION, this.onEvent, this);
},
removeEvent: function() {
cc.systemEvent.off(n.AGROA_JOIN_CHANNEL_SUCCESS, this.onEvent, this);
cc.systemEvent.off(n.AGROA_INIT_SUCCESS, this.onEvent, this);
cc.systemEvent.off(n.AGROA_AUDIO_VOLUME_INDICATION, this.onEvent, this);
},
onEvent: function(e) {
var o = e.data;
switch (e.type) {
case n.AGROA_INIT_SUCCESS:
console.log("init success version:" + agora.getVersion());
this.startPlay();
break;

case n.AGROA_JOIN_CHANNEL_SUCCESS:
console.log("event_JOIN_CHANNEL_SUCCESS_channel: " + o.channel + " uid: " + o.uid + " elapsed: " + o.elapsed);
this.logstr.string = "channel: " + o.channel + " uid: " + o.uid;
this.localUid = o.uid;
this.allUser.push(o.uid);
this.isColliding = !1;
break;

case n.AGROA_AUDIO_VOLUME_INDICATION:
var t = o.speakers, s = 100 * agora.stream.getAudioLevel(), i = 0;
o.speakerNumber > 0 && (i = t[0].volume);
console.log("v2A = " + s + "  v2B = " + i);
if (this.isColliding) {
this.localVolume(s - i);
this.remoteVolume(i - s);
} else {
this.localVolume(s);
this.remoteVolume(i);
}
break;

case n.AGROA_USER_JOINED:
this.allUser.push(o.uid);
break;

case n.AGROA_USER_OFFLINE:
(c = this.allUser.indexOf(o.uid)) >= 0 && this.allUser.splice(c, 1);
break;

case n.AGROA_LEAVE_CHANNEL:
var c = this.allUser.indexOf(o.uid);
this.allUser.splice(c, 1);

default:
console.log(e.type, e);
}
},
muteAllRemoteAudio: function() {
var e = this.mutebutton.node.getChildByName("Label").getComponent(cc.Label), o = "静音" == e.string;
e.string = o ? "播音" : "静音";
agora.muteAllRemoteAudioStreams(!o);
},
muteLocalAudio: function() {
var e = this.micButton.node.getChildByName("Label").getComponent(cc.Label), o = "关麦" == e.string;
e.string = o ? "开麦" : "关麦";
agora.muteLocalAudioStream(!o);
},
localVolume: function(e) {
console.log("localVolume = " + e);
var o = cc.moveBy(.2, cc.v2(5 * e, 0));
this.monsterA.runAction(o);
},
remoteVolume: function(e, o) {
console.log("remoteVolume = " + e);
var t = cc.moveBy(.2, cc.v2(-5 * e, 0));
this.monsterB.runAction(t);
},
startPlay: function() {
console.log("startPlay");
agora.setChannelProfile(0);
agora.enableAudioVolumeIndication(50, 3);
agora.joinChannel("", "acgzq1");
},
initSDK: function() {
console.log("调用初始化");
response.prototype.bind();
agora.init("59dd6d4438a54c36b9ed7425795f3374");
},
leaveRoom: function() {
agora.leaveChannel();
},
joinOverResponse: function(e) {
console.log("加入房间结果：", e.status);
console.log("负载信息：", e.cpProto);
console.log("加入房间结果：" + e.status + "\n负载信息：" + e.cpProto);
},
start: function() {},
onDestroy: function() {
this.removeEvent();
console.log("main 页面销毁");
},
update: function(e) {
Math.abs(this.monsterA.x - this.monsterB.x) <= 78 ? this.isColliding = !0 : this.isColliding = !1;
}
});
cc._RF.pop();
}, {
"SDKLib/SDKMessage": void 0
} ],
main: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "1ce3eLFzi5MAqmCMlc+02E7", "main");
var n = e("Glb"), s = e("SDKLib/SDKMessage"), i = e("SDKLib/MatchvsDemoEngine");
cc.Class({
extends: cc.Component,
properties: {
play: cc.Button,
back: cc.Button,
slider: cc.Slider,
gameID: 215225,
volumePower: 0,
ClientRole: 0,
talkMode: !1,
isInit: !1,
mvUserID: null,
mvToken: null
},
onLoad: function() {},
initEvent: function() {
cc.systemEvent.on(s.MATCHVS_INIT, this.onEvent, this);
cc.systemEvent.on(s.MATCHVS_RE_CONNECT, this.onEvent, this);
cc.systemEvent.on(s.MATCHVS_ERROE_MSG, this.onEvent, this);
cc.systemEvent.on(s.MATCHVS_REGISTER_USER, this.onEvent, this);
cc.systemEvent.on(s.MATCHVS_LOGIN, this.onEvent, this);
cc.systemEvent.on(s.MATCHVS_WX_BINDING, this.onEvent, this);
cc.systemEvent.on(s.MATCHVS_JOIN_ROOM_NOTIFY, this.onEvent, this);
cc.systemEvent.on(s.MATCHVS_JOIN_ROOM_RSP, this.onEvent, this);
cc.systemEvent.on(s.MATCHVS_CREATE_ROOM, this.onEvent, this);
cc.systemEvent.on(s.MATCHVS_LEAVE_ROOM, this.onEvent, this);
cc.systemEvent.on(s.MATCHVS_LEAVE_ROOM_NOTIFY, this.onEvent, this);
cc.systemEvent.on(s.AGROA_JOIN_CHANNEL_SUCCESS, this.onEvent, this);
cc.systemEvent.on(s.AGROA_INIT_SUCCESS, this.onEvent, this);
cc.systemEvent.on(s.AGROA_AUDIO_VOLUME_INDICATION, this.onEvent, this);
cc.systemEvent.on(s.AGROA_USER_JOINED, this.onEvent, this);
cc.systemEvent.on(s.AGROA_USER_OFFLINE, this.onEvent, this);
cc.systemEvent.on(s.AGROA_ERROR, this.onEvent, this);
},
removeEvent: function() {
cc.systemEvent.off(s.MATCHVS_INIT, this.onEvent, this);
cc.systemEvent.off(s.MATCHVS_RE_CONNECT, this.onEvent, this);
cc.systemEvent.off(s.MATCHVS_ERROE_MSG, this.onEvent, this);
cc.systemEvent.off(s.MATCHVS_REGISTER_USER, this.onEvent, this);
cc.systemEvent.off(s.MATCHVS_LOGIN, this.onEvent, this);
cc.systemEvent.off(s.MATCHVS_WX_BINDING, this.onEvent, this);
cc.systemEvent.off(s.MATCHVS_JOIN_ROOM_NOTIFY, this.onEvent, this);
cc.systemEvent.off(s.MATCHVS_JOIN_ROOM_RSP, this.onEvent, this);
cc.systemEvent.off(s.MATCHVS_CREATE_ROOM, this.onEvent, this);
cc.systemEvent.off(s.MATCHVS_LEAVE_ROOM, this.onEvent, this);
cc.systemEvent.off(s.MATCHVS_LEAVE_ROOM_NOTIFY, this.onEvent, this);
cc.systemEvent.off(s.AGROA_JOIN_CHANNEL_SUCCESS, this.onEvent, this);
cc.systemEvent.off(s.AGROA_INIT_SUCCESS, this.onEvent, this);
cc.systemEvent.off(s.AGROA_AUDIO_VOLUME_INDICATION, this.onEvent, this);
cc.systemEvent.off(s.AGROA_USER_JOINED, this.onEvent, this);
cc.systemEvent.off(s.AGROA_USER_OFFLINE, this.onEvent, this);
cc.systemEvent.off(s.AGROA_ERROR, this.onEvent, this);
},
onEvent: function(e) {
var o = e.data;
switch (e.type) {
case s.MATCHVS_INIT:
console.log("初始化成功");
break;

case s.MATCHVS_REGISTER_USER:
this.mvUserID = o.userInfo.id;
this.mvToken = o.userInfo.token;
this.login();
break;

case s.MATCHVS_LOGIN:
if (null != o.MsLoginRsp.roomID && "0" !== o.MsLoginRsp.roomID) {
i.prototype.joinRandomRoom(2, this.mvUserID);
console.log("开始重连" + o.MsLoginRsp.roomID);
i.prototype.reconnect();
} else {
console.log("恭喜你登录成功，来到Matchvs的世界，你已经成功的迈出了第一步，Hello World");
i.prototype.joinRandomRoom(2, this.mvUserID);
}
break;

case s.MATCHVS_JOIN_ROOM_RSP:
console.log("加入房间结果：", o);
console.log("房间ID为:", o.userInfoList.roomID);
n.roomID = o.userInfoList.roomID;
if (0 == o.userInfoList.length) {
n.isRoomOwner = !0;
console.log("joinRoomResponse：房间暂时无其他玩家");
} else {
for (var t = 0; t < o.userInfoList.length; t++) console.log("joinRoomResponse：房间的玩家ID有" + o.userInfoList[t].userID);
cc.director.loadScene("game");
}
break;

case s.MATCHVS_JOIN_ROOM_NOTIFY:
console.log("joinRoomNotify" + o);
cc.director.loadScene("game");
break;

case s.MATCHVS_CREATE_ROOM:
console.log("创建指定类型房间回调" + o.CreateRoomRsp.status);
break;

case s.MATCHVS_RE_CONNECT:
n.roomID = o.userInfoList.roomID;
o.userInfoList.owner === n.userID ? n.isRoomOwner = !0 : n.isRoomOwner = !1;
1 === o.userInfoList.state ? "" === o.userInfoList.roomProperty && i.prototype.leaveRoom() : cc.director.loadScene("Game");
break;

case s.MATCHVS_LEAVE_ROOM_NOTIFY:
case s.MATCHVS_LEAVE_ROOM:
console.log("leave_msg", o);
break;

case s.MATCHVS_ERROE_MSG:
console.log("[Err]errCode:" + o.errorCode + " errMsg:" + o.errorMsg);
break;

case s.AGROA_JOIN_CHANNEL_SUCCESS:
console.log("event_JOIN_CHANNEL_SUCCESS_channel: " + o.channel + " uid: " + o.uid + " elapsed: " + o.elapsed);
this.talkMode && agora.muteLocalAudioStream(!1);
if (this.ClientRole > 0) {
console.log("ClientRole " + this.ClientRole);
agora.setClientRole(this.ClientRole);
}
break;

case s.AGROA_INIT_SUCCESS:
console.log("init success SDKversion:" + agora.getVersion());
break;

default:
console.log(e.type, e);
}
},
startPlay: function() {
console.log("startPlay");
cc.director.loadScene("game");
},
initSDK: function() {
console.log("调用初始化");
},
leaveRoom: function() {
console.log("不玩了");
},
joinOverResponse: function(e) {
console.log("加入房间结果：", e.status);
console.log("负载信息：", e.cpProto);
console.log("加入房间结果：" + e.status + "\n负载信息：" + e.cpProto);
},
start: function() {},
onDestroy: function() {
this.removeEvent();
console.log("main 页面销毁");
},
update: function(e) {}
});
cc._RF.pop();
}, {
Glb: "Glb",
"SDKLib/MatchvsDemoEngine": void 0,
"SDKLib/SDKMessage": void 0
} ],
mask: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "d25427bzNlJzaUM+CpcAW9f", "mask");
cc.Class({
extends: cc.Component,
properties: {
resultLabel: cc.Label,
mask: cc.Mask,
promptLabel: cc.Label
},
onLoad: function() {
console.log("onLoad");
this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
console.log(e);
}, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
},
onDestroy: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
},
_onTouchBegin: function(e) {
cc.log("touchBegin");
var o = e.touch.getLocation();
console.log(e);
console.log(o);
o = this.node.convertToNodeSpaceAR(o);
this._addCircle(o);
},
_onTouchMoved: function(e) {
var o = e.touch.getLocation();
o = this.node.convertToNodeSpaceAR(o);
this._addCircle(o);
},
_onTouchEnd: function(e) {
var o = e.touch.getLocation();
o = this.node.convertToNodeSpaceAR(o);
this._addCircle(o);
},
_onTouchCancel: function(e) {},
_addCircle: function(e) {
var o = this.mask._graphics;
o.circle(e.x, e.y, 32);
o.fill();
},
start: function() {}
});
cc._RF.pop();
}, {} ],
mathUtil: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "62ac5nHGU9Cv4TTBNHVKXwP", "mathUtil");
function n() {}
n.getAngle = function(e, o) {
var t = e.y - o.y, n = e.x - o.x, s = Math.abs(t / n), i = 180 * Math.atan(s) / Math.PI;
t > 0 && n < 0 ? i = 360 - 180 * Math.atan(s) / Math.PI : t > 0 && n > 0 ? i = 180 + 180 * Math.atan(s) / Math.PI : t < 0 && n < 0 ? i = 180 * Math.atan(s) / Math.PI : t < 0 && n > 0 && (i = 180 - 180 * Math.atan(s) / Math.PI);
return i;
};
n.turnByAngle = function(e, o, t, n, s) {
0 == n && (n = Math.sqrt(Math.pow(e.x - o.x, 2) + Math.pow(e.y - o.y, 2)));
var i = Math.atan2(o.y - e.y, o.x - e.x) * (180 / Math.PI);
i < 0 && (i = 360 + i);
t = i + t;
var c = Math.cos(t * Math.PI / 180) * n, r = Math.sin(t * Math.PI / 180) * n;
console.log(c + "," + r);
if (s) {
c += o.x;
r += o.y;
}
return cc.v2(c, r);
};
n.getDistance = function(e, o) {
return Math.sqrt(Math.pow(e.x - o.x, 2) + Math.pow(e.y - o.y, 2));
};
o.exports = n;
cc._RF.pop();
}, {} ],
monster: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "3162bdHhQJA9YTYc0BKHZMl", "monster");
var n = e("util/objectPool"), s = e("util/mathUtil");
cc.Class({
extends: cc.Component,
properties: {
starSprite: cc.Node,
starPrefab: {
default: null,
type: cc.Prefab
},
monsterSprite: cc.Node,
radius: 150,
kai: 0,
playId: 0,
initialStarNo: 0,
totalStar: 0,
moveSpeedX: 0,
moveSpeedY: 0,
moveLeft: !0,
moveBottom: !0,
moveRight: !0,
moveTop: !0,
gameOver: !1
},
onKeyDown: function(e) {
console.log("onKeyDown:", e);
switch (e.keyCode) {
case cc.macro.KEY.a:
case cc.macro.KEY.d:
case cc.macro.KEY.g:
break;

case cc.macro.KEY.h:
console.log("this.node..Collider=", this.node.getComponent("cc.Collider").tag);
break;

case cc.macro.KEY.j:
n.starPool.put(this.starSprite.children[0]);
break;

case cc.macro.KEY.k:
this.node.runAction(cc.moveBy(.5, cc.v2(15, 0)));
break;

case cc.macro.KEY.l:
this.node.runAction(cc.moveBy(.5, cc.v2(-15, 15)));
}
},
onKeyUp: function(e) {
console.log("onKeyUp:", e);
switch (e.keyCode) {
case cc.macro.KEY.a:
this.spawnNewStar(1);
break;

case cc.macro.KEY.r:
this.removeAllStar();
break;

case cc.macro.KEY.b:
var o = this.monsterSprite.getComponent(cc.Animation);
console.log("cc.macro.KEY.b:", o);
o.gameOver = function(e) {
console.log("gameOver", e);
o.active = !1;
};
o.play("boom");
}
},
minusStar: function() {},
spawnNewStar: function(e) {
console.log("monster" + this.node.getComponent("cc.Collider").tag + " spawnNewStar:", e);
var o = 0;
e > 0 && (o = 360 / e);
for (var t = 0; t < e; t++) {
var s = this.radius * Math.cos(o * t * Math.PI / 180), i = this.radius * Math.sin(o * t * Math.PI / 180), c = n.createStar(this.starPrefab);
console.log(" this.starSprite:", this.starSprite);
this.starSprite.addChild(c);
c.getComponent("cc.Collider").tag = this.node.getComponent("cc.Collider").tag - 10;
console.log(" newStar.getComponent('cc.Collider').tag=", c.getComponent("cc.Collider").tag);
c.setPosition(cc.v2(s, i));
c.getComponent("star").monster = this;
c.getComponent("star").game = this.game;
}
},
reArrangeStar: function() {
var e = this.starSprite.children.length;
this.totalStar = e;
var o = 0;
e > 0 && (o = 360 / e);
for (var t = 0; t < e; t++) {
var n = this.radius * Math.cos(o * t * Math.PI / 180), s = this.radius * Math.sin(o * t * Math.PI / 180), i = this.starSprite.children[t];
i.getComponent("cc.Collider").tag = this.node.getComponent("cc.Collider").tag - 10;
i.getComponent("star").angle = o * t;
var c = cc.moveTo(.5, cc.v2(n, s));
i.runAction(c);
}
},
getNewStarPosition: function() {
return cc.v2(150, 0);
},
removeAllStar: function() {
for (var e = this.starSprite.children.length, o = 0; o < e; o++) {
console.log("removeStar:", o);
n.starPool.put(this.starSprite.children[o]);
}
},
onLoad: function() {
cc.director.getCollisionManager().enabled = !0;
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
this.schedule(function() {
this.reArrangeStar();
}, .5);
},
runRoundCallback: function() {
this.kai += 1;
},
start: function() {},
onEnable: function() {
console.log("onEnable");
this.gameOver = !1;
this.spawnNewStar(this.initialStarNo);
var e = cc.rotateBy(3, 360), o = cc.callFunc(this.runRoundCallback, this), t = cc.sequence(e, o);
this.starSprite.runAction(cc.repeat(t, 999));
},
onCollisionEnter: function(e, o) {
console.log("on collision enter");
console.log("self=", o);
console.log("other=", e);
if (o.tag - 10 != e.tag && !this.gameOver) if (20 == e.tag) {
var t = s.getAngle(e.node.getPosition(), o.node.getPosition());
console.log("angle=" + t);
t >= 45 && t < 135 ? this.moveBottom = !1 : t >= 135 && t < 225 ? this.moveRight = !1 : t >= 225 && t < 315 ? this.moveTop = !1 : this.moveLeft = !1;
} else if (e.tag < 10 && e.tag >= 0) {
this.removeAllStar();
this.gameOver = !0;
this.game.finishPlay(o.tag);
o = this;
var i = this.monsterSprite.getComponent(cc.Animation);
console.log("cc.macro.KEY.b:", i);
i.gameOver = function(e) {
console.log("gameOver", e);
i.active = !1;
n.recoveryPlay(o.node);
};
i.play("boom");
}
},
onCollisionStay: function(e, o) {
if (20 == e.tag) {
var t = s.getAngle(e.node.getPosition(), o.node.getPosition());
t >= 45 && t < 135 ? this.moveBottom = !1 : t >= 135 && t < 225 ? this.moveRight = !1 : t >= 225 && t < 315 ? this.moveTop = !1 : this.moveLeft = !1;
}
},
onCollisionExit: function(e, o) {
console.log("on collision exit");
this.moveLeft = !0;
this.moveBottom = !0;
this.moveRight = !0;
this.moveTop = !0;
},
move: function(e, o) {
this.moveSpeedX = e;
this.moveSpeedY = o;
},
update: function(e) {
if (this.isCurrentPlayer) {
(this.moveSpeedX > 0 && !this.moveRight || this.moveSpeedX < 0 && !this.moveLeft) && (this.moveSpeedX = 0);
(this.moveSpeedY > 0 && !this.moveTop || this.moveSpeedY < 0 && !this.moveBottom) && (this.moveSpeedY = 0);
var o = this.node.x + this.moveSpeedX, t = this.node.y + this.moveSpeedY;
(o > 640 || o < -640) && (o = this.node.x);
(t > 640 || t < -640) && (t = this.node.y);
this.node.setPosition(new cc.v2(o, t));
}
}
});
cc._RF.pop();
}, {
"util/mathUtil": void 0,
"util/objectPool": void 0
} ],
objectPool: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "729b2YgikdBcrXE9myHK5eg", "objectPool");
var n = void 0, s = void 0;
try {
n = new cc.NodePool();
s = new cc.NodePool();
} catch (e) {
console.warn("fail" + e.message);
}
o.exports = {
starPool: n,
playPool: s,
recoveryStar: function(e) {
console.log(e.getComponent("cc.Collider").tag);
e.getComponent("cc.Collider").tag = -1;
this.starPool.put(e);
},
recoveryPlay: function(e) {
this.playPool.put(e);
},
createStar: function(e) {
return n.size() > 0 ? n.get() : cc.instantiate(e);
},
createPlay: function(e) {
return s.size() > 0 ? s.get() : cc.instantiate(e);
}
};
cc._RF.pop();
}, {} ],
star: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "774aaG5x6VCs4yxV/ZjK+f9", "star");
var n = e("util/objectPool"), s = e("util/mathUtil");
cc.Class({
extends: cc.Component,
properties: {
speed: 1,
angle: 0,
trackRadius: 0,
game: null,
isActionOver: !0,
canvas: cc.Node
},
onLoad: function() {
console.log("onLoad");
var e = this;
cc.director.getCollisionManager().enabled = !0;
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function(o) {
o.keyCode == cc.macro.KEY.w && e.startRun();
}, this);
},
Contraction: function(e) {
var o = (this.trackRadius - e) * Math.cos(this.angle * Math.PI / 180), t = (this.trackRadius - e) * Math.sin(this.angle * Math.PI / 180), n = cc.moveTo(.3, cc.v2(o, t)), s = cc.moveTo(.3, cc.v2(this.node.x, this.node.y));
console.log("this.trackRadius =" + this.trackRadius + "_" + o + "," + t);
var i = cc.sequence(n, s);
this.node.runAction(i);
},
start: function() {
console.log("start");
},
onEnable: function() {
console.log("onEnable");
this.canvas = cc.find("Canvas");
},
update: function(e) {},
onCollisionEnter: function(e, o) {
var t = this, i = new Date().getTime();
console.log("on collision enter");
console.log("selfTag=" + o.tag, "otherTag=" + e.tag);
console.log(o.tag + "parent", this.node.parent);
if (o.tag != e.tag && o.tag + 10 != e.tag && -2 != e.tag) if (-2 == o.tag) {
if (20 == e.tag || 22 == e.tag) {
this.node.stopAllActions();
o.tag;
}
} else if (-1 == o.tag) if (-1 == e.tag) ; else if (e.tag < 10) {
o.tag = e.tag;
console.log("无主的星星撞到玩家的星星");
this.node.parent = e.node.parent;
this.node.setPosition(cc.v2(0, 0));
} else if (20 == e.tag) {
console.log("starPool.put");
n.starPool.put(this.node);
} else if (22 == e.tag) ; else {
o.tag = e.tag - 10;
var c = this.node.convertToWorldSpaceAR(cc.v2(0, 0)), r = e.node.getChildByName("StarSprite"), a = r.convertToNodeSpaceAR(c);
this.node.parent = r;
this.node.setPosition(a);
console.log("无主的星星撞到玩家");
} else {
console.log("玩家的星星");
if (-1 == e.tag) ; else if (e.tag < 10) {
console.log("玩家的星星碰到对方玩家的星星", o.tag);
var l = e.node.convertToWorldSpaceAR(cc.v2(0, 0)), p = this.node.convertToWorldSpaceAR(cc.v2(0, 0)), h = this.canvas.convertToNodeSpaceAR(p);
this.node.parent = this.canvas;
this.node.setPosition(h);
var _ = s.turnByAngle(l, p, 90, 270, !1), u = cc.moveBy(.3, _);
this.scheduleOnce(function() {
o.tag = -2;
}, .1);
this.scheduleOnce(function() {
o.tag = -1;
}, .5);
this.runAction(u);
} else if (20 == e.tag) {
var E = e.node.convertToWorldSpaceAR(cc.v2(0, 0)), g = this.node.convertToWorldSpaceAR(cc.v2(0, 0)), m = s.turnByAngle(E, g, 90, 270, !1), v = this.canvas.convertToNodeSpaceAR(g);
console.log("玩家的星星撞到障碍物", "starTag =" + o.tag + " psoi1" + v);
console.log("玩家的星星从障碍物反弹到", "starTag =" + o.tag + " psoi2" + m);
this.node.parent = this.canvas;
this.node.setPosition(v);
u = cc.moveBy(.3, m);
o.tag = -2;
var R = cc.callFunc(function() {
console.log("动作结束", t);
o.tag = -1;
}, this, 0), d = cc.sequence(u, R);
this.runAction(d);
} else 22 == e.tag || console.log("星星撞到玩家");
}
console.log("on collision enter time", i - new Date().getTime());
},
onCollisionStay: function(e, o) {},
onCollisionExit: function(e, o) {
console.log("on collision exit");
o.tag != e.tag && o.tag + 10 != e.tag && -2 != e.tag && (-2 == o.tag ? 20 == e.tag || e.tag : -1 == o.tag ? -1 == e.tag || e.tag < 10 || 20 == e.tag || e.tag : -1 == e.tag || (e.tag < 10 ? o.tag = -2 : 20 == e.tag || e.tag));
},
runAction: function(e) {
this.node.stopAllActions();
this.node.runAction(e);
}
});
cc._RF.pop();
}, {
"util/mathUtil": void 0,
"util/objectPool": void 0
} ],
userInfo: [ function(e, o, t) {
"use strict";
cc._RF.push(o, "16614OWkm5KN5OjBToy5/d4", "userInfo");
o.exports = {
userid: null,
roomid: null,
isOwner: !1,
load: function() {}
};
cc._RF.pop();
}, {} ]
}, {}, [ "Glb", "Matchvs", "MatchvsDemoEngine", "MatchvsDemoResponse", "SDKMessage", "game", "ground", "loudly", "main", "mask", "monster", "star", "userInfo", "mathUtil", "objectPool" ]);