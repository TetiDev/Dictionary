import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import type { TabsProps } from 'antd';
import { Empty, Tabs } from 'antd';
import { AxiosPexelsType, AxiosResponseType } from '../AxiosResponseType';
import { Capitalize } from '../capitalize';
import { QuiltedImageList } from '../component/Image';

type NounProps = {
  data: AxiosResponseType;
  dataPexels: AxiosPexelsType;
  dataTranslate: string
};

export const Body: React.FC<NounProps> = ({ data, dataPexels, dataTranslate }) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const startVoice = async () => {
    const audio = new Audio(data.phonetics[0].audio);
    // console.log(props.data.phonetics[0].audio);
    await audio.play();
  };

  const prepareDataDefinitions = () => data.meanings.map((elem, index) => (
        <div className="block_style block_style_white mb-4 mt-4" key={index}>
            <p className='part_of_speech mb-2'>{Capitalize(elem.partOfSpeech)}</p>
            {elem.definitions.map((subElem, index2) => <div key={index2} className={'definition'}>
                <div className='definition_num'>
                    <span className='numeric'>{index2 + 1}.</span> {subElem.definition}</div>
                {subElem.example && <p className={'sentence'}>"{subElem.example}"</p>}
            </div>)}
        </div>
  ));

  const prepareDataSynonimys = () => data.meanings.map((elem, index) => (
    !!elem.synonyms.length && <div className="block_style block_style_white mb-4 mt-4" key={index}>
            {elem.synonyms.map((subElem, index2) => <div key={index2} className='synonyms_num'>
                <span className='numeric'>{index2 + 1}.</span> {subElem}</div>)}
        </div>
  ));

  const prepareDataPhotos = () => (
      <div className="block_style  mb-4 mt-4">
        <QuiltedImageList dataImage={dataPexels.photos}/>
      </div>
  );

  const prepareDataTranslate = () => (
    dataTranslate
      ? <div className="block_style block_style_white mb-4 mt-4">
            <div className='translate'><span className='numeric'>1.</span>{dataTranslate}</div>
        </div>
      : <Empty />
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Definitions',
      children: prepareDataDefinitions().filter((elem) => elem).length ? prepareDataDefinitions() : <Empty />,

    },
    {
      key: '2',
      label: 'Synonimys',
      children: prepareDataSynonimys().filter((elem) => elem).length ? prepareDataSynonimys() : <Empty />,
    },
    {
      key: '3',
      label: 'Photos',
      children: prepareDataPhotos(),
    },
    {
      key: '4',
      label: 'Translate',
      children: prepareDataTranslate(),
    },
  ];

  return (
        <>
            <div className="block_style block_style__color mt-3 mb-3">
                <div className='current_word'>
                    <p>{data.word ? Capitalize(data.word) : ''}</p>
                    <div className={'word_phonetic__speek'}>
                        <FontAwesomeIcon icon={icon({ name: 'volume-high' })} onClick={startVoice}/>
                    </div>
                </div>
                <div className='word_phonetic mt-3'>
                    <span style={{ color: '#E77087', marginRight: '20px' }}>Phonetic</span>
                    <span style={{ color: 'white' }}>{data.phonetic}</span>
                </div>
            </div>
            <div className="block_meanings">
                <div>
                    <Tabs defaultActiveKey="1" onChange={onChange} items={items}></Tabs>
                </div>
            </div>
        </>
  );
};
