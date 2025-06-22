import express from 'express';
import cors from 'cors';
import config from './config/config';
import tokensRoute from './routes/tokens';
import analyzeRoute from './routes/analyze';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use('/tokens', tokensRoute);
app.use('/analyze', analyzeRoute);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
