    var inGameWord = document.getElementById("inGameWord"); 
    var inChar = document.getElementById("inChar");
    var chances = document.getElementById("chances");
    var errors = document.getElementById("errors"); 
    var statusImage = document.getElementById("statusImage");
    var message = document.getElementById("message");
    var hint = document.getElementById("showHint");
    var playButton = document.getElementById("playButton");
    var showHintButton = document.getElementById("showHintButton");
    var playAgain = document.getElementById("playAgain");
    var drawWord;
    var drawHint;

function beginGame(){
    
    let words = localStorage.getItem("word").split(";");
    let hints = localStorage.getItem("hint").split(";");
    let wordsPlayed;
    let index;
    let flag = false;
    let emptyWord = "";

    index = Math.floor(Math.random() * words.length);

    if(localStorage.getItem("wordsPlayed")){

        wordsPlayed = localStorage.getItem("wordsPlayed").split(";");

        if(wordsPlayed.length == words.length){

            localStorage.removeItem("wordsPlayed");
            localStorage.setItem("wordsPlayed", index);

        }

        else{

            while(flag == false){

                flag = searchIndex(index, wordsPlayed);

                if(flag == false){

                    index = Math.floor(Math.random() * words.length);

                }

            }

            localStorage.setItem("wordsPlayed", localStorage.getItem("wordsPlayed") + ";" + index);

        }

    }

    else{

        localStorage.setItem("wordsPlayed", index);

    }

    drawWord = words[index].toUpperCase();
    drawHint = hints[index];
         
    for (let i = 0; i < drawWord.length; i++){
      
            emptyWord += "_";    

    }
  
    inGameWord.textContent = emptyWord;  

}

function searchIndex(idx, arr){

    for(let i = 0 ; i < arr.length ; i++){

        if(idx == arr[i]){

            return false;

        }

    }

    return true;

}

function charAttempted(){

    let char = inChar.value.toUpperCase(); 
    let error = errors.textContent;     
    let palavra = inGameWord.textContent;  
    let updatedWord = ""; 
    let updateChances;

    if (char == "" || char.length != 1) {

        alert("Informe apenas uma letra!");
        inChar.focus();

        return;

    }  

    if (error.indexOf(char) >= 0 || palavra.indexOf(char) >= 0) {

        alert("A letra" + char.toUpperCase() + "já foi usada.");
        inChar.focus();

        return;

    }

    if (drawWord.indexOf(char) >= 0) {   
    
        for (let i = 0; i < drawWord.length; i++) {
      
            if (drawWord.charAt(i) == char) {

                updatedWord += char;

            } 
            
            else {                            

                updatedWord += palavra.charAt(i);   

            }

        }

        inGameWord.textContent = updatedWord;  

    } 
    
    else {  
     
        error += char;                      
        errors.textContent = error;        
        updateChances = Number(chances.textContent);  
        updateChances -= 1;
        chances.textContent = updateChances;    

        changeStatus(updateChances);              

    }

    checkEndGameConditions();                       

    inChar.value = "";
    inChar.focus();

}

function showHint(){

    let errorsNumber = errors.textContent;   
    let chancesNumber; 

  
    if (errorsNumber.indexOf("*") >= 0) {

        alert("Você já solicitou a dica...");
        inLetra.focus();

        return;

    }

    hint.textContent = " * " + drawHint;        
    errors.textContent = errorsNumber + "*";                

    chancesNumber = Number(chances.textContent) - 1;  
    chances.textContent = chancesNumber;                  

    changeStatus(chancesNumber);                             
    checkEndGameConditions();    

    inChar.focus();   

}

function changeStatus(status) {

    if (status > 0) {

      statusImage.src = "../img/status" + status + ".jpg";

    }

}

function checkEndGameConditions(){

    let chancesNumber = Number(chances.textContent);   
  
    if (chancesNumber == 0) {                            
      
        message.style.color = "red";
        message.textContent = "Ah... a palavra é " + drawWord + ". Você Perdeu!";
        
        endGame();
    
    } 
    
    else if (inGameWord.textContent == drawWord){

        message.style.color = "blue";
        message.textContent = "Parabéns!! Você Ganhou.";

        endGame();

    }

}

function endGame(){

    let words = localStorage.getItem("word").split(";");
    let wordsPlayed = localStorage.getItem("wordsPlayed").split(";");

    if(words.length == wordsPlayed.length){

        playAgain.textContent = "* Todas as palavras foram usadas. Clique no botão 'Iniciar Jogo' para jogar novamente ou insira novas palavras." 

    }

    else{

        playAgain.textContent = "* Clique no botão 'Iniciar Jogo' para jogar novamente";

    }
    
    inChar.disabled = true;
    playButton.disabled = true;
    showHintButton.disabled = true;

}

function main(){

    if(localStorage.getItem("word")){   

        beginGame();       

    } 
    
    else{     

        inChar.disabled = true;                   
        playButton.disabled = true;                    
        showHintButton.disabled = true;          
        
        alert("Cadastre palavras para jogar."); 

    }

    playButton.addEventListener("click", charAttempted);
    showHintButton.addEventListener("click", showHint);

}

main();