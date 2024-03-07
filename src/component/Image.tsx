import React, { FC } from 'react';
// import { dark } from '@mui/material/styles/createPalette';
import { ImageList, ImageListItem } from '@mui/material';
import { Empty } from 'antd';
import { PexelsType } from '../AxiosResponseType';

interface IImage {
  dataImage: PexelsType[]
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const QuiltedImageList: FC<IImage> = ({ dataImage }) => (
  dataImage.length
    ? <ImageList
            sx={{ width: '100%', height: 450 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
        >
            {dataImage.map((item) => (
                <ImageListItem key={item.id} cols={2} rows={1}>
                    <img
                        {...srcset(item.src.small, 121)}
                        alt={item.photographer}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    : <Empty/>
);
