const arrayContainer = document.getElementById('arrayContainer');
const generateArrayBtn = document.getElementById('generateArray');
const startSortBtn = document.getElementById('startSort');
const algorithmSelector = document.getElementById('algorithmSelector');
const speedSlider = document.getElementById('speedSlider');

let arr = [];
let arraySize = 100; // Número de barras
let animationSpeed = 100; // Milissegundos

// Função para gerar um novo array aleatório
function generateNewArray() {
    arr = [];
    arrayContainer.innerHTML = ''; // Limpa as barras existentes
    for (let i = 0; i < arraySize; i++) {
        const value = Math.floor(Math.random() * 290) + 10; // Valores entre 10 e 300
        arr.push(value);
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}px`;
        arrayContainer.appendChild(bar);
    }
}

// Função para atualizar a visualização das barras
function updateBars(bars, index1 = -1, index2 = -1, type = null) {
    return new Promise(resolve => {
        setTimeout(() => {
            // Resetar cores das barras não envolvidas na operação atual
            Array.from(bars).forEach((bar, i) => {
                if (i !== index1 && i !== index2) {
                    bar.style.backgroundColor = '#28a745'; // Cor padrão
                }
            });

            if (index1 !== -1 && index2 !== -1) {
                if (type === 'comparing') {
                    bars[index1].style.backgroundColor = '#ffc107';
                    bars[index2].style.backgroundColor = '#ffc107';
                } else if (type === 'swapping') {
                    bars[index1].style.backgroundColor = '#dc3545';
                    bars[index2].style.backgroundColor = '#dc3545';
                    // Atualiza alturas para refletir a troca
                    const tempHeight = bars[index1].style.height;
                    bars[index1].style.height = bars[index2].style.height;
                    bars[index2].style.height = tempHeight;
                }
            }
            resolve();
        }, animationSpeed);
    });
}

// Algoritmo Bubble Sort (simplificado para visualização)
async function bubbleSort() {
    const bars = arrayContainer.children;
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            await updateBars(bars, j, j + 1, 'comparing'); // Marcar para comparação

            if (arr[j] > arr[j + 1]) {
                // Trocar elementos no array de dados
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                await updateBars(bars, j, j + 1, 'swapping'); // Marcar para troca
            }
        }
        // Opcional: Marcar barra como ordenada após cada passada (para visualização)
        bars[n - 1 - i].style.backgroundColor = '#6f42c1'; // Marcar como sorted
    }
    bars[0].style.backgroundColor = '#6f42c1'; // Marca a última barra
}

// Event Listeners
generateArrayBtn.addEventListener('click', generateNewArray);
startSortBtn.addEventListener('click', () => {
    const selectedAlgorithm = algorithmSelector.value;
    // Aqui você chamaria a função do algoritmo selecionado
    if (selectedAlgorithm === 'bubbleSort') {
        bubbleSort();
    }
    // Adicione mais ifs/else ifs para outros algoritmos
});

speedSlider.addEventListener('input', (e) => {
    animationSpeed = 501 - parseInt(e.target.value); // Inverte para que valor maior = mais rápido
});

// Geração inicial do array ao carregar a página
generateNewArray();