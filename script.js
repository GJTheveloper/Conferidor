// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Contar números em comum <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const contarNumerosComuns = (lista1, lista2) => {
  return lista1.reduce(
    (count, numero) => (lista2.includes(numero) ? count + 1 : count),
    0
  );
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Cria Tabela: Resultado Geral <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Função para exibir os resultados na tabela.
const exibirResultados = (resultados, tabelaId, unidade) => {
  const tabela = document.getElementById(tabelaId).querySelector("tbody");
  tabela.innerHTML = "";

  for (const pontos in resultados) {
    const linha = document.createElement("tr");
    const colunaPontos = document.createElement("td");
    colunaPontos.textContent = `${pontos} pontos`;
    const colunaQuantidade = document.createElement("td");
    colunaQuantidade.textContent = `${resultados[pontos]} ${unidade}`;
    linha.appendChild(colunaPontos);
    linha.appendChild(colunaQuantidade);
    tabela.appendChild(linha);
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Cria Tabela: Resultado Geral <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const exibirLinhasInseridas = (infoLinhas) => {
  const tabelaLinhas = document
    .getElementById("tableRD")
    .querySelector("tbody");

  tabelaLinhas.innerHTML = "";

  infoLinhas.forEach((info, index) => {
    const linha = document.createElement("tr");
    const colunaLinha = document.createElement("td");
    colunaLinha.textContent = `${index + 1}`;

    const colunaNumerosInseridos = document.createElement("td");
    colunaNumerosInseridos.textContent = info.numerosInseridos.join(", ");

    const colunaNumerosIguais = document.createElement("td");
    colunaNumerosIguais.textContent = info.numerosIguais.join(", ");

    const colunaNumerosDiferentes = document.createElement("td");
    colunaNumerosDiferentes.textContent = info.numerosDiferentes.join(", ");

    const colunaQuantidadeAcertos = document.createElement("td");
    colunaQuantidadeAcertos.textContent = info.quantidadeAcertos;

    const colunaQuantidadeErros = document.createElement("td");
    colunaQuantidadeErros.textContent = info.quantidadeErros;

    linha.appendChild(colunaLinha);
    linha.appendChild(colunaNumerosInseridos);
    linha.appendChild(colunaNumerosIguais);
    linha.appendChild(colunaNumerosDiferentes);
    linha.appendChild(colunaQuantidadeAcertos);
    linha.appendChild(colunaQuantidadeErros);

    tabelaLinhas.appendChild(linha);
  });
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Cria Lista de Numeros Apostados <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const obterNumerosSelecionados = () => {
  const entradaLista = document.getElementById("lista").value;
  const linhas = entradaLista.trim().split(/\r?\n/);
  const numerosSelecionados = [];

  for (const linha of linhas) {
    const numeros = linha.trim().split(/[^0-9]+/);
    const numerosValidos = numeros.filter((numero) => parseInt(numero));
    numerosSelecionados.push(numerosValidos);
  }

  return numerosSelecionados;
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Botão Conferir <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
document.getElementById("conferir").addEventListener("click", (event) => {
  event.preventDefault();

  const numerosBase = document
    .getElementById("sorteados")
    .value.trim()
    .split(/[^0-9]+/)
    .filter((numero) => parseInt(numero));

  const numerosSelecionados = obterNumerosSelecionados();

  const resultados = {};
  const infoLinhas = [];

  for (const numerosAposta of numerosSelecionados) {
    const quantidadeNumerosComuns = contarNumerosComuns(
      numerosBase,
      numerosAposta
    );
    resultados[quantidadeNumerosComuns] =
      (resultados[quantidadeNumerosComuns] || 0) + 1;

    const numerosIguais = numerosAposta.filter((numero) =>
      numerosBase.includes(numero)
    );
    const numerosDiferentes = numerosAposta.filter(
      (numero) => !numerosBase.includes(numero)
    );

    infoLinhas.push({
      numerosInseridos: numerosAposta,
      numerosIguais: numerosIguais,
      numerosDiferentes: numerosDiferentes,
      quantidadeAcertos: quantidadeNumerosComuns,
      quantidadeErros: numerosBase.length - quantidadeNumerosComuns,
    });
  }

  exibirResultados(resultados, "tableRG", "vezes");
  exibirLinhasInseridas(infoLinhas);
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Botão Limpar <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
document.getElementById("limpar").addEventListener("click", (event) => {
  event.preventDefault();
  // Limpa o campo de sorteados
  document.getElementById("sorteados").value = "";
  // Limpa o campo de apostas
  document.getElementById("lista").value = "";

  // Limpar a tabela Resultado Geral
  const tabelaResultados = document
    .getElementById("tableRG")
    .querySelector("tbody");
  if (tabelaResultados) {
    tabelaResultados.innerHTML = "";
  }

  // Limpar a tabela Detalhes
  const tabelaLinhasInseridas = document
    .getElementById("tableRD")
    .querySelector("tbody");
  if (tabelaLinhasInseridas) {
    tabelaLinhasInseridas.innerHTML = "";
  }

  autoResizeTextarea();
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> autoResizeTextarea <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const autoResizeTextarea = () => {
  const textarea = document.getElementById("lista");
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
};

const textarea = document.getElementById("lista");
textarea.addEventListener("input", autoResizeTextarea);
