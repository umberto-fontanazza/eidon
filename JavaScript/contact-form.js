"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var form = document.getElementById("contact-form");
/**
 * This function replaces the content of a div
 * identified by the first parameter which is a CSS selector
 * with the content from an html file identified by the path
 * given by the second parameter string
 * @param {string} selector - CSS selector used to identify the div to be replaced
 * @param {string} path - path of the html file
 * @returns {void}
 *
 * @todo develop function
 */
function replaceNode(selector, path) {
    var _a, _b;
    //searching the DOM for the element to replce
    var query = document.querySelector(selector);
    if (query == null)
        throw new Error("querySelector() failed to find any HTMLElement corresponding to CSS selector: " + selector);
    var element = query;
    var newElement = document.createElement('div');
    //creating the new node from another file
    fetch(path)
        .then(function (response) { return response.text(); })
        .then(function (data) {
        newElement.innerHTML = data;
    });
    element.insertAdjacentElement('afterend', newElement); //inserting new node
    (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(element); //removing old node
    //inserting HTML comment to explain the origin of the new HTMLElement
    var comment = document.createComment("HTML injected by function replaceNode()");
    (_b = newElement.parentElement) === null || _b === void 0 ? void 0 : _b.insertBefore(comment, newElement);
}
function handleSubmit(event) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            if (form == null)
                return [2 /*return*/];
            event.preventDefault();
            data = new FormData(event.target);
            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(function (response) {
                replaceNode(".form-container", "./Snippets/confirmation.html");
                console.log("Form submitted successfully");
                if (form != null)
                    form.reset();
            }).catch(function (error) {
                console.log("Oops! There was a problem submitting your form");
            });
            return [2 /*return*/];
        });
    });
}
if (form != null)
    form.addEventListener("submit", handleSubmit);
