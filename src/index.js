import bsky from '@atproto/api'
const { BskyAgent } = bsky;

const textData = {
    t1159: ['🍚','🍖','🍱','🍝','🌭','🐙','🌮','🍔','🍢','🍕','🍙','🍗','🍛','🍜','🍞','🥐','🥖','🍤','🍟','🍣','🌯'],
    t1200: ['🍚','🍖','🍱','🍝','🌭','🐙','🌮','🍔','🍢','🍕','🍙','🍗','🍛','🍜','🍞','🥐','🥖','🍤','🍟','🍣','🌯'],
    t1201: ['🍚','🍖','🍱','🍝','🌭','🐙','🌮','🍔','🍢','🍕','🍙','🍗','🍛','🍜','🍞','🥐','🥖','🍤','🍟','🍣','🌯'],

    t1459: ['🍦','🍧','🍨','🍿','🍘','🍩','🍪','🍰','🍫','🍬','🍭','🍮','🥧','🎂','🍰','🧁','🍓','🍉','🍊','🍍','🍎','🍋','🍇','🍌'],
    t1500: ['🍦','🍧','🍨','🍿','🍘','🍩','🍪','🍰','🍫','🍬','🍭','🍮','🥧','🎂','🍰','🧁','🍓','🍉','🍊','🍍','🍎','🍋','🍇','🍌'],
    t1501: ['🍦','🍧','🍨','🍿','🍘','🍩','🍪','🍰','🍫','🍬','🍭','🍮','🥧','🎂','🍰','🧁','🍓','🍉','🍊','🍍','🍎','🍋','🍇','🍌'],
    
    t1959: '----はちじはちじ----',
    t2000: '----はちじはちじ----',
    t2001: '----はちじはちじ----',
    
   // t2221: ['ᓚᘏᗨ', 'ᓭᘣᗢ', 'ᗢᕡᓗ', 'ᓚᘏᗢ', 'ᓕᘎᗣ', 'ᗣᘎᓓ'],
   // t2222: ['ᓚᘏᗨ', 'ᓭᘣᗢ', 'ᗢᕡᓗ', 'ᓚᘏᗢ', 'ᓕᘎᗣ', 'ᗣᘎᓓ'],
   // t2223: ['ᓚᘏᗨ', 'ᓭᘣᗢ', 'ᗢᕡᓗ', 'ᓚᘏᗢ', 'ᓕᘎᗣ', 'ᗣᘎᓓ']
    t2221: [ ['ᗢ','ᗣ','ᗤ','ᗥ','ᗦ','ᗧ','ᗨ','ᗩ','ᗪ','ᗫ','ᗬ','ᗭ'],
    ['ᕞ','ᕟ','ᕂ','ᕃ','ᕄ','ᕅ','ᕆ','ᕇ','ᕈ','ᕉ','ᕊ','ᕋ','ᕌ','ᕍ','ᕠ','ᕡ','ᕢ','ᕣ'],
    ['ᓗ','ᓚ','ᓭ','ᓕ','ᓓ','ᖊ','ᕃ','ᓒ','ᒾ']],
    t2222: [ ['ᗢ','ᗣ','ᗤ','ᗥ','ᗦ','ᗧ','ᗨ','ᗩ','ᗪ','ᗫ','ᗬ','ᗭ'],
    ['ᕞ','ᕟ','ᕂ','ᕃ','ᕄ','ᕅ','ᕆ','ᕇ','ᕈ','ᕉ','ᕊ','ᕋ','ᕌ','ᕍ','ᕠ','ᕡ','ᕢ','ᕣ'],
    ['ᓗ','ᓚ','ᓭ','ᓕ','ᓓ','ᖊ','ᕃ','ᓒ','ᒾ']],
    t2223: [ ['ᗢ','ᗣ','ᗤ','ᗥ','ᗦ','ᗧ','ᗨ','ᗩ','ᗪ','ᗫ','ᗬ','ᗭ'],
    ['ᕞ','ᕟ','ᕂ','ᕃ','ᕄ','ᕅ','ᕆ','ᕇ','ᕈ','ᕉ','ᕊ','ᕋ','ᕌ','ᕍ','ᕠ','ᕡ','ᕢ','ᕣ'],
    ['ᓗ','ᓚ','ᓭ','ᓕ','ᓓ','ᖊ','ᕃ','ᓒ','ᒾ']]
    
}

let myData = null;
const agent = new BskyAgent({ service: 'https://bsky.social' });


//console.log(process.env.MYID);
//console.log(process.env.PASS);

myData = await Login();
//console.log(myData.handle);

if (myData != null) {
    const text = getText();
    //console.log(text)
    await PostText(text);
}


//------------------------------

async function Login() {
    try {
        const { success, data } = await agent.login({
            identifier: `${process.env.MYID}`,
            password: `${process.env.PASS}`
        });

        console.log('success?:' + success)
     //   console.log(data);
        if (success) { return data; }

        return null;

    } catch {
        console.log('しっぱい');
        return null;
    }
};

async function PostText(text) {
    const res3 = await agent.app.bsky.feed.post.create(
        {
            repo: myData.handle
        },
        {
            text: text,
            createdAt: (new Date()).toISOString()
        })
}
function getText() {
    const date = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
    const hour = (date.getHours()).toString().padStart(2, '0')
    const min = (date.getMinutes()).toString().padStart(2, '0');
    const checkText = `t${hour}${min}`
    //const checkText='t2222';
    //textData.checkText;
    let teiki = '';
    try {
        teiki = textData[checkText];
        if (Array.isArray(teiki)) {
            if(Array.isArray(teiki[0])){
                teiki = teiki[0][Math.floor(Math.random() * teiki.length)]+teiki[1][Math.floor(Math.random() * teiki.length)]+teiki[2][Math.floor(Math.random() * teiki.length)];
            }else{
            teiki = teiki[Math.floor(Math.random() * teiki.length)]+teiki[Math.floor(Math.random() * teiki.length)]+teiki[Math.floor(Math.random() * teiki.length)];
        }
    }
    } catch {
        //teiki = `${hour}時${min}分かも`
        teiki = textData['t2221'];
        if (Array.isArray(teiki)) {
            if(Array.isArray(teiki[0])){
                teiki = teiki[0][Math.floor(Math.random() * teiki.length)]+teiki[1][Math.floor(Math.random() * teiki.length)]+teiki[2][Math.floor(Math.random() * teiki.length)];}
            }
        
    }
    if(teiki==null){  
        //teiki = `${hour}時${min}分かも`
        teiki = textData['t2221'];
        if (Array.isArray(teiki)) {
            if(Array.isArray(teiki[0])){
                teiki = teiki[0][Math.floor(Math.random() * teiki.length)]+teiki[1][Math.floor(Math.random() * teiki.length)]+teiki[2][Math.floor(Math.random() * teiki.length)];}
            }
    }
    return teiki;
}


//await agent.post(record)