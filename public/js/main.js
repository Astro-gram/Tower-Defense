import Tower from "./towers/tower.js";
import getTowerDictionary from "./setup.js";

localStorage.setItem("coinCount", 500);
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

let dragon = new Tower("2-1", 100)
dragon.upgrade(1000);
console.log(dragon.stats());

let test = getTowerDictionary(5, 10)

console.log(test)