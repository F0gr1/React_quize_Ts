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
      // クイズ問題をfetch してくる
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=15&type=multiple');
      const data = await response.json();

      //クイズデータセット
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
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  if (!quizData) {
    return <h1>No quiz data available.</h1>;
  }
  const allAnswers = [
    ...quizData[currentQuestionIndex].incorrect_answers,
    quizData[currentQuestionIndex].correct_answer
  ];
  
  // 選択肢をシャッフルする関数
  const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  const shuffledAnswers = shuffle([...allAnswers]); // 新しい配列としてシャッフル
  
  const handleAnswer = (ans: string) => {
    if(ans === quizData[currentQuestionIndex].correct_answer){
        alert("正解");
    }else{
      alert("不正解");
    }
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
        <p className="p-3">{quizData[currentQuestionIndex].question}</p>
          <div className="grid grid-cols-2 bg-emerald-50 p-1">
            {shuffledAnswers.map((ans, ansIndex) => (
              <div
                key={ansIndex}
                onClick={() => handleAnswer(ans)}
                className="border-solid border-2 p-4"
              >
                {ans}
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
export default QuizForm;