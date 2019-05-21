window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7b935WtCR5COrM7YGk1KhlU", "AI");
    "use strict";
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
      setMap: function setMap(game) {
        this.GameWorld = game;
        this.obstacle1 = game.getComponent("game").obstacle1;
        this.obstacle2 = game.getComponent("game").obstacle2;
        this.obstacle3 = game.getComponent("game").obstacle3;
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
        this.callback = function() {
          if (!this.ControlOn || this.GameWorld.gameOver) this.unschedule(this.callback); else {
            if (550 > mathUtil.getDistance(this.SelfMonster.node.getPosition(), this.Enemy.getPosition())) if (this.SelfMonster.starSprite.children.length - 3 > this.Enemy.children[0].children.length) var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(), this.Enemy.getPosition(), 0, 2.8, false); else {
              var posi = this.SelfMonster.node.getPosition();
              var angle = 180;
              (posi.x > 590 || posi.x <= -590 || posi.y < -590 || posi.y > 590) && (mathUtil.getAngle(this.GameWorld.node.getPosition(), posi) < mathUtil.getAngle(this.GameWorld.node.getPosition(), this.Enemy.getPosition()) ? angle += 90 : angle -= 90);
              var newVer2 = mathUtil.turnByAngle(posi, this.Enemy.getPosition(), angle, 2.8, false);
            } else {
              var nearStar;
              var dis = 5e3;
              console.log(this.bg.children.length);
              var _posi = this.SelfMonster.node.getPosition();
              for (var i = 0; i < this.bg.children.length; i++) {
                var star = this.bg.children[i];
                var dis2 = mathUtil.getDistance(_posi, star.getPosition());
                if (dis2 < dis) {
                  dis = dis2;
                  nearStar = star;
                }
              }
              if (mathUtil.getDistance(_posi, this.obstacle1.getPosition()) < 200) var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(), this.obstacle1.getPosition(), 90, 2, false); else if (mathUtil.getDistance(_posi, this.obstacle2.getPosition()) < 200) var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(), this.obstacle2.getPosition(), 90, 2, false); else if (mathUtil.getDistance(_posi, this.obstacle3.getPosition()) < 200) var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(), this.obstacle3.getPosition(), 90, 2, false); else var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(), nearStar.getPosition(), 0, 2, false);
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
    });
    cc._RF.pop();
  }, {
    mathUtil: "mathUtil"
  } ],
  Glb: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "428f3elclpCmoTJ44iHyjQ5", "Glb");
    "use strict";
    var obj = {
      RANDOM_MATCH: 1,
      PROPERTY_MATCH: 2,
      MAX_PLAYER_COUNT: 3,
      channel: "Matchvs",
      platform: "alpha",
      gameID: 215225,
      gameVersion: 1,
      appKey: "4e062ee45b8743aeaa34d51c3c49dd64#C",
      isWX: false,
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
      ownew: 0,
      mapType: "",
      FPS: 30
    };
    module.exports = obj;
    cc._RF.pop();
  }, {} ],
  game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c9916w74nxBj6rQfTRhbj4+", "game");
    "use strict";
    var mathUtil = require("mathUtil");
    var objectPool = require("objectPool");
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
        allPlay: [ cc.Prefab ],
        allStar: [ cc.Prefab ],
        play1Stars: [ cc.Prefab ],
        playNo: 0,
        gameOver: false,
        standing: cc.Node,
        resultLabel: cc.Label
      },
      onLoad: function onLoad() {
        console.log("game onLoad");
        this.resultLabel.string = "you lost";
        this.node.getChildByName("background").on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.getChildByName("background").on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.getChildByName("background").on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.getChildByName("background").on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        this.initGame();
      },
      reStarGame: function reStarGame() {
        this.gameOver = false;
        console.log("this.allPlay.length=", this.allPlay.length);
        for (var i = 0; i < this.allPlay.length; i++) {
          var monster = this.allPlay[i];
          null == monster || void 0 == monster || monster.isValid || monster.destroy();
        }
        this.standing.setPosition(cc.v2(320, 2e3));
        cc.director.loadScene("game");
      },
      start: function start() {
        var self = this;
        this.schedule(function() {
          var bg = self.node.children[0];
          for (var i = 0; i < bg.children.length; i++) {
            var star = bg.children[i];
            star.getComponent("cc.Collider").tag = -1;
          }
        }, 5);
      },
      onDestroy: function onDestroy() {},
      initGame: function initGame() {
        console.log("initGame");
        for (var i = 0; i < this.totalPlay; i++) {
          this.allPlay[i] = this.createMonster(10 + i);
          if (i == this.playNo) {
            this.monster = this.allPlay[i];
            this.monsterScript = this.monster.getComponent("monster");
            this.monsterScript.isCurrentPlayer = true;
            this.camera.setPosition(this.monster.getPosition());
          } else this.allPlay[i].getComponent("monster").AiOn();
        }
        for (var ii = 0; ii < 24; ii++) this.allStar[ii] = this.createStar();
      },
      createMonster: function createMonster(tag) {
        var monster = null;
        monster = objectPool.createPlay(this.monsterPrefab);
        this.node.addChild(monster);
        monster.getComponent("cc.Collider").tag = tag;
        monster.getComponent("monster").game = this;
        if (this.allPlay.length > 0) {
          var pos = this.getRandomPosition(0, 0, 1200, 1200);
          for (var i = 0; i < this.allPlay.length; i++) {
            var play = this.allPlay[i];
            while (mathUtil.getDistance(pos, play.getPosition()) < 300) pos = this.getRandomPosition(0, 0, 1200, 1200);
          }
        } else monster.setPosition(this.getRandomPosition(0, 300 - 600 * (tag - 10), 1200, 300));
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
        star.getComponent("cc.Collider").tag = -1;
        star.getComponent("star").game = this;
        star.setPosition(this.getRandomPosition(0, 0, 1200, 1200));
        return star;
      },
      getRandomPosition: function getRandomPosition(x, y, w, h) {
        var positionX = Math.floor(x + (Math.random() - .5) * w);
        var positionY = Math.floor(y + (Math.random() - .5) * h);
        var newV2 = cc.v2(positionX, positionY);
        return mathUtil.getDistance(newV2, this.obstacle1.getPosition()) < 200 || mathUtil.getDistance(newV2, this.obstacle2.getPosition()) < 200 || mathUtil.getDistance(newV2, this.obstacle3.getPosition()) < 200 ? this.getRandomPosition(x, y, w, h) : newV2;
      },
      updataMonsterStar: function updataMonsterStar(tag) {
        console.log("updataMonsterStar=", tag);
        this.allPlay[tag].getComponent("monster").reArrangeStar();
      },
      touchStart: function touchStart(event) {
        console.log("\u70b9\u51fb\u4e86");
        this.controlOrignPosX = event.getLocationX();
        this.controlOrignPosY = event.getLocationY();
      },
      touchMove: function touchMove(event) {
        if (null != this.monster || void 0 != this.monster) if (this.gameOver) this.monsterScript.move(0, 0); else {
          this.moveSpeedX = (event.getLocationX() - this.controlOrignPosX) / 10;
          this.moveSpeedX > this.fastSpeed ? this.moveSpeedX = this.fastSpeed : this.moveSpeedX < -1 * this.fastSpeed && (this.moveSpeedX = -1 * this.fastSpeed);
          this.moveSpeedY = (event.getLocationY() - this.controlOrignPosY) / 10;
          this.moveSpeedY > this.fastSpeed ? this.moveSpeedY = this.fastSpeed : this.moveSpeedY < -1 * this.fastSpeed && (this.moveSpeedY = -1 * this.fastSpeed);
          this.monsterScript.move(this.moveSpeedX, this.moveSpeedY);
        }
      },
      touchEnd: function touchEnd(event) {
        if (null != this.monster || void 0 != this.monster) {
          this.moveSpeedX = 0;
          this.moveSpeedY = 0;
          this.monsterScript.move(this.moveSpeedX, this.moveSpeedY);
        }
      },
      addStarToMonster: function addStarToMonster(node, tag) {
        this.monster.getComponent("monster").addStar(node);
      },
      update: function update(dt) {
        null == this.monster && void 0 == this.monster || this.camera.setPosition(this.monster.getPosition());
      },
      finishPlay: function finishPlay(tag) {
        console.log("tag=", tag);
        this.allPlay.splice(tag - 10, 1);
        if (this.gameOver) return;
        var self = this;
        this.gameOver = true;
        this.scheduleOnce(function() {
          for (var i = 0; i < self.bg.children.length; i++) objectPool.recoveryStar(self.bg.children[i]);
          console.log("tag =" + tag + "_self.playNo=" + self.playNo);
          if (0 == self.allPlay.length) {
            console.log("a standoff");
            self.resultLabel.string = "a standoff";
          } else if (tag == self.playNo + 10) {
            console.log("you lost");
            self.resultLabel.string = "you lost";
          } else {
            console.log("you win");
            self.resultLabel.string = "you win";
          }
          var action = cc.moveTo(.5, self.camera.convertToWorldSpaceAR(cc.v2(0, 0)));
          self.standing.runAction(action);
        }, 1);
      }
    });
    cc._RF.pop();
  }, {
    mathUtil: "mathUtil",
    objectPool: "objectPool"
  } ],
  ground: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f5c1LAzgNPHY8Z+XuQJQYl", "ground");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {},
      onCollisionEnter: function onCollisionEnter(other, self) {},
      onCollisionStay: function onCollisionStay(other, self) {},
      onCollisionExit: function onCollisionExit(other, self) {}
    });
    cc._RF.pop();
  }, {} ],
  listViewUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4f6b3wsfGtKpLFS8a4C5wnT", "listViewUtil");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        scrollView: cc.ScrollView,
        Stringlabel: cc.Node,
        spacing: 0
      },
      onLoad: function onLoad() {
        this.content = this.scrollView.content;
        this.items = [];
        for (var i = 0; i < 10; i++) this.items[i] = "\u7b2c" + i + "\u9879";
      },
      start: function start() {},
      add: function add() {
        this.content.removeAllChildren(true);
        this.items.push("\u7b2c" + (this.items.length + 1) + "\u9879");
        this.content.height = this.items.length * (this.Stringlabel.height + this.spacing) + this.spacing;
        for (var i = 0; i < this.items.length; i++) {
          var label = cc.instantiate(this.Stringlabel);
          console.log(label);
          label.getComponent(cc.Label).string = this.items[i];
          this.content.addChild(label);
          label.setPosition(this.content.width / -2, -label.height * (.5 + i) - this.spacing * (i + 1));
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  main: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1ce3eLFzi5MAqmCMlc+02E7", "main");
    "use strict";
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
      onLoad: function onLoad() {},
      initEvent: function initEvent() {},
      removeEvent: function removeEvent() {},
      onEvent: function onEvent(event) {
        var eventData = event.data;
        event.type;
        console.log(event.type, event);
      },
      startPlay: function startPlay() {
        console.log("startPlay");
        cc.director.loadScene("game");
      },
      initSDK: function initSDK() {
        console.log("\u8c03\u7528\u521d\u59cb\u5316");
      },
      leaveRoom: function leaveRoom() {
        console.log("\u4e0d\u73a9\u4e86");
      },
      start: function start() {},
      onDestroy: function onDestroy() {
        this.removeEvent();
        console.log("main \u9875\u9762\u9500\u6bc1");
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {
    Glb: "Glb"
  } ],
  mask: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d25427bzNlJzaUM+CpcAW9f", "mask");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        resultLabel: cc.Label,
        mask: cc.Mask,
        promptLabel: cc.Label
      },
      onLoad: function onLoad() {
        console.log("onLoad");
        this.node.on(cc.Node.EventType.TOUCH_START, function(event) {
          console.log(event);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
      },
      onDestroy: function onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
      },
      _onTouchBegin: function _onTouchBegin(event) {
        cc.log("touchBegin");
        var point = event.touch.getLocation();
        console.log(event);
        console.log(point);
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
      },
      _onTouchMoved: function _onTouchMoved(event) {
        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
      },
      _onTouchEnd: function _onTouchEnd(event) {
        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
      },
      _onTouchCancel: function _onTouchCancel(event) {},
      _addCircle: function _addCircle(point) {
        var stencil = this.mask._graphics;
        stencil.circle(point.x, point.y, 32);
        stencil.fill();
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  mathUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "62ac5nHGU9Cv4TTBNHVKXwP", "mathUtil");
    "use strict";
    function mathUtil() {}
    mathUtil.getAngle = function(positionA, positionB) {
      var len_y = positionA.y - positionB.y;
      var len_x = positionA.x - positionB.x;
      var tan_yx = Math.abs(len_y / len_x);
      var angle = 180 * Math.atan(tan_yx) / Math.PI;
      len_y > 0 && len_x < 0 ? angle = 360 - 180 * Math.atan(tan_yx) / Math.PI : len_y > 0 && len_x > 0 ? angle = 180 + 180 * Math.atan(tan_yx) / Math.PI : len_y < 0 && len_x < 0 ? angle = 180 * Math.atan(tan_yx) / Math.PI : len_y < 0 && len_x > 0 && (angle = 180 - 180 * Math.atan(tan_yx) / Math.PI);
      return angle;
    };
    mathUtil.turnByAngle = function(p1, p2, angle, dist, flag) {
      0 == dist && (dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)));
      var angle2 = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
      angle2 < 0 && (angle2 = 360 + angle2);
      var angle = angle2 + angle;
      var p3x = Math.cos(angle * Math.PI / 180) * dist;
      var p3y = Math.sin(angle * Math.PI / 180) * dist;
      console.log(p3x + "," + p3y);
      if (flag) {
        p3x += p2.x;
        p3y += p2.y;
      }
      return cc.v2(p3x, p3y);
    };
    mathUtil.getDistance = function(p1, p2) {
      return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };
    module.exports = mathUtil;
    cc._RF.pop();
  }, {} ],
  monster: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3162bdHhQJA9YTYc0BKHZMl", "monster");
    "use strict";
    var objectPool = require("objectPool");
    var mathUtil = require("mathUtil");
    var AI = require("AI");
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
        moveLeft: true,
        moveBottom: true,
        moveRight: true,
        moveTop: true,
        gameOver: false
      },
      onKeyDown: function onKeyDown(event) {
        console.log("onKeyDown:", event);
        switch (event.keyCode) {
         case cc.macro.KEY.a:
         case cc.macro.KEY.d:
         case cc.macro.KEY.g:
          break;

         case cc.macro.KEY.h:
          console.log("this.node..Collider=", this.node.getComponent("cc.Collider").tag);
          for (var i = 0; i < this.starSprite.children.length; i++) console.log("star.tag=" + this.starSprite.children[i].getComponent("cc.Collider").tag);
          break;

         case cc.macro.KEY.j:
          objectPool.starPool.put(this.starSprite.children[0]);
          break;

         case cc.macro.KEY.k:
          this.node.runAction(cc.moveBy(.5, cc.v2(15, 0)));
          break;

         case cc.macro.KEY.l:
          this.node.runAction(cc.moveBy(.5, cc.v2(-15, 15)));
        }
      },
      onKeyUp: function onKeyUp(event) {
        console.log("onKeyUp:", event);
        switch (event.keyCode) {
         case cc.macro.KEY.a:
          this.spawnNewStar(1);
          break;

         case cc.macro.KEY.r:
          this.removeAllStar();
          break;

         case cc.macro.KEY.b:
          var boomAnimation = this.monsterSprite.getComponent(cc.Animation);
          boomAnimation.gameOver = function(number) {
            console.log("gameOver", number);
            boomAnimation.active = false;
          };
          boomAnimation.play("boom");
        }
      },
      minusStar: function minusStar() {},
      spawnNewStar: function spawnNewStar(number) {
        console.log("monster" + this.node.getComponent("cc.Collider").tag + " spawnNewStar:", number);
        var angle = 0;
        number > 0 && (angle = 360 / number);
        for (var i = 0; i < number; i++) {
          var x1 = this.radius * Math.cos(angle * i * Math.PI / 180);
          var y1 = this.radius * Math.sin(angle * i * Math.PI / 180);
          var newStar = objectPool.createStar(this.starPrefab);
          this.starSprite.addChild(newStar);
          newStar.getComponent("cc.Collider").tag = this.node.getComponent("cc.Collider").tag - 10;
          console.log(" newStar.getComponent('cc.Collider').tag=", newStar.getComponent("cc.Collider").tag);
          newStar.setPosition(cc.v2(x1, y1));
          newStar.getComponent("star").monster = this;
          newStar.getComponent("star").game = this.game;
        }
      },
      reArrangeStar: function reArrangeStar() {
        var len = this.starSprite.children.length;
        this.totalStar = len;
        var angle = 0;
        len > 0 && (angle = 360 / len);
        for (var i = 0; i < len; i++) {
          var x1 = this.radius * Math.cos(angle * i * Math.PI / 180);
          var y1 = this.radius * Math.sin(angle * i * Math.PI / 180);
          var star = this.starSprite.children[i];
          star.getComponent("cc.Collider").tag = this.node.getComponent("cc.Collider").tag - 10;
          star.getComponent("star").angle = angle * i;
          var action = cc.moveTo(.5, cc.v2(x1, y1));
          star.runAction(action);
        }
      },
      getNewStarPosition: function getNewStarPosition() {
        return cc.v2(150, 0);
      },
      removeAllStar: function removeAllStar() {
        var len = this.starSprite.children.length;
        for (var i = 0; i < len; i++) {
          console.log("removeStar:", i);
          objectPool.starPool.put(this.starSprite.children[i]);
        }
      },
      onLoad: function onLoad() {
        console.log("monster onLoad");
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.schedule(function() {
          this.reArrangeStar();
        }, .5);
      },
      runRoundCallback: function runRoundCallback() {
        this.kai += 1;
      },
      start: function start() {},
      onEnable: function onEnable() {
        console.log("onEnable");
        this.gameOver = false;
        this.spawnNewStar(this.initialStarNo);
        var action = cc.rotateBy(3, 360);
        var callback = cc.callFunc(this.runRoundCallback, this);
        var sequence = cc.sequence(action, callback);
        this.starSprite.runAction(cc.repeat(sequence, 999));
        this.moveSpeedX = 0;
        this.moveSpeedY = 0;
      },
      AiOn: function AiOn() {
        var ai = new AI();
        ai.setMap(this.game);
        ai.setEnemy(this.game.getComponent("game").allPlay[0]);
        ai.setSelf(this);
        ai.startControl();
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        console.log("on collision enter");
        if (self.tag - 10 == other.tag || this.gameOver) return;
        if (20 == other.tag) {
          var angle = mathUtil.getAngle(other.node.getPosition(), self.node.getPosition());
          console.log("angle=" + angle);
          angle >= 45 && angle < 135 ? this.moveBottom = false : angle >= 135 && angle < 225 ? this.moveRight = false : angle >= 225 && angle < 315 ? this.moveTop = false : this.moveLeft = false;
        } else if (other.tag < 10 && other.tag >= 0) {
          this.removeAllStar();
          this.gameOver = true;
          this.game.finishPlay(self.tag);
          var self = this;
          var boomAnimation = this.monsterSprite.getComponent(cc.Animation);
          boomAnimation.gameOver = function(number) {
            console.log("gameOver", number);
            boomAnimation.active = false;
            self.node.destroy();
          };
          boomAnimation.play("boom");
        }
      },
      onCollisionStay: function onCollisionStay(other, self) {
        if (20 == other.tag) {
          var angle = mathUtil.getAngle(other.node.getPosition(), self.node.getPosition());
          angle >= 45 && angle < 135 ? this.moveBottom = false : angle >= 135 && angle < 225 ? this.moveRight = false : angle >= 225 && angle < 315 ? this.moveTop = false : this.moveLeft = false;
        }
      },
      onCollisionExit: function onCollisionExit(other, self) {
        console.log("on collision exit");
        this.moveLeft = true;
        this.moveBottom = true;
        this.moveRight = true;
        this.moveTop = true;
      },
      move: function move(moveSpeedX, moveSpeedY) {
        this.moveSpeedX = moveSpeedX;
        this.moveSpeedY = moveSpeedY;
      },
      update: function update(dt) {
        (this.moveSpeedX > 0 && !this.moveRight || this.moveSpeedX < 0 && !this.moveLeft) && (this.moveSpeedX = 0);
        (this.moveSpeedY > 0 && !this.moveTop || this.moveSpeedY < 0 && !this.moveBottom) && (this.moveSpeedY = 0);
        var posX = this.node.x + this.moveSpeedX;
        var posY = this.node.y + this.moveSpeedY;
        (posX > 640 || posX < -640) && (posX = this.node.x);
        (posY > 640 || posY < -640) && (posY = this.node.y);
        this.node.setPosition(new cc.v2(posX, posY));
      }
    });
    cc._RF.pop();
  }, {
    AI: "AI",
    mathUtil: "mathUtil",
    objectPool: "objectPool"
  } ],
  objectPool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "729b2YgikdBcrXE9myHK5eg", "objectPool");
    "use strict";
    var starPool = void 0;
    var playPool = void 0;
    try {
      starPool = new cc.NodePool();
      playPool = new cc.NodePool();
      console.log("objectPool");
    } catch (e) {
      console.warn("fail" + e.message);
    }
    module.exports = {
      starPool: starPool,
      playPool: playPool,
      recoveryStar: function recoveryStar(starPrefab) {
        console.log(starPrefab.getComponent("cc.Collider").tag);
        starPrefab.getComponent("cc.Collider").tag = -1;
        this.starPool.put(starPrefab);
      },
      recoveryPlay: function recoveryPlay(playPrefab) {
        this.playPool.put(playPrefab);
      },
      createStar: function createStar(starPrefab) {
        var star = null;
        star = starPool.size() > 0 ? starPool.get() : cc.instantiate(starPrefab);
        return star;
      },
      createPlay: function createPlay(playPrefab) {
        var play = null;
        play = playPool.size() > 0 ? playPool.get() : cc.instantiate(playPrefab);
        return play;
      }
    };
    cc._RF.pop();
  }, {} ],
  star: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "774aaG5x6VCs4yxV/ZjK+f9", "star");
    "use strict";
    var objectPool = require("objectPool");
    var mathUtil = require("mathUtil");
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: 1,
        angle: 0,
        trackRadius: 0,
        game: null,
        isActionOver: true,
        canvas: cc.Node
      },
      onLoad: function onLoad() {
        console.log("star onLoad");
        var self = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function(event) {
          event.keyCode == cc.macro.KEY.w && self.startRun();
        }, this);
      },
      Contraction: function Contraction(displacement) {
        var x1 = (this.trackRadius - displacement) * Math.cos(this.angle * Math.PI / 180);
        var y1 = (this.trackRadius - displacement) * Math.sin(this.angle * Math.PI / 180);
        var action = cc.moveTo(.3, cc.v2(x1, y1));
        var action2 = cc.moveTo(.3, cc.v2(this.node.x, this.node.y));
        console.log("this.trackRadius =" + this.trackRadius + "_" + x1 + "," + y1);
        var seq = cc.sequence(action, action2);
        this.node.runAction(seq);
      },
      start: function start() {
        console.log("start");
      },
      onEnable: function onEnable() {
        console.log("onEnable");
        this.canvas = cc.find("Canvas/background");
      },
      update: function update(dt) {},
      onCollisionEnter: function onCollisionEnter(other, self) {
        var timestamp = new Date().getTime();
        console.log("on collision enter");
        if (self.tag != other.tag && self.tag + 10 != other.tag && -2 != other.tag) if (-2 == self.tag) {
          if (20 == other.tag || 22 == other.tag) {
            this.node.stopAllActions();
            -1 == self.tag;
          }
        } else if (-1 == self.tag) if (-1 == other.tag) ; else if (other.tag < 10) {
          self.tag = other.tag;
          console.log("\u65e0\u4e3b\u7684\u661f\u661f\u649e\u5230\u73a9\u5bb6\u7684\u661f\u661f");
          this.node.parent = other.node.parent;
          this.node.setPosition(cc.v2(0, 0));
        } else if (20 == other.tag) {
          console.log("starPool.put");
          objectPool.starPool.put(this.node);
        } else if (22 == other.tag) ; else {
          self.tag = other.tag - 10;
          var worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
          var StarSprite = other.node.getChildByName("StarSprite");
          var newPos = StarSprite.convertToNodeSpaceAR(worldPos);
          this.node.parent = StarSprite;
          this.node.setPosition(newPos);
          console.log("\u65e0\u4e3b\u7684\u661f\u661f\u649e\u5230\u73a9\u5bb6");
        } else {
          console.log("\u73a9\u5bb6\u7684\u661f\u661f");
          if (-1 == other.tag) ; else if (other.tag < 10) {
            console.log("\u73a9\u5bb6\u7684\u661f\u661f\u78b0\u5230\u5bf9\u65b9\u73a9\u5bb6\u7684\u661f\u661f");
            var p1 = other.node.convertToWorldSpaceAR(cc.v2(0, 0));
            var p2 = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
            var newVec2 = this.canvas.convertToNodeSpaceAR(p2);
            this.node.parent = this.canvas;
            this.node.setPosition(newVec2);
            var v2 = mathUtil.turnByAngle(p1, p2, 90, 270, false);
            var action = cc.moveBy(.3, v2);
            this.scheduleOnce(function() {
              self.tag = -2;
            }, .1);
            this.scheduleOnce(function() {
              self.tag = -1;
            }, .5);
            this.runAction(action);
          } else if (20 == other.tag) {
            var _p = other.node.convertToWorldSpaceAR(cc.v2(0, 0));
            var _p2 = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
            var _v = mathUtil.turnByAngle(_p, _p2, 90, 270, false);
            var _newVec = this.canvas.convertToNodeSpaceAR(_p2);
            this.node.parent = this.canvas;
            this.node.setPosition(_newVec);
            var action = cc.moveBy(.3, _v);
            self.tag = -2;
            var finished = cc.callFunc(function() {
              self.tag = -1;
            }, this, 0);
            var myAction = cc.sequence(action, finished);
            this.runAction(myAction);
          } else 22 == other.tag || console.log("\u661f\u661f\u649e\u5230\u73a9\u5bb6");
        }
        console.log("on collision enter time", timestamp - new Date().getTime());
      },
      onCollisionStay: function onCollisionStay(other, self) {},
      onCollisionExit: function onCollisionExit(other, self) {
        console.log("on collision exit");
        self.tag != other.tag && self.tag + 10 != other.tag && -2 != other.tag && (-2 == self.tag ? 20 == other.tag || 22 == other.tag : -1 == self.tag ? -1 == other.tag || other.tag < 10 || 20 == other.tag || 22 == other.tag : -1 == other.tag || (other.tag < 10 ? self.tag = -2 : 20 == other.tag || 22 == other.tag));
      },
      runAction: function runAction(action) {
        this.node.stopAllActions();
        this.node.runAction(action);
      }
    });
    cc._RF.pop();
  }, {
    mathUtil: "mathUtil",
    objectPool: "objectPool"
  } ],
  userInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "16614OWkm5KN5OjBToy5/d4", "userInfo");
    "use strict";
    var info = {
      userid: null,
      roomid: null,
      isOwner: false,
      load: function load() {}
    };
    module.exports = info;
    cc._RF.pop();
  }, {} ]
}, {}, [ "AI", "Glb", "game", "ground", "main", "mask", "monster", "star", "userInfo", "listViewUtil", "mathUtil", "objectPool" ]);