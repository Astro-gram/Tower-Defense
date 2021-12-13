import { getBaseTowerMap } from "./setup.js";
import Tower from "./classes/tower.js";

let towerMap = getBaseTowerMap();
//towerMap["2-9"] = new Tower("2-9", "10000000000000", "5")

window.allowDrop = function allowDrop(e) {
    e.preventDefault();
}
  
window.drag = function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}
  
window.drop = function drop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("text") || null;
    let towerCost = 0;

    if (data.length !== 2) {
        towerCost = Number(document.getElementById(data).getAttribute("cost"));
    }
    
    if (localStorage.getItem("coinCount") >= towerCost) { //Check if you can afford it
        if (data.length !== 2 && data.indexOf("_") <= -1) { //Check if the tower you are trying to copying is from the towerBar or not
            if ((e.target.id).indexOf("_") <= -1) { //Check if that spot is already filled with another tower
                console.log(data)
                let towerElem = convertToTower(document.getElementById(data), e.target.id);
                e.target.appendChild(towerElem.cloneNode(true));
                towerMap[e.target.id] = new Tower(e.target.id, towerCost);

                resetTowerBar();

                changeCoinCount(towerCost);
            }
            else {
                error("Tower spot already filled.");
            }
        }
        else {
            error("An error has occured while trying to add a non-tower to the map.");
        }
    }

    else {
        error("You don't have enough coins.");
    }

}




function resetTowerBar() {
    [...document.querySelector(".towerBar").getElementsByTagName("*")].forEach((element) => {
        if (element.hasAttribute("playing-tower")) {
            convertToTower(element, null, true);
        }
    })
}

function convertToTower(towerElement, spotId, backToTowerBar = false) {
    towerElement.classList.toggle("border");
    towerElement.classList.toggle("tower");
    towerElement.classList.toggle("towerBar__tower");

    towerElement.toggleAttribute("playing-tower");
    
    if (!backToTowerBar) {
        towerElement.setAttribute("id", (towerElement.getAttribute("id") + "_" + spotId));
        towerElement.setAttribute("draggable", "false");
        towerElement.setAttribute("onclick", "openSideBar(event)");
    }
    else {
        towerElement.setAttribute("id", towerElement.getAttribute("id").replace(/[^A-Z]+/gi, ""));
        towerElement.setAttribute("draggable", "true");
        towerElement.removeAttribute("onclick");
    }

    return towerElement;
}

function changeCoinCount(difference, addOrSubtract = 0) {
    let newCoinCount;

    if (addOrSubtract === 1) {
        newCoinCount = Number(localStorage.getItem("coinCount")) + difference;
    }
    else {
        newCoinCount = Number(localStorage.getItem("coinCount")) - difference;
    }

    localStorage.setItem("coinCount", newCoinCount);
    document.querySelector(".coinCount").innerHTML = `$${newCoinCount}`;
}

function error(desc, title = "ERROR") {
    document.querySelector(".error__title").innerHTML = title;
    document.querySelector(".error__description").innerHTML = desc;

    document.querySelector(".error").classList.remove("closed");
    setTimeout(function() { document.querySelector(".error").classList.add("closed") }, 2000);
}

//towerMap Interface for other files

function getTowerData(spotId) {
    return towerMap[spotId];
}

function getTowerMap() {
    return towerMap;
}

function upgradeTower(spotId, coinCount) {
    let tower = towerMap[spotId];
    return tower.upgradeTower(Number(coinCount));
}

function removeTower(spotId, id) {
    towerMap[spotId] = null;
    document.getElementById(id).remove();
    document.querySelector(".sideBar").classList.add("closed");
}

export { getTowerData, upgradeTower, removeTower, error, changeCoinCount, getTowerMap };