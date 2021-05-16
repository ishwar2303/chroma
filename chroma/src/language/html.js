let kit = {
    lang : 'html',
    conversion : [{
            class: 'attribute.chroma-lima',
            pattern: /(?<=(\s)*)[a-zA-Z\-]+(?=(\s)*=("))/g
        }, 
        {
            class : 'comment.chroma-charlie',
            pattern : /(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class: 'doctype.chroma-oscar',
            pattern: /(?<=&lt;)(!DOCTYPE)(?=\s+)/g
        },
        {
            class: 'doctype.name.chroma-alpha',
            pattern: /((?<=(&nbsp;)*))html(?=&gt;)/g
        },
        {
            class: 'start-tag-name.chroma-alpha',
            pattern: /(?<=&lt;(&nbsp;)*)[a-zA-Z0-9]+/g
        },
        {
            class: 'close-tag-name.chroma-alpha',
            pattern: /(?<=\/(&nbsp;)*)[a-zA-Z0-9]+(?=(&nbsp;)*&gt;)/g
        },
        {
            class: 'start-tag.chroma-zeus',
            pattern: /&lt;/g
        },
        {
            class: 'close-tag.chroma-zeus',
            pattern: /&gt;/g
        }
    ]
    
}

module.exports = kit