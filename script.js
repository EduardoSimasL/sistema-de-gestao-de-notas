// Função para adicionar dados de um aluno
window.onload = function() {
  carregarDadosDaTabela();
};

function adicionaDadosAluno() {
    // Obtenha os valores dos campos do formulário
    const nome = document.getElementById('input_nome').value;
    const ra = document.getElementById('input_ra').value;
    const email = document.getElementById('input_email').value;

    let prova1 = null;
    let aep1 = null;
    let provaIntegrada1 = null;
    let prova2 = null;
    let aep2 = null;
    let provaIntegrada2 = null;

    const inputProva1 = document.getElementById('input_prova_1');
    const inputAep1 = document.getElementById('input_aep_1');
    const inputProvaIntegrada1 = document.getElementById('input_prova_integrada_1');
    if (inputProva1 && inputAep1 && inputProvaIntegrada1) {
        prova1 = parseFloat(inputProva1.value);
        aep1 = parseFloat(inputAep1.value);
        provaIntegrada1 = parseFloat(inputProvaIntegrada1.value);
    }

    const inputProva2 = document.getElementById('input_prova_2');
    const inputAep2 = document.getElementById('input_aep_2');
    const inputProvaIntegrada2 = document.getElementById('input_prova_integrada_2');
    if (inputProva2 && inputAep2 && inputProvaIntegrada2) {
        prova2 = parseFloat(inputProva2.value);
        aep2 = parseFloat(inputAep2.value);
        provaIntegrada2 = parseFloat(inputProvaIntegrada2.value);
    }

  
  // Calcule as médias e o status de aprovação
    let med1 = null;
    let med2 = null;
    let medFinal = null
/*****************************Fun��es*****************************************************/
  
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
        valorCelula = medFinal; // Formata a m�dia para 2 casas decimais
    }
   else {
        // Se as notas do primeiro bimestre n�o estiverem preenchidas, exibir uma mensagem de erro
        erro = "Por favor, insira as notas do primeiro bimestre antes de inserir as do segundo bimestre."
        console.log("Por favor, insira as notas do primeiro bimestre antes de inserir as do segundo bimestre.");
    }
    
    //Status de aprova��o:
  
    //v�riavel que armazena o status de aprova��o do aluno
    let status_aluno;

    if(medFinal >= 6) {
        status_aluno = "Aprovado"
    }
    if(medFinal < 6 && medFinal >= 3) {
        status_aluno = "Recupera��o"
    }
    else {
        status_aluno = "Reprovado"
    }


    const aluno = {
        nome: nome,
        ra: ra,
        email: email,
        
        prova1: prova1,
        aep1: aep1,
        provaIntegrada1: provaIntegrada1,
        med1: med1,
          
        prova2: prova2,
        aep2: aep2,
        provaIntegrada2: provaIntegrada2,
        med2: med2,

        medFinal: medFinal
        
        }
      
      // Verifique se já há dados armazenados
      let alunos = [];
      const alunosArmazenados = localStorage.getItem('alunos');
      if (alunosArmazenados) {
        alunos = JSON.parse(alunosArmazenados);
      }
    
      // Adicione o novo aluno à lista
      alunos.push(aluno);
    
      // Armazene os dados atualizados no LocalStorage
      localStorage.setItem('alunos', JSON.stringify(alunos));
      
      // Remover alunos localStorage.removeItem();
      

      carregarDadosDaTabela();
    }

    function carregarDadosDaTabela() {
      const tabela = document.getElementById('tabelaAlunos');
      // Verifica se a tabela está presente antes de tentar manipulá-la
  if (tabela) {
    const tbody = tabela.querySelector('tbody');
    document.getElementById('cadastroForm').reset(); // Limpe os campos do formulário após adicionar o aluno
    if (tbody) {
      tbody.innerHTML = ''; // Limpa a tabela antes de carregar os dados

      // Verifica se há dados armazenados no localStorage
      const alunosArmazenados = localStorage.getItem('alunos');
      if (alunosArmazenados) {
        const alunos = JSON.parse(alunosArmazenados);

        // Itera sobre os alunos armazenados e insere cada aluno na tabela
        alunos.forEach(aluno => {
          const novaLinha = tbody.insertRow(-1);
          novaLinha.insertCell(0).textContent = aluno.nome;
          novaLinha.insertCell(1).textContent = aluno.ra;
          novaLinha.insertCell(2).textContent = aluno.email;
        });
      }
    } else {
      console.log("A tabela não possui um corpo (tbody).");
    }
  } else {
    console.log("A tabela não foi encontrada.");
  }
}

  

  