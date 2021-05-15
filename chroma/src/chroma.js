/* Import all supported languages */
import c_kit from './language/c'
import html_kit from './language/html'
import sql_kit from './language/sql'

/* Add all languages to array */
export var supportedLangugaes = () => {
    let set = Array()
    set.push(c_kit)
    set.push(html_kit)
    set.push(sql_kit)
    return set
}

/* Pick language for processing regex */
/*
* @param Array
* @param string
*/
export const pickLanguage = (support, lang) => {
    let pick = false
    support.forEach((s) => {
        if(s.lang == lang){
            pick = s
            return
        }
    })

    return pick
}

/*
* @param Array of object
* @param string
*/ 
export var matches = Array() // all matches with start and end position
export var beautify = '' // final beautiful version of code

// @param string
export const convertEntities = (code) => {
    return code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// @param string
export const resetEntities = (code) => {
    return code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
}

// @param string
export const separatecodeLines = (code) => {
    return code.split("\n");
}

// @param int
export const prepareCodeLines = (len) => {
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

/*
* @param int
* @param int
* */
export const nestedMatch = (start, end) => {
    return start >= end ? true : false;
}

/*
* @param string
*/
export const replaceMatch = (code) => {
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

// sorting matches in ascending order
// helps in finding matches overlaps
export const matchesSorting = (a, b) => {
    if(a.start < b.start)
        return true
    else return false
}

/*
* @param string
* @param object
* @param int
*/
export const processPattern = (code, patt, offset) => {
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
/*
* @param string
* @param array
*/
export const processCodeWithPatterns = (code, kit) => {

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
export const presentation = (code, lineSet, headingValue, lang, copy) => {
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

/*
* @param string
* @param object
* @param string
* */
export const convert = (code, lang_kit, heading, copy) => {
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

export const defaultOptions = {
    theme : 'light'
}

export const setOptions = (options) => {
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

export const Chroma = {
    supportedLangugaes,
    pickLanguage,
    setOptions
}