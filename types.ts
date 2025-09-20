export enum ActionType {
  Explain = 'explain',
  Run = 'run',
  Debug = 'debug',
  Generate = 'generate',
  GenerateHTML = 'generate-html',
  Visualize = 'visualize',
}

export interface Result {
  type: 'success' | 'error';
  content: string;
}