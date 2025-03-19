document.addEventListener("DOMContentLoaded", () : void => {
    const frames : string[] = [
        "/images/favicon-frames/frame_0.gif",
        "/images/favicon-frames/frame_1.gif",
        "/images/favicon-frames/frame_2.gif",
        "/images/favicon-frames/frame_3.gif",
        "/images/favicon-frames/frame_4.gif",
        "/images/favicon-frames/frame_5.gif",
        "/images/favicon-frames/frame_6.gif",
        "/images/favicon-frames/frame_7.gif",
    ];

    let index : number = 0;
    function animateFavicon() : void {
        const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;

        if (!favicon) return;

        favicon.href = frames[index];
        index = (index + 1) % frames.length;
    }
    setInterval(animateFavicon, 100);
});
