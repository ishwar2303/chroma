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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__language_c__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__language_c___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__language_c__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__language_html__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__language_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__language_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__language_sql__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__language_sql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__language_sql__);
/* Import all supported languages */




/* Add all languages to array */
var supportedLangugaes = () => {
    let set = Array()
    set.push(__WEBPACK_IMPORTED_MODULE_0__language_c___default.a)
    set.push(__WEBPACK_IMPORTED_MODULE_1__language_html___default.a)
    set.push(__WEBPACK_IMPORTED_MODULE_2__language_sql___default.a)
    return set
}

/* Pick language for processing regex */
/*
* @param Array
* @param string
*/
const pickLanguage = (support, lang) => {
    let pick = false
    support.forEach((s) => {
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
const nestedMatch = (start, end) => {
    return start >= end ? true : false;
}
/* unused harmony export nestedMatch */


/*
* @param string
*/
const replaceMatch = (code) => {
    let endPos = 0

    matches.forEach((m) => {
        // console.log(m.start, m.end)
        if(nestedMatch(m.start, endPos)){
            beautify += '<span class="' + 'plain-text">' + code.substring(endPos, m.start)  + '</span>'
            beautify += '<span class="' + m.class.replace(/\./g, ' ') + '">' + m.value + '</span>'
            endPos = m.end
        }
    })
    beautify += code.substr(endPos, code.length)
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
    let obj = {
        value : match[0],
        start : startPos,
        end : endPos,
        class : patt.class
    }
    matches.push(obj)
    // console.log(patt)
    return {
        remaining : code.substr(endPos - offset),
        offset : endPos
    }


}
/* unused harmony export processPattern */

/*
* @param string
* @param array
*/
const processCodeWithPatterns = (code, kit) => {

    let pattern, i
    for(i=0; i<kit.length; i++){
        let result = processPattern(code, kit[i])
        while(result){
            result = processPattern(result.remaining, kit[i], result.offset)
        }
    }

    matches.sort((a, b) => {return a.start - b.start})
    console.log(matches)
}
/* unused harmony export processCodeWithPatterns */



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
* Preparing front end output
* Set code copy button
* @param string
* @param dom object
* @param string
* @param string
* @param boolean
*/ 
const presentation = (code, lineSet, headingValue, lang, copy) => {
    if(!headingValue)
        headingValue = lang.toUpperCase()
    let main = document.createElement('div')
    main.className = 'chroma'
    let chromaHeader = document.createElement('div')
    chromaHeader.className = 'chroma-head chroma-sb'
    let heading = document.createElement('div')
    heading.innerHTML = headingValue
    let btn = document.createElement('button')
    if(copy == 'true'){
        btn.innerHTML = 'Copy'
        btn.className = 'chroma-copy'
        btn.addEventListener('click', () => {
            chromaCopy(btn, resetEntities(code), 'Code copied successfully')
        })
    }
    chromaHeader.appendChild(heading)
    if(copy == 'true')
        chromaHeader.appendChild(btn)
    
    let result = document.createElement('div')
    result.className = 'chroma-beautify chroma-flex-row'
    let pre = document.createElement('pre')
    let codeBlock = document.createElement('code')
    codeBlock.innerHTML = beautify
    pre.appendChild(codeBlock)

    result.appendChild(lineSet)
    result.appendChild(pre)
    main.appendChild(chromaHeader)
    main.appendChild(result)
    return main

}
/* unused harmony export presentation */


/*
* @param string
* @param object
* @param string
* */
const convert = (code, lang_kit, heading, copy) => {
    matches = Array()
    beautify = ''

    code = convertEntities(code).trim()
    let codeLines = separatecodeLines(code)
    let totalLines = codeLines.length
    
    processCodeWithPatterns(code, lang_kit.conversion)

    replaceMatch(code)

    let lineSet = prepareCodeLines(totalLines)
    let result = presentation(code, lineSet, heading, lang_kit.lang, copy)

    return result
}
/* harmony export (immutable) */ __webpack_exports__["b"] = convert;


const defaultOptions = {
    theme : 'light'
}
/* harmony export (immutable) */ __webpack_exports__["c"] = defaultOptions;


const setOptions = (options) => {
    let head = document.head
    let link
    let theme = options.theme
    if(theme){
        link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'chroma/themes/' + theme + '.css'
        head.appendChild(link)
    }
}
/* unused harmony export setOptions */


const Chroma = {
    supportedLangugaes,
    pickLanguage,
    setOptions
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Chroma;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chroma__ = __webpack_require__(0);





// fetch target blocks with attribute = chroma
const fetchTargetElements = (options) => {
    let supportedLanguages = __WEBPACK_IMPORTED_MODULE_0__chroma__["a" /* Chroma */].supportedLangugaes()

    let blocks = document.querySelectorAll('[chroma]')
    blocks.forEach(block => {
        let code = block.innerHTML
        let attributes = block.attributes
        let heading = attributes.heading != undefined ? attributes.heading.nodeValue : false
        let copy = attributes.copy != undefined ? attributes.copy.nodeValue : false
        let lang = attributes.lang != undefined ? attributes.lang.nodeValue : false

        let lang_kit = __WEBPACK_IMPORTED_MODULE_0__chroma__["a" /* Chroma */].pickLanguage(supportedLanguages, lang)
        if(lang_kit){
            let result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__chroma__["b" /* convert */])(code, lang_kit, heading, copy)
            block.innerHTML = ''
            block.appendChild(result)
        }
        else{
            console.error('Set lang="" attribute and specify language, Check supported languages')
        }
    })
    let theme = options.theme != '' ? options.theme : __WEBPACK_IMPORTED_MODULE_0__chroma__["c" /* defaultOptions */].theme
    options = {
        theme : theme
    }
    __WEBPACK_IMPORTED_MODULE_0__chroma__["a" /* Chroma */].setOptions(options)
}

/*
* Set options
*/

let options = {
    theme : 'dark'
}

fetchTargetElements(options)

/***/ }),
/* 2 */
/***/ (function(module, exports) {

let kit = {
    lang : 'c',
    conversion : [
        {
            class: 'meta.preprocessor',
            pattern: /\#([\S\s]*?)$/gm
        },
        {
            class: 'constant.numeric',
            pattern: /\b\d+\b/g
        },
        {
            class : 'comment',
            pattern : /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g
        },
        {
            class: 'keyword',
            pattern: /\b(void|int|float|double|char|long|short|signed|unsigned)\b/g
        },
        {
            class: 'storage.modifier',
            pattern: /\b(static|extern|auto|register|volatile|inline)\b/g
        },
        {
            class: 'support.type',
            pattern: /\b(struct|union|enum)\b/g
        },
        {
            class : 'string',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class : 'entitiy.name.function',
            pattern : /(?<=(\w|\*)+)(\s|\n)+((\w+)(?= ?\())/g
        }
    ]
    
}

module.exports = kit

/***/ }),
/* 3 */
/***/ (function(module, exports) {

let kit = {
    lang : 'html',
    conversion : [{
            class: 'attribute-name',
            pattern: /(?<=(\s)*)[a-zA-Z\-]+(?=(\s)*=(&quot;))/g
        }, 
        {
            class: 'comment',
            pattern: /&lt;!--(.*\n.*)*--&gt;/g
        },
        {
            class: 'string',
            pattern: /&apos;[^&]*[^a]*[^p]*[^o]*[^s]*[^;]*&apos;/g
        },
        {
            class: 'string',
            pattern: /&quot;[^&]*[^q]*[^u]*[^o]*[^t]*[^;]*&quot;/g
        },
        {
            class: 'doc-type',
            pattern: /(?<=&lt;)(!DOCTYPE)(?=&nbsp;)/g
        },
        {
            class: 'start-tag-name',
            pattern: /((?<=(&nbsp;)*))html(?=&gt;)/g
        },
        {
            class: 'start-tag-name',
            pattern: /(?<=&lt;(&nbsp;)*)[a-zA-Z0-9]+/g
        },
        {
            class: 'close-tag-name',
            pattern: /(?<=&sol;(&nbsp;)*)[a-zA-Z0-9]+(?=(&nbsp;)*&gt;)/g
        },
        {
            class: 'start-tag',
            pattern: /&lt;/g
        },
        {
            class: 'close-tag',
            pattern: /&gt;/g
        }
    ]
    
}

module.exports = kit

/***/ }),
/* 4 */
/***/ (function(module, exports) {

let kit = {
    lang : 'sql',
    conversion : [
        {
            class : 'string',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class: 'comment',
            pattern: /--.*$|\/\*[\s\S]*?\*\/|(\/\/)[\s\S]*?$/gm
        },
        {
            class: 'constant.numeric',
            pattern: /\b(\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+)\b/gi
        },
        {
            class: 'function.call',
            pattern: /(\w+?)(?=\()/g
        },
        {
            class: 'keyword',
            pattern: /\b(ABSOLUTE|ACTION|ADA|ADD|ALL|ALLOCATE|ALTER|AND|ANY|ARE|AS|ASC|ASSERTION|AT|AUTHORIZATION|AVG|BEGIN|BETWEEN|BIT|BIT_LENGTH|BOTH|BY|CASCADE|CASCADED|CASE|CAST|CATALOG|CHAR|CHARACTER|CHARACTER_LENGTH|CHAR_LENGTH|CHECK|CLOSE|COALESCE|COLLATE|COLLATION|COLUMN|COMMIT|CONNECT|CONNECTION|CONSTRAINT|CONSTRAINTS|CONTINUE|CONVERT|CORRESPONDING|COUNT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATE|DAY|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DELETE|DESC|DESCRIBE|DESCRIPTOR|DIAGNOSTICS|DISCONNECT|DISTINCT|DOMAIN|DOUBLE|DROP|ELSE|END|END-EXEC|ESCAPE|EXCEPT|EXCEPTION|EXEC|EXECUTE|EXISTS|EXTERNAL|EXTRACT|FALSE|FETCH|FIRST|FLOAT|FOR|FOREIGN|FORTRAN|FOUND|FROM|FULL|GET|GLOBAL|GO|GOTO|GRANT|GROUP|HAVING|HOUR|IDENTITY|IMMEDIATE|IN|INCLUDE|INDEX|INDICATOR|INITIALLY|INNER|INPUT|INSENSITIVE|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|IS|ISOLATION|JOIN|KEY|LANGUAGE|LAST|LEADING|LEFT|LEVEL|LIKE|LIMIT|LOCAL|LOWER|MATCH|MAX|MIN|MINUTE|MODULE|MONTH|classS|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONE|NOT|NULL|NULLIF|NUMERIC|OCTET_LENGTH|OF|ON|ONLY|OPEN|OPTION|OR|ORDER|OUTER|OUTPUT|OVERLAPS|PAD|PARTIAL|PASCAL|POSITION|PRECISION|PREPARE|PRESERVE|PRIMARY|PRIOR|PRIVILEGES|PROCEDURE|PUBLIC|READ|REAL|REFERENCES|RELATIVE|RESTRICT|REVOKE|RIGHT|ROLLBACK|ROWS|SCHEMA|SCROLL|SECOND|SECTION|SELECT|SESSION|SESSION_USER|SET|SIZE|SMALLINT|SOME|SPACE|SQL|SQLCA|SQLCODE|SQLERROR|SQLSTATE|SQLWARNING|SUBSTRING|SUM|SYSTEM_USER|TABLE|TEMPORARY|THEN|TIME|TIMESTAMP|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TRAILING|TRANSACTION|TRANSLATE|TRANSLATION|TRIM|TRUE|UNION|UNIQUE|UNKNOWN|UPDATE|UPPER|USAGE|USER|USING|VALUE|VALUES|VARCHAR|VARYING|VIEW|WHEN|WHENEVER|WHERE|WITH|WORK|WRITE|YEAR|ZONE|USE)(?=\b)/gi
        },
        {
            class: 'keyword.operator',
            pattern: /\+|\!|\-|&(gt|lt|amp);|\||\*|=/g
        }
    ]
    
}

module.exports = kit

/***/ })
/******/ ]);