messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    if (!payload.data) return;
    document.querySelector('#content').innerHTML = JSON.stringify(payload);
});