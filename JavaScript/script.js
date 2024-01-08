const mcqQuestions = [
    {
        question: "In the context of a partnership firm, what does 'Retirement of Partner' refer to?",
        options: [
            "Withdrawing from the business without affecting the remaining partners",
            "Dissolving the entire partnership",
            "Leaving the partnership but still being liable for the firm's debts",
            "None of the above"
        ],
        correctOption: 0
    },
    {
        question: "What is the primary purpose of calculating accounting ratios?",
        options: [
            "To evaluate the financial performance of a business",
            "To determine the number of partners in a firm",
            "To calculate income tax",
            "To measure the weight of financial documents"
        ],
        correctOption: 0
    },
    {
        question: "Explain the concept of 'Company' in accounting terms.",
        options: [
            "A legal entity formed by a group of individuals to engage in and operate a business enterprise with the aim of earning a profit.",
            "A partnership firm with multiple partners",
            "A sole proprietorship with a single owner",
            "A financial statement showing a firm's assets and liabilities"
        ],
        correctOption: 0
    },
    {
        question: "What is the significance of 'Death of Partner' in a partnership?",
        options: [
            "It dissolves the entire partnership.",
            "The deceased partner's share is transferred to the remaining partners.",
            "All partners must retire in case of death.",
            "The partnership continues with the legal heirs of the deceased partner."
        ],
        correctOption: 3
    },
    {
        question: "In accounting, what does the term 'Accounting Ratio' represent?",
        options: [
            "A comparison of financial data between different companies",
            "The relationship between various accounting figures",
            "The ratio of assets to liabilities",
            "The process of recording financial transactions"
        ],
        correctOption: 1
    },
    // Add more MCQ questions as needed
];

const writingQuestions = [
    {
        question: "Discuss the key steps involved in the 'Retirement of a Partner' process.",
        correctAnswer: "The retirement of a partner involves notifying other partners, settling the partner's account, and making necessary adjustments in the partnership agreement."
    },
    {
        question: "Explain the term 'Partnership' in the context of accounting.",
        correctAnswer: "A partnership is a form of business organization where two or more individuals manage and operate a business in accordance with the terms and objectives set out in a Partnership Deed."
    },
    {
        question: "What are the implications of 'Company' in terms of liability and ownership?",
        correctAnswer: "In a company, the liability of the owners (shareholders) is limited to the amount invested in the company. Ownership is determined by the number of shares held by an individual."
    },
    {
        question: "Discuss the accounting treatment in the case of the 'Death of a Partner'.",
        correctAnswer: "In the event of the death of a partner, the partnership is dissolved. The deceased partner's capital account is settled, and the remaining partners may continue the business with the consent of the legal heirs."
    },
    {
        question: "How does the 'Accounting Ratio' help in financial analysis?",
        correctAnswer: "Accounting ratios provide insights into the financial health and performance of a business. They help in assessing profitability, liquidity, and overall efficiency, enabling informed decision-making."
    },
    // Add more writing questions as needed
];

let currentMCQIndex = 0;
let currentWritingIndex = 0;
let marks = 0;

function showMCQQuestion(index) {
    const mcqContainer = document.getElementById('mcq-container');
    const mcqQuestion = mcqQuestions[index];

    mcqContainer.innerHTML = `<p>${mcqQuestion.question}</p>`;

    mcqQuestion.options.forEach((option, i) => {
        mcqContainer.innerHTML += `
            <label>
                <input type="radio" name="mcq-option" value="${i}"> ${option}
            </label><br>
        `;
    });
}

function showWritingQuestion(index) {
    const writingContainer = document.getElementById('writing-container');
    const writingQuestion = writingQuestions[index];

    writingContainer.innerHTML = `<p>${writingQuestion.question}</p>`;
    writingContainer.innerHTML += `<textarea id="writing-answer" required></textarea>`;
}

function checkMCQAnswer() {
    const selectedOption = document.querySelector('input[name="mcq-option"]:checked');

    if (selectedOption) {
        const userAnswer = parseInt(selectedOption.value);
        const correctOption = mcqQuestions[currentMCQIndex].correctOption;

        if (userAnswer === correctOption) {
            marks += 4; // 4 marks for each correct MCQ
        }

        currentMCQIndex++;
        if (currentMCQIndex < mcqQuestions.length) {
            showMCQQuestion(currentMCQIndex);
        } else {
            showWritingQuestion(currentWritingIndex);
            switchSection('mcq-section', 'writing-section');
        }
    } else {
        alert("Please select an option.");
    }
}

function checkWritingAnswer() {
    const userAnswer = document.getElementById('writing-answer').value.trim();
    const correctAnswer = writingQuestions[currentWritingIndex].correctAnswer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        marks += 6; // 6 marks for each correct written answer
    }

    currentWritingIndex++;
    if (currentWritingIndex < writingQuestions.length) {
        showWritingQuestion(currentWritingIndex);
    } else {
        switchSection('writing-section', 'result-section');
        showResultMessage();
    }
}

function showResultMessage() {
    const resultMessage = document.getElementById('result-message');
    const percentage = (marks / 80) * 100;

    resultMessage.innerHTML = `
        <p>Total Marks: ${marks} out of 80 marks</p>
        <p>Percentage: ${percentage.toFixed(2)}%</p>
        <p>Result: ${percentage >= 40 ? 'Pass' : 'Fail'}</p>
    `;
}

function switchSection(fromSection, toSection) {
    document.getElementById(fromSection).style.display = 'none';
    document.getElementById(toSection).style.display = 'block';
}

// Initial setup
showMCQQuestion(currentMCQIndex);
