"use strict";
cc._RF.push(module, '729b2YgikdBcrXE9myHK5eg', 'objectPool');
// scripts/utils/objectPool.js

'use strict';

var starPool = void 0;
var playPool = void 0;
try {
    starPool = new cc.NodePool();
    playPool = new cc.NodePool();
    console.log('objectPool');
} catch (e) {
    console.warn("fail" + e.message);
}
module.exports = {
    starPool: starPool,
    playPool: playPool,
    recoveryStar: function recoveryStar(starPrefab) {
        console.log(starPrefab.getComponent('cc.Collider').tag);
        starPrefab.getComponent('cc.Collider').tag = -1;
        this.starPool.put(starPrefab);
    },
    recoveryPlay: function recoveryPlay(playPrefab) {
        this.playPool.put(playPrefab);
    },
    createStar: function createStar(starPrefab) {
        var star = null;
        if (starPool.size() > 0) {
            // 通过 size 接口判断对象池中是否有空闲的对象
            star = starPool.get();
        } else {
            // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            star = cc.instantiate(starPrefab);
        }
        return star;
    },
    createPlay: function createPlay(playPrefab) {
        var play = null;
        if (playPool.size() > 0) {
            // 通过 size 接口判断对象池中是否有空闲的对象
            play = playPool.get();
        } else {
            // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            play = cc.instantiate(playPrefab);
        }
        return play;
    }

};

cc._RF.pop();