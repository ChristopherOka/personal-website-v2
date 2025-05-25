"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IconLink;
var render_1 = require("../render");
function IconLink(_a) {
    var iconName = _a.iconName, href = _a.href;
    var componentHtml = (0, render_1.getFileHtml)(iconName);
    return "<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"".concat(href, "\">").concat(componentHtml, "</a>");
}
