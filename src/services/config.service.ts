import dotenv from 'dotenv';

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '4000'),

  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  GITHUB_API_URL: process.env.GITHUB_API_URL || 'https://api.github.com/graphql',

  GITLAB_TOKEN: process.env.GITLAB_TOKEN || '',
  GITLAB_API_URL: process.env.GITLAB_API_URL || 'https://gitlab.com/api/graphql',
};