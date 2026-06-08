import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Issue, IssueStatus } from '../types/issue';

const STORAGE_KEY = '@cityreport/issues';

interface IssuesContextValue {
  issues: Issue[];
  loading: boolean;
  createIssue: (issue: Issue) => Promise<void>;
  updateIssueStatus: (id: string, status: IssueStatus) => Promise<void>;
  deleteIssue: (id: string) => Promise<void>;
}

const IssuesContext = createContext<IssuesContextValue | null>(null);


export function IssuesProvider({ children }: { children: React.ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  // Load persisted issues on mount , ondevice storage of data
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setIssues(JSON.parse(raw) as Issue[]);
        }
      } catch (e) {
        console.warn('Failed to load issues from storage', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  const persist = useCallback(async (updated: Issue[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to persist issues', e);
    }
  }, []);

  // creates issue
  const createIssue = useCallback(
    async (issue: Issue) => {
      const updated = [issue, ...issues];
      setIssues(updated);
      await persist(updated);
    },
    [issues, persist]
  );

  // updates issue status
  const updateIssueStatus = useCallback(
    async (id: string, status: IssueStatus) => {
      const updated = issues.map((i) => (i.id === id ? { ...i, status } : i));
      setIssues(updated);
      await persist(updated);
    },
    [issues, persist]
  );

  // deletes status
  const deleteIssue = useCallback(
    async (id: string) => {
      const updated = issues.filter((i) => i.id !== id);
      setIssues(updated);
      await persist(updated);
    },
    [issues, persist]
  );

  return (
    <IssuesContext.Provider
      value={{ issues, loading, createIssue, updateIssueStatus, deleteIssue }}
    >
      {children}
    </IssuesContext.Provider>
  );
}


export function useIssues(): IssuesContextValue {
  const ctx = useContext(IssuesContext);
  if (!ctx) {
    throw new Error('useIssues must be used inside <IssuesProvider>');
  }
  return ctx;
}
