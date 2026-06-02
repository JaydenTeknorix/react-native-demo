export type IssueStatus = 'not_done' | 'in_progress' | 'completed';

export type IssueCategory = 'Pothole' | 'Lighting' | 'Trash' | 'Graffiti' | 'Other';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  imageUri: string | null;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  createdAt: string; // ISO date string
}
