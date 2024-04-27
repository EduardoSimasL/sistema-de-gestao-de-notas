//Importe da biblioteca script
var imported = document.createElement ('script');
imported.src = "script.js";
document.head.appendChild(imported);

/*****************************Vari�veis*****************************************************/
const med1 = null;
const med2= null;
let medFinal;
/*****************************Fun��es*****************************************************/
function calculo_media(){
//calculo da m�dia do primeiro bimestre
med1 = ((prova1 * 0.8) + (aep1 * 0.1) + (provaIntegrada1 * 0.1)).toFixed(2);
valorCelula = med1; // Formata a m�dia para 2 casas decimais

//Se as notas do segundo bimestre forem diferente de valores nulos ser� calculado a m�dia
if (med1 !== null) {
    //calculo da m�dia do segundo bimestre
    med2 = ((prova2 * 0.8) + (aep2 * 0.1) + (provaIntegrada2 * 0.1)).toFixed(2);
    valorCelula = med2; // Formata a m�dia para 2 casas decimais

    //calculo da m�dia final
    medFinal = ((med1 + med2)/2);
    valorCelula = mediafinal; // Formata a m�dia para 2 casas decimais
}
else {
    // Se as notas do primeiro bimestre n�o estiverem preenchidas, exibir uma mensagem de erro
    erro = "Por favor, insira as notas do primeiro bimestre antes de inserir as do segundo bimestre."
    console.log("Por favor, insira as notas do primeiro bimestre antes de inserir as do segundo bimestre.");
}
}

//Status de aprova��o:
function status(){
    //v�riavel que armazena o status de aprova��o do aluno
    let status_aluno;

    if(medFinal >= 6) {
        status_aluno = "Aprovado"
    }
    if(medFinal < 6 && medfinal >= 3) {
        status_aluno = "Recupera��o"
    }
    else {
        status_aluno = "Reprovado"
    }

}
