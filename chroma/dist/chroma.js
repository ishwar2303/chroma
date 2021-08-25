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
/* unused harmony export matches */
/* unused harmony export beautify */
/* unused harmony export selectedTheme */
/* unused harmony export cacheOptions */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__merge_kit__ = __webpack_require__(11);
/* Import all supported languages */


/* Pick language for processing regex */
/*
* @param string
*/
const pickLanguage = (lang) => {
    if(lang in __WEBPACK_IMPORTED_MODULE_0__merge_kit__["a" /* default */])
        return __WEBPACK_IMPORTED_MODULE_0__merge_kit__["a" /* default */][lang]
    else return false
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
    let chromaKeyWord= ' chroma-bold chroma-capital'
    matches.forEach((m) => {
        if(overlapMatch(m.start, endPos) && !m.embedded){

            if(nullMatch(endPos, m.start))
                beautify += '<span class="' + 'plain-text">' + code.substring(endPos, m.start)  + '</span>'

            beautify += '<span class="' + m.class.replace(/\./g, ' ') + chromaKeyWord + '">' + m.value + '</span>'
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
    let ff = 'font-family: monaco, courier, monospace; min-height: 15px;'
    return '<pre style="margin:0;' + ff + '"><code style="' + ff + '">' + beautify + '</code></pre>'
}
/* unused harmony export pretty */


/*
* @param dom html object
* @param string
* @param string
*/
const chromaCopy = (btn, copyCode, message) => {
    copyCode = copyCode.trim()
    let textarea = document.createElement('textarea')
    let body = document.body
    textarea.value = copyCode
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    body.removeChild(textarea)
    textarea.remove()
    if(copyCode != ''){
        btn.classList.remove('chroma-copy-btn1')
        btn.classList.add('chroma-copy-btn2')
        btn.innerHTML = 'Code Copied'
    }
    else{
        btn.innerHTML = 'Empty cannot be copied'
    }   
    btn.disabled = true
    setTimeout(() => {
        btn.classList.add('chroma-copy-btn1')
        btn.classList.remove('chroma-copy-btn2')
        btn.innerHTML = 'Copy'
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
    main.className = 'loading'
    main.innerHTML = '<div class="dot"></div>'
    main.innerHTML += '<div class="dot"></div>'
    main.innerHTML += '<div class="dot"></div>'
    main.innerHTML += '<div class="dot"></div>'
    main.innerHTML += '<div class="dot"></div>'
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
* @param boolean
* @param boolean
* @param integer
*/ 
const presentation = (code, prettyCode, lineset, linepad, header, headingValue, lang, copy, loaderValue, height) => {
    let delay = 2000
    if(!isNaN(loaderValue))
        delay = loaderValue*1000
    if(!headingValue)
        headingValue = lang.toUpperCase()
    let main = document.createElement('div')
    main.className = 'chroma'
    main.style.fontFamily = 'monaco, courier, monospace'
    
    let chromaHeader, heading, btn
    
    let result = document.createElement('div')
    result.className = 'chroma-beautify'

    btn = document.createElement('button')
    btn.innerHTML = 'Copy'
    btn.className = 'chroma-copy-btn1'
    if(header === 'true'){
        chromaHeader = document.createElement('div')
        chromaHeader.className = 'chroma-head chroma-sb'
        heading = document.createElement('div')
        heading.innerHTML = headingValue
        heading.style.marginRight = '10px'
        chromaHeader.appendChild(heading)
        if(copy === 'true')
            chromaHeader.appendChild(btn)
    }
    else {
        if(copy === 'true') {
            let div = document.createElement('div')
            div.className = 'chroma-copy-hover-container'
            div.appendChild(btn)
            btn.classList.add("chroma-copy-hover")
            result.appendChild(div)
            result.addEventListener('mouseover', () => {
                btn.style.display = 'flex'
            })
            result.addEventListener('mouseout', () => {
                btn.style.display = 'none'
            })
        }
    }
    
    if(copy === 'true'){
        btn.addEventListener('click', () => {
            chromaCopy(btn, resetEntities(code), 'Code copied successfully')
        })
    }
    if(height != 'false')
        result.style.maxHeight = height
    header ? result.className += ' chroma-no-header' : ''
    let sub = document.createElement('div')
    sub.className = 'chroma-flex-row'

    if(linepad === 'true') {
        sub.appendChild(lineset)
        result.style.paddingLeft = '0px';
    }
    let codeBlock = document.createElement('div')
    codeBlock.innerHTML = prettyCode
    if(loaderValue != 'false'){
        if(btn != undefined)
            btn.style.display = 'none'
        sub.style.display = 'none'
        let loader = preloader()
        result.appendChild(loader)
        setTimeout(() => {
            loader.remove()
            sub.style.display = 'flex'
            if(copy === 'true' && header === 'true')
                btn.style.display = 'block'
        }, delay)
    }
    sub.appendChild(codeBlock)
    result.appendChild(sub)
    if(header === 'true')
        main.appendChild(chromaHeader)
    main.appendChild(result)
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
const convert = (code, lang, header, heading, copy, loader, linepad, height) => {
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
    let result = presentation(code, prettyCode, lineSet, linepad, header, heading, lang, copy, loader, height)

    return result
}
/* harmony export (immutable) */ __webpack_exports__["a"] = convert;



/* Add chroma css */
let chromaCss = false
const addUtilityCss = () => {
    let head = document.head
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'chroma/css/chroma.css'
    head.appendChild(link)
    chromaCss = true
}
/* unused harmony export addUtilityCss */


const updateTheme = (theme) => {
    let head = document.head
    let link, style
    if(selectedTheme)
        selectedTheme.remove()
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'chroma/themes/' + theme + '.css'
    head.appendChild(link)
    selectedTheme = link
}
/* unused harmony export updateTheme */


var selectedTheme = null


/*
* Default options
*/
var cacheOptions = {
    theme : 'dark',
    bold : false,
    capital : false
}

let boldStyle, capitalStyle
/* set options 
* @param object
*/
const setOptions = (options) => {
    let head = document.head 

    if(options.theme != cacheOptions.theme && options.theme != '' && options.theme != undefined) {
        cacheOptions.theme = options.theme
        updateTheme(cacheOptions.theme)
    }

    if(options.bold != cacheOptions.bold && options.bold != undefined) {
        let bold = options.bold
        if(!boldStyle) {
            boldStyle = document.createElement('style')
            boldStyle.innerHTML = ''
            head.appendChild(boldStyle)
        }
        if(bold) 
            boldStyle.innerHTML = '.chroma-bold{font-weight : bold;}'
        else boldStyle.innerHTML = '.chroma-bold{font-weight : normal;}'
        cacheOptions.bold = bold
    }

    if(options.capital != cacheOptions.capital && options.capital != undefined) {
        let capital = options.capital
        if(!capitalStyle) {
            capitalStyle = document.createElement('style')
            capitalStyle.innerHTML = ''
            head.appendChild(capitalStyle)
        }
        if(capital) 
            capitalStyle.innerHTML = '.chroma-capital{text-transform : uppercase;}'
        else capitalStyle.innerHTML = '.chroma-capital{text-transform : none;}'
        cacheOptions.capital = capital
    }


    
}
/* unused harmony export setOptions */


/*
* public methods
*/
const ChromaLocal = {
    pretty,
    setOptions,
    cacheOptions
}
/* unused harmony export ChromaLocal */


Chroma = ChromaLocal

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chroma__ = __webpack_require__(0);


// fetch target blocks with attribute = chroma
const fetchTargetElements = () => {
    
    let blocks = document.querySelectorAll('[chroma="true"]')
    blocks.forEach(block => {
        let code = block.innerHTML
        // get all attributes of chroma element
        let attributes = block.attributes
        let header = attributes.header != undefined ? attributes.header.nodeValue : 'true'
        let heading = attributes.heading != undefined ? attributes.heading.nodeValue : false
        let copy = attributes.copy != undefined ? attributes.copy.nodeValue : 'true'
        let lang = attributes.language != undefined ? attributes.language.nodeValue : false
        let loader = attributes.preloader != undefined ? attributes.preloader.nodeValue : '2'
        let linepad = attributes.linepad != undefined ? attributes.linepad.nodeValue : 'true'
        let height = attributes.height != undefined ? attributes.height.nodeValue : 'false'
        lang = lang.toLowerCase()

        if(lang){
            // send code for conversion
            let result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__chroma__["a" /* convert */])(code, lang, header, heading, copy, loader, linepad, height)
            block.innerHTML = ''
            block.appendChild(result)
            block.style.display = 'block'
        }
    })

}


window.onload = fetchTargetElements()

/***/ }),
/* 2 */
/***/ (function(module, exports) {


let kit = {
    lang : 'c',
    conversion : [
        {
            class: 'header-file.chroma-echo',
            pattern : /(?<=#include\s*)(&lt;|\").*(&gt;|\")/g
        },
        {
            class: 'keyword.operator.chroma-romeo',
            pattern: /\+|\!|\-|&(gt|lt|amp);|\||\*|=/g
        },
        {
            class: 'meta.preprocessor.chroma-alpha',
            pattern: /\#(\w+)(?!=(&lt;|\"))/gm
        },
        {
            class: 'name-space.chroma-alpha',
            pattern : /\busing\s+namespace\b/g
        },
        {
            class: 'constant.language.chroma-echo',
            pattern: /true|false/g
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
            pattern: /\b(void|int|float|double|char|long|short|signed|unsigned|class|template|this)\b/g
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
            pattern : /\b(?<=(\w|\*)+)(\s|\n)+((\w+)(?= ?\())/g
        },
        {
            class : 'function-call.chroma-delta',
            pattern : /[\w\d_]+(?=\s*\()/g
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
            class: 'keyword.operator.chroma-romeo',
            pattern: /\+|\!|\-|&(gt|lt|amp);|\||\*|=/g
        },
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
            pattern: /(?<=&lt;)(!DOCTYPE)(?=\s+)/ig
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
    lang : 'java',
    conversion : [
        {
            class: 'keyword.operator.chroma-romeo',
            pattern: /\+|\!|\-|&(gt|lt|amp);|\||\*|=/g
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
            class : 'keyword.conditional.chroma-lima',
            pattern: /\b(if|else|for|do|while)\b/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class : 'entitiy.class.function.chroma-victor',
            pattern : /\b(?<=(\w|\*)+)(\s|\n)+((\w+)(?= ?\())/g
        },
        {
            class : 'function-call.chroma-delta',
            pattern : /[\w\d_]+(?=\s*\()/g
        },
        {
          class: "constant.chroma-echo",
          pattern: /\b(false|null|true|[A-Z_]+)\b/g
        },
        {
          class: 'keyword.chroma-echo',
          pattern: /(import|package)\s(.+)/g
        },
        {
          class: "keyword.chroma-delta",
          pattern: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/g
        },
        {
          class: "char.chroma-victor",
          pattern: /(')(.|\\.|\\u[\dA-Fa-f]{4})\1/g
        },
        {
          class: "integer.chroma-echo",
          pattern: /\b(0x[\da-f]+|\d+)L?\b/g
        },
        {
          class: "support.annotation.chroma-romeo",
          pattern: /@\w+/g
        },
        {
          class: 'entity.function.chroma-delta',
          pattern: /([^@\.\s]+)\(/g
        },
        {
          class: "entity.class.chroma-zeus",
          pattern: /\b([A-Z]\w*)\b/g
        },
        {
          class: "operator.chroma-oscar",
          pattern: /(\+{1,2}|-{1,2}|~|!|\*|\/|%|(?:&lt;){1,2}|(?:&gt;){1,3}|instanceof|(?:&amp;){1,2}|\^|\|{1,2}|\?|:|(?:=|!|\+|-|\*|\/|%|\^|\||(?:&lt;){1,2}|(?:&gt;){1,3})?=)/g
        }
    ]
    
}

module.exports = kit

/***/ }),
/* 6 */
/***/ (function(module, exports) {

let kit = {
    lang : 'javascript',
    conversion : [
        {
            class: 'keyword.operator.chroma-romeo',
            pattern: /\+|\!|\-|&(gt|lt|amp);|\||\*|=/g
        },
        {
            class : 'comment.chroma-charlie',
            pattern : /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class: 'selector.chroma-lima',
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
            class : 'variable.language.super.chroma-oscar',
            pattern: /\b(try|catch|finally|if|else)\b/g
        },
        {
            class : 'function-call.chroma-delta',
            pattern : /[\w\d_]+(?=\s*\()/g
        },
        {
            class : 'storage.type.chroma-delta',
            pattern: /\b(const|let|var|null|undefined)(?=\s)/g
        },
        {
            class : 'block.type.chroma-alpha',
            pattern: /\b(function)(?=\s\{)/g
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
            class : 'storage.type.chroma-romeo',
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
            class: 'constant.numeric.chroma-echo',
            pattern: /\b(\d+|true|false)\b/g
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
/* 7 */
/***/ (function(module, exports) {

let kit = {
    lang : 'json',
    conversion : [
        {
            class : 'property.chroma-victor',
            pattern : /("|')\w+("|')(?=\s*:)/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class: 'string.regexp.chroma-echo',
            pattern: /(\/)((?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)(\/)(?!\/)([igm]{0,3})/g
        },
        {
            class : 'property.chroma-victor',
            pattern : /\w+(?=\s*:)/g
        },
        {
            class: 'constant.numeric.chroma-delta',
            pattern: /\b(-?(0x)?\d*\.?[\da-f]+|NaN|-?Infinity)\b/gi
        },
        {
            class: 'constant.language.chroma-oscar',
            pattern: /\b(true|false|null)\b/g
        }
    ]
}

module.exports = kit

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let kit = {
    lang : 'php',
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
            class: 'support.chroma-delta',
            pattern: /\b(echo|function|return)\b/ig
        },
        {
            class: 'variable.dollar-sign.chroma-victor',
            pattern: /(\$)(\w+)\b/g
        },
        {
            class: 'constant.language.chroma-delta',
            pattern: /true|false|null/ig
        },
        {
            class: 'constant.numeric.chroma-echo',
            pattern: /\b\d+\b/g
        },
        {
            class: 'keyword.chroma-lima',
            pattern: /\b(die|end(for(each)?|switch|if)|case|require(_once)?|include(_once)?)(?=\b)/ig
        },
        {
            class: 'keyword.chroma-oscar',
            pattern: /(instanceof)\s([^\$].*?)(\)|;)/ig
        },
        {
            class:'support.function.chroma-oscar',
            pattern: /\b(array(_key_exists|_merge|_keys|_shift)?|isset|count|empty|unset|printf|is_(array|string|numeric|object)|sprintf|each|date|time|substr|pos|str(len|pos|tolower|_replace|totime)?|ord|trim|in_array|implode|end|preg_match|explode|fmod|define|link|list|get_class|serialize|file|sort|mail|dir|idate|log|intval|header|chr|function_exists|dirclass|preg_replace|file_exists)(?=\()/ig
        },
        {
            class: 'variable.language.php-tag.chroma-delta',
            pattern: /(&lt;\?(php)?|\?&gt;)/ig
        },
        {
            class: 'keyword.classspace.chroma-delta',
            pattern: /\b(classspace|use)\s(.*?);/ig
        },
        {
            class:'keyword.chroma-delta',
            pattern: /\b(abstract|final)?\s?(class|interface|trait)\s(\w+)(\sextends\s)?([\w\\]*)?(\simplements\s)?([\w\\]*)?\s?\{?(\n|\})/ig
        },
        {
            class: 'keyword.static.chroma-delta',
            pattern: /self::|static::/ig
        },
        {
            class: 'keyword.chroma-lima',
            pattern : /\b(const|public|static|protected)\b/g
        },
        {
            class: 'storage.function.chroma-victor',
            pattern: /(?<=(function)\s)(__.*?)(?=\()/ig
        },
        {
            class: 'storage.function.chroma-victor',
            pattern: /(?<=(function)\s)(.*?)(?=\()/ig
        },
        {
            class: 'keyword.new.chroma-delta',
            pattern: /\b(new)\s([^\$][a-z0-9_\\]*?)(?=\)|\(|;)/ig
        },
        {
            class: 'support.class.chroma-delta',
            pattern: /([\w\\]*?)(::)(?=\b|\$)/g
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
        }
    ]
}

/* harmony default export */ __webpack_exports__["a"] = (kit);

/***/ }),
/* 9 */
/***/ (function(module, exports) {


let kit = {
    lang : 'c',
    conversion : [
        {
            class: 'variable.self',
            pattern: /self/g
        },
        {
            class: 'comment.docstring.chroma-charlie',
            pattern: /('{3}|"{3})[\s\S]*?\1/gm
        },
        {
            class: 'constant.language.chroma-oscar',
            pattern: /None|True|False|NotImplemented|\.\.\./g
        },
        {
            class : 'comment.chroma-charlie',
            pattern : /#.*/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class: 'support.object.',
            pattern: /object/g
        },
        {
            class: 'support.function.python.chroma-victor',
            pattern: /\b(bs|divmod|input|strip|split|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|bin|file|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|set|apply|delattr|help|next|setattr|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern)(?=\()/g
        },
        {
            class : 'keywords.chroma-lima',
            pattern: /\b(pass|lambda|with|is|not|in|from|raise|del)(?=\b)/g
        },
        {
            class : 'keywords.chroma-romeo',
            pattern: /\b(return|import|as)(?=\b)/g
        },
        {
            class : 'keyword.conditional.chroma-lima',
            pattern: /\b(if|else|elif|for|do|while)\b/g
        },
        {
            class: 'constant.numeric.chroma-echo',
            pattern: /\b\d+\b/g
        },
        {
            class : 'chroma-delta',
            pattern: /(class)\s+(\w+)\((\w+?)\)/g
        },
        {
            class : 'chroma-alpha',
            pattern: /\bdef\b/g
        },
        {
            class: 'support.magic.chroma-alpha',
            pattern: /__(class)__/g
        },
        {
            class : 'chroma-oscar',
            pattern: /(except) (\w+):/g
        },
        {
            class: 'entity.class.function.decorator.chroma-victor',
            pattern: /@([\w\.]+)/g
        },
        {
            class : 'function-call.chroma-delta',
            pattern : /[\w\d_]+(?=\s*\()/g
        }
    ]
    
}

module.exports = kit

/***/ }),
/* 10 */
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
            class : 'comment.chroma-charlie',
            pattern : /#.*/g
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
            pattern: /\b(ABSOLUTE|ACTION|ADA|ADD|ALL|ALLOCATE|ALTER|AND|ANY|ARE|AS|ASC|ASSERTION|AT|AUTHORIZATION|AVG|BEGIN|BETWEEN|BIT|BIT_LENGTH|BOTH|BY|CASCADE|CASCADED|CASE|CAST|CATALOG|CHAR|CHARACTER|CHARACTER_LENGTH|CHAR_LENGTH|CHECK|CLOSE|COALESCE|COLLATE|COLLATION|COLUMN|COMMIT|CONNECT|CONNECTION|CONSTRAINT|CONSTRAINTS|CONTINUE|CONVERT|CORRESPONDING|COUNT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATE|DAY|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DELETE|DESC|DESCRIBE|DESCRIPTOR|DIAGNOSTICS|DISCONNECT|DISTINCT|DOMAIN|DOUBLE|DROP|IF|ENDIF|ELSE|END|END-EXEC|ESCAPE|EXCEPT|EXCEPTION|EXEC|EXECUTE|EXISTS|EXTERNAL|EXTRACT|FALSE|FETCH|FIRST|FLOAT|FOR|FOREIGN|FORTRAN|FOUND|FROM|FULL|GET|GLOBAL|GO|GOTO|GRANT|GROUP|HAVING|HOUR|IDENTITY|IMMEDIATE|IN|OUT|INOUT|INCLUDE|INDEX|INDICATOR|INITIALLY|INNER|INPUT|INSENSITIVE|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|IS|ISOLATION|JOIN|KEY|LANGUAGE|LAST|LEADING|LEFT|LEVEL|LIKE|LIMIT|LOCAL|LOWER|MATCH|MAX|MIN|MINUTE|MODULE|MONTH|classS|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONE|NOT|NULL|NULLIF|NUMERIC|OCTET_LENGTH|OF|ON|ONLY|OPEN|OPTION|OR|ORDER|OUTER|OUTPUT|OVERLAPS|PAD|PARTIAL|PASCAL|POSITION|PRECISION|PREPARE|PRESERVE|PRIMARY|PRIOR|PRIVILEGES|PROCEDURE|PUBLIC|READ|REAL|REFERENCES|RELATIVE|RESTRICT|REVOKE|RIGHT|ROLLBACK|ROWS|SCHEMA|SCROLL|SECOND|SECTION|SELECT|SESSION|SESSION_USER|SET|SIZE|SMALLINT|SOME|SPACE|SQL|SQLCA|SQLCODE|SQLERROR|SQLSTATE|SQLWARNING|SUBSTRING|SUM|SYSTEM_USER|TABLE|DATABASE|TEMPORARY|THEN|TIME|TIMESTAMP|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TRAILING|TRANSACTION|TRANSLATE|TRANSLATION|TRIM|TRUE|UNION|UNIQUE|UNKNOWN|UPDATE|UPPER|USAGE|USER|USING|VALUE|VALUES|VARCHAR|VARYING|VIEW|WHEN|WHENEVER|WHERE|WITH|WORK|WRITE|YEAR|ZONE|USE)(?=\b)/gi
        },
        {
            class: 'keyword.operator.chroma-romeo',
            pattern: /\+|\!|\-|&(gt|lt|amp);|\||\*|=/g
        }
    ]
    
}

module.exports = kit

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__language_c__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__language_c___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__language_c__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__language_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__language_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__language_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__language_html__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__language_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__language_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__language_javascript__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__language_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__language_javascript__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__language_json__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__language_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__language_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__language_php__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__language_sql__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__language_sql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__language_sql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__language_python__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__language_python___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__language_python__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__language_java__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__language_java___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__language_java__);









let languages = {
    c : __WEBPACK_IMPORTED_MODULE_0__language_c___default.a,
    css : __WEBPACK_IMPORTED_MODULE_1__language_css___default.a,
    html : __WEBPACK_IMPORTED_MODULE_2__language_html___default.a,
    javascript : __WEBPACK_IMPORTED_MODULE_3__language_javascript___default.a,
    json : __WEBPACK_IMPORTED_MODULE_4__language_json___default.a,
    php : __WEBPACK_IMPORTED_MODULE_5__language_php__["a" /* default */],
    sql : __WEBPACK_IMPORTED_MODULE_6__language_sql___default.a,
    python : __WEBPACK_IMPORTED_MODULE_7__language_python___default.a,
    java : __WEBPACK_IMPORTED_MODULE_8__language_java___default.a
}

/* harmony default export */ __webpack_exports__["a"] = (languages);

/***/ })
/******/ ]);