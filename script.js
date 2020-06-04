const cardsColor = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];

let cards = document.querySelectorAll(".flex-item");
cards = [...cards]

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length/2;

let gameResult = 0;

const clickCard = function() {
    // clicks
    activeCard = this;
    if (activeCard == activeCards[0]) {
        return;
    }
    activeCard.classList.remove("hidden");

    // first click
    if(activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    }
    // second click
    else {
        cards.forEach(card => {
            card.removeEventListener("click", clickCard);
            activeCards[1] = activeCard;
            setTimeout(function() {
                if(activeCards[0].className===activeCards[1].className) {
                    activeCards.forEach(card => card.classList.add("off"));
                    console.log("wygrana");
                    cards = cards.filter(card =>!card.classList.contains("off"));
                    gameResult++;
                    if (gameResult == gamePairs) {
                        const endTime = new Date().getTime();
                        gameTime = (endTime - startTime)/1000 -2;
                        setTimeout(function(){
                            alert("Congratulations! Your time is : " + gameTime + " seconds!");
                            location.reload();
                        }, 500);
                        
                        
                    }
                }
                else {
                    activeCards.forEach(card => card.classList.add("hidden"));
                    console.log("przegrana");
                }
                activeCard = "";
                activeCards.length = 0;
                cards.forEach(card => card.addEventListener("click", clickCard))
            }, 500 )
           
        })
    }
};

const init = function() {
    cards.forEach(card => {
       const position = Math.floor(Math.random()*cardsColor.length);
       card.classList.add(cardsColor[position])
       cardsColor.splice(position, 1); 
    })

    setTimeout(function() {
        cards.forEach(card =>  {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard);
        })
    }, 2000)
}

setTimeout(function() {
    cards.forEach(card =>  {
        setInterval(function() {
            const cTime = new Date().getTime();
            let timero = cTime - startTime;
            document.getElementById('0001').innerHTML = Math.floor(timero/1000)-2;
        }, 15)
      
    })
}, 2000)
function ourTimer () {
   

}



init()

