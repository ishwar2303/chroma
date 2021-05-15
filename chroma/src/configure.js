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




// fetch target blocks with attribute = chroma
const fetchTargetElements = (options) => {
    let supportedLanguages = Chroma.supportedLangugaes()

    let blocks = document.querySelectorAll('[chroma]')
    blocks.forEach(block => {
        let code = block.innerHTML
        let attributes = block.attributes
        let heading = attributes.heading != undefined ? attributes.heading.nodeValue : false
        let copy = attributes.copy != undefined ? attributes.copy.nodeValue : false
        let lang = attributes.lang != undefined ? attributes.lang.nodeValue : false

        let lang_kit = Chroma.pickLanguage(supportedLanguages, lang)
        if(lang_kit){
            let result = convert(code, lang_kit, heading, copy)
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
*/

let options = {
    theme : 'dark'
}

fetchTargetElements(options)