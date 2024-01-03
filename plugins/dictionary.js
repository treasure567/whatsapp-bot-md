const {bot, sleep} = require('../lib');
bot(
    {
        pattern: 'nodict ?(.*)',
        fromMe: true,
        desc: 'get meaning of a word',
        type: 'all',
    },
    async (message, match) => {
        if (!match)
            return await message.send('it is necessary to send a word!')
        
        const response = await fetch(`https://api.urbandictionary.com/v0/define?term=${match}`)
        const json = await response.json()
        if (!json.list.length)
            return await message.send('oops!!, no results found!')  
    
        return await message.send(json.list[0].definition)
    }
)

bot(
    {
        pattern: 'dict ?(.*)',
        fromMe: true,
        desc: 'get meaning of a word',
        type: 'all',
    },
    async (message, match) => {
        if (!match)
            return await message.send('it is necessary to send a word!');

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${match}`);
        const json = await response.json();

        //random number
        let number = Math.floor(Math.random() * 100);
        if (number % 7 == 0)
            message.send('There is another command called "nodict" which gives funny meanings of words. Try it out!');

        if (!json.length)
            return await message.send('oops!!, no results found!')
        let msg = '';
        msg += `*${json[0].word}*\n`;
        msg += 'Meanings:\n';
        for (let i = 0; i < json[0].meanings.length; i++) {
            msg += '*part of speech:* ' + `${json[0].meanings[i].partOfSpeech}\n`;

            for (let j = 0; j < json[0].meanings[i].definitions.length; j++) {
                msg += '*definition:* ' + `${json[0].meanings[i].definitions[j].definition}\n`;

                if (json[0].meanings[i].definitions[j].example != undefined)
                    msg += `*Example: ${json[0].meanings[i].definitions[j].example}*\n`;
                if (json[0].meanings[i].definitions[j].synonyms != '')
                    msg += `*Synonyms: ${json[0].meanings[i].definitions[j].synonyms}*\n`;
                if (json[0].meanings[i].definitions[j].antonyms != '')
                    msg += `*Antonyms: ${json[0].meanings[i].definitions[j].antonyms}*\n`;
           }
           msg += '=============================\n';
        }

        
        msg += '=============================\n';
        return await message.send(msg);
    })
