import React from 'react';
import { QuizProvider } from './context/quiz';
import Quiz from './Quiz';  // Correct the import path if needed

const App = () => {
  return (
    <QuizProvider>
      <Quiz />
    </QuizProvider>
  );
};

export default App;
