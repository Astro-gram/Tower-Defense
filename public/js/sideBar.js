function closeSideBar() {
    document.querySelector(".sideBar").classList.add("closed");
}

function openSideBar(e) {
    document.querySelector(".sideBar").classList.remove("closed");
    fillSideBar(e.target.id);
}

function fillSideBar(towerName) {
    document.querySelector(".sideBar__header__tower").innerHTML = 
    `${towerName.substr(0, 0) + towerName[0].toUpperCase() + //Making first letter upper case
        towerName.substr(1, towerName.length).replace(/[^A-Z]+/gi, "")}`; //Removing Spot ID from name
}