import { Component, Input } from '@angular/core';

import { WorkItem } from '../../../../shared/interfaces/work-item';
@Component({
  selector: 'app-work-item',
  standalone: true,
  template: `<div class="wi-card">{{ workItem.title }}</div>`,
  styles: `
    :host {
      display: block;
      max-width:400px;
    }
    .wi-card{
      display:flex;
      flex-direction:column;
      padding:1em;
      margin:12px;
      border: solid 1px black;
    }
    img {background-size: cover;}
  `,
  imports: [],
})
export class WorkItemComponent {
  @Input({ required: true }) workItem!: WorkItem;
}
