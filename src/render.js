"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentHtml = getComponentHtml;
exports.getFileHtml = getFileHtml;
var fs_1 = require("fs");
var jsdom_1 = require("jsdom");
var path_1 = require("path");
main();
function main() {
    console.log("Rendering index.html");
    var contentHtml = fs_1.default.readFileSync("src/index-base.html").toString();
    var dom = new jsdom_1.JSDOM(contentHtml);
    var components = dom.window.document.querySelectorAll("[data-component]");
    moveComponentsToFile();
    renderComponents(components);
    fs_1.default.writeFileSync("index.html", dom.serialize());
}
function renderComponents(components) {
    components.forEach(function (component) {
        // Find component file from name
        var componentName = component.getAttribute("data-component");
        if (!componentName) {
            console.error("No component name found");
            return;
        }
        var componentHtml = getComponentHtml(componentName);
        component.outerHTML = componentHtml;
    });
}
function getComponentHtml(componentName) {
    var filePath = searchFileWithoutExtension("src/components", componentName, [
        "ts",
    ]);
}
function getFileHtml(componentName) {
    var filePath = searchFileWithoutExtension("src/components", componentName, [
        "html",
        "svg",
    ]);
    if (!filePath) {
        console.error("No component file found");
        throw new Error("No component file found");
    }
    return fs_1.default.readFileSync(filePath).toString();
}
function searchFileWithoutExtension(dir, fileName, validFileTypes) {
    // read the contents of the directory
    var files = fs_1.default.readdirSync(dir);
    // search through the files
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        // build the full path of the file
        var filePath = path_1.default.join(dir, file);
        if (!validateFileType(validFileTypes, filePath)) {
            continue;
        }
        // Trim file name extension
        var match = /(.*)\..*/g.exec(file);
        var trimmedFileName = match === null || match === void 0 ? void 0 : match[1];
        // get the file stats
        var fileStat = fs_1.default.statSync(filePath);
        // if the file is a directory, recursively search the directory
        if (fileStat.isDirectory()) {
            return searchFileWithoutExtension(filePath, fileName, validFileTypes);
        }
        else if (trimmedFileName === null || trimmedFileName === void 0 ? void 0 : trimmedFileName.endsWith(fileName)) {
            // if the file is a match, return it
            return filePath;
        }
    }
}
function validateFileType(validFileTypes, fileName) {
    for (var _i = 0, validFileTypes_1 = validFileTypes; _i < validFileTypes_1.length; _i++) {
        var type = validFileTypes_1[_i];
        if (fileName.endsWith(type)) {
            return true;
        }
    }
    console.error("Invalid file type", fileName);
    return false;
}
