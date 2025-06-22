import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  DSTokens: string;
  OpenAIKey: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  DSTokens: process.env.DS_API!,
  OpenAIKey: process.env.OPENAI_API_KEY!,
};

export default config;
