import React , { useState} from 'react';

interface UsernameFormProps {
  startQuiz: (name : string) => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({startQuiz}) =>{
  const [name , setName] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    startQuiz(name);
  }
  return (
    <form onSubmit={handleSubmit}>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">クイズを始めます。こちらの運営の株式会社セイトーシのクイーズサトシです。</p>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">  Enter your name:</h1>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <input type="text" id="full-name" placeholder='your name ?? ' name="full-name"  value={name} onChange={(e) => setName(e.currentTarget.value)} required  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"> Start</button>
          </div>
        </div>
      </section>
    </form>
  );
}

export default UsernameForm;