import kit from './conversion.js'


function codeCopiedMessageBlock() {
    let msgContainer = document.createElement('div')
    msgContainer.innerHTML = 'Code Copied To Clipboard'
    msgContainer.className = 'code-copy-msg code-copy-msg-animate'
    document.body.appendChild(msgContainer)
    return msgContainer
}


function htmlEntities(content) {
    content = content.replaceAll(/</g, '&lt;')
    content = content.replaceAll(/>/g, '&gt;')
    content = content.replaceAll(/"/g, '&quot;')
    content = content.replaceAll(/'/g, '&apos;')
    content = content.replaceAll(/\//g, '&sol;')
    return content
}


let index

function copyToClipboard(index) {
    let codeTextarea = document.getElementsByClassName('pretty-code-wrapper')[index].getElementsByTagName('textarea')[0]
    console.log(index)
    let copyCode = codeTextarea.value.trim()
    console.log('Copy Code')
    console.log(copyCode)
    let textarea = document.createElement('textarea')
        //textarea.style.display = 'none'
    textarea.value = copyCode
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    let msgBlock = codeCopiedMessageBlock()
    msgBlock.style.display = 'block'
    setTimeout(() => {
            msgBlock.remove()
        }, 1500)
        //alert('code copied successfully!');
}


export default function convertToPrettyCode(prettyCodeContainer, contentContainer, dataLanguage, content, index) {

    contentContainer.innerHTML = 'Loading...'
    contentContainer.style.display = 'block'

    let i, j, languageKit
    content = '\n' + content
        //content = content.trim()
    content = htmlEntities(content)
        //console.log(content)
    let pre = document.createElement('pre')
    let code = document.createElement('code')
    pre.appendChild(code)


    for (i = 0; i < kit.length; i++) {
        if (kit[i].lang == dataLanguage) {
            languageKit = kit[i].conversion
            for (j = 0; j < languageKit.length; j++) {
                content = content.replaceAll(languageKit[j].pattern, '<span class="' + languageKit[j].class + '">' + '$&' + '</span>')
            }
            break;
        }
    }

    //console.log('converting...')
    // console.log(kit)
    //console.log(content)
    code.innerHTML = content.trim()
    let lineNoContainer = document.createElement('div')
    lineNoContainer.className = 'line-no'
    let lineSpan
    let lineNoSpan
    let codeLines = code.innerHTML.split("\n")
        //console.log('lines : ' + codeLines.length)
        //console.log(codeLines)
    code.innerHTML = ''
    for (i = 0; i < codeLines.length; i++) {
        lineSpan = document.createElement('span')
        if (codeLines[i] != '') {
            lineSpan.innerHTML = codeLines[i]
            lineSpan.className = 'code-line'
        } else {
            lineSpan.innerHTML = '<br/>'
            lineSpan.className = 'line-break'
        }
        code.appendChild(lineSpan)
        lineNoSpan = document.createElement('span')
        lineNoSpan.innerHTML = i + 1;
        lineNoContainer.appendChild(lineNoSpan)
    }
    pre.appendChild(lineNoContainer)
    pre.appendChild(code)
    pre.style.paddingBottom = '5px'
    contentContainer.style.display = 'flex'
    contentContainer.style.flexDirection = 'row'
    if (dataLanguage == 'javascript' || dataLanguage == 'cpp')
        pre.style.color = 'rgb(165 217 233)'
    setTimeout(() => {
        contentContainer.innerHTML = ''
        contentContainer.appendChild(pre)
        document.getElementsByClassName('pretty-code-copy-btn')[index].addEventListener('click', () => {
            copyToClipboard(index)
        })
    }, 1000)


}