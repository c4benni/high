/// <reference types="react-scripts" />

declare namespace NodeJS {
  export interface Process {
    client: boolean;
    server: boolean;
  }
}

declare module "cloudinary-react";