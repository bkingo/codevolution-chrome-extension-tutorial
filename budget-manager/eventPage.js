const contextMenuItem = {
    id: 'spendMoney',

    // what appears when we right-click on the web page
    title: 'SpendMoney', 

    // The context in which this appears on the web page. You can have different contexts like clicking on an image, or if there is a video
    contexts: ['selection']
}

chrome.contextMenus.create(contextMenuItem);

/* Returns true/false if the value is an integer or not */
function isInt(value) {
    return !isNaN(value) 
        && parseInt(Number(value)) == value 
        && !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
    // If the user clicked on our menu item and if there is some selection text
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            chrome.storage.sync.get(['total', 'limit'], function (budget) {
                let newTotal = 0;

                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }

                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({ 'total': newTotal }, function () {
                    if (newTotal >= budget.limit) {
                        const notifOptions = {
                            type: 'basic',
                            iconUrl: 'icon48.png',
                            title: 'Limit reached!',
                            message: 'Uh oh! Looks like you\'ve reached your limit!'
                        }

                        // Notify user that limit has been reached
                        chrome.notifications.create('limitNotif' + Math.random(), notifOptions);
                    }
                }) 
            })
        }
    }
});

chrome.storage.onChanged.addListener(function (changes, storageName) {
    chrome.browserAction.setBadgeText({ "text": changes.total.newValue.toString() })
})