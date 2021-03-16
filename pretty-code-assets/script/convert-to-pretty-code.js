
import kit from './conversion.js'

function htmlEntities(content){
    content = content.replaceAll(/</g, '&lt;');
    content = content.replaceAll(/>/g, '&gt;');
    content = content.replaceAll(/"/g, '&quot;')
    content = content.replaceAll(/'/g, '&apos;')
    return content
}

export default function convertToPrettyCode(prettyCodeContainer, contentContainer, dataLanguage, content){
    let i, j, languageKit

    content = content.trim()
    content = htmlEntities(content)
    console.log(content)
    let pre = document.createElement('pre')
    let code = document.createElement('code')
    pre.appendChild(code)


    for(i=0; i<kit.length; i++){
        if(kit[i].lang == dataLanguage){
            languageKit = kit[i].conversion
            for(j=0; j<languageKit.length; j++){
                content = content.replaceAll(languageKit[j].pattern, '<span class="' + languageKit[j].class + '">' + '$&' + '</span>')
            }
            break;
        }
    }

    console.log('converting...')
    // console.log(kit)
    console.log(content)
    code.innerHTML = content
    pre.appendChild(code)
    pre.style.paddingBottom = '5px'
    contentContainer.innerHTML = 'Loading...'
    contentContainer.style.display = 'block'
    
    setTimeout(() =>{
        contentContainer.innerHTML = ''
        contentContainer.appendChild(pre)
    }, 1000)
    
}