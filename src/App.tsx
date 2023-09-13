import React, { useEffect, useState } from 'react';
import './style/App.css';
import './style/tabs.css';
import axios from 'axios';
import { Translate } from '@google-cloud/translate/build/src/v2';
import { Search } from './page/Search';
import { Footer } from './page/Footer';
import { Body } from './page/Body';
import { AxiosPexelsType, AxiosResponseType } from './AxiosResponseType';
import { Capitalize } from './capitalize';

function App() {
  const [word, setWord] = useState('');
  const [dataTranslate, setDataTranslate] = useState('');
  const [data, setData] = useState<AxiosResponseType>({
    word: '',
    meanings: [],
    phonetic: '',
    phonetics: [],

  });
  const [visible, setVisible] = useState(false);
  const [dataPexels, setDataPexels] = useState<AxiosPexelsType>({
    photos: [],
  });
  const [langTarget,setLangTarget] = useState<string>('ru');

  const googleApiKey = process.env.GOOGLE_TRANSLATE_APP_API_KEY;
  const projectId = process.env.GOOGLE_TRANSLATE_PROJECT_ID;

  const translate = new Translate({
    projectId,
    key: googleApiKey,
  });

  useEffect(() => {
    (
      async () => {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const urlPexels = `https://api.pexels.com/v1/search?query=${word}&per_page=10`;
        try {
          const response = await axios.get(url);
          const responsePexels = await axios.get(urlPexels, { headers: { Authorization: '563492ad6f91700001000001e0301533c7f94b83ad764347fac773be' } });
          setData(response.data[0]);
          setDataPexels(responsePexels.data);

          const [translations] = await translate.translate(word, langTarget);
          setDataTranslate(Capitalize(translations));
          console.log(translations);
        } catch (e) {
          console.log('This is an error!');
        }
      }
    )();
  }, [word]);

  const handlerWordChange = (subWord: string) => {
    setWord(subWord);
    setVisible(true);
  };

  return (
        <div className="App">
            <Search onChange={handlerWordChange}/>
            {visible
              ? <Body word={word} data={data} dataPexels={dataPexels} dataTranslate={dataTranslate}/>
              : null
            }
            <Footer/>
        </div>
  );
}

export default App;
