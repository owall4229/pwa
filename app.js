// Check for service worker support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Notification button event listener
document.getElementById('notifyBtn').addEventListener('click', () => {
    // Check for notification permission
    if (Notification.permission === 'granted') {
        showNotification();
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotification();
            }
        });
    }
});

function showNotification() {
    const notification = new Notification('Hello, World!', {
        body: 'This is a simple PWA notification!',
        icon: 'icon.png' // You can use your own icon
    });
}
