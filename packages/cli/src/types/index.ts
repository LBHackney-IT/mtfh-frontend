export interface App {
  path: string;
  required: boolean;
  name: string;
}

export type AppConfig = Record<string, App>;

export interface Config {
  token?: string;
  iv?: string;
}

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  clone_url?: string;
}
