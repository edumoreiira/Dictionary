export interface Dictionary{
    word: string,
    phonetics: Phonetics[],
    meanings: Meanings[],
    license: License,
    sourceUrls: string[]
}
interface Phonetics{
    audio: string,
    sourceUrl: string,
    license: License
}

interface License{
    name: string,
    url: string
}

interface Meanings{
    partOfSpeech: string,
    definitions: Definitions[]
}

interface Definitions{
    definition: string,
    synonyms: string[],
    antonyms: string[],
    example: string
}
//////////////////////////////////////////////////////////////////////////////////////