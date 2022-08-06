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
};

type DefinitionsType = {
  definition: string;
  example: string
};
