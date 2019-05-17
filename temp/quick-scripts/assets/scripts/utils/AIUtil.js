(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/utils/AIUtil.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '780f6FbkgFEcpW5xbv+fm0o', 'AIUtil', __filename);
// scripts/utils/AIUtil.js

"use strict";

function AIUtil() {}
//路径代价 = 起点到当前点代价（要考虑斜路径，直路径）+当前点到终点预估代价（忽略障碍，不考虑斜路径代价）
AIUtil.axRoute = function () {};

module.exports = AIUtil;

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
        //# sourceMappingURL=AIUtil.js.map
        