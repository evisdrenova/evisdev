export interface PostMetadata {
  title: string;
  date: string;
  subtitle?: string;
  slug: string;
  tags?: string[];
}

export interface ProjectMetadata {
  name: string;
  date: string;
  tags: string[];
  slug: string;
}
