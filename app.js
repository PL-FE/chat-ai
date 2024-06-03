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

// 设置路由，当访问根路径时返回Hello World!
app.post('/chat', async (req, res) => {
    const { content, model, ...args } = req.body
    const configuration = new Configuration({
        apiKey: "sk-TOeD9h9FTt9jumXYF790Eb035d654164865441Cd238b0d6e",
        basePath: "https://api.gpt.ge/v1"
    });
    const openai = new OpenAIApi(configuration);

    const chatCompletion = await openai.createChatCompletion({
        model: model || "gpt-3.5-turbo",
        messages: [{ role: "user", content }],
        ...args
    });
    res.send(chatCompletion.data.choices[0].message.content);
});

// 监听端口，启动服务
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
