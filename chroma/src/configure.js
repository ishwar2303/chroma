import {
    addUtilityCss,
    convert
} from './chroma'



// fetch target blocks with attribute = chroma
const fetchTargetElements = () => {

    addUtilityCss()
    
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
            let result = convert(code, lang, header, heading, copy, loader, linepad)
            block.innerHTML = ''
            block.appendChild(result)
        }
    })

}


fetchTargetElements()