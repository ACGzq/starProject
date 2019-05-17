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
        scrollView:cc.ScrollView,
        Stringlabel:cc.Node,
        spacing:0,

    },
    

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.content = this.scrollView.content;
        this.items = [];
        for(var i=0;i<10;i++){
            this.items[i] = "第"+i+"项";
        }
     },

    start () {
       
    },
    add(){
        this.content.removeAllChildren(true);
        this.items.push("第"+(this.items.length+1)+"项");
        this.content.height = this.items.length * (this.Stringlabel.height + this.spacing) + this.spacing; // get total content height
        
        for(let i = 0; i < this.items.length; i++) {
            let label = cc.instantiate(this.Stringlabel);
            console.log(label);
            label.getComponent(cc.Label).string = this.items[i];
            this.content.addChild(label);
            label.setPosition(this.content.width/-2, -label.height * (0.5 + i) - this.spacing * (i + 1));
            
        }

    },

    // update (dt) {},
});
