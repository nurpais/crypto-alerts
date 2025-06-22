import { Router } from 'express';
import { generatePrompt } from '../ai/generatePrompt';
import { openai } from '../ai/openaiClient';
import { generateSocialSummary } from '../utils/generateSocialSummary';
import { Token } from '../types/token';

const router = Router();
// model: 'gpt-4o-mini',

router.post('/', async (req, res) => {
  const token: Token = req.body.token;
  const socialSummary = generateSocialSummary(token.links);
  const prompt = generatePrompt(token, socialSummary);

  try {
    const completion = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
    });

    const raw = completion.output_text;

    const clean = raw
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '');

    const parsed = JSON.parse(clean);

    res.json(parsed);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'OpenAI analysis failed' });
  }
});

export default router;
