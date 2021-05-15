let kit = {
    lang : 'c',
    conversion : [
        {
            class: 'meta.preprocessor',
            pattern: /\#([\S\s]*?)$/gm
        },
        {
            class: 'constant.numeric',
            pattern: /\b\d+\b/g
        },
        {
            class : 'comment',
            pattern : /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g
        },
        {
            class: 'keyword',
            pattern: /\b(void|int|float|double|char|long|short|signed|unsigned)\b/g
        },
        {
            class: 'storage.modifier',
            pattern: /\b(static|extern|auto|register|volatile|inline)\b/g
        },
        {
            class: 'support.type',
            pattern: /\b(struct|union|enum)\b/g
        },
        {
            class : 'string',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class : 'entitiy.name.function',
            pattern : /(?<=(\w|\*)+)(\s|\n)+((\w+)(?= ?\())/g
        }
    ]
    
}

module.exports = kit