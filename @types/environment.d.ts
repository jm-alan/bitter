declare global {
  namespace NodeJS {
    // this modifies the type definition of process.env, allowing
    // access of these properties without jumping through additional
    // hoops
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      DATABASE_URL: string;
      SECRET: string;
      EXPIRES: string;
    }
  }
}

export {};
