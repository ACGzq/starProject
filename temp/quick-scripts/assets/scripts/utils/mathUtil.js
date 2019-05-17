(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/utils/mathUtil.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '62ac5nHGU9Cv4TTBNHVKXwP', 'mathUtil', __filename);
// scripts/utils/mathUtil.js

"use strict";

function mathUtil() {}
//由A到B的斜率
mathUtil.getAngle = function (positionA, positionB) {
    var len_y = positionA.y - positionB.y;
    var len_x = positionA.x - positionB.x;
    var tan_yx = Math.abs(len_y / len_x);
    var angle = Math.atan(tan_yx) * 180 / Math.PI;
    if (len_y > 0 && len_x < 0) {
        //第四象限
        angle = 360 - Math.atan(tan_yx) * 180 / Math.PI;
    } else if (len_y > 0 && len_x > 0) {
        //第三象限
        angle = 180 + Math.atan(tan_yx) * 180 / Math.PI;
    } else if (len_y < 0 && len_x < 0) {
        //第一现象
        angle = Math.atan(tan_yx) * 180 / Math.PI;
    } else if (len_y < 0 && len_x > 0) {
        //第二象限
        angle = 180 - Math.atan(tan_yx) * 180 / Math.PI;
    }
    return angle;
};
/**
 * 偏转到
 * p1 p2 原始路径
 * angle 偏转角度
 * dist 偏转距离
 * flag true返回坐标 false返回向量
*/
mathUtil.turnByAngle = function (p1, p2, angle, dist, flag) {
    if (dist == 0) dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    var angle2 = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    if (angle2 < 0) {
        angle2 = 360 + angle2;
    }
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
mathUtil.getDistance = function (p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

module.exports = mathUtil;

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
        //# sourceMappingURL=mathUtil.js.map
        