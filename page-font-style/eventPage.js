chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.todo == 'showPageAction') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            // To show/highlight the page action icon
            chrome.pageAction.show(tabs[0].id);
        });
    }
});