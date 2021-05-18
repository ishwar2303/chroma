
let kit = {
    lang : 'c',
    conversion : [
        {
            class: 'meta.preprocessor.chroma-alpha',
            pattern: /\#([\S\s]*?)$/gm
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
            class: 'keyword.declaration.chroma-delta',
            pattern: /\b(void|int|float|double|char|long|short|signed|unsigned)\b/g
        },
        {
            class: 'keyword.control.chroma-delta',
            pattern: /\b(break|continue|return)\b/g
        },
        {
            class: 'storage.modifier.chroma-oscar',
            pattern: /\b(static|extern|auto|register|volatile|inline)\b/g
        },
        {
            class : 'keyword.conditional.chroma-lima',
            pattern: /\b(if|else|for|do|while)\b/g
        },
        {
            class: 'support.type.chroma-oscar',
            pattern: /\b(struct|union|enum)\b/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class : 'entitiy.name.function.chroma-victor',
            pattern : /(?<=(\w|\*)+)(\s|\n)+((\w+)(?= ?\())/g
        }
    ]
    
}

module.exports = kit