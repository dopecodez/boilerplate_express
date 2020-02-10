interface ConfigInterface {
  PORT: string;
  NODE_ENV: string;
}

export const config: ConfigInterface = {
  PORT: process.env.PORT || '',
  NODE_ENV: process.env.NODE_ENV || ''
};