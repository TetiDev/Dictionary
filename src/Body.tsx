import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { AxiosResponseType } from './AxiosResponseType';
import { Capitalize } from './capitalize';

type NounProps = {
  word: string;
  data: AxiosResponseType;
};

export const Body: React.FC<NounProps> = (props) => {
  console.log(props.data);

  const startVoice = async () => {
    const audio = new Audio(props.data.phonetics[0].audio);
    await audio.play();
  };

  const prepareData = () => props.data.meanings.map((elem, index) => (
          <div className="block_style block_style_white mb-4 mt-4" key={index}>
              <p className='part_of_speech mb-2'>{Capitalize(elem.partOfSpeech)}</p>
              {elem.definitions.map((subElem, index2) => <div key={index2} className='definition_num'><span className='numeric'>{index2 + 1}.</span> {subElem.definition}</div>)}
          </div>
  ));

  return (
      <>
        <div className="block_style block_style__color mt-3 mb-3">
            <div className='current_word'>
                <p>{props.data.word ? Capitalize(props.data.word) : ''}</p>
                <div className={'word_phonetic__speek'}>
                    <FontAwesomeIcon icon={solid('volume-high')} onClick={startVoice}/>
                </div>
            </div>
            <div className='word_phonetic mt-3'>
                <span style={{ color: '#E77087', marginRight: '20px' }}>Phonetic</span>
                <span style={{ color: 'white' }}>{props.data.phonetic}</span>
            </div>
        </div>

      <div className="block_meanings">
            <div>
                <h1 className='defenitions'>Definitions</h1>
                    {
                        prepareData()
                    }
            </div>
      </div>
      </>
  );
};
