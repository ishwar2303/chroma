let kit = {
    lang : 'javascript',
    conversion : [
        {
            class : 'comment.chroma-charlie',
            pattern : /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class: 'selector',
            pattern: /\$(?=\.|\()/g
        },
        {
            class: 'support.chroma-oscar',
            pattern: /\b(window|document)\b/g
        },
        {
            class: 'keyword.chroma-romeo',
            pattern: /\b(return|import|export|default|from)\b/g
        },
        {
            class: 'function.call.chroma-lima',
            pattern: /\b(then)(?=\()/g
        },
        {
            class : 'variable.language.this.chroma-oscar',
            pattern: /\bthis\b/g
        },
        {
            class : 'variable.language.super.chroma-oscar',
            pattern: /super(?=\.|\()/g
        },
        {
            class : 'storage.type.chroma-delta',
            pattern: /\b(const|let|var)(?=\s)/g
        },
        {
            class : 'support.property.chroma-oscar',
            pattern: /\.(length|node(class|Value))\b/g
        },
        {
            class : 'support.function.chroma-delta',
            pattern: /(setTimeout|setInterval)(?=\()/g
        },
        {
            class : 'support.method.chroma-delta',
            pattern: /\.(getAttribute|replace|push|getElementById|getElementsByClassclass|setTimeout|setInterval)(?=\()/g
        },
        {
            class: 'string.regexp.chroma-echo',
            pattern: /(\/)((?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)(\/)(?!\/)([igm]{0,3})/g
        },
        {
            class : 'storage.type.chroma-delta',
            pattern: /(var)?(\s|^)(\S+)(?=\s?=\s?function\()/g
        },
        {
            class : 'keyword.chroma-romeo',
            pattern: /(new)\s+(?!Promise)([^\(]*)(?=\()/g
        },
        {
            class: 'entity.function.chroma-delta',
            pattern: /(\w+)(?=:\s{0,}function)/g
        },
        {
            class: 'constant.other.chroma-romeo',
            pattern: /\*(?= as)/g
        },
        {
            class : 'keyword.chroma-romeo',
            pattern: /(export)\s+(\*)/g
        },
        {
            class : 'storage.type.accessor.chroma-lima',
            pattern: /(get|set)\s+(\w+)(?=\()/g
        },
        {
            class : 'entity.class.function.chroma-delta',
            pattern: /(^\s*)(\w+)(?=\([^\)]*?\)\s*\{)/gm
        },
        {
            class : 'storage.type.class.chroma-charlie',
            pattern: /(class)\s+(\w+)(?:\s+(extends)\s+(\w+))?(?=\s*\{)/g
        },
        {
            class: 'storage.type.function.arrow.chroma-charlie',
            pattern: /=&gt;/g
        },
        {
            class: 'promise.chroma-charlie',
            pattern: /\bPromise(?=(\(|\.))/g
        }
    ]
    
}

module.exports = kit