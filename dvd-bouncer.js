const bouncer = document.querySelector(".dvd-bouncer");
const bounceColors = ["#FF0000", "#00FF0D", "#003CFF"];

if (bouncer) {
    let colorIndex = Math.floor(Math.random() * bounceColors.length);
    bouncer.style.backgroundColor = bounceColors[colorIndex];

    const changeColor = () => {
        const nextColor = Math.floor(Math.random() * (bounceColors.length - 1));
        colorIndex = nextColor >= colorIndex ? nextColor + 1 : nextColor;
        bouncer.style.backgroundColor = bounceColors[colorIndex];
    };

    const getBounds = () => ({
        x: Math.max(
            document.documentElement.scrollWidth,
            document.body.scrollWidth,
            window.innerWidth
        ) - bouncer.offsetWidth,
        y: Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
            window.innerHeight
        ) - bouncer.offsetHeight
    });

    const bounds = getBounds();
    let x = 0;
    let y = Math.max(0, bounds.y);
    bouncer.style.transform = `translate(${x}px, ${y}px)`;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        let velocityX = 150;
        let velocityY = -115;
        let previousTime = 0;

        const move = (time) => {
            const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
            previousTime = time;

            const { x: maxX, y: maxY } = getBounds();
            x = Math.min(x, maxX);
            y = Math.min(y, maxY);

            x += velocityX * delta;
            y += velocityY * delta;
            let bounced = false;

            if ((x <= 0 && velocityX < 0) || (x >= maxX && velocityX > 0)) {
                x = Math.max(0, Math.min(x, maxX));
                velocityX *= -1;
                bounced = true;
            }

            if ((y <= 0 && velocityY < 0) || (y >= maxY && velocityY > 0)) {
                y = Math.max(0, Math.min(y, maxY));
                velocityY *= -1;
                bounced = true;
            }

            if (bounced) {
                changeColor();
            }

            bouncer.style.transform = `translate(${x}px, ${y}px)`;
            window.requestAnimationFrame(move);
        };

        window.requestAnimationFrame(move);
    }
}
