let shuffles = 4

function buildDeck() {
    let values = ["A","2","3","4","5","6","7","8","9","T","J","Q","K"]
    let types = ["c","h","s","d"]
    deck = []

    for (let i=0;i<types.length;i++){
        for(let j=0;j<values.length;j++){
            deck.push(values[j]+types[i])
        }
    }
}

function shuffleDeck(){
    for(let i=0;i<deck.length;i++){
        let j = Math.floor(Math.random()*deck.length)
        let temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }
}

function startGame(){
    document.getElementById("newHand").hidden=true
    let p = new Audio("./assets/sounds/poker-chips.mp3")
    p.play()
    p.volume=0.1
    buildDeck()
    for(let i=0;i<shuffles;i++){
    shuffleDeck()    
    }
    
    let myCards = []
    let oppCards = []
    
    dealPreFlop(myCards,oppCards)
    setTimeout(function(){dealFlop(myCards,oppCards)}, 3000)
    setTimeout(function(){dealTurn(myCards,oppCards)}, 4500)
    setTimeout(function(){dealRiver(myCards,oppCards)}, 6000)
    setTimeout(function(){showDown(oppCards)}, 7000)
    setTimeout(function(){endGame(myCards,oppCards)}, 8000)
}

function dealPreFlop(arr1,arr2){
    var opp1 = deck.pop()
    var my1 = deck.pop()
    var opp2 = deck.pop()
    var my2 = deck.pop()
    arr1.push(my1,my2)
    arr2.push(opp1,opp2)
    
    setTimeout(function(){dealDealerCard(1)},500)
    setTimeout(function(){dealYourCard(my1)},1000)
    setTimeout(function(){dealDealerCard(2)},1500)
    setTimeout(function(){dealYourCard(my2)},2000)

    let hand1 = Hand.solve(arr1)
    msg = `${hand1.descr}`
    setTimeout(function(){document.getElementById("result").textContent=msg}, 2100)
}

function dealDealerCard(i){
        document.getElementById("hidden"+i).hidden=false
    }

function dealYourCard(crd){
    let cardImg = document.createElement("img")
        cardImg.src = "./assets/cards/"+crd+".png"
        document.getElementById("yourCards").append(cardImg)
}

function dealYourCards(arr){
    for(let i=0;i<2;i++){
    let cardImg = document.createElement("img")
    let cards = deck.pop()
    cardImg.src = "./assets/cards/"+cards+".png"
    document.getElementById("yourCards").append(cardImg)
    arr.push(cards)
    }
}

function dealFlop(arr1,arr2){
    deck.pop()
    for(let i=0;i<3;i++){
    let card = deck.pop()
    let cardImg = document.createElement("img")
    cardImg.src = "./assets/cards/"+card+".png"
    document.getElementById("theBoard").append(cardImg)
    arr1.push(card)
    arr2.push(card)
    }
    let hand1 = Hand.solve(arr1)
    msg = `${hand1.descr}`
    document.getElementById("result").textContent=msg
}

function dealTurn(arr1,arr2){
    deck.pop()
    let card = deck.pop()
    let cardImg = document.createElement("img")
    cardImg.src = "./assets/cards/"+card+".png"
    document.getElementById("theBoard").append(cardImg)
    arr1.push(card)
    arr2.push(card)
    let hand1 = Hand.solve(arr1)
    msg = `${hand1.descr}`
    document.getElementById("result").textContent=msg
}

function dealRiver(arr1,arr2){
    deck.pop()
    let card = deck.pop()
    let cardImg = document.createElement("img")
    cardImg.src = "./assets/cards/"+card+".png"
    document.getElementById("theBoard").append(cardImg)
    arr1.push(card)
    arr2.push(card)
    let hand1 = Hand.solve(arr1)
    msg = `${hand1.descr}`
    document.getElementById("result").textContent=msg
}

function showDown(arr){
    document.getElementById("hidden1").src = "./assets/cards/"+arr[0]+".png"
    document.getElementById("hidden2").src = "./assets/cards/"+arr[1]+".png"
}

function endGame(arr1,arr2){
hand1 = Hand.solve(arr1)
hand2 = Hand.solve(arr2)
var winner = Hand.winners([hand1,hand2])
hand1.index = 0
hand2.index = 1
let a = winner[0].index
// create an array of card 'values' for both player and opponent
let clnH1 = []
let clnH2 = []
for(i=0;i<hand1.game.cardsInHand;i++){    
    let a = hand1.cards[i].value
    clnH1.push(a)
    }
for(i=0;i<hand2.game.cardsInHand;i++){    
    let a = hand2.cards[i].value
    clnH2.push(a)
    }
// check to see if card 'values' are the same and set variable
if(hand1.name==hand2.name && _.isEqual(clnH1,clnH2)===true){
    a = 2
}

    var msg = ``
    var snd = ``

    if(a==0){
    msg = `You Won with ${hand1.descr}`
    snd = `win`
    } else if(a==1){
    msg = `You Lost to ${hand2.descr}`
    snd = `lose`
    } else {
    msg = `Split Pot`
    }
    
    askNewHand(msg,snd)

}

function askNewHand(m,snd){
    let p = new Audio(`./assets/sounds/${snd}.mp3`)
    p.play()
    p.volume=0.1
    document.getElementById("result").textContent=m
    document.getElementById("newHand").hidden=false
    document.getElementById("newHand").addEventListener("click", newHand)
}

function newHand(){
    window.location.reload()
}

window.onload = function(){
    startGame()
}