import { Component, computed, inject } from '@angular/core';

import { WorkItemComponent } from './ui/work-item/work-item.component';
import { KanbanStore } from '../../shared/data-access/kanban.service';
import { AllStates, WorkItemStates } from '../../shared/interfaces/work-item';

@Component({
  selector: 'app-kanban',
  standalone: true,
  template: `<div>
    @if (store.isLoading()) {
      <div>Loading...</div>
    }
    @if (store.workItems(); as allWorkItems) {
      <div class="grid">
        @for (state of AllStates; track state) {
          <div>
            <h2>{{ state }}</h2>
            @for (workItem of workItemsByState(state)(); track workItem.id) {
              <app-work-item [workItem]="workItem"></app-work-item>
            }
          </div>
        }
      </div>
    }
  </div>`,
  styles: `.grid{ display:grid;
    grid-template-columns: repeat(auto-fit, minmax(200px,300px));
    grid-gap:20px;
  }`,
  imports: [WorkItemComponent],
})
export class KanbanComponent {
  store = inject(KanbanStore);
  AllStates = AllStates;

  workItemsByState = (state: WorkItemStates) =>
    computed(() => this.store.workItems().filter((wi) => wi.state === state));

  constructor() {}
}
