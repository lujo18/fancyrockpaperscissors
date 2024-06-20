const gamePage = document.querySelector("#game-page");
const playerSelector = document.querySelector(".player-selector");
const playerIcons = playerSelector.querySelectorAll(".icon");
const playerPictureIcons = playerSelector.querySelectorAll("i");
const botSelector = document.querySelector(".ai-selector");
const botIcons = botSelector.querySelectorAll(".icon");
const explosionElem = document.querySelector("#explosion-cont");
const explosionImgs = explosionElem.querySelectorAll(".exp");

const rulesCover = document.querySelector(".rules-cover")

const r = document.querySelector(":root");

const winCond = [
    [0,2],
    [1,0],
    [2,1]
]

const types = ["rock", "paper", "scissors"]

let botPick;
let playerPick = "";

let playerScore = 0;
let botScore = 0;

let winningScore = 3;
const psDisplay = document.querySelector("#player-score");
const bsDisplay = document.querySelector("#bot-score");


bsDisplay.addEventListener("animationend", function(e) {
    bsDisplay.classList.remove("animate-score")
})
psDisplay.addEventListener("animationend", function(e) {
    psDisplay.classList.remove("animate-score")
})

let roundWinner;

function choseWinner () {
    winCond.forEach(function (set) {
        console.log(set);
        if(set[0] === playerPick  && set[1] === botPick) {
            roundWinner = "player"
            playerScore++;
            psDisplay.classList.add("animate-score")
            setTimeout(function() {
                psDisplay.innerHTML = playerScore;
            },1500)
        } else if(set[0] === botPick && set[1] === playerPick) {
            roundWinner = "bot"
            botScore++;
            bsDisplay.classList.add("animate-score")
            setTimeout(function() {
                bsDisplay.innerHTML = botScore;
            },1500)
            
        } else if(botPick === playerPick) {
            roundWinner = "tie"
        }
        console.log(psDisplay)

    })
}

const piDisplay = document.querySelector("#player-pick-display");
const biDisplay = document.querySelector("#bot-pick-display");

function botPlay () {
    botPick = Math.floor(Math.random() * 3);
    console.log("bot pick: " + botPick);
    const chosenIcon = botIcons[botPick];
    chosenIcon.classList.add("bot-in-battle")

    biDisplay.innerHTML = types[botPick]
    piDisplay.innerHTML = types[playerPick]

    biDisplay.classList.add("bot-pick-display-slide-in");
    piDisplay.classList.add("player-pick-display-slide-in");


    choseWinner();
    return chosenIcon;

}


const resultPage = document.querySelector("#result-page");
const winnerText = resultPage.querySelector("#winner-text");
const winnerSubtext = resultPage.querySelector("#winner-subtext");

function showResults (theWinner) {
    resultPage.classList.add("show");
    if (theWinner == "player") {
        winnerText.innerHTML = "You Win!";
        winnerSubtext.innerHTML = "Keep up this momentum and play again!"
    }
    if (theWinner == "bot") {
        winnerText.innerHTML = "You Lost..";
        winnerSubtext.innerHTML = "You'll beat the bot next time!";
    }
}



//pPk = playerPick, pIc = playerIcon, bPk = botPick, bIc = botIcon
function battle(pPk, pIc, bPk, bIc) {
    playerSelector.classList.add("darken");
    gamePage.classList.add("active");
    console.log(playerSelector)
    setTimeout(function() {
        pIc.classList.add("p-final-battle");
        bIc.classList.add("b-final-battle");
    }, 1500);
    
    const explosionRotate = (Math.floor(Math.random() * 51) - 25) + "deg";
    r.style.setProperty("--explosion-rotate", explosionRotate)

    const randomExplosion = Math.floor(Math.random() * 6);
    

    explosionImgs.forEach(function(e) {
        if (roundWinner === "player") {
            e.src = "winner/win" + randomExplosion + ".webp";
        }
        if (roundWinner === "bot") {
            e.src = "lose/lose" + randomExplosion + ".webp";
        }
        if (roundWinner === "tie") {
            e.src = "tie/tie" + randomExplosion + ".webp";
        }

    })


    setTimeout(function () {
        explosionElem.classList.add("explosion-animate");
        pIc.classList.add("slide-in");
        pIc.classList.remove("p-final-battle", "in-battle")
        console.log("Bot Classlist: " + bIc.classList)
        bIc.classList.remove("bot-in-battle", "b-final-battle")

        if(playerScore >= winningScore) {
            showResults("player");
        }
        if(botScore >= winningScore) {
            showResults("bot")
        }



    },1800)

    setTimeout(function () {
        playerSelector.classList.remove("darken");
        explosionElem.classList.remove("explosion-animate");
        pIc.classList.remove("slide-in");
        playerPictureIcons.forEach ( function (e) {
            e.classList.remove("icon-darken")
        })
        playerPick="";
        biDisplay.classList.remove("bot-pick-display-slide-in");
        piDisplay.classList.remove("player-pick-display-slide-in");
        gamePage.classList.remove("active")
        battling=false;
    }, 4000)
    
}

let battling = false;

playerIcons.forEach(function(e) {

    const icon = e.querySelector("i");
    
    e.addEventListener("mouseover", function () {
        if (!battling) {
            icon.classList.add("hovered");
        }
    })
    e.addEventListener("mouseleave", function () {
        icon.classList.remove("hovered");
    })

    e.addEventListener("mousedown", function() {
        battling = true;
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

            playerIcons.forEach(function(ic) {
                console.log(ic)
                console.log(e)
                if(ic!==e) {
                    const thisIcon = ic.querySelector("i");
                    thisIcon.classList.add("icon-darken");
                }
            })

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


function startGame () {
    playerScore = 0;
    botScore = 0;
    resultPage.classList.remove("show");
    psDisplay.classList.add("animate-score")
    bsDisplay.classList.add("animate-score")
    setTimeout(function() {
        psDisplay.innerHTML = playerScore;
        bsDisplay.innerHTML = botScore;
    },1500)
}




const startPage = document.querySelector("#start-page");

function chooseDifficulty () {
    startPage.style.transform = "translatey(100vh)"
    rulesCover.classList.add("show");
    setTimeout(() => {
        rulesCover.classList.remove("show");
    }, 2000);
}