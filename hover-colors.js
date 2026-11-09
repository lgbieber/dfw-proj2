const hoverColors = ["#FF0000", "#00FF0D", "#003CFF"];

document.querySelectorAll("a, button").forEach((control) => {
    const changeColor = () => {
        const index = Math.floor(Math.random() * hoverColors.length);
        control.style.color = hoverColors[index];
    };

    const restoreColor = () => {
        if (!control.matches(":hover, :focus")) {
            control.style.removeProperty("color");
        }
    };

    control.addEventListener("mouseenter", changeColor);
    control.addEventListener("mouseleave", restoreColor);
    control.addEventListener("focus", changeColor);
    control.addEventListener("blur", restoreColor);
});
