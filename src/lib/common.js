function getQueryVariable(variable, url=null) {
    var query = window.location.search.substring(1);
    if (url) query = url.substr(url.search('\\?') + 1 - url.length);

    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}
export { getQueryVariable };