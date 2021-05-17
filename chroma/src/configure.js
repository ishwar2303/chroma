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


/* Add chroma css */
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
        // pick language based on language attribute
        let lang_kit = Chroma.pickLanguage(supportedLanguages, lang)
        if(lang_kit){
            // send code for conversion
            let result = convert(code, lang_kit, header, heading, copy, loader, linepad)
            block.innerHTML = ''
            block.appendChild(result)
        }
        else{
            // language not supported
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
* Set theme = ['ace-dark', 'coffee', 'danger', 'dark', 'dreamweaver', 'light', 'twilight']
*/

let options = {
    theme : '',
}

fetchTargetElements(options)