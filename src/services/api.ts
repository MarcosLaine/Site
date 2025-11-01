const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface Project {
  id: number;
  name: string;
  description: string;
  description_key?: string; // Chave para tradução
  description_en?: string; // Descrição em inglês (alternativa)
  media_url: string;
  media_type: 'image' | 'video';
  test_link?: string;
  github_link?: string;
  is_github_private: boolean;
  category: string;
  technologies?: string | string[]; // JSON string ou array de tecnologias
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  error?: string;
}

export const projectsAPI = {
  // GET all projects
  async getAll(category?: string): Promise<Project[]> {
    try {
      const url = category 
        ? `${API_URL}/projects?category=${category}`
        : `${API_URL}/projects`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Erro ao carregar projetos');
      }
      
      const result: ApiResponse<Project[]> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
      throw error;
    }
  },

  // GET project by ID
  async getById(id: number): Promise<Project> {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`);
      
      if (!response.ok) {
        throw new Error('Projeto não encontrado');
      }
      
      const result: ApiResponse<Project> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Erro ao buscar projeto:', error);
      throw error;
    }
  }
};


