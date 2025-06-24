import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;

app.use(cors({
  origin: 'https://summarizer-uxy3.vercel.app'
}));

app.use(express.json());

app.post('/summarize', async (req, res) => {
  const { text_to_summarize } = req.body;

  if (!text_to_summarize || text_to_summarize.length < 200) {
    return res.status(400).send("Text is too short to summarize.");
  }

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: text_to_summarize })
      }
    );

    const result = await response.json();

    if (Array.isArray(result) && result[0]?.summary_text) {
      res.send(result[0].summary_text);
    } else {
      res.status(500).send("Failed to generate summary.");
    }
  } catch (error) {
    console.error('Summarization error:', error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
