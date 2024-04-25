// Função para adicionar dados de um aluno
function adicionaDadosAluno() {
    // Obtenha os valores dos campos do formulário
    const nome = document.getElementById('input_nome').value;
    const ra = document.getElementById('input_ra').value;
    const email = document.getElementById('input_email').value;
    const prova1 = parseFloat(document.getElementById('input_prova_1').value);
    const aep1 = parseFloat(document.getElementById('input_aep_1').value);
    const provaIntegrada1 = parseFloat(document.getElementById('input_prova_integrada_1').value);
    const prova2 = parseFloat(document.getElementById('input_prova_2').value);
    const aep2 = parseFloat(document.getElementById('input_aep_2').value);
    const provaIntegrada2 = parseFloat(document.getElementById('input_prova_integrada_2').value);
  
    // Realize as validações necessárias

  
    // Calcule as médias e o status de aprovação

  
    // Crie uma nova linha na tabela para exibir os dados do aluno
    const tabela = document.getElementById('tabelaAlunos');
    const novaLinha = tabela.insertRow(-1);
    const colunas = ['Nome', 'RA', 'E-mail', 'Prova 1', 'AEP 1', 'Prova Integrada 1', 'Prova 2', 'AEP 2', 'Prova Integrada 2', 'Média 1', 'Média 2', 'Média Final', 'Status'];
    for (let i = 0; i < colunas.length; i++) {
        const celula = novaLinha.insertCell(i);
        let valorCelula;
      
        // Insira os dados do aluno nas células correspondentes
        switch (colunas[i]) {
          case 'Nome':
            valorCelula = nome;
            break;
          case 'RA':
            valorCelula = ra;
            break;
          case 'E-mail':
            valorCelula = email;
            break;
          case 'Prova 1':
            valorCelula = prova1.toFixed(2); // Formata a nota para 2 casas decimais
            break;
          case 'AEP 1':
            valorCelula = aep1.toFixed(2); // Formata a nota para 2 casas decimais
            break;
          case 'Prova Integrada 1':
            valorCelula = provaIntegrada1.toFixed(2); // Formata a nota para 2 casas decimais
            break;
          // Adicione outros casos conforme necessário para as outras colunas
          case 'Média 1':
            const mediaBimestral1 = ((prova1 * 0.8) + (aep1 * 0.1) + (provaIntegrada1 * 0.1)).toFixed(2);
            valorCelula = mediaBimestral1; // Formata a média para 2 casas decimais
            break;
          // Adicione outros casos conforme necessário para as outras colunas
          default:
            valorCelula = ''; // Se não houver correspondência, deixe o valor vazio
        }
      
        celula.textContent = valorCelula; // Insere o valor na célula
      }
      
  
    // Limpe os campos do formulário após adicionar o aluno
    document.getElementById('cadastroForm').reset();

    const aluno = {
        nome: nome,
        ra: ra,
        email: email,
        notas: {
          primeiroBimestre: {
            prova: prova1,
            aep: aep1,
            provaIntegrada: provaIntegrada1
          },
          segundoBimestre: {
            prova: prova2,
            aep: aep2,
            provaIntegrada: provaIntegrada2
          }
        }
      };
    
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
    
      // Limpe os campos do formulário após adicionar o aluno
      document.getElementById('cadastroForm').reset();
    }



  