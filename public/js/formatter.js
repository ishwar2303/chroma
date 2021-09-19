var strRegxMatch = []
var reString = /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
var reRegex = /(\/)((?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)(\/)(?!\/)([igm]{0,3})/g

const prepare = (code) => {
    code = code.replace(/\n/g, '');
    code = code.replace(/([\s]+(?=(\}|\])))/gm, '')
    code = code.replace(/((?!=(\{|\[))[\s]+)/gm, '')
    code = code.replace(/("")/g, '" "');
    code = code.replace(/('')/g, "' '");
    return code
}

const indent = (n) => {
    pad = '';
    let i = 0;
    for(i=0; i<n; i++) {
        pad += '    '; 
    }
    return "\n" + pad;
}

const getStringIndices = (code, re, offset) => {
    
    if(offset === void 0)
        offset = 0
    var pattern = new RegExp(re)
    let match = pattern.exec(code)
    if(!match)
        return false
    let startPos = match.index + offset
    let endPos = startPos + match[0].length
    strRegxMatch.push({
        startPos,
        endPos
    })
    return {
        remaining: code.substring(endPos - offset),
        offset: endPos
    }
}

const formatt = (code) => {
    strRegxMatch = []
    var stack = [];
    var output = '';
    let i;
    code = prepare(code)
    let res = getStringIndices(code, reString, 0)
    while(res) {
        res = getStringIndices(res.remaining, reString, res.offset)
    }
    res = getStringIndices(code, reRegex, 0)
    while(res) {
        res = getStringIndices(res.remaining, reRegex, res.offset)
    }

    for(i=0; i<code.length; i++) {
        stringBracket = false

        if(code[i] == '{' || code[i] == '}' || code[i] == '[' || code[i] == ']' || code[i] == ',') {
            for(j=0; j<strRegxMatch.length; j++) {
                if(i >= strRegxMatch[j].startPos && i< strRegxMatch[j].endPos) {
                    stringBracket = true;
                    break;
                }
            }
            if(!stringBracket) {
                let j = i;
                while(code[j+1] == ' ')
                    j++;
                if(code[i] == '{' || code[i] == '[') {
                    stack.push(code[i]); 
                }
                else if((stack[stack.length-1] == '{' && code[i] == '}') || (stack[stack.length-1] == '[' && code[i] == ']')) {
                    stack.pop();
                }
                else if((stack[stack.length-1] != '{' && code[i] == '}') || (stack[stack.length-1] != '[' && code[i] == ']')){ // unblanced parenthesis
                    alert('Unbalanced parenthesis');
                    return code;
                }
                
                if(code[i] == '{' || code[i] == '[' || code[i] == ',')
                    output += code[i] + indent(stack.length)
                else if(code[i] == '}' || code[i] == ']')
                    output +=  indent(stack.length) + code[i];
                i = j;
            }
            else output += code[i];
        }
        else output += code[i];
    }
    output = output.replace(/'\s'/g, "''");
    output = output.replace(/"\s"/g, '""');
    return output;
}