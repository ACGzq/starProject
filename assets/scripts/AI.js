// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
let mathUtil = require("util/mathUtil");
cc.Class({
    extends: cc.Component,

    properties: {
        ControlOn:false,
        Enemy:cc.Node,
        GameWorld:cc.Node,
        SelfMonster:null,
        bg:cc.Node,
        obstacle1:cc.Node,
        obstacle2:cc.Node,
        obstacle3:cc.Node,
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    setMap(game){
        this.GameWorld = game;
        this.obstacle1 = game.getComponent('game').obstacle1;
        this.obstacle2 = game.getComponent('game').obstacle2;
        this.obstacle3 = game.getComponent('game').obstacle3;
    },
    setEnemy(enemy){
        this.Enemy = enemy;
    },
    setSelf(SelfMonster){
        this.SelfMonster = SelfMonster;
    },
    startControl(){
        if(this.ControlOn)
            return;
        this.ControlOn = true;
        this.bg = cc.find("Canvas/background");
        this.callback = function () {
           
            if (!this.ControlOn || this.GameWorld.gameOver) {
                // 在第六次执行回调时取消这个计时器
                this.unschedule(this.callback);
            }else{
                if(550 > mathUtil.getDistance(this.SelfMonster.node.getPosition(),this.Enemy.getPosition())){
                   
                    if(this.SelfMonster.starSprite.children.length-3 > this.Enemy.children[0].children.length){
                        var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(),this.Enemy.getPosition(),0,2.8,false);
                    }else{
                        let posi = this.SelfMonster.node.getPosition();
                        let angle = 180;
                        if(posi.x > 590 || posi.x <= -590 || posi.y < -590 || posi.y > 590){
                            if(mathUtil.getAngle(this.GameWorld.node.getPosition(),posi)
                                <mathUtil.getAngle(this.GameWorld.node.getPosition(),this.Enemy.getPosition())){
                                    angle +=90;
                            }else{
                                angle -=90;
                            }
                        }
                            var newVer2 = mathUtil.turnByAngle(posi,this.Enemy.getPosition(),angle,2.8,false);
                        
                        
                    }
                }else{
                    var nearStar;
                    var dis = 5000;
                    console.log(this.bg.children.length);
                    let posi = this.SelfMonster.node.getPosition();
                        for(let i = 0;i<this.bg.children.length;i++){
                        let star = this.bg.children[i];
                        let dis2 = mathUtil.getDistance(posi,star.getPosition());
                        if(dis2 < dis){
                            dis = dis2;
                            nearStar = star;
                        };
                    }  
                    if(mathUtil.getDistance(posi,this.obstacle1.getPosition())<200){
                        var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(),this.obstacle1.getPosition(),90,2,false);
                    }else if(mathUtil.getDistance(posi,this.obstacle2.getPosition())<200){
                        var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(),this.obstacle2.getPosition(),90,2,false);
                    }else if(mathUtil.getDistance(posi,this.obstacle3.getPosition())<200){
                        var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(),this.obstacle3.getPosition(),90,2,false);
                    }else{
                        var newVer2 = mathUtil.turnByAngle(this.SelfMonster.node.getPosition(),nearStar.getPosition(),0,2,false);
                    }
                
                }
                this.SelfMonster.move(newVer2.x,newVer2.y);
            }
            
        }
        this.schedule(this.callback, 1);
    },
    stopControl(){
        this.ControlOn = false;
    },
    log(value){
        console.log(value);
    },
    start () {

    },

    // update (dt) {},
});
