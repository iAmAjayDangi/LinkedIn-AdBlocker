chrome.webNavigation.onCommitted.addListener(async (tab) => {
    if (tab.frameId == 0) {
        let queryOptions = { active: true, lastFocusedWindow: true };
        let tabs = await chrome.tabs.query(queryOptions);
        // console.log(tabs[0].url);

        url = tabs[0].url;

        let parsedUrl = url.replace("https://", "").replace("http://", "").replace("www.", "");
        let domain = parsedUrl.slice(0, parsedUrl.indexOf('/') == -1 ? parsedUrl.length : parsedUrl.indexOf('/'))
            .slice(0, parsedUrl.indexOf('?') == -1 ? parsedUrl.length : parsedUrl.indexOf('?'))
        try {
            if (domain.length < 1 || domain === null || domain === undefined) {
                return;
            }
            else if (domain == "linkedin.com") {
                runLinkedinScript(tab);
                return;
            }
        }
        catch (err) {
            throw err;
        }
    }
});

function runLinkedinScript(tab) {
    chrome.scripting
        .executeScript({
            target: { tabId: tab.tabId },
            files: ["linkedin.js"],
        })
    return true;
}

