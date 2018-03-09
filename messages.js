messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    if (!payload.data) return;
    document.querySelector('#content').innerHTML = JSON.stringify(payload);
});

// navigator.serviceWorker.addEventListener('message', function(event) {
//     //console.log('Received a message from service worker while idle: ', event.data);
// });