console.log("background.js is running");

// Set up alarms to trigger at specific times
browser.alarms.create("morningQuote", {
    when: new Date().setHours(9, 0, 0, 0),  // 9:00 AM
    periodInMinutes: 1440 // 24 hours
});

browser.alarms.create("eveningQuote", {
    when: new Date().setHours(18, 0, 0, 0),  // 6:00 PM
    periodInMinutes: 1440 // 24 hours
});

// Listen for the alarms and inject the content script into the active tab
browser.alarms.onAlarm.addListener((alarm) => {
    console.log(`Alarm triggered: ${alarm.name}`);

    if (alarm.name === "morningQuote" || alarm.name === "eveningQuote") {
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            if (tabs.length > 0) {
                // Inject content.js into the active tab
                browser.tabs.executeScript(tabs[0].id, { file: 'content.js' })
                    .then(() => {
                        console.log('content.js injected successfully.');
                        // Once injected, call the showQuote function
                        return browser.tabs.executeScript(tabs[0].id, {
                            code: 'if (typeof showQuote === "function") { showQuote(); }'
                        });
                    })
                    .then(() => {
                        console.log('showQuote() executed successfully.');
                    })
                    .catch(error => {
                        console.error(`Script injection or execution failed: ${error}`);
                    });
            } else {
                console.log("No active tabs found.");
            }
        }).catch(error => {
            console.error(`Error querying tabs: ${error}`);
        });
    }
});
