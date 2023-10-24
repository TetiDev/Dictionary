export type AxiosResponseType = {
  word: string;
  phonetic: string;
  phonetics: PhoneticsType[];
  meanings: MeaningsType[];
};

type PhoneticsType = {
  text:string;
  audio: string;
  sourceUrl: string;
};

type MeaningsType = {
  partOfSpeech: string;
  definitions: DefinitionsType[];
  synonyms: string [];
};

type DefinitionsType = {
  definition: string;
  example: string
};

export type AxiosPexelsType = {
  photos: PexelsType[];
};

export type PexelsType = {
  id: number,
  src: SrcType,
  photographer: string
  url: string
};

type SrcType = {
  original: string,
  small: string
};
