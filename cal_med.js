//Importe da biblioteca script
var imported = document.createElement ('script');
imported.src = "scrip.js";
document.head.appendChild(imported);

/*****************************Variáveis*****************************************************/
const med1 = null;
const med2= null;
let medfinal;
/*****************************Funções*****************************************************/
function calculo_media(){
//calculo da média do primeiro bimestre
med1 = ((prova1 * 0.8) + (aep1 * 0.1) + (provaIntegrada1 * 0.1)).toFixed(2);
valorCelula = med1; // Formata a média para 2 casas decimais

//Se as notas do segundo bimestre forem diferente de valores nulos será calculado a média
if (med1 !== null) {
    //calculo da média do segundo bimestre
    med2 = ((prova2 * 0.8) + (aep2 * 0.1) + (provaIntegrada2 * 0.1)).toFixed(2);
    valorCelula = med2; // Formata a média para 2 casas decimais

    //calculo da média final
    medfinal = ((med1 + med2)/2);
    valorCelula = mediafinal; // Formata a média para 2 casas decimais
}
else {
    // Se as notas do primeiro bimestre não estiverem preenchidas, exibir uma mensagem de erro
    erro = "Por favor, insira as notas do primeiro bimestre antes de inserir as do segundo bimestre."
    console.log("Por favor, insira as notas do primeiro bimestre antes de inserir as do segundo bimestre.");
}
}

//Status de aprovação:
function status(){
    //váriavel que armazena o status de aprovação do aluno
    let status_aluno;

    if(medfinal >= 6) {
        status_aluno = "Aprovado"
    }
    if(medfinal < 6 && medfinal >= 3) {
        status_aluno = "Recuperação"
    }
    else {
        status_aluno = "Reprovado"
    }

}
