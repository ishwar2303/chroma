const indent = (n) => {
    pad = '';
    let i = 0;
    for(i=0; i<n; i++) {
        pad += '    '; 
    }
    return "\n" + pad;
}

var stringMatch = []
var re = /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
const getStringIndices = (code, offset) => {
    
    if(offset === void 0)
        offset = 0
    var pattern = new RegExp(re)
    let match = pattern.exec(code)
    if(!match)
        return false
    let startPos = match.index + offset
    let endPos = startPos + match[0].length
    stringMatch.push({
        startPos,
        endPos
    })
    return {
        remaining: code.substring(endPos - offset),
        offset: endPos
    }
}

const formatt = (code) => {
    stringMatch = []
    var stack = [];
    var output = '';
    let i;
    code = code.replace(/\n/g, '');
    let res = getStringIndices(code, 0)
    while(res) {
        res = getStringIndices(res.remaining, res.offset)
    }
    for(i=0; i<code.length; i++) {
        stringBracket = false

        if(code[i] == '{' || code[i] == '}' || code[i] == '[' || code[i] == ']' || code[i] == ',') {
            for(j=0; j<stringMatch.length; j++) {
                if(i >= stringMatch[j].startPos && i< stringMatch[j].endPos) {
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
                else if(code[i] == '}' || code[i] == ']') {
                    stack.pop();
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
    return output;
}