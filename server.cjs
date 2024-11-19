const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')
require('dotenv').config(); // 加载环境变量


const app = express();
const PORT = 3000;

// 配置中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // 服务于静态文件

// 路由处理前端发送的请求
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  API_headers = {
    "Authorization": `Bearer ${process.env.XAI_API_KEY}`,
    "Content-Type": "application/json"
  }
  API_body = {
        "messages": [
          {
            "role": "system",
            "content": "You are Grok, a chatbot inspired by the Hitchhikers Guide to the Galaxy."
          },
          {
            "role": "user",
            "content": userMessage
          }
        ],
        "model": "grok-beta",
        "stream": false,
        "temperature": 0
      }
  // 模拟调用 XAI API
  try {
    // 这里替换为你的实际 XAI API 调用逻辑
    const xaiResponse = await axios.post(
      'https://api.x.ai/v1/chat/completions', API_body,
      {
        "headers": API_headers
      }
    )

    // 返回 API 的回复给前端
    res.json({ reply: xaiResponse.data.choices[0].message.content });
  } catch (error) {
    console.error('Error communicating with XAI API:', error.message);
    res.status(500).json({ reply: 'Sorry, an error occurred while contacting XAI API.' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

