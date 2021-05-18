var Chroma;
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export supportedLangugaes */
/* unused harmony export matches */
/* unused harmony export beautify */
/* unused harmony export selectedTheme */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__language_c__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__language_c___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__language_c__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__language_html__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__language_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__language_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__language_sql__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__language_sql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__language_sql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__language_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__language_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__language_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__language_javascript__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__language_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__language_javascript__);
/* Import all supported languages */






/* Add all languages to array */
const languages = Array()
/* unused harmony export languages */


var supportedLangugaes = () => {
    languages.push(__WEBPACK_IMPORTED_MODULE_0__language_c___default.a)
    languages.push(__WEBPACK_IMPORTED_MODULE_1__language_html___default.a)
    languages.push(__WEBPACK_IMPORTED_MODULE_2__language_sql___default.a)
    languages.push(__WEBPACK_IMPORTED_MODULE_3__language_css___default.a)
    languages.push(__WEBPACK_IMPORTED_MODULE_4__language_javascript___default.a)
    return languages
}
supportedLangugaes()

/* Pick language for processing regex */
/*
* @param string
*/
const pickLanguage = (lang) => {
    let pick = false
    languages.forEach((s) => {
        if(s.lang == lang){
            pick = s
            return
        }
    })

    return pick
}
/* unused harmony export pickLanguage */


/*
* @param Array of object
* @param string
*/ 
var matches = Array() // all matches with start and end position
var beautify = '' // final beautiful version of code

// @param string
const convertEntities = (code) => {
    return code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
/* unused harmony export convertEntities */


// @param string
const resetEntities = (code) => {
    return code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
}
/* unused harmony export resetEntities */


// @param string
const separatecodeLines = (code) => {
    return code.split("\n");
}
/* unused harmony export separatecodeLines */


// @param int
const prepareCodeLines = (len) => {
    let i, span
    let lineSet = document.createElement('div')
    lineSet.className = 'chroma-line-no'
    for(i=1; i<=len; i++){
        span = document.createElement('span')
        span.innerHTML = i
        lineSet.appendChild(span)
    }
    return lineSet
}
/* unused harmony export prepareCodeLines */


/*
* @param int
* @param int
* */
const overlapMatch = (start, end) => {
    return start >= end ? true : false
}
/* unused harmony export overlapMatch */


/*
* @param int
* @param int
* */
const nullMatch = (start, end) => {
    return start != end ? true : false
}
/* unused harmony export nullMatch */


/*
* @param string
*/
const replaceMatch = (code) => {
    let endPos = 0

    matches.forEach((m) => {
        if(overlapMatch(m.start, endPos) && !m.embedded){

            if(nullMatch(endPos, m.start))
                beautify += '<span class="' + 'plain-text">' + code.substring(endPos, m.start)  + '</span>'

            beautify += '<span class="' + m.class.replace(/\./g, ' ') + '">' + m.value + '</span>'
            endPos = m.end

        }
    })
    beautify += '<span class="' + 'plain-text">' + code.substr(endPos, code.length) + '</span>'
}
/* unused harmony export replaceMatch */


// sorting matches in ascending order
// helps in finding matches overlaps
const matchesSorting = (a, b) => {
    if(a.start < b.start)
        return true
    else return false
}
/* unused harmony export matchesSorting */


/*
* @param string
* @param object
* @param int
*/
const processPattern = (code, patt, offset) => {
    if(offset === void 0)
        offset = 0
    var pattern = new RegExp(patt.pattern)
    let match = pattern.exec(code)
    let startPos, endPos
    if(!match){ // no match found
        return false
    }

    startPos = match.index + offset
    endPos = startPos + match[0].length
    let embedded = ''
    if(patt.language)
        embedded = patt.language
    let obj = {
        value : match[0],
        start : startPos,
        end : endPos,
        class : patt.class,
        embedded
    }
    matches.push(obj)
    return {
        remaining : code.substring(endPos - offset),
        offset : endPos
    }


}
/* unused harmony export processPattern */

/*
* @param string
* @param array
* @param int
*/
const processCodeWithPatterns = (code, kit, offset) => {

    let pattern, i
    for(i=0; i<kit.length; i++){
        let result = processPattern(code, kit[i], offset)
        while(result){
            result = processPattern(result.remaining, kit[i], result.offset)
        }
    }

}
/* unused harmony export processCodeWithPatterns */


/* 
* Process code parts which belongs to other language
* @param string
*/
const embeddOtherLanguages = (code) => {

    matches.forEach((m) => {
        if(m.embedded){
            let kit = pickLanguage(m.embedded)
            if(kit){
                processCodeWithPatterns(code.substring(m.start, m.end), kit.conversion, m.start)
            }
        }
    })

}
/* unused harmony export embeddOtherLanguages */


/*
* Returns highlighted version of code
* @param string
* @param string
*/
const pretty = (code, lang) => {
    let kit = pickLanguage(lang)
    code = convertEntities(code)
    beautify = ''
    matches = Array()
    if(kit){
        processCodeWithPatterns(code, kit.conversion, 0)
        embeddOtherLanguages(code)
        matches.sort((a, b) => {return a.start - b.start})
        replaceMatch(code)
    }
    else return false

    return '<pre style="margin:0;"><code>' + beautify + '</code></pre>'
}
/* unused harmony export pretty */


/*
* @param dom html object
* @param string
* @param string
*/
const chromaCopy = (btn, copyCode, message) => {
    btn.disabled = true
    copyCode = copyCode.trim()
    let textarea = document.createElement('textarea')
    let body = document.body
    textarea.value = copyCode
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    body.removeChild(textarea)
    textarea.remove()
    let msg = document.createElement('div')
    if(copyCode != ''){
        msg.className = 'chroma-copy-msg'
        msg.innerHTML = message
    }
    else{
        msg.className = 'chroma-copy-msg'
        msg.innerHTML = 'Empty cannot be copied'
    }
    body.appendChild(msg)   
    setTimeout(() => {
        msg.remove()
        btn.disabled = false
    }, 2000)
}

/*
* preloader
*
*
*/
const preloader = () => {
    let loader = document.createElement('div')
    loader.className = 'chroma-preloader'
    let main = document.createElement('div')
    main.innerHTML = '<div>L</div>'
    main.innerHTML += '<div>o</div>'
    main.innerHTML += '<div>a</div>'
    main.innerHTML += '<div>d</div>'
    main.innerHTML += '<div>i</div>'
    main.innerHTML += '<div>n</div>'
    main.innerHTML += '<div>g</div>'
    loader.appendChild(main)

    return loader
}
/* unused harmony export preloader */


/*
* Preparing front end output
* Set code copy button
* @param string
* @param dom object
* @param string
* @param string
* @param boolean
* @param boolean
*/ 
const presentation = (code, prettyCode, lineset, linepad, header, headingValue, lang, copy, loaderValue) => {

    if(!headingValue)
        headingValue = lang.toUpperCase()
    let main = document.createElement('div')
    main.className = 'chroma'
    main.style.fontFamily = 'monospace'
    let chromaHeader, heading, btn
    if(header === 'true'){
        chromaHeader = document.createElement('div')
        chromaHeader.className = 'chroma-head chroma-sb'
        heading = document.createElement('div')
        heading.innerHTML = headingValue
        btn = document.createElement('button')
        if(copy === 'true'){
            heading.style.marginRight = '10px'
            btn.innerHTML = 'Copy'
            btn.className = 'chroma-copy'
            btn.style.display = 'none'
            btn.addEventListener('click', () => {
                chromaCopy(btn, resetEntities(code), 'Code copied successfully')
            })
        }
        chromaHeader.appendChild(heading)
        if(copy === 'true')
            chromaHeader.appendChild(btn)
    }
    let result = document.createElement('div')
    result.className = 'chroma-beautify'
    header ? result.className += ' chroma-no-header' : ''
    let sub = document.createElement('div')
    sub.className = 'chroma-flex-row'

    if(linepad === 'true')
        sub.appendChild(lineset)
    let codeBlock = document.createElement('div')
    codeBlock.innerHTML = prettyCode
    sub.appendChild(codeBlock)
    result.appendChild(sub)
    if(header === 'true')
        main.appendChild(chromaHeader)
    main.appendChild(result)
    if(loaderValue === 'true'){
        // result.style.minHeight = ''
        sub.style.display = 'none'
        let loader = preloader()
        result.appendChild(loader)
        setTimeout(() => {
            loader.remove()
            result.style.minHeight = '0'
            sub.style.display = 'flex'
            if(copy === 'true' && header === 'true')
                btn.style.display = 'block'
        }, 1500)
    }
    return main

}
/* unused harmony export presentation */


/*
* @param string
* @param string
* @param string
* @param string heading=""
* @param string copy=""
* @param string preloader=""
* @param html dob object
* */
const convert = (code, lang, header, heading, copy, loader, linepad) => {
    code = code.trim()
    // highlighted code
    let prettyCode = ChromaLocal.pretty(code, lang)
    if(!prettyCode){
        let msgBlock = document.createElement('span')
        let msg = 'Set language="" attribute and specify language, Check supported languages'
        msgBlock.style.color = 'red'
        msgBlock.innerText = msg
        console.error(msg)
        return msgBlock
    }

    // linepad
    let lineSet = prepareCodeLines(separatecodeLines(code).length)

    // final html output
    let result = presentation(code, prettyCode, lineSet, linepad, header, heading, lang, copy, loader)

    return result
}
/* harmony export (immutable) */ __webpack_exports__["b"] = convert;



/* Add chroma css */
const addUtilityCss = () => {
    let head = document.head
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'chroma/css/chroma.css'
    head.appendChild(link)
}
/* harmony export (immutable) */ __webpack_exports__["a"] = addUtilityCss;


var selectedTheme = null

/*
* Default options
*/
const defaultOptions = {
    theme : 'dark',
}
/* unused harmony export defaultOptions */


/* set options 
* @param object
*/
const setOptions = (options) => {
    let head = document.head
    let link, style
    let theme = options.theme
    // add theme css file in head of dcoument
    if(theme){
        if(selectedTheme)
            selectedTheme.remove()
        link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'chroma/themes/' + theme + '.css'
        head.appendChild(link)
        selectedTheme = link
    }
}
/* unused harmony export setOptions */


const ChromaLocal = {
    pretty,
    setOptions
}
/* unused harmony export ChromaLocal */

ChromaLocal.setOptions(defaultOptions)

Chroma = ChromaLocal

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chroma__ = __webpack_require__(0);




// fetch target blocks with attribute = chroma
const fetchTargetElements = () => {

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__chroma__["a" /* addUtilityCss */])()
    
    let blocks = document.querySelectorAll('[chroma="true"]')
    blocks.forEach(block => {
        let code = block.innerHTML
        
        // get all attributes of chroma element
        let attributes = block.attributes
        let header = attributes.header != undefined ? attributes.header.nodeValue : 'true'
        let heading = attributes.heading != undefined ? attributes.heading.nodeValue : false
        let copy = attributes.copy != undefined ? attributes.copy.nodeValue : 'true'
        let lang = attributes.language != undefined ? attributes.language.nodeValue : false
        let loader = attributes.preloader != undefined ? attributes.preloader.nodeValue : 'true'
        let linepad = attributes.linepad != undefined ? attributes.linepad.nodeValue : 'true'
        lang = lang.toLowerCase()

        if(lang){
            // send code for conversion
            let result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__chroma__["b" /* convert */])(code, lang, header, heading, copy, loader, linepad)
            block.innerHTML = ''
            block.appendChild(result)
        }
    })

}


fetchTargetElements()

/***/ }),
/* 2 */
/***/ (function(module, exports) {


let kit = {
    lang : 'c',
    conversion : [
        {
            class: 'meta.preprocessor.chroma-alpha',
            pattern: /\#([\S\s]*?)$/gm
        },
        {
            class: 'constant.numeric.chroma-echo',
            pattern: /\b\d+\b/g
        },
        {
            class : 'comment.chroma-charlie',
            pattern : /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g
        },
        {
            class: 'keyword.declaration.chroma-delta',
            pattern: /\b(void|int|float|double|char|long|short|signed|unsigned)\b/g
        },
        {
            class: 'keyword.control.chroma-delta',
            pattern: /\b(break|continue|return)\b/g
        },
        {
            class: 'storage.modifier.chroma-oscar',
            pattern: /\b(static|extern|auto|register|volatile|inline)\b/g
        },
        {
            class : 'keyword.conditional.chroma-lima',
            pattern: /\b(if|else|for|do|while)\b/g
        },
        {
            class: 'support.type.chroma-oscar',
            pattern: /\b(struct|union|enum)\b/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class : 'entitiy.name.function.chroma-victor',
            pattern : /(?<=(\w|\*)+)(\s|\n)+((\w+)(?= ?\())/g
        }
    ]
    
}

module.exports = kit

/***/ }),
/* 3 */
/***/ (function(module, exports) {

let kit = {
    lang : 'css',
    conversion : [
        {
            class : 'style.start.chroma-delta',
            pattern : /&lt;style\s*&gt;/g
        },
        {
            class : 'style.close.chroma-delta',
            pattern : /&lt;\/style\s*&gt;/g
        },
        {
            class : 'comment.chroma-charlie',
            pattern : /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class : 'constant.numeric.chroma-echo',
            pattern: /(\d+)(px|em|cm|s|%)?/g
        },
        {
            class : 'constant.hex.chroma-tango',
            pattern: /#([a-f0-9]{3}|[a-f0-9]{6})(?=;|\s|,|\))/gi
        },
        {
            class: 'direct-descendant.chroma-oscar',
            pattern: /&gt;/g
        },
        {
            class: 'class.chroma-alpha',
            pattern: /\.[\w\-_]+/g
        },
        {
            class: 'id.chroma-alpha',
            pattern: /\#[\w\-_]+/g
        },
        {
            class: 'pseudo.chroma-oscar',
            pattern: /:[\w\-_]+/g
        },
        {
            class : "property.chroma-oscar",
            pattern : /[\w-]+(?=\s*:)/g
        },
        {
            class: 'tag.chroma-delta',
            pattern: /\w+/g
        },
        {
            class : 'vendor.prefix.chroma-vector',
            pattern: /(-o-|-moz-|-webkit-|-ms-)?[\w-]+(?=\s?:)(?!.*\{)/g
        },
    ]
    
}

module.exports = kit

/***/ }),
/* 4 */
/***/ (function(module, exports) {

let kit = {
    lang : 'html',
    conversion : [
        {
            class : 'php.embedded',
            pattern : /(&lt;\?php|&lt;\?=?(?!xml))([\s\S]*?)(\?&gt;)/g,
            language : 'php'
        },
        {
            class : 'css.embedded',
            pattern : /(?<=&lt;style.*?&gt;)([\s\S]*?)(?=(&lt;\/)(style)(&gt;))/g,
            language : 'css'
        },
        {
            class : 'javascript.embedded',
            pattern : /(&lt;script(?! src).*?&gt;)([\s\S]*?)(&lt;\/)(script)(&gt;)/g,
            language : 'javascript'
        },
        {
            class: 'attribute.chroma-lima',
            pattern: /(?<=(\s)*)[a-zA-Z\-]+(?=(\s)*=("))/g
        }, 
        {
            class : 'comment.chroma-charlie',
            pattern : /&lt;!--(.*?)--&gt;/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class: 'doctype.chroma-oscar',
            pattern: /(?<=&lt;)(!DOCTYPE)(?=\s+)/g
        },
        {
            class: 'doctype.name.chroma-alpha',
            pattern: /((?<=\s*))html(?=&gt;)/g
        },
        {
            class: 'start-tag-name.chroma-alpha',
            pattern: /(?<=&lt;)[\w]+/g
        },
        {
            class: 'close-tag-name.chroma-alpha',
            pattern: /(?<=\/)\w+(?=\s*&gt;)/g
        },
        {
            class: 'start-tag.chroma-zeus',
            pattern: /&lt;(?!=!)/g
        },
        {
            class: 'close-tag.chroma-zeus',
            pattern: /(?<=\/*[\S\s]+)&gt;/g
        }
    ]
    
}

module.exports = kit

/***/ }),
/* 5 */
/***/ (function(module, exports) {

let kit = {
    lang : 'javascript',
    conversion : [
        {
            class : 'comment.chroma-charlie',
            pattern : /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class: 'selector',
            pattern: /\$(?=\.|\()/g
        },
        {
            class: 'support.chroma-oscar',
            pattern: /\b(window|document)\b/g
        },
        {
            class: 'keyword.chroma-romeo',
            pattern: /\b(return|import|export|default|from)\b/g
        },
        {
            class: 'function.call.chroma-lima',
            pattern: /\b(then)(?=\()/g
        },
        {
            class : 'variable.language.this.chroma-oscar',
            pattern: /\bthis\b/g
        },
        {
            class : 'variable.language.super.chroma-oscar',
            pattern: /super(?=\.|\()/g
        },
        {
            class : 'storage.type.chroma-delta',
            pattern: /\b(const|let|var)(?=\s)/g
        },
        {
            class : 'support.property.chroma-oscar',
            pattern: /\.(length|node(class|Value))\b/g
        },
        {
            class : 'support.function.chroma-delta',
            pattern: /(setTimeout|setInterval)(?=\()/g
        },
        {
            class : 'support.method.chroma-delta',
            pattern: /\.(getAttribute|replace|push|getElementById|getElementsByClassclass|setTimeout|setInterval)(?=\()/g
        },
        {
            class: 'string.regexp.chroma-echo',
            pattern: /(\/)((?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)(\/)(?!\/)([igm]{0,3})/g
        },
        {
            class : 'storage.type.chroma-delta',
            pattern: /(var)?(\s|^)(\S+)(?=\s?=\s?function\()/g
        },
        {
            class : 'keyword.chroma-romeo',
            pattern: /(new)\s+(?!Promise)([^\(]*)(?=\()/g
        },
        {
            class: 'entity.function.chroma-delta',
            pattern: /(\w+)(?=:\s{0,}function)/g
        },
        {
            class: 'constant.other.chroma-romeo',
            pattern: /\*(?= as)/g
        },
        {
            class : 'keyword.chroma-romeo',
            pattern: /(export)\s+(\*)/g
        },
        {
            class : 'storage.type.accessor.chroma-lima',
            pattern: /(get|set)\s+(\w+)(?=\()/g
        },
        {
            class : 'entity.class.function.chroma-delta',
            pattern: /(^\s*)(\w+)(?=\([^\)]*?\)\s*\{)/gm
        },
        {
            class : 'storage.type.class.chroma-charlie',
            pattern: /(class)\s+(\w+)(?:\s+(extends)\s+(\w+))?(?=\s*\{)/g
        },
        {
            class: 'storage.type.function.arrow.chroma-charlie',
            pattern: /=&gt;/g
        },
        {
            class: 'promise.chroma-charlie',
            pattern: /\bPromise(?=(\(|\.))/g
        }
    ]
    
}

module.exports = kit

/***/ }),
/* 6 */
/***/ (function(module, exports) {

let kit = {
    lang : 'sql',
    conversion : [
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class: 'comment.chroma-charlie',
            pattern: /--.*$|\/\*[\s\S]*?\*\/|(\/\/)[\s\S]*?$/gm
        },
        {
            class: 'constant.numeric.chroma-echo',
            pattern: /\b(\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+)\b/gi
        },
        {
            class: 'function.call.chroma-tango',
            pattern: /(\w+?)(?=\()/g
        },
        {
            class: 'keyword.chroma-delta',
            pattern: /\b(ABSOLUTE|ACTION|ADA|ADD|ALL|ALLOCATE|ALTER|AND|ANY|ARE|AS|ASC|ASSERTION|AT|AUTHORIZATION|AVG|BEGIN|BETWEEN|BIT|BIT_LENGTH|BOTH|BY|CASCADE|CASCADED|CASE|CAST|CATALOG|CHAR|CHARACTER|CHARACTER_LENGTH|CHAR_LENGTH|CHECK|CLOSE|COALESCE|COLLATE|COLLATION|COLUMN|COMMIT|CONNECT|CONNECTION|CONSTRAINT|CONSTRAINTS|CONTINUE|CONVERT|CORRESPONDING|COUNT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATE|DAY|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DELETE|DESC|DESCRIBE|DESCRIPTOR|DIAGNOSTICS|DISCONNECT|DISTINCT|DOMAIN|DOUBLE|DROP|ELSE|END|END-EXEC|ESCAPE|EXCEPT|EXCEPTION|EXEC|EXECUTE|EXISTS|EXTERNAL|EXTRACT|FALSE|FETCH|FIRST|FLOAT|FOR|FOREIGN|FORTRAN|FOUND|FROM|FULL|GET|GLOBAL|GO|GOTO|GRANT|GROUP|HAVING|HOUR|IDENTITY|IMMEDIATE|IN|INCLUDE|INDEX|INDICATOR|INITIALLY|INNER|INPUT|INSENSITIVE|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|IS|ISOLATION|JOIN|KEY|LANGUAGE|LAST|LEADING|LEFT|LEVEL|LIKE|LIMIT|LOCAL|LOWER|MATCH|MAX|MIN|MINUTE|MODULE|MONTH|classS|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONE|NOT|NULL|NULLIF|NUMERIC|OCTET_LENGTH|OF|ON|ONLY|OPEN|OPTION|OR|ORDER|OUTER|OUTPUT|OVERLAPS|PAD|PARTIAL|PASCAL|POSITION|PRECISION|PREPARE|PRESERVE|PRIMARY|PRIOR|PRIVILEGES|PROCEDURE|PUBLIC|READ|REAL|REFERENCES|RELATIVE|RESTRICT|REVOKE|RIGHT|ROLLBACK|ROWS|SCHEMA|SCROLL|SECOND|SECTION|SELECT|SESSION|SESSION_USER|SET|SIZE|SMALLINT|SOME|SPACE|SQL|SQLCA|SQLCODE|SQLERROR|SQLSTATE|SQLWARNING|SUBSTRING|SUM|SYSTEM_USER|TABLE|TEMPORARY|THEN|TIME|TIMESTAMP|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TRAILING|TRANSACTION|TRANSLATE|TRANSLATION|TRIM|TRUE|UNION|UNIQUE|UNKNOWN|UPDATE|UPPER|USAGE|USER|USING|VALUE|VALUES|VARCHAR|VARYING|VIEW|WHEN|WHENEVER|WHERE|WITH|WORK|WRITE|YEAR|ZONE|USE)(?=\b)/gi
        },
        {
            class: 'keyword.operator.chroma-romeo',
            pattern: /\+|\!|\-|&(gt|lt|amp);|\||\*|=/g
        }
    ]
    
}

module.exports = kit

/***/ })
/******/ ]);