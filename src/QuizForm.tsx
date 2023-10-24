import React, {useEffect, useState} from "react";
import Quiz from "./QuizeType";
interface QuizProps{
  username: string;
}

const QuizForm : React.FC<QuizProps> = ({ username }) =>{
  
  const [quizData, setQuizData] = useState<Quiz[] | null>(null);
  const [error] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const fetchData = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=15&type=multiple');
      
      const data = await response.json();
      console.log(data.results);
      setQuizData(data.results);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!quizData) {
    return <p>No quiz data available.</p>;
  }
  const handleAnswer = (ans: string) => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      alert("次のクイズ");
    } else {
      alert('終了');
    }
  };
  return (
    <div>
        <div>
          <p className="p-3">{ quizData[currentQuestionIndex].question } </p>
          <div className="grid grid-cols-2 bg-emerald-50 p-1">
            <div className="border-solid border-2 p-4" onClick={() => handleAnswer(quizData[currentQuestionIndex].correct_answer)} >
              { quizData[currentQuestionIndex].correct_answer}
            </div>
            {
              quizData[currentQuestionIndex].incorrect_answers.map((ans: string, ansIndex: number) => (
              <div key={ansIndex}  onClick={() => handleAnswer(ans)} className="border-solid border-2 p-4">
                {ans}
              </div>
              ))
            }
          </div>
        </div>
    </div>
  );
}
export default QuizForm;