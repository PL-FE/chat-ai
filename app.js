// 引入Express框架
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { Configuration, OpenAIApi } = require("openai");
const app = express();
const port = 3000;
// 允许所有跨域请求
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/event-stream' }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// 设置路由，当访问根路径时返回Hello World!
app.get('/chat', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    const { content } = req.query
    const configuration = new Configuration({
        apiKey: "sk-TOeD9h9FTt9jumXYF790Eb035d654164865441Cd238b0d6e",
        basePath: "https://api.gpt.ge/v1"
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createChatCompletion({
            stream: true,
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content }],
        }, { responseType: 'stream' });
        // 监听事件
        completion.data.on('data', (chunk) => {
            const chunkRes = chunk.toString()
            if (chunkRes === 'data: [DONE]') {
                res.end()
            } else {
                res.write(chunkRes)
            }
        });
        completion.data.on('end', () => {
            res.end()
        })


    } catch (error) {
        console.log('error', error);
        res.send(error);
    }
});

// 监听端口，启动服务
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
