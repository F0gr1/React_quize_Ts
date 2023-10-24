import React, { useState } from 'react';
import QuizForm from './QuizForm';
import UsernameForm from './UserNameForm';
import "../src/index.css";
const App: React.FC = () => {

    const [username , setUsername] = useState<string | null>(null);
    
    const startQuiz = (name : string) => {
      setUsername(name);
    };

   
    return(
      <div className="App">
        {username === null ? (
          <UsernameForm startQuiz={startQuiz} />
    ):(
        <QuizForm username={username}/>
      )}
      </div>
    );
}
export default App;
