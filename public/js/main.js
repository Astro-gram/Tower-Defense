localStorage.setItem("coinCount", 10000);
document.querySelector(".coinCount").innerHTML = `$${localStorage.getItem("coinCount")}`;

function randColor() {
    let colors = ["red", "green", "blue", "purple", "yellow", "orange", "black", "gray"];
    return colors[Math.floor(Math.random() * 8)];
}

document.querySelectorAll(".game-spot").forEach((element) => {
    element.style.backgroundColor = "green";
});

document.querySelectorAll(".game-track").forEach((element) => {
    element.style.backgroundColor = "red";
});
