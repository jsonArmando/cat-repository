export interface CatBreed {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  description: string;
  life_span: string;
  weight: {
    imperial: string;
    metric: string;
  };
  wikipedia_url?: string;
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}