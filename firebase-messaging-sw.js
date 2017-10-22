importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '219033712181'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()
let notiUrl = ''

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here
  notiUrl = payload.data.url
  const notificationTitle = payload.data.title
  const notificationOptions = {
    body: 'Message from ' + payload.data.user,
    icon: '/flag.png'
  }

  return self.registration.showNotification(notificationTitle, notificationOptions)

})

self.addEventListener("notificationclick", (ev) => {
  console.log("Notification clicked!");
  clients.openWindow(notiUrl)
});
