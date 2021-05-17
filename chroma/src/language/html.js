let kit = {
    lang : 'html',
    conversion : [
        {
            class : 'php.embedded',
            pattern : /(&lt;\?php|&lt;\?=?(?!xml))([\s\S]*?)(\?&gt;)/g,
            language : 'php'
        },
        {
            class : 'css.embedded',
            pattern : /(?<=&lt;style.*?&gt;)([\s\S]*?)(?=(&lt;\/)(style)(&gt;))/g,
            language : 'css'
        },
        {
            class : 'javascript.embedded',
            pattern : /(&lt;script(?! src).*?&gt;)([\s\S]*?)(&lt;\/)(script)(&gt;)/g,
            language : 'javascript'
        },
        {
            class: 'attribute.chroma-lima',
            pattern: /(?<=(\s)*)[a-zA-Z\-]+(?=(\s)*=("))/g
        }, 
        {
            class : 'comment.chroma-charlie',
            pattern : /&lt;!--(.*?)--&gt;/g
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
            pattern: /((?<=\s*))html(?=&gt;)/g
        },
        {
            class: 'start-tag-name.chroma-alpha',
            pattern: /(?<=&lt;)[\w]+/g
        },
        {
            class: 'close-tag-name.chroma-alpha',
            pattern: /(?<=\/)\w+(?=\s*&gt;)/g
        },
        // {
        //     class: 'start-tag.chroma-zeus',
        //     pattern: /&lt;(?!=!)/g
        // },
        // {
        //     class: 'close-tag.chroma-zeus',
        //     pattern: /(?<=\/*\w+\s*)&gt;/g
        // }
    ]
    
}

module.exports = kit