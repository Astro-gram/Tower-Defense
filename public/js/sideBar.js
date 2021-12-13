import { getTowerData, upgradeTower, removeTower, error, changeCoinCount } from "./placeTower.js";
import { getTowerHitboxes } from "./track.js";

window.closeSideBar = function closeSideBar(e) {
    document.querySelector(".sideBar").classList.add("closed");
    let towerName = document.querySelector(".sideBar__header__tower");
    let spotId = towerName.getAttribute("spot-id");
    let elementName = `${towerName.innerHTML.toLowerCase()}_${spotId}`;

    document.getElementById(elementName).classList.remove("highlighted-tower");
    resetHighlighting();
}

window.openSideBar = function openSideBar(e) {
    document.querySelector(".sideBar").classList.remove("closed");
    fillSideBar(e.target.id, e.srcElement.attributes[0].value);
}

function fillSideBar(towerName, towerImg) {
    resetHighlighting();

    document.getElementById(towerName).classList.add("highlighted-tower");
    
    let spotId = towerName.replace(/[^1-90\-]+/gi, "");
    let towerDataRaw = getTowerData(spotId); //Removing tower name to keep Spot ID
    let towerData = towerDataRaw.stats();

    highlightTrack(getTowerHitboxes(spotId));

    let sideBarTitle = document.querySelector(".sideBar__header__tower")

    sideBarTitle.innerHTML = 
    `${towerName.substr(0, 0) + towerName[0].toUpperCase() + //Making first letter upper case
        towerName.substr(1, towerName.length).replace(/[^A-Z]+/gi, "")}`; //Removing Spot ID from name

    sideBarTitle.setAttribute("spot-id", spotId);
    
    document.querySelector(".sideBar__main__img").src = towerImg;
    document.querySelector(".sideBar__main__tier").innerHTML = `Tier: ${towerData.tier}`
    document.querySelector(".sideBar__main__upgrade-price").innerHTML = `Upgrade Cost: $${towerData.upgradeCost["tier" + (towerData.tier).toString()]}`
}

function resetHighlighting() {
    document.querySelectorAll(".tower").forEach((element) => {
        element.classList.remove("highlighted-tower");
    })

    document.querySelectorAll(".game-track").forEach((element) => {
        element.style.backgroundColor = "red";
    })
}

function highlightTrack(spots) {
    for (let i = 0; i < spots.length; i++) {
        document.getElementById(`track-${spots[i]}`).style.backgroundColor = "yellow";
    }
}

document.getElementById("upgrade-tower").addEventListener("click", () => {
    let spotId = document.querySelector(".sideBar__header__tower").getAttribute("spot-id");
    let res = upgradeTower(spotId, localStorage.getItem("coinCount"));

    if (res.success) {
        changeCoinCount((document.querySelector(".sideBar__main__upgrade-price").innerHTML.replace(/[^1-90]+/gi, "")));
        fillSideBar((document.querySelector(".sideBar__header__tower").innerHTML.toLowerCase() + "_" + spotId), document.querySelector(".sideBar__main__img").src);
    }
    else {
        if (res.errorCode === 1) {
            error("You don't have enough coins.");
        }
        else {
            error("This tower is maxed.");
        }
        
    }
})

document.getElementById("remove-tower").addEventListener("click", () => {
    let towerName = document.querySelector(".sideBar__header__tower");
    let spotId = towerName.getAttribute("spot-id");

    removeTower(spotId, `${towerName.innerHTML.toLowerCase()}_${spotId}`);
    resetHighlighting();
})