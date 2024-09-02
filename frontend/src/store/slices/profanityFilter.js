import leoProfanity from 'leo-profanity';

leoProfanity.add(leoProfanity.getDictionary('ru'));
leoProfanity.add(leoProfanity.getDictionary('en'));

export default (text) => leoProfanity.clean(text);
