/* Import all supported languages */
import all_languages from './merge-kit'

/* Pick language for processing regex */
/*
* @param string
*/
export const pickLanguage = (lang) => {
    if(lang in all_languages)
        return all_languages[lang]
    else return false
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
    let ff = 'font-family: monaco, courier, monospace; min-height: 15px;'
    return '<pre style="margin:0;' + ff + '"><code style="' + ff + '">' + beautify + '</code></pre>'
}

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
    let bg = btn.style.background
    if(copyCode != ''){
        btn.style.background = '#bc5cff'
        btn.style.color=  'white'
        btn.innerHTML = 'Code Copied'
    }
    else{
        btn.innerHTML = 'Empty cannot be copied'
    }   
    btn.disabled = true
    setTimeout(() => {
        btn.style.background = bg
        btn.style.color = 'black'
        btn.innerHTML = 'Copy'
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
    main.className = 'loading'
    main.innerHTML = '<div class="dot"></div>'
    main.innerHTML += '<div class="dot"></div>'
    main.innerHTML += '<div class="dot"></div>'
    main.innerHTML += '<div class="dot"></div>'
    main.innerHTML += '<div class="dot"></div>'
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
* @param boolean
* @param boolean
* @param integer
*/ 
export const presentation = (code, prettyCode, lineset, linepad, header, headingValue, lang, copy, loaderValue) => {
    let delay = 2000
    if(!isNaN(loaderValue))
        delay = loaderValue*1000
    if(!headingValue)
        headingValue = lang.toUpperCase()
    let main = document.createElement('div')
    main.className = 'chroma'
    main.style.fontFamily = 'monaco, courier, monospace'
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
let chromaCss = false
export const addUtilityCss = () => {
    let head = document.head
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'chroma/css/chroma.css'
    head.appendChild(link)
    chromaCss = true
}

export const updateTheme = (theme) => {
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

export var selectedTheme = null


/*
* Default options
*/
export var cacheOptions = {
    theme : 'dark',
    bold : false,
    capital : false
}

let boldStyle, capitalStyle
/* set options 
* @param object
*/
export const setOptions = (options) => {
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

/*
* public methods
*/
export const ChromaLocal = {
    pretty,
    setOptions,
    cacheOptions
}
// chroma presentation css
if(!chromaCss)
    addUtilityCss()

updateTheme('dark')
// Chroma = ChromaLocal
