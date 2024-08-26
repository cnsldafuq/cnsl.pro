function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js', () => {
    loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js', () => {
        window.addEventListener("load", () => {
            VANTA.NET({
                el: "#frame",
                mouseControls: true,
                touchControls: true,
                gyroControls: true,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00
            })
        
            let loadingScreen = document.querySelector(".loadingScreen");
            if(loadingScreen) loadingScreen.style.display = "none";
        });
    });
});