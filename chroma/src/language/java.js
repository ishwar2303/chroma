let kit = {
    lang : 'java',
    conversion : [
        {
            class: 'keyword.operator.chroma-romeo',
            pattern: /\+|\!|\-|&(gt|lt|amp);|\||\*|=/g
        },
        {
            class: 'constant.numeric.chroma-echo',
            pattern: /\b\d+\b/g
        },
        {
            class : 'comment.chroma-charlie',
            pattern : /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g
        },
        {
            class : 'keyword.conditional.chroma-lima',
            pattern: /\b(if|else|for|do|while)\b/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class : 'entitiy.class.function.chroma-victor',
            pattern : /\b(?<=(\w|\*)+)(\s|\n)+((\w+)(?= ?\())/g
        },
        {
            class : 'function-call.chroma-delta',
            pattern : /[\w\d_]+(?=\s*\()/g
        },
        {
          class: "constant.chroma-echo",
          pattern: /\b(false|null|true|[A-Z_]+)\b/g
        },
        {
          class: 'keyword.chroma-echo',
          pattern: /(import|package)\s(.+)/g
        },
        {
          class: "keyword.chroma-delta",
          pattern: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/g
        },
        {
          class: "char.chroma-victor",
          pattern: /(')(.|\\.|\\u[\dA-Fa-f]{4})\1/g
        },
        {
          class: "integer.chroma-echo",
          pattern: /\b(0x[\da-f]+|\d+)L?\b/g
        },
        {
          class: "support.annotation.chroma-romeo",
          pattern: /@\w+/g
        },
        {
          class: 'entity.function.chroma-delta',
          pattern: /([^@\.\s]+)\(/g
        },
        {
          class: "entity.class.chroma-zeus",
          pattern: /\b([A-Z]\w*)\b/g
        },
        {
          class: "operator.chroma-oscar",
          pattern: /(\+{1,2}|-{1,2}|~|!|\*|\/|%|(?:&lt;){1,2}|(?:&gt;){1,3}|instanceof|(?:&amp;){1,2}|\^|\|{1,2}|\?|:|(?:=|!|\+|-|\*|\/|%|\^|\||(?:&lt;){1,2}|(?:&gt;){1,3})?=)/g
        }
    ]
    
}

module.exports = kit