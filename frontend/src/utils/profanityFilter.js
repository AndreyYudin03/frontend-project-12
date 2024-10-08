import leoProfanity from 'leo-profanity';

const filterProfanity = (text) => leoProfanity.clean(text);

export default filterProfanity;
