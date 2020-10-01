const contextMenuItem = {
    id: 'spendMoney',

    // what appears when we right-click on the web page
    title: 'SpendMoney', 

    // The context in which this appears on the web page. You can have different contexts like clicking on an image, or if there is a video
    contexts: ['selection']
}

chrome.contextMenus.create(contextMenuItem);