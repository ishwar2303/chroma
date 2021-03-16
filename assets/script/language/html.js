let kit_html = [
    
    {
        class : 'attribute-name',
        pattern : /(?<=(&nbsp;)*)[a-zA-Z\-]+(?=(&nbsp;)*=(&quot;))/g
    },
    {
        class : 'doc-type',
        pattern : /(?<=&lt;)(!DOCTYPE)(?=&nbsp;)/g
    },
    {
        class : 'start-tag-name',
        pattern : /((?<=(&nbsp;)*))html(?=&gt;)/g
    },
    {
        class : 'string',
        pattern : /(&quot;)[a-zA-Z0-9-_\/:=,\.&nbsp;]+(&quot;)/g
    },
    {
        class : 'comment',
        pattern : /(&lt;!--)(\n|\r)*.*(\n|\r)*(--&gt;)/g
    },
    {
        class : 'start-tag-name',
        pattern : /(?<=&lt;(&nbsp;)*)[a-zA-Z0-9]+/g
    },
    {
        class : 'close-tag-name',
        pattern : /(?<=\/(&nbsp;)*)[a-zA-Z]+(?=(&nbsp;)*&gt;)/g
    },
    {
        class : 'start-tag',
        pattern : /&lt;/g
    },
    {
        class : 'close-tag',
        pattern : /&gt;/g
    },
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

    console.log('converting...')
    for(i=0; i<kit_html.length; i++){
        userCode = userCode.replaceAll(kit_html[i].pattern, '<span class="' + kit_html[i].class + '">' + '$&' + '</span>')
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

    if(code_wrapper[k].attributes.datalang.nodeValue == 'html'){
        convert_to_pretty_code(pretty_code[k], textarea[0])
        textarea[0].remove()
    }
}
