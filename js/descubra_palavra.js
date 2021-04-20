function registerWord(){

    
    let elementWord = document.getElementById("word");
    let elementHint = document.getElementById("hint");

    let word = elementWord.value;     
    let hint = elementHint.value;

    if (word == "" || hint == "" || word.indexOf(" ") >= 0) {

        alert("Informe uma palavra válida (sem espaços) e uma dica correspondente.");
        elementWord.focus();

        return;

    }

    if (localStorage.getItem("word")) {
        
        localStorage.setItem("word", localStorage.getItem("word") + ";" + word);
        localStorage.setItem("hint", localStorage.getItem("hint") + ";" + hint);

    } 
    
    else {
        
        localStorage.setItem("word", word);
        localStorage.setItem("hint", hint);

    }

    if (localStorage.getItem("word")) {
        
        alert("Palavra '" + word + "' cadastrada com sucesso!");
    
    }
    
      elementWord.value = "";     
      elementHint.value = "";
      elementWord.focus();

}

function main(){

    let registerButton = document.getElementById("registerButton");
    
    registerButton.addEventListener("click", registerWord);

}

main();