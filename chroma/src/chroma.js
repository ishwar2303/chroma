/* Import all supported languages */
import c_kit from './language/c'
import html_kit from './language/html'
import sql_kit from './language/sql'
import css_kit from './language/css'
import js_kit from './language/javascript'
/* Add all languages to array */
export var supportedLangugaes = () => {
    let set = Array()
    set.push(c_kit)
    set.push(html_kit)
    set.push(sql_kit)
    set.push(css_kit)
    set.push(js_kit)
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
        // console.log(m.start, m.end)
        if(overlapMatch(m.start, endPos)){

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
    // console.log('HTML searching...')
    // console.log(code.substring(startPos, endPos))
    matches.push(obj)
    // console.log(patt)
    return {
        remaining : code.substring(endPos - offset),
        offset : endPos
    }


}
/*
* @param string
* @param array
*/
export const processCodeWithPatterns = (code, kit, offset) => {

    let pattern, i
    for(i=0; i<kit.length; i++){
        let result = processPattern(code, kit[i], offset)
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
export const presentation = (code, lineset, linepad, header, headingValue, lang, copy, loaderValue) => {

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
    let pre = document.createElement('pre')
    pre.style.margin = 0
    pre.style.fontFamily = ''
    let codeBlock = document.createElement('code')
    codeBlock.innerHTML = beautify
    pre.appendChild(codeBlock)

    if(linepad === 'true')
        sub.appendChild(lineset)

    sub.appendChild(pre)
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
* @param object
* @param string heading=""
* @param string copy=""
* @param string preloader=""
* */
export const convert = (code, lang_kit, header, heading, copy, loader, linepad) => {
    matches = Array()
    beautify = ''

    code = convertEntities(code).trim()
    let codeLines = separatecodeLines(code)
    let totalLines = codeLines.length
    
    processCodeWithPatterns(code, lang_kit.conversion, 0)
    // console.log(code)
    replaceMatch(code)

    let lineSet = prepareCodeLines(totalLines)
    let result = presentation(code, lineSet, linepad, header, heading, lang_kit.lang, copy, loader)

    return result
}

export const defaultOptions = {
    theme : 'ace-dark',
}

/* set options */
export const setOptions = (options) => {
    let head = document.head
    let link, style
    let theme = options.theme

    // add theme css file in head of dcoument
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