import {
    matches, 
    beautify, 
    convertEntities, 
    resetEntities, 
    separatecodeLines, 
    prepareCodeLines, 
    nestedMatch, 
    replaceMatch, 
    matchesSorting, 
    processPattern, 
    processCodeWithPatterns, 
    chromaCopy,
    convert,
    Chroma,
    defaultOptions,
} from './chroma'


const addUtilityCss = () => {
    let head = document.head
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'chroma/css/chroma.css'
    head.appendChild(link)
}


// fetch target blocks with attribute = chroma
const fetchTargetElements = (options) => {

    addUtilityCss()

    let supportedLanguages = Chroma.supportedLangugaes()

    let blocks = document.querySelectorAll('[chroma]')
    blocks.forEach(block => {
        let code = block.innerHTML
        let attributes = block.attributes
        let heading = attributes.heading != undefined ? attributes.heading.nodeValue : false
        let copy = attributes.copy != undefined ? attributes.copy.nodeValue : false
        let lang = attributes.language != undefined ? attributes.language.nodeValue : false
        let loader = attributes.preloader != undefined ? attributes.preloader : false
        let lang_kit = Chroma.pickLanguage(supportedLanguages, lang)
        if(lang_kit){
            let result = convert(code, lang_kit, heading, copy, loader)
            block.innerHTML = ''
            block.appendChild(result)
        }
        else{
            console.error('Set lang="" attribute and specify language, Check supported languages')
        }
    })
    let theme = options.theme != '' ? options.theme : defaultOptions.theme
    options = {
        theme : theme
    }
    Chroma.setOptions(options)
}

/*
* Set options
* Set theme = ['ace-dark', 'coffee', 'danger', 'dark', 'dreamviewer', 'light', 'twilight']
*/

let options = {
    theme : '',
}

fetchTargetElements(options)