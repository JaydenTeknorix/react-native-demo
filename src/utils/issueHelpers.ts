import { IssueCategory, IssueStatus } from '../types/issue';

export const CATEGORIES: IssueCategory[] = ['Pothole', 'Lighting', 'Trash', 'Graffiti', 'Other'];

export const CATEGORY_COLORS: Record<IssueCategory, string> = {
  Pothole: '#FFD8D8',
  Lighting: '#FFF3BF',
  Trash: '#D3F9D8',
  Graffiti: '#E0C3FC',
  Other: '#DBE4FF',
};

export const CATEGORY_MARKER_COLORS: Record<IssueCategory, string> = {
  Pothole: '#E63946',
  Lighting: '#F4A261',
  Trash: '#2DC653',
  Graffiti: '#7950F2',
  Other: '#4361EE',
};

export const STATUS_LABELS: Record<IssueStatus, string> = {
  not_done: 'Not Done',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}
