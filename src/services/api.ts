// Os dados do site ficam em src/data/*.json (sem backend nem banco).
// Para editar: altere o JSON e faça commit — o deploy do GitHub Pages publica sozinho.
import experiencesData from '../data/experiences.json'
import projectsData from '../data/projects.json'

export interface Project {
  id: number;
  name: string;
  description: string;
  description_key?: string; // Chave para tradução
  description_en?: string; // Descrição em inglês (alternativa)
  media_url: string | string[];
  media_type: 'image' | 'video';
  test_link?: string;
  github_link?: string;
  is_github_private: boolean;
  category: string;
  technologies?: string | string[];
  /** Posição no grid (1 = primeiro) */
  index: number;
  is_active: boolean;
}

export interface Experience {
  id: number;
  role: string; // PT
  role_en?: string;
  period: string;
  bullets: string | string[]; // PT
  bullets_en?: string | string[]; // EN
  index: number;
  is_active: boolean;
}

const byIndex = <T extends { index: number }>(a: T, b: T) => a.index - b.index

const projects = (projectsData as Project[]).filter(p => p.is_active).sort(byIndex)
const experiences = (experiencesData as Experience[]).filter(e => e.is_active).sort(byIndex)

export const experiencesAPI = {
  async getAll(): Promise<Experience[]> {
    return experiences
  }
};

export const projectsAPI = {
  async getAll(category?: string): Promise<Project[]> {
    return category ? projects.filter(p => p.category === category) : projects
  },

  async getById(id: number): Promise<Project> {
    const project = projects.find(p => p.id === id)
    if (!project) throw new Error('Projeto não encontrado')
    return project
  }
};
