export interface WorkItem {
  id: number;
  createdAt: Date;
  title: string;
  tags: string[];
  state: WorkItemStates;
  description: string;
}

export enum WorkItemStates {
  Todo = 'Todo',
  InProgress = 'InProgress',
  Done = 'Done',
}

export const AllStates = [
  WorkItemStates.Todo,
  WorkItemStates.InProgress,
  WorkItemStates.Done,
];
