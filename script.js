window.onload = function() {
  carregarDadosDaTabela();
};

function adicionaDadosAluno() {
  const inputNome = document.getElementById('input_nome');
  const inputEmail = document.getElementById('input_email');
  const inputRA = document.getElementById('input_ra');

  if (inputNome && inputEmail && inputRA) {
    const nome = inputNome.value;
    const email = inputEmail.value;
    const ra = inputRA.value;

    if (nome.trim() !== '' && email.trim() !== '' && ra.trim() !== '') {
      const aluno = {
        nome: nome,
        email: email,
        ra: ra,
        prova1: null,
        aep1: null,
        provaIntegrada1: null,
        med1: null,
        prova2: null,
        aep2: null,
        provaIntegrada2: null,
        med2: null,
        medFinal: null,
        status: null
      };

      let alunos = [];
      const alunosArmazenados = localStorage.getItem('alunos');
      if (alunosArmazenados) {
        alunos = JSON.parse(alunosArmazenados);
      }

      alunos.push(aluno);
      localStorage.setItem('alunos', JSON.stringify(alunos));

      inputNome.value = '';
      inputEmail.value = '';
      inputRA.value = '';

      carregarDadosDaTabela();
    } else {
      console.log("Por favor, preencha todos os campos obrigatórios.");
    }
  }
}

function carregarDadosDaTabela() {
  const tabela = document.getElementById('tabelaAlunos');
  if (tabela) {
    const tbody = tabela.querySelector('tbody');
    if (tbody) {
      tbody.innerHTML = '';

      const alunosArmazenados = localStorage.getItem('alunos');
      if (alunosArmazenados) {
        const alunos = JSON.parse(alunosArmazenados);
        alunos.forEach(aluno => {
          const novaLinha = tbody.insertRow(-1);
          novaLinha.insertCell(0).textContent = aluno.nome;
          novaLinha.insertCell(1).textContent = aluno.ra;
          novaLinha.insertCell(2).textContent = aluno.email;
          novaLinha.insertCell(3).textContent = aluno.prova1 || '';
          novaLinha.insertCell(4).textContent = aluno.aep1 || '';
          novaLinha.insertCell(5).textContent = aluno.provaIntegrada1 || '';
          novaLinha.insertCell(6).textContent = aluno.prova2 || '';
          novaLinha.insertCell(7).textContent = aluno.aep2 || '';
          novaLinha.insertCell(8).textContent = aluno.provaIntegrada2 || '';
          novaLinha.insertCell(9).textContent = aluno.med1 || '';
          novaLinha.insertCell(10).textContent = aluno.med2 || '';
          novaLinha.insertCell(11).textContent = aluno.medFinal || '';
          novaLinha.insertCell(12).textContent = aluno.status || '';
          novaLinha.insertCell(13).innerHTML = `<button onclick="editarNotasBimestre2(${JSON.stringify(aluno)})">Editar</button>`;


          // Adiciona botão de edição
          const cellAcoes = novaLinha.insertCell(13);
          const btnEditar = document.createElement('button');
          btnEditar.textContent = 'Editar';
          btnEditar.onclick = function() {
            editarNotas(aluno);
          };
          cellAcoes.appendChild(btnEditar);
        });
      }
    } else {
      console.log("A tabela não possui um corpo (tbody).");
    }
  } else {
    console.log("A tabela não foi encontrada.");
  }
}

function editarNotas(aluno) {
  const formEdicao = document.createElement('form');
  formEdicao.id = 'formEdicao';
  
  const titulo = document.createElement('h2');
  titulo.textContent = `Editar Notas de ${aluno.nome}`;
  formEdicao.appendChild(titulo);

  const labelProva1 = document.createElement('label');
  labelProva1.textContent = 'Nota da Prova 1:';
  const inputProva1 = document.createElement('input');
  inputProva1.type = 'number';
  inputProva1.min = 0;
  inputProva1.max = 8;
  inputProva1.step = 0.1;
  inputProva1.value = aluno.prova1 || '';
  formEdicao.appendChild(labelProva1);
  formEdicao.appendChild(inputProva1);

  const labelAep1 = document.createElement('label');
  labelAep1.textContent = 'Nota da AEP 1:';
  const inputAep1 = document.createElement('input');
  inputAep1.type = 'number';
  inputAep1.min = 0;
  inputAep1.max = 1;
  inputAep1.step = 0.1;
  inputAep1.value = aluno.aep1 || '';
  formEdicao.appendChild(labelAep1);
  formEdicao.appendChild(inputAep1);

  const labelProvaIntegrada1 = document.createElement('label');
  labelProvaIntegrada1.textContent = 'Nota da Prova Integrada 1:';
  const inputProvaIntegrada1 = document.createElement('input');
  inputProvaIntegrada1.type = 'number';
  inputProvaIntegrada1.min = 0;
  inputProvaIntegrada1.max = 1;
  inputProvaIntegrada1.step = 0.1;
  inputProvaIntegrada1.value = aluno.provaIntegrada1 || '';
  formEdicao.appendChild(labelProvaIntegrada1);
  formEdicao.appendChild(inputProvaIntegrada1);

  const btnSalvar = document.createElement('button');
  btnSalvar.textContent = 'Salvar';
  btnSalvar.type = 'button';
  btnSalvar.onclick = function() {
    aluno.prova1 = parseFloat(inputProva1.value);
    aluno.aep1 = parseFloat(inputAep1.value);
    aluno.provaIntegrada1 = parseFloat(inputProvaIntegrada1.value);

    // Calcular média 1
    const med1 = ((aluno.prova1 * 0.8) + (aluno.aep1 * 0.1) + (aluno.provaIntegrada1 * 0.1)).toFixed(2);
    aluno.med1 = parseFloat(med1);

    // Atualizar no localStorage
    const alunosArmazenados = localStorage.getItem('alunos');
    if (alunosArmazenados) {
      const alunos = JSON.parse(alunosArmazenados);
      const index = alunos.findIndex(a => a.ra === aluno.ra);
      if (index !== -1) {
        alunos[index] = aluno;
        localStorage.setItem('alunos', JSON.stringify(alunos));
        carregarDadosDaTabela(); // Atualizar a tabela após salvar
      }
    }

    formEdicao.remove(); // Remover o formulário de edição após salvar
  };
  formEdicao.appendChild(btnSalvar);

  const btnCancelar = document.createElement('button');
  btnCancelar.textContent = 'Cancelar';
  btnCancelar.type = 'button';
  btnCancelar.onclick = function() {
    formEdicao.remove(); // Remover o formulário de edição ao cancelar
  };
  formEdicao.appendChild(btnCancelar);

  document.body.appendChild(formEdicao);
}

function editarNotasBimestre2(aluno) {
  if (verificarNotasBimestre1Adicionadas(aluno)) {
      const novaNotaProva2 = prompt("Digite a nova nota da Prova 2:");
      const novaNotaAep2 = prompt("Digite a nova nota da AEP 2:");
      const novaNotaProvaIntegrada2 = prompt("Digite a nova nota da Prova Integrada 2:");
    
      // Verifica se o usuário inseriu todas as notas
      if (novaNotaProva2 !== null && novaNotaAep2 !== null && novaNotaProvaIntegrada2 !== null) {
        // Atualiza as notas do aluno
        aluno.prova2 = parseFloat(novaNotaProva2);
        aluno.aep2 = parseFloat(novaNotaAep2);
        aluno.provaIntegrada2 = parseFloat(novaNotaProvaIntegrada2);
    
        // Recalcula as médias
        aluno.med2 = ((aluno.prova2 * 0.8) + (aluno.aep2 * 0.1) + (aluno.provaIntegrada2 * 0.1)).toFixed(2);
        aluno.medFinal = ((parseFloat(aluno.med1) + parseFloat(aluno.med2)) / 2).toFixed(2);
    
        // Determina o status de aprovação
        if (aluno.medFinal >= 6) {
          aluno.status = "Aprovado";
        } else if (aluno.medFinal < 6 && aluno.medFinal >= 3) {
          aluno.status = "Recuperação";
        } else {
          aluno.status = "Reprovado";
        }
    
        // Atualiza os dados do aluno no localStorage
        const alunosArmazenados = JSON.parse(localStorage.getItem('alunos'));
        const indice = alunosArmazenados.findIndex(item => item.ra === aluno.ra);
        alunosArmazenados[indice] = aluno;
        localStorage.setItem('alunos', JSON.stringify(alunosArmazenados));
    
        // Atualiza a tabela
        carregarDadosDaTabela();
      }
    }
}  

function verificarNotasBimestre1Adicionadas(aluno) {
  return aluno.prova1 !== null && aluno.aep1 !== null && aluno.provaIntegrada1 !== null;
}

