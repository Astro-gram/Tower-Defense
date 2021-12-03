import { getTowerData, upgradeTower, removeTower, error, changeCoinCount } from "./placeTower.js";

window.closeSideBar = function closeSideBar() {
    document.querySelector(".sideBar").classList.add("closed");
}

window.openSideBar = function openSideBar(e) {
    document.querySelector(".sideBar").classList.remove("closed");
    fillSideBar(e.target.id, e.srcElement.attributes[0].value);
}

function fillSideBar(towerName, towerImg) {
    let towerDataRaw = getTowerData(towerName.replace(/[^1-90\-]+/gi, "")); //Removing tower name to keep Spot ID
    let towerData = towerDataRaw.stats();

    let sideBarTitle = document.querySelector(".sideBar__header__tower")

    sideBarTitle.innerHTML = 
    `${towerName.substr(0, 0) + towerName[0].toUpperCase() + //Making first letter upper case
        towerName.substr(1, towerName.length).replace(/[^A-Z]+/gi, "")}`; //Removing Spot ID from name

    sideBarTitle.setAttribute("spot-id", towerName.replace(/[^1-90\-]+/gi, ""));
    
    document.querySelector(".sideBar__main__img").src = towerImg;
    document.querySelector(".sideBar__main__tier").innerHTML = `Tier: ${towerData.tier}`
    document.querySelector(".sideBar__main__upgrade-price").innerHTML = `Upgrade Cost: $${towerData.damagesAndUpgrades["tier" + (towerData.tier).toString()]}`
}

document.getElementById("upgrade-tower").addEventListener("click", () => {
    let spotId = document.querySelector(".sideBar__header__tower").getAttribute("spot-id");
    let res = upgradeTower(spotId, localStorage.getItem("coinCount"));

    if (res.success) {
        changeCoinCount((document.querySelector(".sideBar__main__upgrade-price").innerHTML.replace(/[^1-90]+/gi, "")));
        fillSideBar((document.querySelector(".sideBar__header__tower").innerHTML + spotId), document.querySelector(".sideBar__main__img").src);
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
    removeTower(document.querySelector(".sideBar__header__tower").getAttribute("spot-id"));
})