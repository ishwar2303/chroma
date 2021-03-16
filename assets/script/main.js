
let body = document.getElementsByTagName('body')[0]

let code_wrapper = document.querySelectorAll('[code-wrapper]')

let modules = [
    {
        lang : 'javascript',
        import : false
    },
    {
        lang : 'css',
        import : false
    }
]

let i
let head = document.getElementsByTagName('head')[0]
function import_required_assets(code_wrapper, data_lang){
    let script
    let link
    for(i=0; i<modules.length; i++){
        if(modules[i].lang == data_lang && !modules[i].import){
            modules[i].import = true
            script = document.createElement('script')
            script.src = 'assets/script/language/' + data_lang + '.js'
            link = document.createElement('link')
            link.href = 'assets/css/language/' + data_lang + '.css'
            link.rel = 'stylesheet'
            head.appendChild(link)
            body.appendChild(script)
        }
            
    }
}
let k
for(k=0; k<code_wrapper.length; k++){
    import_required_assets(code_wrapper[k], code_wrapper[k].attributes.datalang.nodeValue)
}



