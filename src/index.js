import bsky from '@atproto/api'
const { BskyAgent } = bsky;

const textData = {
    t1159: '----ごはんごはん----',
    t1200: '----ごはんごはん----',
    t1201: '----ごはんごはん----',

    t1459: '----おやつおやつ----',
    t1500: '----おやつおやつ----',
    t1501: '----おやつおやつ----',
    
    t1959: '----はちじはちじ----',
    t2000: '----はちじはちじ----',
    t2001: '----はちじはちじ----',
    
    t2221: ['ᓚᘏᗨ', 'ᓭᘣᗢ', 'ᗢᕡᓗ', 'ᓚᘏᗢ', 'ᓕᘎᗣ', 'ᗣᘎᓓ'],
    t2222: ['ᓚᘏᗨ', 'ᓭᘣᗢ', 'ᗢᕡᓗ', 'ᓚᘏᗢ', 'ᓕᘎᗣ', 'ᗣᘎᓓ'],
    t2223: ['ᓚᘏᗨ', 'ᓭᘣᗢ', 'ᗢᕡᓗ', 'ᓚᘏᗢ', 'ᓕᘎᗣ', 'ᗣᘎᓓ']

}

let myData = null;
const agent = new BskyAgent({ service: 'https://bsky.social' });


console.log(process.env.MYID);
console.log(process.env.PASS);
console.log(getText());
myData = await Login();
//console.log(myData.handle);

if (myData != null) {
    const text = getText();
    console.log(text)
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
        console.log(data);
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
            teiki = teiki[Math.floor(Math.random() * teiki.length)];
        }
    } catch {
        teiki = `${hour}時${min}分かも`
    }
    if(teiki==null){  teiki = `${hour}時${min}分かも`}
    return teiki;
}


//await agent.post(record)