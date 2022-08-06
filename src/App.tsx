import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Search } from './Search';
import { Footer } from './Footer';
import { Body } from './Body';
import { AxiosResponseType } from './AxiosResponseType';

function App() {
  const [word, setWord] = useState('');
  const [data, setData] = useState<AxiosResponseType>({
    word: '',
    meanings: [],
    phonetic: '',
    phonetics: [],
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (
      async () => {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        try {
          const response = await axios.get(url);
          console.log(response);
          setData(response.data[0]);
        } catch (e) {
          console.log('This is an error!');
        }
      }
    )();
  }, [word]);

  const handlerWordChange = (subWord:string) => {
    setWord(subWord);
    setVisible(true);
  };

  return (
        <div className="App">
            <Search onChange={handlerWordChange}/>
            { visible
              ? <Body word={word} data={data} />
              : null
            }
            <Footer/>
        </div>
  );
}

export default App;
