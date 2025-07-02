export class AIService {
  private pythonServiceUrl: string;

  constructor() {
    this.pythonServiceUrl =
      process.env.BACKEND_PY_URL || 'http://localhost:5000';
  }

  private async callPythonService(endpoint: string, data: any) {
    try {
      const response = await fetch(`${this.pythonServiceUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          `Python service responded with ${response.status}: ${response.statusText}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Error calling Python service ${endpoint}:`, error);
      throw new Error(`Python service unavailable: ${error}`);
    }
  }

  async generateEmbedding(text: string) {
    return this.callPythonService('/embeddings/generate', { text });
  }

  async searchDocuments(query: string, limit: number = 10) {
    return this.callPythonService('/search', { query, limit });
  }

  async chatWithAI(message: string, model: string = 'gpt-3.5-turbo') {
    return this.callPythonService('/chat', { message, model });
  }
}
