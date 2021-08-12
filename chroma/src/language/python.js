
let kit = {
    lang : 'c',
    conversion : [
        {
            class: 'variable.self',
            pattern: /self/g
        },
        {
            class: 'comment.docstring.chroma-charlie',
            pattern: /('{3}|"{3})[\s\S]*?\1/gm
        },
        {
            class: 'constant.language.chroma-oscar',
            pattern: /None|True|False|NotImplemented|\.\.\./g
        },
        {
            class : 'comment.chroma-charlie',
            pattern : /#.*/g
        },
        {
            class : 'string.chroma-bravo',
            pattern : /((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g
        },
        {
            class: 'support.object.',
            pattern: /object/g
        },
        {
            class: 'support.function.python.chroma-victor',
            pattern: /\b(bs|divmod|input|strip|split|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|bin|file|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|set|apply|delattr|help|next|setattr|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern)(?=\()/g
        },
        {
            class : 'keywords.chroma-lima',
            pattern: /\b(pass|lambda|with|is|not|in|from|raise|del)(?=\b)/g
        },
        {
            class : 'keywords.chroma-romeo',
            pattern: /\b(return|import|as)(?=\b)/g
        },
        {
            class : 'keyword.conditional.chroma-lima',
            pattern: /\b(if|else|elif|for|do|while)\b/g
        },
        {
            class: 'constant.numeric.chroma-echo',
            pattern: /\b\d+\b/g
        },
        {
            class : 'chroma-delta',
            pattern: /(class)\s+(\w+)\((\w+?)\)/g
        },
        {
            class : 'chroma-alpha',
            pattern: /\bdef\b/g
        },
        {
            class: 'support.magic.chroma-alpha',
            pattern: /__(class)__/g
        },
        {
            class : 'chroma-oscar',
            pattern: /(except) (\w+):/g
        },
        {
            class: 'entity.class.function.decorator.chroma-victor',
            pattern: /@([\w\.]+)/g
        },
        {
            class : 'function-call.chroma-delta',
            pattern : /[\w\d_]+(?=\s*\()/g
        }
    ]
    
}

module.exports = kit