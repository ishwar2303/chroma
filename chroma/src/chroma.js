/* Import all supported languages */
import c_kit from './language/c'
import html_kit from './language/html'
import sql_kit from './language/sql'
import css_kit from './language/css'
import js_kit from './language/javascript'

/* Add all languages to array */
export const languages = Array()

export var supportedLangugaes = () => {
    languages.push(c_kit)
    languages.push(html_kit)
    languages.push(sql_kit)
    languages.push(css_kit)
    languages.push(js_kit)
    return languages
}
supportedLangugaes()

/* Pick language for processing regex */
/*
* @param string
*/
export const pickLanguage = (lang) => {
    let pick = false
    languages.forEach((s) => {
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
export const overlapMatch = (start, end) => {
    return start >= end ? true : false
}

/*
* @param int
* @param int
* */
export const nullMatch = (start, end) => {
    return start != end ? true : false
}

/*
* @param string
*/
export const replaceMatch = (code) => {
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
/*
* @param string
* @param array
* @param int
*/
export const processCodeWithPatterns = (code, kit, offset) => {

    let pattern, i
    for(i=0; i<kit.length; i++){
        let result = processPattern(code, kit[i], offset)
        while(result){
            result = processPattern(result.remaining, kit[i], result.offset)
        }
    }

}

/* 
* Process code parts which belongs to other language
* @param string
*/
export const embeddOtherLanguages = (code) => {

    matches.forEach((m) => {
        if(m.embedded){
            let kit = pickLanguage(m.embedded)
            if(kit){
                processCodeWithPatterns(code.substring(m.start, m.end), kit.conversion, m.start)
            }
        }
    })

}

/*
* Returns highlighted version of code
* @param string
* @param string
*/
export const pretty = (code, lang) => {
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
export const preloader = () => {
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
export const presentation = (code, prettyCode, lineset, linepad, header, headingValue, lang, copy, loaderValue) => {

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

/*
* @param string
* @param string
* @param string
* @param string heading=""
* @param string copy=""
* @param string preloader=""
* @param html dob object
* */
export const convert = (code, lang, header, heading, copy, loader, linepad) => {
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


/* Add chroma css */
export const addUtilityCss = () => {
    let head = document.head
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'chroma/css/chroma.css'
    head.appendChild(link)
}
addUtilityCss()

export var selectedTheme = null

/*
* Default options
*/
export const defaultOptions = {
    theme : 'ace-dark',
}

/* set options 
* @param object
*/
export const setOptions = (options) => {
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

export const ChromaLocal = {
    pretty,
    setOptions
}

ChromaLocal.setOptions(defaultOptions)