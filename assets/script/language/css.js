let kit_css = [
    
    // {
    //     class : 'tag-name',
    //     pattern : /(&nbsp;)*[a-zA-Z]+(&nbsp;)*(?!-)(?=\{)/g
    // },
    {
        class : 'string',
        pattern : /(&apos;|&quot;).*(&apos;|&quot;)/g
    },
    {
        class : 'direct-descendent',
        pattern : /&gt;/g
    },
    {
        class : 'class',
        pattern : /\.[a-zA-Z\_]+[a-zA-Z0-9\-\_]*(?=\s*(\,|\:|\{|\<|~))/g
    },
    {
        class : 'constant-numeric',
        pattern : /\d+(px|em|cm|s|%|ms)/g
    },
    {
        class : 'hex-color',
        pattern : /#([a-f0-9]{3}|[a-f0-9]{6})(?=;|\s|,|\))/gi 
    },
    {
        class : 'id',
        pattern : /\#(?!\d)[\w\-_]+/g
    },
    {
        class : 'numeric-constant',
        pattern : /(\d+)/g
    },
    // {
    //     class : 'rgb',
    //     pattern : /(rgba)(?=\s*\()/g
    // },
    {
        class : 'rgb',
        pattern : /(rgb)(?=\s*\()/g
    },
    {
        class : 'comment',
        pattern : /\/\*[\s\S]*?\*\//gm 
    },
    {
        class : 'media',
        pattern : /@media/g
    },
    {
        class : 'universal-selector',
        pattern : /\*(?=\s*\n*\{)/g
    },
    {
        class : 'property-name',
        pattern : /[a-zA-Z]+[a-zA-Z\-]*(&nbsp;)*\:/g
    }
    
]

code_wrapper = document.querySelectorAll('[code-wrapper]')
pretty_code = document.getElementsByClassName('pretty-code')
textarea = document.getElementsByClassName('code-wrap-textarea')
console.log(code_wrapper)
console.log(pretty_code)

function htmlEntities(content){
    content = content.replaceAll(/</g, '&lt;');
    content = content.replaceAll(/>/g, '&gt;');
    content = content.replaceAll(/"/g, '&quot;')
    content = content.replaceAll(/'/g, '&apos;')
    content = content.replaceAll(/\{(?!\n+)/g, '{\n')
    content = content.replaceAll(/\n/g, '<br/>')
    content = content.replaceAll(/\s/g, '&nbsp;')


    return content
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  

function convert_to_pretty_code(pretty_code_change, textarea){
    let userCode = pretty_code_change.innerHTML
    userCode = userCode.trim()
    console.log(userCode)
    userCode = textarea.value
    userCode = htmlEntities(userCode)
    console.log(userCode)
    let pre = document.createElement('pre')
    let code = document.createElement('code')
    pre.appendChild(code)

    // userCode = userCode.replaceAll(/(?<!\S)(if)/g, '<span class="data-types">if</span>')
    for(i=0; i<kit_css.length; i++){
        result = userCode.match(kit_css[i].pattern)
        console.log(result)
        if(result){
            result = result.filter(onlyUnique);
            result.sort(function(a, b){
              // ASC  -> a.length - b.length
              // DESC -> b.length - a.length
              return b.length - a.length;
            });
            for(j=0; j<result.length; j++){
                if(result[j] != ''){
                    console.log('converting : ' + result[j] + 'to  ' + '<span class="' + kit_css[i].class + '">' + result[j] + '</span>')
                    userCode = userCode.replaceAll(result[j], '<span class="' + kit_css[i].class + '">' + result[j] + '</span>')
                }
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
    if(code_wrapper[k].attributes.datalang.nodeValue == 'css'){

        convert_to_pretty_code(pretty_code[k], textarea[0])
        textarea[0].remove()
    }
}
