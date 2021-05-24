let kit = {
    lang : 'json',
    conversion : [
        {
            class : 'property.chroma-victor',
            pattern : /("|')\w+("|')(?=\s*:)/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class: 'string.regexp.chroma-echo',
            pattern: /(\/)((?![*+?])(?:[^\r\n\[/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+)(\/)(?!\/)([igm]{0,3})/g
        },
        {
            class : 'property.chroma-victor',
            pattern : /\w+(?=\s*:)/g
        },
        {
            class: 'constant.numeric.chroma-delta',
            pattern: /\b(-?(0x)?\d*\.?[\da-f]+|NaN|-?Infinity)\b/gi
        },
        {
            class: 'constant.language.chroma-oscar',
            pattern: /\b(true|false|null)\b/g
        }
    ]
}

module.exports = kit