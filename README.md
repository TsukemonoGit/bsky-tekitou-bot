# bsky-tekitou-bot

Github Actions の workflow(postTekitou.yml) をCloudflareCronから起動して
Blueskyのアカウントから垂れ流すだけ

### 参考 [Workflows](https://docs.github.com/ja/rest/actions/workflows?apiVersion=2022-11-28 "Github Workflows"), [octokit](https://github.com/octokit/core.js#readme "octokit")

(cloudflare側のコード)

```
const { Octokit } = require("@octokit/core");
export default {
    async scheduled(controller, env, ctx) {
        await sendRequest(env);
    }
}

async function sendRequest(env) {
  const octokit = new Octokit({
  auth: `${env.token}`
});

await octokit.request('POST /repos/TsukemonoGit/bsky-tekitou-bot/actions/workflows/postTekitou.yml/dispatches', {
  ref: 'main',
 
  headers: {
    'Accept': 'application/vnd.github.v3+json'
        }
    })
}
```
