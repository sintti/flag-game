export interface Country {
  id: string;
  name: string;
  flag: string;
  fin: string;
  region: string;
}

export interface CountryApiResponse {
  cca3: string;
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  flags: {
    svg: string;
    png: string;
  };
  translations: {
    fin: {
      common: string;
      official: string;
    };
  };
  region: string;
}
