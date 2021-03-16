let kit 
export default kit = [
    {
        lang : 'html',
        conversion : [
            {
                class : 'attribute-name',
                pattern : /(?<=(&nbsp;)*)[a-zA-Z\-]+(?=(&nbsp;)*=(&quot;))/g
            },
            {
                class : 'doc-type',
                pattern : /(?<=&lt;)(!DOCTYPE)(?=&nbsp;)/g
            },
            {
                class : 'start-tag-name',
                pattern : /((?<=(&nbsp;)*))html(?=&gt;)/g
            },
            {
                class : 'string',
                pattern : /(&apos;)[a-zA-Z0-9-_\/:=,\.&apos;]+(&apos;)/g
            },
            {
                class : 'string',
                pattern : /(&quot;)[a-zA-Z0-9-_\/:=,\.&nbsp;]+(&quot;)/g
            },
            {
                class : 'comment',
                pattern : /(&lt;!--)(\n|\r)*.*(\n|\r)*(--&gt;)/g
            },
            {
                class : 'start-tag-name',
                pattern : /(?<=&lt;(&nbsp;)*)[a-zA-Z0-9]+/g
            },
            {
                class : 'close-tag-name',
                pattern : /(?<=\/(&nbsp;)*)[a-zA-Z]+(?=(&nbsp;)*&gt;)/g
            },
            {
                class : 'start-tag',
                pattern : /&lt;/g
            },
            {
                class : 'close-tag',
                pattern : /&gt;/g
            }
        ]
    },
    {
        lang : 'css',
        conversion : [
            {
                class : 'string',
                pattern : /(&apos;|&quot;).*(&apos;|&quot;)/g
            },
            {
                class : 'string',
                pattern : /(&apos;)[a-zA-Z0-9-_\/:=,\.&apos;]+(&apos;)/g
            },
            {
                class : 'direct-descendent',
                pattern : /&gt;/g
            },
            {
                class : 'class',
                pattern : /\.[a-zA-Z\_]+[a-zA-Z0-9\-\_]*(?=\s*(\,|\:|\{|\<|~))/g
            },
            {
                class : 'constant-numeric',
                pattern : /\d+(px|em|cm|s|%|ms)/g
            },
            {
                class : 'hex-color',
                pattern : /#([a-f0-9]{3}|[a-f0-9]{6})(?=;|\s|,|\))/gi 
            },
            {
                class : 'id',
                pattern : /\#(?!\d)[\w\-_]+/g
            },
            {
                class : 'numeric-constant',
                pattern : /(\d+)/g
            },
            {
                class : 'rgb',
                pattern : /(rgb)(?=\s*\()/g
            },
            {
                class : 'comment',
                pattern : /\/\*[\s\S]*?\*\//gm 
            },
            {
                class : 'media',
                pattern : /@media/g
            },
            {
                class : 'universal-selector',
                pattern : /\*(?=\s*\n*\{)/g
            },
            {
                class : 'property-name',
                pattern : /[a-zA-Z]+[a-zA-Z\-]*(&nbsp;)*\:/g
            }
        ]
    },
    {
        lang : 'javascript',
        conversion : [
            {
                class : 'keyword-type1',
                pattern : /(?<=(<br\/>|\s)*)(import|from)\s/g
            },
            {
                class : 'keyword-type2',
                pattern : /(?<=(<br\/>|\s)*)(function)\s+(?=\w*)/g
            },
            {
                class : 'keyword-type2',
                pattern : /(?<=(<br\/>|\s)*)(return)\s*(?=;?)/g
            },
            {
                class : 'keyword-type3',
                pattern : /(?<=(<br\/>|\s)*)(let|var|const)(?=\s+)/g
            },
            {
                class : 'keyword-type4',
                pattern : /(?<=(<br\/>|\s)*)(console)(?=\.)/g
            },
            {
                class : 'string',
                pattern : /(&quot;)[a-zA-Z0-9-_\/:=,\.&nbsp;]+(&quot;)/g
            },
            {
                class : 'string',
                pattern : /(&apos;)[a-zA-Z0-9-_\/:=,\.&apos;]+(&apos;)/g
            },
            {
                class : 'property-name',
                pattern : /(?<=\.)\w+(?=(\.|\s*|=|\())/g
            },
            {
                class : 'root-obj',
                pattern : /(?<=(<br\/>|\s)*)\w+(?=\[[a-zA-Z0-9_]+\]\.|\.)/g
            },
            {
                class : 'keyword-type5',
                pattern : /(?<=(<br\/>|\s)*)(\w+|else)\s*(?=(\{|\())/g
            }
        ]
    }
]