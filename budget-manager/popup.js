$(function() {
    // When user opens pop-up, display the total
    chrome.storage.sync.get(['total', 'limit'], function(budget) {
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });

    $('#spendAmount').on('click', function() {
        chrome.storage.sync.get(['total', 'limit'], function(budget) {
            let newTotal = 0;

            if (budget.total) {
                newTotal += parseInt(budget.total);
            }

            let amount = $('#amount').val();

            if (amount) {
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({ 'total': newTotal }, function () {
                // Check if the new total exceed the limit
                if (amount && newTotal >= budget.limit) {
                    const notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Limit reached!',
                        message: 'Uh oh! Looks like you\'ve reached your limit!'
                    }

                    // Notify user that limit has been reached
                    chrome.notifications.create('limitNotif' + Math.random(), notifOptions);
                }
            });

            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});