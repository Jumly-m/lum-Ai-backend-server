import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  organization:process.env.ORGANIZATION_KEY,
  apiKey:process.env.OPENAI_APIKEY,
});

const openai = new OpenAIApi(configuration);

app.post("/", async (request, response) => {
  const { chats } = request.body;

  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are LUMINAI. You are luminai education assistant created by LUMINAI to assist in education programs",
      },
      ...chats,
    ],
  });

  response.json({
    output: result.data.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
