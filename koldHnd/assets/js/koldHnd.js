

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

    function dealDealerCard(i){
        document.getElementById("hidden"+i).hidden=false
    }

    function dealYourCard(crd){
    let cardImg = document.createElement("img")
        cardImg.src = "./assets/cards/"+crd+".png"
        document.getElementById("yourCards").append(cardImg)
}
    
    // let cardImg2 = document.createElement("img")
    
    // cardImg2.src = "./cards/"+my2+".png"
    // document.getElementById("yourCards").append(cardImg)
    // document.getElementById("yourCards").append(cardImg2)
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
}

function dealTurn(arr1,arr2){
    deck.pop()
    let card = deck.pop()
    let cardImg = document.createElement("img")
    cardImg.src = "./assets/cards/"+card+".png"
    document.getElementById("theBoard").append(cardImg)
    arr1.push(card)
    arr2.push(card)
}

function dealRiver(arr1,arr2){
    deck.pop()
    let card = deck.pop()
    let cardImg = document.createElement("img")
    cardImg.src = "./assets/cards/"+card+".png"
    document.getElementById("theBoard").append(cardImg)
    arr1.push(card)
    arr2.push(card)
}

function showDown(arr){
    document.getElementById("hidden1").src = "./assets/cards/"+arr[0]+".png"
    document.getElementById("hidden2").src = "./assets/cards/"+arr[1]+".png"
}

function endGame(){
    document.getElementById("newHand").hidden=false
    document.getElementById("newHand").addEventListener("click", newHand)
}

function newHand(){
    window.location.reload()
}

window.onload = function(){
    startGame()
}