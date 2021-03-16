let kit_js = [
    {
        class : 'red-keywords',
        pattern : /(?<![.*])(function)\s/g
    },
    {
        class : 'red-keywords',
        pattern : /(?<!\S)(alert|if|while|for|do)/g
    },
    {
        class : 'red-keywords',
        pattern : /(?<=\s)return\s*;?/g
    },
    {
        class : 'data-types',
        pattern : /(?<![.*])(let|var|const|true|false|null|public|protected|new|static|this|in|private)\s/g
    },
    {
        class : 'comment',
        pattern : /\/\*[\s\S]*?\*\//gm 
    },
    {
        class : 'string',
        pattern : /(&apos;|&quot;).*(&apos;|&quot;)/g
    },
    {
        class : 'comment',
        pattern : /(\/\/).*[\n\r]/g
    },
    {
        class : 'data-types',
        pattern : /(window|document)/g
    },
    {
        class : 'data-types',
        pattern : /(setTimeout|setInterval)(?=\()/g
    }
]

code_wrapper = document.querySelectorAll('[code-wrapper]')
pretty_code = document.getElementsByClassName('pretty-code')
console.log(code_wrapper)
console.log(pretty_code)

function htmlEntities(content){
    content = content.replaceAll(/</g, '&lt;');
    content = content.replaceAll(/>/g, '&gt;');
    content = content.replaceAll(/"/g, '&quot;')
    content = content.replaceAll(/'/g, '&apos;')
    return content
}


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
function convert_to_pretty_code(pretty_code_change){
    let userCode = pretty_code_change.innerHTML
    userCode = userCode.trim()
    userCode = htmlEntities(userCode)
    let pre = document.createElement('pre')
    let code = document.createElement('code')
    pre.appendChild(code)

    // userCode = userCode.replaceAll(/(?<!\S)(if)/g, '<span class="data-types">if</span>')
    for(i=0; i<kit_js.length; i++){
        result = userCode.match(kit_js[i].pattern)
        console.log(result)
        if(result){
            result = result.filter(onlyUnique);
            for(j=0; j<result.length; j++){
                userCode = userCode.replaceAll(result[j], '<span class="' + kit_js[i].class + '">' + result[j] + '</span>')
            }
        }
    }
    console.log(userCode)
    code.innerHTML = userCode
    pretty_code_change.innerHTML = 'Loading...'
    pretty_code_change.style.display = 'block'
    setTimeout(() => {
        pretty_code_change.innerHTML = ''
        pretty_code_change.appendChild(pre)
    }, 2000)
}

for(k=0; k<code_wrapper.length; k++){
    if(code_wrapper[k].attributes.datalang.nodeValue == 'javascript'){
        console.log('run' + ' ' + k+1)
        convert_to_pretty_code(pretty_code[k])
    }
}