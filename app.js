let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let twoPlayerBtn = document.querySelector("#two-player-btn");
let computerBtn = document.querySelector("#computer-btn");

let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6], 
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]; 

const resetGame = () => {
    turnO =true;
    enableBoxes();
    msgContainer.classList.add("hide")
};

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turnO) {
            box.innerText ="O";
            turnO = false;
        } else {
            box.innerText ="X";
            turnO = true;

        }
        box.disabled = true;

        checkWinner();
        
    
if (playWithComputer && !turnO && !msgContainer.classList.contains("hide")) return;
        if (playWithComputer && !turnO) {
            setTimeout(computerMove, 500);
            
            
        }
    });
});

const computerMove = () => {
    let emptyBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") emptyBoxes.push(index);
    });

    if (emptyBoxes.length === 0) return;

    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomIndex].innerText = "X";
    boxes[randomIndex].disabled = true;
    turnO = true;
    checkWinner();
};



const disabledBoxes =() => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes =() => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText =`Congratulations,Winner is ${winner} `;
    msgContainer.classList.remove("hide");
    disabledBoxes(); 


};

const checkWinner = () => {
    let WinnerFound = false;

    for ( let pattern of winPatterns) {
       let pos1Val = boxes[pattern[0]].innerText;
       let pos2Val = boxes[pattern[1]].innerText;
         let pos3Val = boxes[pattern[2]].innerText;

         if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
           if(pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val); 
            WinnerFound = true;
            break;
             
           } 
         }
        
    }

    if(!WinnerFound) {
        let allBoxesFilled = true;
        for(let box of boxes) {
            if(box.innerText === "") {
                allBoxesFilled = false;
                break;
            }
        }
        if(allBoxesFilled) {
            msg.innerText = "It's a Draw!";
            msgContainer.classList.remove("hide");
            disabledBoxes();
        }
    }
};
twoPlayerBtn.addEventListener("click", () => {
    playWithComputer = false;
    resetGame();
});

computerBtn.addEventListener("click", () => {
    playWithComputer = true;
    resetGame();
});

newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame)