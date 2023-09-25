import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

type HeaderProps = {
  onChange: (value: string) => void;
};

export const Search: React.FC<HeaderProps> = (props) => {
  const refInput = useRef<HTMLInputElement>(null);
  function handlerWordChange(event: React.MouseEvent<HTMLFormElement>) {
    event.preventDefault();
    props.onChange(refInput.current!.value);
  }

  return (
        <div className="header_search">
            <p className="header_caption">Word of the day</p>
            <p className="header_subcaption mb-3">What word do you want to look up?</p>
            <form onSubmit={handlerWordChange}>
                <div>
                    <input type="search" ref={refInput} placeholder="Search Word" className="word_search"/>
                    {/* <FontAwesomeIcon icon={'magnifying-glass'}/> */}
                    <FontAwesomeIcon icon={icon({ name: 'magnifying-glass' })}/>
                    {/* <FontAwesomeIcon icon={solid('magnifying-glass')}/> */}
                </div>
            </form>
        </div>
  );
};
