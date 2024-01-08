import { pipe, switchMap, tap } from 'rxjs';
import { WorkItem } from '../interfaces/work-item';
import { ApiService } from './api.service';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';

type KanbanState = {
  workItems: WorkItem[];
  isLoading: boolean;
  error: string | null;
};

export const KanbanStore = signalStore(
  { providedIn: 'root' },
  withState<KanbanState>({
    workItems: [],
    isLoading: false,
    error: null,
  }),
  withMethods((store, apiService = inject(ApiService)) => ({
    load: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          apiService.getWorkItems().pipe(
            tapResponse({
              next: (workItems) =>
                patchState(store, { workItems, isLoading: false, error: null }),
              error: (error: unknown) =>
                patchState(store, {
                  error: parseError(error),
                  isLoading: false,
                }),
            }),
          ),
        ),
      ),
    ),
  })),
  withComputed((store) => ({
    kanbanDS: computed(() => ({
      workItems: store.workItems(),
      loaded: store.isLoading(),
      error: store.error(),
    })),
  })),
  withHooks({
    onInit({ load }) {
      load();
    },
  }),
);

const parseError = (error: unknown): string =>
  hasMessage(error) ? error.message : 'Unknown error';

const hasMessage = (obj: unknown): obj is { message: string } => {
  return (
    (obj as { message: string })?.message !== undefined &&
    typeof (obj as { message: string }).message === 'string'
  );
};

// @Injectable({
//   providedIn: 'root',
// })
// export class KanbanService {
//   private api = inject(ApiService);

//   private state = signal<KanbanState>({
//     workItems: [],
//     loaded: false,
//     error: null,
//   });

//   workItems = computed(() => this.state().workItems);

//   load$ = new Subject<void>();

//   constructor() {
//     this.load$
//       .pipe(
//         takeUntilDestroyed(),
//         switchMap(() => this.api.getWorkItems()),
//       )
//       .subscribe({
//         next: (tasks) =>
//           this.state.update((s) => ({ ...s, workItems: tasks, loaded: true })),
//         error: (error) => this.state.update((s) => ({ ...s, error: error })),
//       });
//   }

//   // updateTaskState(id: number, state: TaskStates) {
//   //   // this.tasks$.next(dwwsws
//   //   //   [...this.tasks$.value].map((task) => {
//   //   //     if (task.id === id) {
//   //   //       return { ...task, state };
//   //   //     }
//   //   //     return task;
//   //   //   }),
//   //   // );
//   //   // return of();
//   // }
// }
