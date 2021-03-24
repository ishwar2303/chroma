let kit
export default kit = [{
        lang: 'html',
        conversion: [{
                class: 'attribute-name',
                pattern: /(?<=(\s)*)[a-zA-Z\-]+(?=(\s)*=(&quot;))/g
            }, {
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
    },
    {
        lang: 'css',
        conversion: [{
                class: 'webkit',
                pattern: /\:\:-webkit[a-zA-Z\-]+(?=\s*(\{))/g
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
                class: 'direct-descendent',
                pattern: /&gt;/g
            },
            {
                class: 'class',
                pattern: /\.[a-zA-Z\_]+[a-zA-Z0-9\-\_]*(?=\s*(\,|\:|\{|\<|~)?)/g
            },
            {
                class: 'constant-numeric',
                pattern: /\d+(px|em|cm|s|%|ms)/g
            },
            {
                class: 'hex-color',
                pattern: /#([a-f0-9]{3}|[a-f0-9]{6})(?=;|\s|,|\))/gi
            },
            {
                class: 'id',
                pattern: /\#(?!\d)[\w\-_]+/g
            },
            {
                class: 'rgb',
                pattern: /(rgb)(?=\s*\()/g
            },
            {
                class: 'comment',
                pattern: /\/\*[\s\S]*?\*\//gm
            },
            {
                class: 'media',
                pattern: /@media/g
            },
            {
                class: 'universal-selector',
                pattern: /\*(?=\s*\n*\{)/g
            },
            {
                class: 'tag-name',
                pattern: /(?<=(\s|\n)*)\w+(?=:\w+\s*(\{|,))/g
            },
            {
                class: 'tag-name',
                pattern: /(?<=(\s|\n)+)[a-zA-Z]+[1-6]*(?=\s*(,|\{))/g
            },
            {
                class: 'tag-name',
                pattern: /\s[a-zA-Z]+[1-6]*\s(?!\s*(rgb|rgba|:|\d))/g
            },
            {
                class: 'tag-name',
                pattern: /(?<!-)(?<=(\s|\n)*)\w+:(?=\w+)(?!;)/g
            },
            {
                class: 'property-name',
                pattern: /[a-zA-Z]+[a-zA-Z\-]*\s*\:/g
            },
            {
                class: 'numeric-constant',
                pattern: /(\d+)/g
            },
        ]
    },
    {
        lang: 'javascript',
        conversion: [{
                class: 'comment',
                pattern: /&sol;\*[\s\S]*?\*&sol;/gm
            },
            {
                class: 'comment',
                pattern: /&sol;&sol;.*(?=\n)/g
            },
            // {
            //     class: 'regular-expression',
            //     pattern: /&sol;(?!\n+).+&sol;(?=g|m|i|s|u|y|,)/g
            // },
            {
                class: 'string',
                pattern: /&apos;[^&]*[^a]*[^p]*[^o]*[^s]*[^;]*&apos;/g
            },
            {
                class: 'string',
                pattern: /&quot;[^&]*[^q]*[^u]*[^o]*[^t]*[^;]*&quot;/g
            },
            {
                class: 'declaration',
                pattern: /(?<=(\s|\n)+)(let|var|const)(?=\s)/g
            },
            {
                class: 'keyword-set-1',
                pattern: /(?<=(\s|\n)+)(import|from|export|throw|finally|default|delete|await|extends|yield)(?=\s)/g
            },
            {
                class: 'keyword-set-1',
                pattern: /(?<=(\s|\n)+)(break|continue)(?=\s*;)/g
            }, {
                class: 'keyword-set-1',
                pattern: /(?<=(\s|\n)+)(return)(?=\s+)/g
            },
            {
                class: 'keyword-set-2',
                pattern: /(?<=(\s|\n)+)(console)(?=\.)/g
            },
            {
                class: 'keyword-set-3',
                pattern: /(?<=(\s|\n)+)if(?=\s*\()/g
            },
            {
                class: 'keyword-set-3',
                pattern: /(?<=(\s*\()|(\s|\n)*)\s*function(?=\s+)/g
            },
            {
                class: 'function-name',
                pattern: /(?<=\s+|.)[a-zA-Z_]+[$a-zA-Z_0-9]+(?=\s*\()/g
            },
            {
                class: 'property',
                pattern: /(?<=\.)[a-zA-Z_]+[$a-zA-Z_0-9]+(?!\s*\()(?=(.|\s*=|\s*))/g
            },
            {
                class: 'keyword-set-3',
                pattern: /(?<=\s+|.)(else|else)(?=\s+|\s*\{)/g
            },
            {
                class: 'document-window',
                pattern: /(?<=(\s|\n)+|\(\s*)(document|window)(?=(\.|\s*\)|\s+))/g
            },
        ]
    },
    {
        lang: 'cpp',
        conversion: [{
                class: 'comment',
                pattern: /&sol;\*[\s\S]*?\*&sol;/gm
            },
            {
                class: 'comment',
                pattern: /&sol;&sol;.*(?=\n)/g
            },
            // {
            //     class: 'regular-expression',
            //     pattern: /&sol;(?!\n+).+&sol;(?=g|m|i|s|u|y|,)/g
            // },
            {
                class: 'string',
                pattern: /&apos;[^&]*[^a]*[^p]*[^o]*[^s]*[^;]*&apos;/g
            },
            {
                class: 'preprocessor',
                pattern: /#[a-zA-Z]+(?=\s*<?)/g
            },
            {
                class: 'preprocessor-name',
                pattern: /&lt;.+&gt;/g
            },
            {
                class: 'string',
                pattern: /&quot;[^&]*[^q]*[^u]*[^o]*[^t]*[^;]*&quot;/g
            },
            {
                class: 'declaration',
                pattern: /(?<=(\s|\n|\(|\<)+)(int|float|char|string|double|long|short|class|bool)(?=\s|,)/g
            },
            {
                class: 'keyword-set-1',
                pattern: /(?<=(\s|\n)+)(import|from|export|throw|finally|default|delete|await|extends|yield)(?=\s)/g
            },
            {
                class: 'keyword-set-1',
                pattern: /(?<=(\s|\n)+)(break|continue)(?=\s*;)/g
            }, {
                class: 'keyword-set-1',
                pattern: /(?<=(\s|\n)+)(return)(?=\s+)/g
            },
            {
                class: 'keyword-set-2',
                pattern: /(?<=(\s|\n))(cout|cin|template|typename)(?=\s*)/g
            },
            {
                class: 'keyword-set-3',
                pattern: /(?<=(\s|\n)+)if(?=\s*\()/g
            },
            {
                class: 'keyword-set-3',
                pattern: /(?<=(\s*\()|(\s|\n)*)\s*function(?=\s+)/g
            },
            {
                class: 'function-name',
                pattern: /(?<=\s+|.)[a-zA-Z_]+[$a-zA-Z_0-9]+(?=\s*\()/g
            },
            {
                class: 'property',
                pattern: /(?<=\.)[a-zA-Z_]+[$a-zA-Z_0-9]+(?!\s*\()(?=(.|\s*=|\s*))/g
            },
            {
                class: 'keyword-set-3',
                pattern: /(?<=\s+|.)(else|else)(?=\s+|\s*\{)/g
            },
            {
                class: 'document-window',
                pattern: /(?<=(\s|\n)+|\(\s*)(document|window)(?=(\.|\s*\)|\s+))/g
            },
        ]
    }
]