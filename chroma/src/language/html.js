let kit = {
    lang : 'html',
    conversion : [{
            class: 'attribute-name',
            pattern: /(?<=(\s)*)[a-zA-Z\-]+(?=(\s)*=(&quot;))/g
        }, 
        {
            class: 'comment',
            pattern: /&lt;!--(.*\n.*)*--&gt;/g
        },
        {
            class: 'string',
            pattern: /&apos;[^&]*[^a]*[^p]*[^o]*[^s]*[^;]*&apos;/g
        },
        {
            class: 'string',
            pattern: /&quot;[^&]*[^q]*[^u]*[^o]*[^t]*[^;]*&quot;/g
        },
        {
            class: 'doc-type',
            pattern: /(?<=&lt;)(!DOCTYPE)(?=&nbsp;)/g
        },
        {
            class: 'start-tag-name',
            pattern: /((?<=(&nbsp;)*))html(?=&gt;)/g
        },
        {
            class: 'start-tag-name',
            pattern: /(?<=&lt;(&nbsp;)*)[a-zA-Z0-9]+/g
        },
        {
            class: 'close-tag-name',
            pattern: /(?<=&sol;(&nbsp;)*)[a-zA-Z0-9]+(?=(&nbsp;)*&gt;)/g
        },
        {
            class: 'start-tag',
            pattern: /&lt;/g
        },
        {
            class: 'close-tag',
            pattern: /&gt;/g
        }
    ]
    
}

module.exports = kit