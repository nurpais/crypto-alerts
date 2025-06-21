import { Router } from 'express';
import { getTokens } from '../services/DS';

const router = Router();

router.get('/', async (req, res) => {
  const tokens = await getTokens();
  res.json(tokens);
});

export default router;
