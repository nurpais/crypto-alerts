import express from 'express';
import cors from 'cors';
import config from './config/config';
import tokensRoute from './routes/tokens';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use('/tokens', tokensRoute);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
