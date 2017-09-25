export function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export function isNode(o) {
    return (
        typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
    );
}
