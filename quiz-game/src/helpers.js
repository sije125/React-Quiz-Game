export const shuffleAnswers = (question = {}) => {
    if (!question.correctAnswer || !question.incorrectAnswers) {
        console.warn("shuffleAnswers received an undefined question:", question);
        return [];
    }

    const unshuffledAnswers = [
        question.correctAnswer,
        ...question.incorrectAnswers
    ];

    return unshuffledAnswers
        .map((answer) => ({
            sort: Math.random(),
            value: answer,
        }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
};


export const normalizeQuestions = (backendQuestions = []) => {
    return backendQuestions.map((backendQuestion) => {
        return {
            correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
            question: decodeURIComponent(backendQuestion.question),
            incorrectAnswers: backendQuestion.incorrect_answers.map((incorrectAnswer) => decodeURIComponent(incorrectAnswer)),
        };
    });
};
