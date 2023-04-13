import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Tabs } from 'antd';
import { AxiosPexelsType, AxiosResponseType } from './AxiosResponseType';
import { Capitalize } from './capitalize';

type NounProps = {
  word: string;
  data: AxiosResponseType;
  dataPexels: AxiosPexelsType;
};

export const Body: React.FC<NounProps> = (props) => {
  const { TabPane } = Tabs;

  const onChange = (key: string) => {
    console.log(key);
  };

  const startVoice = async () => {
    const audio = new Audio(props.data.phonetics[0].audio);
    // console.log(props.data.phonetics[0].audio);
    await audio.play();
  };

  const prepareDataSynonimys = () => props.data.meanings.map((elem, index) => (
      <div className="block_style block_style_white mb-4 mt-4" key={index}>
          {elem.synonyms.map((subElem, index2) => <div key={index2} className='synonyms_num'><span className='numeric'>{index2 + 1}.</span> {subElem}</div>)}
      </div>
  ));

  const prepareDataDefinitions = () => props.data.meanings.map((elem, index) => (
          <div className="block_style block_style_white mb-4 mt-4" key={index}>
              <p className='part_of_speech mb-2'>{Capitalize(elem.partOfSpeech)}</p>
              {elem.definitions.map((subElem, index2) => <div key={index2} className='definition_num'><span className='numeric'>{index2 + 1}.</span> {subElem.definition}</div>)}
          </div>
  ));
  const prepareDataPhotos = () => props.dataPexels.photos.map((elem, index) => (
      <div className='col-sm-6 mb-2'>
        <img src={elem.src.original} style={{ }} key={index} className='img-fluid' alt='img'/>
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
                <Tabs defaultActiveKey="1" onChange={onChange}>
                    <TabPane tab="Definitions" key="1">
                        {
                            prepareDataDefinitions()
                        }
                    </TabPane>
                    <TabPane tab="Synonimys" key="2">
                        {
                            prepareDataSynonimys()
                        }
                    </TabPane>
                    <TabPane tab="Photos" key="3">
                        <div className="block_style block_style_white mb-4 mt-4" >
                            <div className='block_photo' >
                                <div className='row'>
                              {
                                prepareDataPhotos()
                              }
                            </div>
                        </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
      </div>
      </>
  );
};
