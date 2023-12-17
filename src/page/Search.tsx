import React, { useRef } from 'react';
import { Input, InputRef } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

type HeaderProps = {
  onChange: (value: string) => void;
};

export const Search: React.FC<HeaderProps> = (props) => {
  const refInput = useRef<InputRef>(null);

  function handlerWordChange(event: React.MouseEvent<HTMLFormElement>) {
    event.preventDefault();
    props.onChange(refInput.current!.input!.value);
  }

  return (
        <div className="header_search">
            <p className="header_caption">Word of the day</p>
            <p className="header_subcaption mb-3">What word do you want to look up?</p>
            <form onSubmit={handlerWordChange}>
                <div>
                     {/* <input type="search" ref={refInput} placeholder="Search Word" className="word_search"/> */}
                     <Input className="word_search"
                            placeholder="Search Word"
                            allowClear
                            prefix={<SearchOutlined />}
                            ref={refInput}
                     />
                </div>
            </form>
        </div>
  );
};
