function displayTable() {
    
    if (localStorage.getItem("word")) {
      
        let words = localStorage.getItem("word").split(";");
        let hints = localStorage.getItem("hint").split(";");
        let tableWords = document.getElementById("tableWords");
        let row, col1, col2, col3;   // declara as variáveis
  
        for (let i = 0 ; i < words.length ; i++) {
  
            row = tableWords.insertRow();     
  
            col1 = row.insertCell(0);           
            col2 = row.insertCell(1);
            col3 = row.insertCell(2);
  
            col1.textContent = words[i];       
            col2.textContent = hints[i];
            col3.innerHTML = "<input type='checkbox' class='checkWord'>";  

        }

    }

}

function showWordsInTable(){
    
    let showWords = document.getElementById("showWords");
    let deleteButton = document.getElementById("deleteButton");

    if (showWords.checked) {                        
        
        displayTable();  
        deleteButton.style.display = "inline";
    
    } 

    
    else {                                        
        
        location.reload();                           
    
    }

}

function checkAllInTable(){

    let checkAll = document.getElementById("checkAll");
    let tableWords = document.getElementById("tableWords");
    let checkWord = tableWords.getElementsByClassName("checkWord");
    let status = checkAll.checked;

    for (let i = 0 ; i < checkWord.length ; i++){

        checkWord[i].checked = status;

    }

}

function removeWord(){

    let tableWords = document.getElementById("tableWords");
    let checkWord = tableWords.getElementsByClassName("checkWord");
    let wordIsChecked = false;    
    let words = localStorage.getItem("word").split(";");
    let hints = localStorage.getItem("hint").split(";");

    for (let i = 0; i < checkWord.length; i++){
        
        if (checkWord[i].checked){           

            wordIsChecked = true;   

            break;                              

        }

    }

    if (!wordIsChecked) {

        alert("Não há palavras selecionadas para eserem excluidas!");

        return;

    }

    if (confirm("Excluir as palavras selecionadas?")){

        localStorage.removeItem("word");
        localStorage.removeItem("hint");

        words = "";               
        hints = "";

        for (i = 0 ; i < checkWord.length ; i++) {
     
            if (!checkWord[i].checked) {
       
                words += tableWords.rows[i+1].cells[0].textContent + ";";
                hints += tableWords.rows[i+1].cells[1].textContent + ";";

            }

        }

        if (words != "") {
      
            localStorage.setItem("word", words.substr(0, words.length));
            localStorage.setItem("hint", hints.substr(0, hints.length));

        }

        for (i = checkWord.length - 1 ; i >= 0; i--) {

            if (checkWord[i].checked) {

                tableWords.deleteRow(i+1);     

            }

        }

        checkWord[0].checked = false;   

    }

}

function main(){

    let showWords = document.getElementById("showWords");
    let checkAll = document.getElementById("checkAll");
    let deleteButton = document.getElementById("deleteButton");

    showWords.addEventListener("change", showWordsInTable);
    checkAll.addEventListener("change", checkAllInTable);
    deleteButton.addEventListener("click", removeWord);

}

main();