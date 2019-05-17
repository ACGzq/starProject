// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
let objectPool = require("util/objectPool");
let mathUtil = require("util/mathUtil");
let AI = require("AI");
cc.Class({
    extends: cc.Component,

    properties: {
        starSprite:cc.Node,
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        monsterSprite:cc.Node,
        radius:150,
        kai:0,
        playId:0,
        initialStarNo:0,
        totalStar:0,
        moveSpeedX:0,
        moveSpeedY:0,
        moveLeft : true,
        moveBottom : true,
        moveRight : true,
        moveTop : true,
        gameOver:false,
        
        
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    onKeyDown (event) {
        // set a flag when key pressed
        console.log("onKeyDown:", event);
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                
                break;
            case cc.macro.KEY.d:
                
                break;
            case cc.macro.KEY.g:
                break;
            case cc.macro.KEY.h:
            console.log('this.node..Collider=',this.node.getComponent('cc.Collider').tag);
            for(var i = 0;i< this.starSprite.children.length;i++){
                console.log('star.tag='+this.starSprite.children[i].getComponent('cc.Collider').tag);
            }
            
                break;
            case cc.macro.KEY.j:
                objectPool.starPool.put(this.starSprite.children[0]);
                break;
            case cc.macro.KEY.k:
                this.node.runAction(cc.moveBy(0.5,cc.v2(15,0)));
                break;
            case cc.macro.KEY.l:
                this.node.runAction(cc.moveBy(0.5,cc.v2(-15,15)));
                break;
        }
    },
   
    onKeyUp (event) {
        // unset a flag when key released
        console.log("onKeyUp:", event);
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.spawnNewStar(1);
                break;
                case cc.macro.KEY.r:
                this.removeAllStar();
                break;
            case cc.macro.KEY.b:
                var boomAnimation = this.monsterSprite.getComponent(cc.Animation);
                boomAnimation.gameOver = function(number){
                    console.log("gameOver", number);
                    boomAnimation.active = false;
                };
                boomAnimation.play('boom');
                break;
        }
    },
    minusStar:function(){
      /*  var newStar = this.starArray.pop();
        newStar.parent = this.node.parent;
        var ox = this.node.x;
        var action = cc.moveTo(0.5, cc.v2(x1,y1));
        this.newStar.runAction(action);*/
    },
    spawnNewStar: function(number) {
        console.log("monster"+this.node.getComponent('cc.Collider').tag+" spawnNewStar:",  number);
        var angle = 0;
        if(number>0){
            angle = 360/number; 
        }
        for(var i = 0;i<number;i++){
            var x1 = this.radius * Math.cos(angle * i * Math.PI / 180);
            var y1 = this.radius * Math.sin(angle * i * Math.PI / 180);
            // 使用给定的模板在场景中生成一个新节点
            var newStar = objectPool.createStar(this.starPrefab);//cc.instantiate(this.starPrefab);
            
            //this.starArray.push(newStar);
            // 将新增的节点添加到 starSprite 节点上面
            //console.log(" this.starSprite:",  this.starSprite);
            this.starSprite.addChild(newStar);
            newStar.getComponent('cc.Collider').tag = this.node.getComponent('cc.Collider').tag-10;
            console.log(" newStar.getComponent('cc.Collider').tag=",  newStar.getComponent('cc.Collider').tag);
            newStar.setPosition(cc.v2(x1, y1));
            newStar.getComponent('star').monster = this;
            newStar.getComponent('star').game = this.game;
        }
        //this.reArrangeStar();
    },
    reArrangeStar(){
        var len = this.starSprite.children.length;
        this.totalStar = len;
        var angle = 0;
        if(len>0){
            angle = 360/len; 
            //console.log("angle ="+angle); 
        }
        for(var i = 0; i < len; i++){
            var x1 = this.radius * Math.cos(angle * i * Math.PI / 180);
            var y1 = this.radius * Math.sin(angle * i * Math.PI / 180);
           // console.log("x ="+x1+"y"+y1);
            //this.starArray[i].getComponent('star').angle = angle * i;
            let star = this.starSprite.children[i];
            star.getComponent('cc.Collider').tag = this.node.getComponent('cc.Collider').tag-10;
            star.getComponent('star').angle = angle * i;
            var action = cc.moveTo(0.5, cc.v2(x1,y1));
            star.runAction(action);//this.starSprite.children[i].runAction(action);
        }
            
    },
    getNewStarPosition(){
        return cc.v2(150, 0);
    },
    removeAllStar(){
        var len = this.starSprite.children.length;
        for(var i = 0; i < len; i++){
            console.log('removeStar:' , i);
           objectPool.starPool.put(this.starSprite.children[i]);
        }
    },
    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        console.log('monster onLoad');
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this); 
       /* for(var i = 0;i<this.initialStarNo;i++){
            this.spawnNewStar();
        }*/
        this.schedule(function() {
            this.reArrangeStar();
            /*if(this.totalStar != this.starSprite.children.length){
                this.reArrangeStar();
            }*/
        }, 0.5); 
         
     },
   
    runRoundCallback:function(){
        this.kai+=1;
       // console.log("the"+this.kai+"round");
    },
    start () {
        
    },
    onEnable(){
        console.log('onEnable');
        this.gameOver = false;
        
        this.spawnNewStar(this.initialStarNo);
        var action = cc.rotateBy(3,360);
        var callback = cc.callFunc(this.runRoundCallback,this);
        var sequence = cc.sequence(action,callback);
        this.starSprite.runAction(cc.repeat(sequence,999));
        this.moveSpeedX = 0;
        this.moveSpeedY = 0;   
         
    },
    AiOn(){
        var ai = new AI();
            ai.setMap(this.game);
            ai.setEnemy(this.game.getComponent('game').allPlay[0]);
            ai.setSelf(this);
            ai.startControl();
    },
    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function (other, self) {
        console.log('on collision enter');
       // console.log('self=' , self);
       // console.log('other=' , other);
        if(self.tag-10 == other.tag || this.gameOver)//同属的,或者游戏结束 就不管了
            return;
        if(other.tag == 20 ){
           var angle = mathUtil.getAngle(other.node.getPosition(),self.node.getPosition());
           console.log('angle=' +angle);
           if(angle>=45 && angle<135){
                this.moveBottom = false;
            }else if(angle>=135 && angle<225){
                this.moveRight = false;
            }else if(angle>=225 && angle<315){
                this.moveTop = false;
            }else{
                this.moveLeft = false;
            }
        }else if(other.tag < 10 && other.tag >= 0){//撞到别人家的星星
          // console.log('撞到别人家的星星=',other);
          // console.log('this.node.=',this.node.getComponent('cc.Collider').tag);
          // for(var i = 0;i< this.starSprite.children.length;i++){
           //    console.log('star.tag='+this.starSprite.children[i].getComponent('cc.Collider').tag);
           //}
            this.removeAllStar();
            this.gameOver = true;
            this.game.finishPlay(self.tag);
            var self = this;
            var boomAnimation = this.monsterSprite.getComponent(cc.Animation);
               // console.log("cc.macro.KEY.b:", boomAnimation);
                boomAnimation.gameOver = function(number){
                    console.log("gameOver", number);
                    boomAnimation.active = false;
                    //objectPool.recoveryPlay(self.node);
                    self.node.destroy();
                    
                };
                boomAnimation.play('boom');
        }
            

    },
    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function (other, self) {
        //console.log('on collision stay');
        if(other.tag == 20 ){
            var angle = mathUtil.getAngle(other.node.getPosition(),self.node.getPosition());
           // console.log('angle=' +angle);
            if(angle>=45 && angle<135){
                 this.moveBottom = false;
             }else if(angle>=135 && angle<225){
                 this.moveRight = false;
             }else if(angle>=225 && angle<315){
                 this.moveTop = false;
             }else{
                 this.moveLeft = false;
             }
         }
    },
    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionExit: function (other, self) {
        console.log('on collision exit');
        this.moveLeft = true;
        this.moveBottom = true;
        this.moveRight = true;
        this.moveTop = true;
    },
    move(moveSpeedX,moveSpeedY){
        this.moveSpeedX = moveSpeedX;
        this.moveSpeedY = moveSpeedY;   
         
    },

     update (dt) {
         //if(this.isCurrentPlayer){

            if(this.moveSpeedX>0 && !this.moveRight || this.moveSpeedX<0 && !this.moveLeft){
                this.moveSpeedX = 0;
            }
            if(this.moveSpeedY>0 && !this.moveTop || this.moveSpeedY<0 && !this.moveBottom){
                this.moveSpeedY = 0;
            }
            var posX = this.node.x + this.moveSpeedX;
            var posY = this.node.y + this.moveSpeedY;
            if(posX>640 || posX<-640){
                posX = this.node.x;
            }
            if(posY>640 || posY < -640){
                posY = this.node.y;
            }
        
            this.node.setPosition(new cc.v2(posX,posY));
       // }
     },
});
