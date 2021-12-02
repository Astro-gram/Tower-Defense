window.allowDrop = function allowDrop(e) {
    e.preventDefault();
}
  
window.drag = function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}
  
window.drop = function drop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    let towerCost = Number(document.getElementById(data).getAttribute("cost"));

    if (localStorage.getItem("coinCount") >= towerCost) { //Check if you can afford it
        if (data.indexOf("_") <= -1) { //Check if the tower you are trying to copying is from the towerBar or not
            let towerElem = convertToTower(document.getElementById(data), e.target.id);
            e.target.appendChild(towerElem.cloneNode(true));
            resetTowerBar();

            changeCoinCount(towerCost);
        }
        else {
            error("Don't you dare bro.");
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

function changeCoinCount(difference) {
    let newCoinCount = localStorage.getItem("coinCount") - difference;

    localStorage.setItem("coinCount", newCoinCount);
    document.querySelector(".coinCount").innerHTML = `$${newCoinCount}`;
}

function error(desc, title = "ERROR") {
    document.querySelector(".error__title").innerHTML = title;
    document.querySelector(".error__description").innerHTML = desc;

    document.querySelector(".error").classList.remove("closed");
    setTimeout(function() { document.querySelector(".error").classList.add("closed") }, 2000);
}