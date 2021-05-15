let c_kit = {
    lang : 'c',
    conversion : [
        {
            name: 'meta.preprocessor',
            pattern: /\#([\S\s]*?)$/gm
        },
        {
            name: 'constant.numeric',
            pattern: /\b\d+\b/g
        },
        {
            name : 'comment',
            pattern : /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g
        },
        {
            name: 'keyword',
            pattern: /\b(int|float|double|char)\b/g
        },
        {
            name: 'storage.modifier',
            pattern: /\b(static|extern|auto|register|volatile|inline)\b/g
        },
        {
            name: 'support.type',
            pattern: /\b(struct|union|enum)\b/g
        },
        {
            name : 'string',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
    ]
    
}
class chroma{

    constructor(){
        this.matches = Array()
        this.output = ''
    }

    // @param string
    convertEntities = (code) => {
        return code.replace(/</g, '&lt;');
    }

    // @param string
    resetEntities = (code) => {
        return code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    }

    // @param string
    separatecodeLines = (code) => {
        return code.split("\n");
    }

    // @param int
    prepareCodeLines = (len) => {
        let i, span
        let lineSet = document.createElement('div')
        lineSet.className = 'chroma-line-no'
        for(i=1; i<=len; i++){
            span = document.createElement('span')
            span.innerHTML = i
            lineSet.appendChild(span)
        }
        return lineSet
    }
    
    /*
    * @param int
    * @param int
    * */
    nestedMatch = (start, end) => {
        return start >= end ? true : false;
    }

    /*
    * @param string
    */
    replaceMatch = (code) => {
        console.log("Code length : " + code.length)
        let endPos = 0

        this.matches.forEach((m) => {
            console.log(m.start, m.end)
            if(this.nestedMatch(m.start, endPos)){
                this.output += '<span class="' + 'plain-text">' + code.substring(endPos, m.start)  + '</span>'
                this.output += '<span class="' + m.class.replace(/\./, ' ') + '">' + m.value + '</span>'
                endPos = m.end
            }
        })
        this.output += code.substr(endPos, code.length)
    }

    // sorting matches in ascending order
    // helps in finding matches overlaps
    matchesSorting = (a, b) => {
        if(a.start < b.start)
            return true
        else return false
    }

    /*
    * @param string
    * @param object
    * @param int
    */
    processPattern = (code, patt, offset) => {
        if(offset === void 0)
            offset = 0
        var pattern = new RegExp(patt.pattern)
        let match = pattern.exec(code)
        let startPos, endPos
        if(!match){ // no match found
            return false
        }

        startPos = match.index + offset
        endPos = startPos + match[0].length
        let obj = {
            value : match[0],
            start : startPos,
            end : endPos,
            class : patt.name
        }
        this.matches.push(obj)
        // console.log(patt)
        return {
            remaining : code.substr(endPos - offset),
            offset : endPos
        }


    }
    /*
    * @param string
    * @param array
    */
    processCodeWithPatterns = (code, kit) => {

        let pattern, i
        for(i=0; i<kit.length; i++){
            let result = this.processPattern(code, kit[i])
            while(result){
                result = this.processPattern(result.remaining, kit[i], result.offset)
            }
        }

        this.matches.sort((a, b) => {return a.start - b.start})
    }

    /*
    * Preparing front end output
    * Set code copy button
    */ 
    presentation = (code, lineSet, headingValue, lang, copy) => {
        if(!headingValue)
            headingValue = lang.toUpperCase()
        let main = document.createElement('div')
        main.className = 'chroma'
        let chromaHeader = document.createElement('div')
        chromaHeader.className = 'chroma-head chroma-sb'
        let heading = document.createElement('div')
        heading.innerHTML = headingValue
        let btn = document.createElement('button')
        if(copy == 'true'){
            btn.innerHTML = 'Copy'
            btn.className = 'chroma-copy'
            btn.addEventListener('click', () => {
                copyToClipboard(btn, this.resetEntities(code), 'Code copied successfully')
            })
        }
        chromaHeader.appendChild(heading)
        if(copy == 'true')
            chromaHeader.appendChild(btn)
        
        let result = document.createElement('div')
        result.className = 'chroma-beautify chroma-flex-row'
        let pre = document.createElement('pre')
        let codeBlock = document.createElement('code')
        codeBlock.innerHTML = this.output
        pre.appendChild(codeBlock)

        result.appendChild(lineSet)
        result.appendChild(pre)
        main.appendChild(chromaHeader)
        main.appendChild(result)
        return main

    }

    /*
    * @param string
    * @param object
    * @param string
    * */
    convert = (code, lang_kit, heading, copy) => {

        code = this.convertEntities(code).trim()
        let codeLines = this.separatecodeLines(code)
        let totalLines = codeLines.length
        
        this.processCodeWithPatterns(code, lang_kit.conversion)

        console.log(this.matches)
        this.replaceMatch(code)

        let lineSet = this.prepareCodeLines(totalLines)
        let result = this.presentation(code, lineSet, heading, lang_kit.lang, copy)

        return result
    }

    // copy code
}

/*
* @param dom html object
* @param string
* @param string
*/
const copyToClipboard = (btn, copyCode, message) => {
    btn.disabled = true
    copyCode = copyCode.trim()
    let textarea = document.createElement('textarea')
    let body = document.body
    textarea.type = 'hidden'
    textarea.value = copyCode
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    body.removeChild(textarea)
    textarea.remove()
    let msg = document.createElement('div')
    if(copyCode != ''){
        msg.className = 'chroma-copy-msg'
        msg.innerHTML = message
    }
    else{
        msg.className = 'chroma-copy-msg'
        msg.innerHTML = 'Empty cannot be copied'
    }
    body.appendChild(msg)   
    setTimeout(() => {
        msg.remove()
        btn.disabled = false
    }, 2000)
}
// fetch target blocks with attribute = chroma
const fetchTargetElements = () => {
    let blocks = document.querySelectorAll('[chroma]')

    blocks.forEach(block => {
        let code = block.innerHTML
        let attributes = block.attributes
        let heading = attributes.heading != undefined ? attributes.heading.nodeValue : false
        let copy = attributes.copy != undefined ? attributes.copy.nodeValue : false
        let lang = attributes.lang != undefined ? attributes.lang.nodeValue : false
        if(lang){
            let conv = new chroma()
            console.log(block)
            let result = conv.convert(code, c_kit, heading, copy)
            block.innerHTML = ''
            block.appendChild(result)
            delete conv
        }
        else{
            console.error('set lang="" attribute and specify language')
        }
    })
}

fetchTargetElements()
