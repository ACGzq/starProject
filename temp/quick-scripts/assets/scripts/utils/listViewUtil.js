(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/utils/listViewUtil.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4f6b3wsfGtKpLFS8a4C5wnT', 'listViewUtil', __filename);
// scripts/utils/listViewUtil.js

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

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        Stringlabel: cc.Node,
        spacing: 0

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.content = this.scrollView.content;
        this.items = [];
        for (var i = 0; i < 10; i++) {
            this.items[i] = "第" + i + "项";
        }
    },
    start: function start() {},
    add: function add() {
        this.content.removeAllChildren(true);
        this.items.push("第" + (this.items.length + 1) + "项");
        this.content.height = this.items.length * (this.Stringlabel.height + this.spacing) + this.spacing; // get total content height

        for (var i = 0; i < this.items.length; i++) {
            var label = cc.instantiate(this.Stringlabel);
            console.log(label);
            label.getComponent(cc.Label).string = this.items[i];
            this.content.addChild(label);
            label.setPosition(this.content.width / -2, -label.height * (0.5 + i) - this.spacing * (i + 1));
        }
    }
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
        //# sourceMappingURL=listViewUtil.js.map
        