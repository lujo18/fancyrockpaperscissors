
const playerSelector = document.querySelector(".player-selector");
const playerIcons = playerSelector.querySelectorAll(".icon");
const botSelector = document.querySelector(".ai-selector");
const botIcons = botSelector.querySelectorAll(".icon");
const explosionElem = document.querySelector("#explosion-cont");
const explosionImgs = explosionElem.querySelectorAll(".exp");

const winCond = [
    [1,3],
    [2,1],
    [3,2]
]

const types = ["rock", "paper", "scissors"]

let botPick;
let playerPick = "";

function botPlay () {
    botPick = Math.floor(Math.random() * 3);
    console.log("bot pick: " + botPick);
    const chosenIcon = botIcons[botPick];
    chosenIcon.classList.add("bot-in-battle")
    return chosenIcon;
}

//pPk = playerPick, pIc = playerIcon, bPk = botPick, bIc = botIcon
function battle(pPk, pIc, bPk, bIc) {
    setTimeout(function() {
        pIc.classList.add("p-final-battle");
        bIc.classList.add("b-final-battle");
    }, 1000);
    
    
    const randomExplosion = Math.floor(Math.random() * 2);
    

    explosionImgs.forEach(function(e) {
        e.src = "explosions/explosion" + randomExplosion + ".webp";
    })


    setTimeout(function () {
        explosionElem.classList.add("explosion-animate")
    },1500)
    
}



playerIcons.forEach(function(e) {
    const icon = e.querySelector("i");
    
    e.addEventListener("mousedown", function() {
        if(playerPick === "") {
            if (e.id === "rock-icon") {
                playerPick = 0;
            }
            if (e.id === "paper-icon") {
                playerPick = 1;
            }
            if (e.id === "scissors-icon") {
                playerPick = 2;
            }
            console.log(playerPick)

            e.classList.add("in-battle");
            /*setTimeout(function(){
                playerSelector.classList.add("hide");
                
            }, 1000)*/
            
            console.log(playerSelector.classList)
            const botIcon = botPlay();
            battle(playerPick, e, botPick, botIcon);
        }
    })

   
})