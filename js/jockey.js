    const horses = ["Marujo", "Tordilho", "Belga", "Twister", "Jade", "Lucky"];
    var horseNumber = document.getElementById("horseNumber");
    var bet = document.getElementById("bet");
    var betsPlaced = document.getElementById("betsPlaced");
    var betButton = document.getElementById("betButton");
    var winnerButton = document.getElementById("winnerButton");
    var newButton = document.getElementById("newButton");
    var horseName = document.getElementById("horseName");
    var allBets = [];

function newBet() {

    let horse = Number(horseNumber.value);
    let betValue = Number(bet.value);
    let betsList = "Apostas Realizadas\n-------------------------------------\n";
 
    if (isNaN(horse) || isNaN(betValue) || betValue == 0 || horse < 1 || horse > horses.length) {

            alert("Aposta inválida!");
            horseNumber.focus();

            return;

    }

    allBets.push({ horse: horse, betValue: betValue });

    for (let i = 0; i < allBets.length; i++) {

            betsList += "Nº " + allBets[i].horse + " " + getHorse(allBets[i].horse);
            betsList += " - R$: " + allBets[i].betValue.toFixed(2) + "\n";

    }

    betsPlaced.textContent = betsList;  

    horseNumber.value = "";     
    bet.value = "";
    horseName.textContent = "";
    horseNumber.focus();        

}

function getHorse(number){

    return horses[number - 1]; 

}

function displayHorse() {
    
    let number = Number(horseNumber.value);
    let name = getHorse(number);
    let totalBets = countBets(number);
    let total = sumBets(number);

    if (horseNumber.value == "") {

        horseName.textContent = "";

        return;

    }
    
    if (isNaN(number) || number < 1 || number > horses.length){

        horseName.textContent = "Número do cavalo inválido!";

        return;

    }

    horseName.textContent = name + " (Apostas: " + totalBets;
    horseName.textContent += " - R$: " + total.toFixed(2) + ")";

}

function countBets(number){

    let counter = 0;
  
    for (let i = 0 ; i < allBets.length ; i++) {
    
        if(allBets[i].horse == number){

            counter++;     

        }
    }

  return counter; 

}

function sumBets(number){
    
    let total = 0;

    for (let i = 0; i < allBets.length; i++) {

        if (allBets[i].horse == number) {

            total += allBets[i].betValue;   

        }

    }

  return total; 

}

function winner() {
    
    let winnerHorse = Math.floor(Math.random() * horses.length) + 1;
    let report = "Resultado Final do Páreo\n"

    report += "-------------------------------------\n"
    report += "Nº Total de Apostas: " + allBets.length + "\n";
    report += "Total Geral R$: " + sumAllBets().toFixed(2) + "\n\n";
    report += "Ganhador Nº " + winnerHorse + " - " + getHorse(winnerHorse) + "\n";
    report += "-------------------------------------\n"
    report += "Nº de Apostas: " + countBets(winnerHorse) + "\n";
    report += "Total Apostado R$: " + sumBets(winnerHorse).toFixed(2);
  
    betsPlaced.textContent = report;   
  
    betButton.disabled = true;    
    winnerButton.disabled = true;
    newButton.focus();               

}

function sumAllBets(){

    let total = 0;
  
    for (let i = 0 ; i < allBets.length ; i++) {
        
        total = total + allBets[i].betValue;
    
    }
  
    return total; 

}

function main(){

    betButton.addEventListener("click", newBet);
    horseNumber.addEventListener("blur", displayHorse);
    winnerButton.addEventListener("click", winner);
    newButton.addEventListener("click", 
        
        function (){

            location.reload(); 
    
        }
    
    );

}

main();