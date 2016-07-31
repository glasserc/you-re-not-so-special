/**
 * Find all links in a page, including those included in iframes,
 * including those that arrive later when iframes finish loading.
 */
function manipulateAllLinks(d, f) {
    for(let link of d.querySelectorAll('a')) {
        f(link);
    }

    for(let iframe of d.querySelectorAll('iframe')) {
        // Try to strip all events, both now and in the future.
        manipulateAllLinks(iframe.contentDocument, f);
        iframe.addEventListener("load", function() {
            manipulateAllLinks(this.contentDocument, f);
        });
    }
}

manipulateAllLinks(document, function(link) {
    if (link.href.indexOf('t.co') === -1 || !link.target) {
        // This link is boring -- doesn't point to t.co or doesn't
        // have a target, so we don't care about it.
        return;
    }
    // else {
    //     console.log("Found link", link, link.target, link.handler);
    // }

    // We might be inside an iframe, so set the target to "_top" to
    // avoid just following it in the iframe.
    link.setAttribute("target", "_top");
});
