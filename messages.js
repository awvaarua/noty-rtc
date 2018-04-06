messaging.onMessage(function(payload) {
    //console.log("Message received. ", payload);
    if (payload.notification)
        showLocalNotification(payload.notification);

    if (payload.data)
        processMessage(payload.data);
});

navigator.serviceWorker.addEventListener('message', function(event) {
    //console.log('Received a message from service worker while idle: ', event.data);
    if (event.data.data)
        processMessage(event.data.data);
});

function processMessage(data) {
    //Call projects implementations
    document.querySelector('#content').innerHTML = JSON.stringify(data);
}

function showLocalNotification(data) {
    //Assuming we have user permission
    var options = {
        body: data.body + "(local)",
        click_action : data.click_action,
        icon: data.icon || "https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/master/black/png/32/envelope-o.png"
    };
    var notification = new Notification(data.title, options);
}