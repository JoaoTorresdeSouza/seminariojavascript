const quizData = [
    {
        question: "1. Quem criou o JavaScript?",
        options: ["Brendan Eich", "Mark Zuckerberg", "Tim Berners-Lee"],
        answer: 0
    },
    {
        question: "2. Quando o JavaScript foi criado?",
        options: ["1995", "2000", "1990"],
        answer: 0
    },
    {
        question: "3. Qual é a principal função do JavaScript em um site?",
        options: ["Criar servidores", "Tornar o site dinâmico e interativo", "Armazenar dados no banco de dados"],
        answer: 1
    },
    {
        question: "4. O que é Node.js?",
        options: ["Um framework para front-end", "Uma linguagem de programação", "Um ambiente de execução JavaScript no servidor"],
        answer: 2
    },
    {
        question: "5. Qual dessas bibliotecas JavaScript é usada para construir interfaces de usuário?",
        options: ["Angular", "Express", "MongoDB"],
        answer: 0
    },
    {
        question: "6. O que é o conceito de 'callback' no JavaScript?",
        options: ["Uma função que chama outra função após o término de uma tarefa", "Uma função que retorna outro valor", "Uma variável de tipo de dados especial"],
        answer: 0
    },
    {
        question: "7. O que é o DOM?",
        options: ["Um modelo de dados usado para representar páginas HTML e XML", "Um tipo de banco de dados", "Uma biblioteca JavaScript para manipulação de dados"],
        answer: 0
    },
    {
        question: "8. O que significa a sigla API no contexto do JavaScript?",
        options: ["Application Programming Interface", "Array Programming Interface", "Advanced Programming Interface"],
        answer: 0
    },
    {
        question: "9. Qual dessas empresas utiliza JavaScript em seus sistemas?",
        options: ["Facebook", "Microsoft Word", "Excel"],
        answer: 0
    },
    {
        question: "10. Qual desses frameworks é utilizado para construir aplicações web com JavaScript?",
        options: ["React", "Laravel", "Django"],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;
const userAnswers = []; // Armazenar as respostas do usuário

const quizContainer = document.getElementById('quizContainer');
const resultDiv = document.getElementById('result');
const scoreText = document.getElementById('score');
const retryButton = document.getElementById('retryQuiz');

// Função para gerar uma pergunta
function generateQuestion(questionIndex) {
    const questionData = quizData[questionIndex];
    
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    
    const questionTitle = document.createElement('h2');
    questionTitle.textContent = questionData.question;
    questionElement.appendChild(questionTitle);
    
    questionData.options.forEach((option, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q${questionIndex}`;
        input.value = index;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        questionElement.appendChild(label);
    });

    quizContainer.appendChild(questionElement);

    // Botão para próxima pergunta
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Próxima Pergunta';
    nextButton.classList.add('nextButton');
    nextButton.onclick = () => {
        checkAnswer();
        currentQuestion++;
        
        // Se não houver mais perguntas, exibe o resultado
        if (currentQuestion < quizData.length) {
            quizContainer.innerHTML = '';  // Limpa o conteúdo anterior
            generateQuestion(currentQuestion);  // Gera a próxima questão
        } else {
            showResult();
        }
    };
    
    quizContainer.appendChild(nextButton);
}

// Função para verificar as respostas
function checkAnswer() {
    const selectedAnswer = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if (selectedAnswer) {
        const answerIndex = parseInt(selectedAnswer.value);
        userAnswers[currentQuestion] = answerIndex; // Armazena a resposta do usuário
        if (answerIndex === quizData[currentQuestion].answer) {
            score++;
        }
    }
}

// Função para mostrar o resultado
function showResult() {
    quizContainer.style.display = 'none';
    resultDiv.style.display = 'block';
    scoreText.textContent = `Você acertou ${score} de 10 perguntas.`;

    // Exibir as perguntas e respostas, com cores para as corretas/erradas
    const resultList = document.createElement('div');
    quizData.forEach((questionData, index) => {
        const resultItem = document.createElement('div');
        const questionText = document.createElement('p');
        questionText.textContent = questionData.question;
        resultItem.appendChild(questionText);

        questionData.options.forEach((option, optionIndex) => {
            const optionText = document.createElement('span');
            optionText.textContent = option;
            if (optionIndex === questionData.answer) {
                optionText.style.color = 'green'; // Resposta correta
            } else if (optionIndex === userAnswers[index]) {
                optionText.style.color = 'red'; // Resposta incorreta
            }
            resultItem.appendChild(optionText);
            resultItem.appendChild(document.createElement('br')); // Quebra de linha entre as opções
        });

        resultList.appendChild(resultItem);
    });

    resultDiv.appendChild(resultList);
}

// Função para iniciar o quiz
function startQuiz() {
    generateQuestion(currentQuestion);
}

// Função para reiniciar o quiz
retryButton.addEventListener('click', () => {
    score = 0;
    currentQuestion = 0;
    userAnswers.length = 0; // Limpar as respostas do usuário
    quizContainer.innerHTML = '';  // Limpa o conteúdo
    resultDiv.style.display = 'none';  // Oculta o resultado
    quizContainer.style.display = 'block';  // Exibe o quiz
    startQuiz();  // Reinicia o quiz
});

// Iniciar o quiz
startQuiz();
