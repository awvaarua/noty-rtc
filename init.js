// Initialize Firebase
var config = {
    apiKey: "AIzaSyBZ2W7YpxVFmrJHIIsXVcOYxzWlNWPfkds",
    authDomain: "notifications-db2e7.firebaseapp.com",
    messagingSenderId: "22493502646"
};
firebase.initializeApp(config);
// firebase.deleteInstanceId();
const messaging = firebase.messaging();
messaging.requestPermission()
    .then(function() {
        messaging.getToken()
            .then(function(currentToken) {
                if (currentToken) {
                    console.log('Generated token:' + currentToken);
                    //sendTokenToServer(currentToken);
                    subscribeTokenToTopic(currentToken, 'testing');
                    subscribeTokenToTopic(currentToken, 'messaging_LIS_PT_TA');
                } else {
                    console.log('No Instance ID token available. Request permission to generate one.');
                }
            })
            .catch(function(err) {
                console.log('An error occurred while retrieving token. ', err);
                //showToken('Error retrieving Instance ID token. ', err);
                //setTokenSentToServer(false);
            });
    })
    .catch(function(err) {
    console.log('Unable to get permission to notify.', err);
    });

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
    messaging.getToken()
    .then(function(refreshedToken) {
      console.log('Token refreshed.');
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
      // ...
    })
    .catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
      showToken('Unable to retrieve refreshed token ', err);
    });
});

//  This MUST be on server
function subscribeTokenToTopic(token, topic) {
    fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
        method: 'POST',
        headers: new Headers({ 'Authorization': 'key=AAAABTy3nLY:APA91bFPPBWiMWGxXz6PZyeDVi6-UPLL9I5nofWNrMrkW4KPgx64PQYGoKIcFKIRHOhyofyzhkSeWtCV-AiRvFpYYsIkAkdxqgRvxK5xAzn00DIE9H1v0Oobf6hf_4gG0U8R_Xb6dZl2' })
    }).then(response => {
        if (response.status < 200 || response.status >= 400)
            throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
        console.log('Subscribed to "'+topic+'"');
    }).catch(error => {
        console.error(error);
    });
}