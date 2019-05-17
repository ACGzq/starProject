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
        resultLabel:cc.Label,
        mask:cc.Mask,
        promptLabel:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function (){
        console.log("onLoad");
        this.node.on(cc.Node.EventType.TOUCH_START, (event)=>{
            console.log(event);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    },

    onDestroy:function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    },
    _onTouchBegin:function (event) {

        cc.log('touchBegin');

        var point = event.touch.getLocation();
        console.log(event);
        console.log(point);
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    },

    _onTouchMoved:function (event) {
        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    },

    _onTouchEnd:function (event) {
        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    },

    _onTouchCancel:function (event) {
       
    },
    _addCircle:function (point) {
        var stencil = this.mask._graphics;
        stencil.circle(point.x,point.y,32);
        stencil.fill();
       
    },
    start () {

    },

    // update (dt) {},
});
