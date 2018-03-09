// Initialize Firebase
var config = {
    apiKey: "AIzaSyBZ2W7YpxVFmrJHIIsXVcOYxzWlNWPfkds",
    authDomain: "notifications-db2e7.firebaseapp.com",
    messagingSenderId: "22493502646"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.requestPermission()
    .then(function() {
    messaging.getToken()
        .then(function(currentToken) {
            if (currentToken) {
                console.log(currentToken);
                //sendTokenToServer(currentToken);
            } else {
                console.log('No Instance ID token available. Request permission to generate one.');
                // Show permission UI.
                updateUIForPushPermissionRequired();
                setTokenSentToServer(false);
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