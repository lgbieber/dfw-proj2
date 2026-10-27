document.querySelectorAll(".artist-image-button").forEach((button) => {
    button.addEventListener("click", () => {
        const artistPopup = document.getElementById(button.getAttribute("aria-controls"));
        if (!artistPopup) {
            throw new Error(`Missing artist popup: ${button.getAttribute("aria-controls")}`);
        }
        document.body.style.overflow = "hidden";
        artistPopup.showModal();
    });
});

document.querySelectorAll(".artist-popup").forEach((artistPopup) => {
    artistPopup.addEventListener("close", () => {
        document.body.style.overflow = "";
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.querySelector(".artist-popup[open]")?.close();
    }
});
