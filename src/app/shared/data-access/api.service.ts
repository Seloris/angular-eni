import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { WorkItem, WorkItemStates } from '../interfaces/work-item';

@Injectable({ providedIn: 'root' })
export class ApiService {
  getWorkItems() {
    return of(API_FAKE).pipe(delay(500));
  }
}

const API_FAKE: WorkItem[] = [
  {
    id: 0,
    title: 'Task 1',
    createdAt: new Date(),
    description: '',
    state: WorkItemStates.Todo,
    tags: [],
  },
  {
    id: 1,
    title: 'Task 2',
    createdAt: new Date(),
    description: '',
    state: WorkItemStates.InProgress,
    tags: [],
  },
  {
    id: 2,
    title: 'Task 3',
    createdAt: new Date(),
    description: '',
    state: WorkItemStates.Done,
    tags: [],
  },
  {
    id: 3,
    title: 'Task 4',
    createdAt: new Date(),
    description: '',
    state: WorkItemStates.Todo,
    tags: [],
  },
];
