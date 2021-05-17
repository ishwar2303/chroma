let kit = {
    lang : 'css',
    conversion : [
        {
            class : 'style.start.chroma-delta',
            pattern : /&lt;style\s*&gt;/g
        },
        {
            class : 'style.close.chroma-delta',
            pattern : /&lt;\/style\s*&gt;/g
        },
        {
            class : 'comment.chroma-charlie',
            pattern : /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class : 'constant.numeric.chroma-echo',
            pattern: /(\d+)(px|em|cm|s|%)?/g
        },
        {
            class : 'constant.hex.chroma-tango',
            pattern: /#([a-f0-9]{3}|[a-f0-9]{6})(?=;|\s|,|\))/gi
        },
        {
            class: 'direct-descendant.chroma-oscar',
            pattern: /&gt;/g
        },
        {
            class: 'class.chroma-alpha',
            pattern: /\.[\w\-_]+/g
        },
        {
            class: 'id.chroma-alpha',
            pattern: /\#[\w\-_]+/g
        },
        {
            class: 'pseudo.chroma-oscar',
            pattern: /:[\w\-_]+/g
        },
        {
            class : "property.chroma-oscar",
            pattern : /[\w-]+(?=\s*:)/g
        },
        {
            class: 'tag.chroma-delta',
            pattern: /\w+/g
        },
        {
            class : 'vendor.prefix.chroma-vector',
            pattern: /(-o-|-moz-|-webkit-|-ms-)?[\w-]+(?=\s?:)(?!.*\{)/g
        },
    ]
    
}

module.exports = kit