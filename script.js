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
      // Insira os dados do aluno nas células correspondentes
      // Lembre-se de formatar os números conforme necessário
    }
  
    // Limpe os campos do formulário após adicionar o aluno
    document.getElementById('cadastroForm').reset();
  }
  