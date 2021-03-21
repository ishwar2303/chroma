import language from './language-setting.js'
import convertToPrettyCode from './convert-to-pretty-code.js'

let prettyCodeContainer = document.querySelectorAll('[pretty-code]')
let body = document.getElementsByTagName('body')[0]
let head = document.getElementsByTagName('head')[0]
    //console.log(prettyCodeContainer)

function import_required_assets() {
    let i, j, textarea, message
    let dataLanguage, link, userCodeContainer
    let languageCssPath = 'pretty-code-assets/css/language/'
    let languageSupported
        // console.log(language)
    for (i = 0; i < prettyCodeContainer.length; i++) {
        //console.log(prettyCodeContainer[i])
        dataLanguage = prettyCodeContainer[i].attributes[1].nodeValue
        languageSupported = false
        for (j = 0; j < language.length; j++) {
            if (language[j].lang == dataLanguage)
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