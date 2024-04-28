let formEdicao;

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
          
          // Adiciona os botões de editar notas
          const cellAcoes = novaLinha.insertCell(13);
          const btnEditar1 = document.createElement('button');
          btnEditar1.textContent = '1 Bimestre';
          btnEditar1.onclick = function() {
            editarNotas(aluno);
          };
          cellAcoes.appendChild(btnEditar1);

          const btnEditar2 = document.createElement('button');
          btnEditar2.textContent = '2 Bimestre';
          btnEditar2.onclick = function() {
            if (verificarNotasBimestre1Adicionadas(aluno)) {
              editarNotasBimestre2(aluno);
            } else {
              alert("Por favor, preencha as notas do Bimestre 1.");
            }
          };
          cellAcoes.appendChild(btnEditar2);
          
          // Adiciona o botão de exclusão
          const btnExcluir = document.createElement('button');
          btnExcluir.textContent = 'Excluir';
          btnExcluir.onclick = function() {
            excluirAluno(aluno);
          };
          cellAcoes.appendChild(btnExcluir);
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
  if (formEdicao) {
    formEdicao.remove(); // Remover o formulário de edição anterior, se existir
  }

  formEdicao = document.createElement('form');
  formEdicao.id = 'formEdicao';
  
  const titulo = document.createElement('h2');
  titulo.textContent = `Editar Notas de ${aluno.nome}`;
  formEdicao.appendChild(titulo);

  const labelProva1 = document.createElement('label');
  labelProva1.textContent = 'Nota da Prova 1:';
  const inputProva1 = document.createElement('input');
  inputProva1.id = 'input_prova_1';
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
  inputAep1.id = 'input_aep_1';
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
  inputProvaIntegrada1.id = 'input_prova_integrada_1';
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
  if (formEdicao) {
    formEdicao.remove(); // Remover o formulário de edição anterior, se existir
  }

  formEdicao = document.createElement('form');
  formEdicao.id = 'formEdicao';
  
  const titulo = document.createElement('h2');
  titulo.textContent = `Editar Notas do Segundo Bimestre de ${aluno.nome}`;
  formEdicao.appendChild(titulo);

  const labelProva2 = document.createElement('label');
  labelProva2.textContent = 'Nota da Prova 2:';
  const inputProva2 = document.createElement('input');
  inputProva2.id = 'input_prova_2';
  inputProva2.type = 'number';
  inputProva2.min = 0;
  inputProva2.max = 8;
  inputProva2.step = 0.1;
  inputProva2.value = aluno.prova2 || '';
  formEdicao.appendChild(labelProva2);
  formEdicao.appendChild(inputProva2);

  const labelAep2 = document.createElement('label');
  labelAep2.textContent = 'Nota da AEP 2:';
  const inputAep2 = document.createElement('input');
  inputAep2.id = 'input_aep_2';
  inputAep2.type = 'number';
  inputAep2.min = 0;
  inputAep2.max = 1;
  inputAep2.step = 0.1;
  inputAep2.value = aluno.aep2 || '';
  formEdicao.appendChild(labelAep2);
  formEdicao.appendChild(inputAep2);

  const labelProvaIntegrada2 = document.createElement('label');
  labelProvaIntegrada2.textContent = 'Nota da Prova Integrada 2:';
  const inputProvaIntegrada2 = document.createElement('input');
  inputProvaIntegrada2.id = 'input_prova_integrada_2';
  inputProvaIntegrada2.type = 'number';
  inputProvaIntegrada2.min = 0;
  inputProvaIntegrada2.max = 1;
  inputProvaIntegrada2.step = 0.1;
  inputProvaIntegrada2.value = aluno.provaIntegrada2 || '';
  formEdicao.appendChild(labelProvaIntegrada2);
  formEdicao.appendChild(inputProvaIntegrada2);

  const btnSalvar = document.createElement('button');
  btnSalvar.textContent = 'Salvar';
  btnSalvar.type = 'button';
  btnSalvar.onclick = function() {
    const novaNotaProva2 = parseFloat(inputProva2.value);
    const novaNotaAep2 = parseFloat(inputAep2.value);
    const novaNotaProvaIntegrada2 = parseFloat(inputProvaIntegrada2.value);

    // Verifica se todas as notas foram preenchidas
    if (novaNotaProva2 !== null && novaNotaAep2 !== null && novaNotaProvaIntegrada2 !== null) {
      aluno.prova2 = novaNotaProva2;
      aluno.aep2 = novaNotaAep2;
      aluno.provaIntegrada2 = novaNotaProvaIntegrada2;

      // Calcula a média do segundo bimestre
      aluno.med2 = ((aluno.prova2 * 0.8) + (aluno.aep2 * 0.1) + (aluno.provaIntegrada2 * 0.1)).toFixed(2);

      // Calcula a média final
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
      const index = alunosArmazenados.findIndex(item => item.ra === aluno.ra);
      alunosArmazenados[index] = aluno;
      localStorage.setItem('alunos', JSON.stringify(alunosArmazenados));

      // Atualiza a tabela
      carregarDadosDaTabela();
      
      formEdicao.remove(); // Remover o formulário de edição após salvar
    } else {
      alert("Por favor, preencha todas as notas.");
    }
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

function verificarNotasBimestre1Adicionadas(aluno) {
  return aluno.prova1 !== null && aluno.aep1 !== null && aluno.provaIntegrada1 !== null;
}

function excluirAluno(aluno) {
  const alunosArmazenados = JSON.parse(localStorage.getItem('alunos'));
  if (alunosArmazenados) {
    const index = alunosArmazenados.findIndex(item => item.ra === aluno.ra);
    if (index !== -1) {
      alunosArmazenados.splice(index, 1);
      localStorage.setItem('alunos', JSON.stringify(alunosArmazenados));
      carregarDadosDaTabela(); 
    }
  }
}
