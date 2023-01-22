import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_API,
});

const openapi = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await OpenAIApi.createCompletion({
      model: "text-001",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error, "<< ini error");
    res.status(500).send(error || "Oops Something wrong");
  }
});
