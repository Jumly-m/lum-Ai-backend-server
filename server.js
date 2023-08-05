import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
    organization: "org-5rmjD2Gb52o4whJ5qO5iCVi6",
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  app.post("/", async (request, response) => {

    const { chats } = request.body;
    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a Luminai Academy.Education assistant",
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