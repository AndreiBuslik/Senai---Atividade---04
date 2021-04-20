function addTask(){

    let inTask = document.getElementById("inTask");
    let task = inTask.value;

    if(task == ""){

        alert("Escreva uma tarefa antes de clicar em 'Adicionar'!");
        inTarefa.focus();            
        return;     

    }

    let table = document.getElementById("table");
    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);

    cell1.innerHTML = "<input type='checkbox'></input>";
    cell2.innerHTML = task;
    
    inTask.value = "";            
    inTask.focus();         

}

function selectTask(){

    let table = document.getElementById("table");
    let tableLength = table.rows.length;
    let aux = 0;

    if (tableLength <= 1) { 
        
        alert("Não há tarefas para selecionar!");     
        return;                                      

    }

    for (let i = 0; i < tableLength; i++) {
        
        if (table.rows[i].className == "table-warning") {

            table.rows[i].className = "default";   
            aux = i;                            
            break;                              

        }

    }

    if (aux == tableLength - 1) {

        aux = 0;

    }
    
    table.rows[aux + 1].className = "table-warning";

}

function removeTask(){

    let table = document.getElementById("table");
    let tableLength = table.rows.length;
    let aux = 0;

    if(tableLength <= 1){

        alert("Não há tarefas a serem removidas!");
        return;

    }

    for(let i = 0 ; i < tableLength ; i++){

        if (table.rows[i].className == "table-warning") {
  
            aux = i;                            
            break;                              

        }

    }

    if(aux == 0){

        alert("Selecione uma tarefa para ser removida!");
        return;

    }

    let cell = table.rows[aux].cells;

    if (confirm("Excluir a tarefa " + cell[1].innerHTML +"?")) {

       table.deleteRow(aux);    

    }

}

function recordTask(){

    let table = document.getElementById("table");
    let tableLength = table.rows.length;
    let cell;
    let task = "";

    if (tableLength <= 1) {                   

        alert("Não há tarefas a serem salvas!");    
        return;                     

    }

    for(let i = 1 ; i < tableLength ; i++){

        cell = table.rows[i].cells;
        task += cell[1].innerHTML + ";";

    }

    localStorage.setItem("tarefasDia", task.substr(0, task.length - 1));

    if (localStorage.getItem("tarefasDia")) {
    
        alert("Ok! Tarefas Salvas");
    
    }

}

function main(){
    
    let btAdd = document.getElementById("addButton");
    let btSel = document.getElementById("selectButton");
    let btRem = document.getElementById("removeButton");
    let btRec = document.getElementById("recordButton");

    btAdd.addEventListener("click", addTask);
    btSel.addEventListener("click", selectTask);
    btRem.addEventListener("click", removeTask);
    btRec.addEventListener("click", recordTask);

}

main();