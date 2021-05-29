let kit = {
    lang : 'php',
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
            class: 'support.chroma-delta',
            pattern: /\b(echo|function|return)\b/ig
        },
        {
            class: 'variable.dollar-sign.chroma-victor',
            pattern: /(\$)(\w+)\b/g
        },
        {
            class: 'constant.language.chroma-delta',
            pattern: /true|false|null/ig
        },
        {
            class: 'constant.numeric.chroma-echo',
            pattern: /\b\d+\b/g
        },
        {
            class: 'keyword.chroma-lima',
            pattern: /\b(die|end(for(each)?|switch|if)|case|require(_once)?|include(_once)?)(?=\b)/ig
        },
        {
            class: 'keyword.chroma-oscar',
            pattern: /(instanceof)\s([^\$].*?)(\)|;)/ig
        },
        {
            class:'support.function.chroma-oscar',
            pattern: /\b(array(_key_exists|_merge|_keys|_shift)?|isset|count|empty|unset|printf|is_(array|string|numeric|object)|sprintf|each|date|time|substr|pos|str(len|pos|tolower|_replace|totime)?|ord|trim|in_array|implode|end|preg_match|explode|fmod|define|link|list|get_class|serialize|file|sort|mail|dir|idate|log|intval|header|chr|function_exists|dirclass|preg_replace|file_exists)(?=\()/ig
        },
        {
            class: 'variable.language.php-tag.chroma-delta',
            pattern: /(&lt;\?(php)?|\?&gt;)/ig
        },
        {
            class: 'keyword.classspace.chroma-delta',
            pattern: /\b(classspace|use)\s(.*?);/ig
        },
        {
            class:'keyword.chroma-delta',
            pattern: /\b(abstract|final)?\s?(class|interface|trait)\s(\w+)(\sextends\s)?([\w\\]*)?(\simplements\s)?([\w\\]*)?\s?\{?(\n|\})/ig
        },
        {
            class: 'keyword.static.chroma-delta',
            pattern: /self::|static::/ig
        },
        {
            class: 'keyword.chroma-lima',
            pattern : /\b(const|public|static|protected)\b/g
        },
        {
            class: 'storage.function.chroma-victor',
            pattern: /(?<=(function)\s)(__.*?)(?=\()/ig
        },
        {
            class: 'storage.function.chroma-victor',
            pattern: /(?<=(function)\s)(.*?)(?=\()/ig
        },
        {
            class: 'keyword.new.chroma-delta',
            pattern: /\b(new)\s([^\$][a-z0-9_\\]*?)(?=\)|\(|;)/ig
        },
        {
            class: 'support.class.chroma-delta',
            pattern: /([\w\\]*?)(::)(?=\b|\$)/g
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
        }
    ]
}

export default kit