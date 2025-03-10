document.addEventListener("DOMContentLoaded", () => {
    const frames = [
        "/images/favicon-frames/frame_0.gif",
        "/images/favicon-frames/frame_1.gif",
        "/images/favicon-frames/frame_2.gif",
        "/images/favicon-frames/frame_3.gif",
        "/images/favicon-frames/frame_4.gif",
        "/images/favicon-frames/frame_5.gif",
        "/images/favicon-frames/frame_6.gif",
        "/images/favicon-frames/frame_7.gif",
    ];

    let index = 0;
    function animateFavicon() {
        const favicon = document.querySelector("link[rel='icon']");
        if (!favicon) return;

        favicon.href = frames[index];
        index = (index + 1) % frames.length;
    }
    setInterval(animateFavicon, 100);
});
