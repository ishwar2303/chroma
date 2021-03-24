import language from './language-setting.js'
import convertToPrettyCode from './convert-to-pretty-code.js'

let prettyCodeContainer = document.querySelectorAll('[pretty-code]')
let prettyCodeHeader = document.getElementsByClassName('pretty-code-header')
let body = document.getElementsByTagName('body')[0]
let head = document.getElementsByTagName('head')[0]
    //console.log(prettyCodeContainer)

function linkMainCss() {
    let mainCss = document.createElement('link')
    mainCss.rel = 'stylesheet'
    mainCss.href = 'chroma-code-assets/css/main.css'
    head.appendChild(mainCss)
}

function createCopyButton(){
    let div = document.createElement('div')
    let button = document.createElement('button')
    button.className = 'pretty-code-copy-btn'
    button.innerHTML = 'Copy'
    div.appendChild(button)
    return div
}

function import_required_assets() {
    linkMainCss()

    let i, j, textarea, message
    let dataLanguage, link, userCodeContainer
    let languageCssPath = 'chroma-code-assets/css/language/'
    let languageSupported

    // console.log(language)
    for (i = 0; i < prettyCodeContainer.length; i++) {
        //console.log(prettyCodeContainer[i])
        dataLanguage = prettyCodeContainer[i].attributes[1].nodeValue
        languageSupported = false
        for (j = 0; j < language.length; j++) {
            if (language[j].lang == dataLanguage.toLowerCase())
                languageSupported = true
            if (language[j].lang == dataLanguage && !language[j].imported) {
                language[j].imported = true
                link = document.createElement('link')
                link.href = languageCssPath + dataLanguage + '.css'
                link.rel = 'stylesheet'
                head.appendChild(link)
                break;
            }
        }
        if (languageSupported) {
            prettyCodeHeader[i].appendChild(createCopyButton())
            userCodeContainer = prettyCodeContainer[i].getElementsByClassName('pretty-user-code')[0]
            textarea = prettyCodeContainer[i].getElementsByTagName('textarea')[0]
            if (textarea) {
                //console.log(textarea)
                // console.log(userCodeContainer)
                convertToPrettyCode(prettyCodeContainer[i], userCodeContainer, dataLanguage, textarea.value, i)
                    //textarea.remove()
            } else {
                console.error('textarea with corresponding code-wrapper not found')
                message = 'th'
                if (i == 0)
                    message = 'st'
                else if (i == 1)
                    message = 'nd'
                else if (i == 2)
                    message = '3rd'
                console.error('Check ' + (i + 1) + message + ' position code-wrapper in your code')
            }
        } else {
            console.error('Error : ' + dataLanguage + ' not supported')
            console.error('Check your spelling in data-lang attribute')
            console.error('check supported language from conversion.js')
        }
    }
}
import_required_assets()