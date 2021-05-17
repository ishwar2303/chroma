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
            class: 'keyword.chroma-delta',
            pattern: /\b(export|default|from)\b/g
        },
        {
            class: 'function.call',
            pattern: /\b(then)(?=\()/g
        },
        {
            class: 'variable.language.this.chroma-oscar',
            pattern: /\bthis\b/g
        },
        {
            class: 'variable.language.super.chroma-oscar',
            pattern: /super(?=\.|\()/g
        },
        {
            class: 'storage.type.chroma-delta',
            pattern: /\b(const|let|var)(?=\s)/g
        },
        {
            matches: {
                1: 'support.property.chroma-oscar'
            },
            pattern: /\.(length|node(class|Value))\b/g
        },
        {
            matches: {
                1: 'support.function.chroma-delta'
            },
            pattern: /(setTimeout|setInterval)(?=\()/g
        },
        {
            class : 'support.method.chroma-delta',
            pattern: /\.(getAttribute|replace|push|getElementById|getElementsByClassclass|setTimeout|setInterval)(?=\()/g
        },
        // {
        //     class: 'string.regexp',
        //     matches: {
        //         1: 'string.regexp.open',
        //         2: {
        //             class: 'constant.regexp.escape',
        //             pattern: /\\(.){1}/g
        //         },
        //         3: 'string.regexp.close',
        //         4: 'string.regexp.modifier'
        //     },
        //     pattern: /(\/)((?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)(\/)(?!\/)([igm]{0,3})/g
        // },

        /**
         * matches runtime function declarations
         */
        {
            class : 'storage.type.chroma-delta',
            pattern: /(var)?(\s|^)(\S+)(?=\s?=\s?function\()/g
        },

        /**
         * matches constructor call
         */
        {
            class : 'keyword.chroma-delta',
            pattern: /(new)\s+(?!Promise)([^\(]*)(?=\()/g
        },

        /**
         * matches any function call in the style functionclass: function()
         */
        {
            class: 'entity.function.chroma-delta',
            pattern: /(\w+)(?=:\s{0,}function)/g
        },
        {
            class: 'constant.other.chroma-romeo',
            pattern: /\*(?= as)/g
        },
        {
            class : 'keyword.chroma-delta',
            pattern: /(export)\s+(\*)/g
        },
        {
            class : 'storage.type.accessor',
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
            class: 'support.class.promise',
            pattern: /\bPromise(?=(\(|\.))/g
        }
    ]
    
}

module.exports = kit