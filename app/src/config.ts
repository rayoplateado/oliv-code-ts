const DEFAULT_CONFIG = {
  API_ENV: 'dev',
  PORT: 3000,
  PG_URL: 'postgresql://postgres:postgres@localhost:5432/project-local',
};

const TEST_CONFIG = {
  PG_URL: 'postgresql://postgres:postgres@postgres:5432/project-test',
};

export class Config { }

export default { ...DEFAULT_CONFIG, ...TEST_CONFIG };
