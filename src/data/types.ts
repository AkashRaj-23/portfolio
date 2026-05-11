export type Project = {
  id: string;
  title: string;
  tagline: string;
  featured?: boolean;
  description: string;
  tech: string[];
  github: string | null;
  demo: string | null;
  images: string[];
  video: string | null;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  file: string | null;
};
