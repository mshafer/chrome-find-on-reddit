function searchRedditForUrl(url) {
    var redditSearchUrl = 'https://www.reddit.com/search?q=' + encodeURIComponent(url);
    console.log("Opening Reddit search URL: " + redditSearchUrl);
    chrome.tabs.create({ url: redditSearchUrl });
}

function handleContextMenuClick(info, tab) {
    var linkUrl = info["linkUrl"];
    console.log("User used context menu on link with URL: " + linkUrl);
    searchRedditForUrl(linkUrl);
}

function handleBrowserButtonClick(tab) {
    console.log("User clicked browser button on tab: " + JSON.stringify(tab));
    searchRedditForUrl(tab["url"]);
}

chrome.contextMenus.create({
    "title": "Find on Reddit", 
    "contexts":["link"], 
    "onclick": handleContextMenuClick
});

chrome.browserAction.onClicked.addListener(handleBrowserButtonClick);
