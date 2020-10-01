$(function () {

    chrome.storage.sync.get(['limit'], function (budget) {
        $('#limit').val(budget.limit);
    });

    $('#saveLimit').click(function () {
        let limit = $('#limit').val();

        if (limit) {
            chrome.storage.sync.set({ 'limit': limit }, function () {
                    close(); // Close the current tab
                }
            )
        }
    });

    $('#resetTotal').click(function () {
        // Reset the total
        chrome.storage.sync.set({ 'total': 0 }, function () {
            const notifOptions = {
                type: 'basic',
                iconUrl: 'icon48.png',
                title: 'Total reset!',
                message: 'Total has been reset to 0!'
            }

            chrome.notifications.create('totalReset', notifOptions);
        }); 
    })
})