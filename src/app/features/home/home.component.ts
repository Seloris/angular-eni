// import { Component, OnInit, Signal, computed } from '@angular/core';
// import { TasksService } from '../../shared/data-access/tasks.service';

// import {
//   CdkDrag,
//   CdkDragDrop,
//   CdkDropList,
//   CdkDropListGroup,
// } from '@angular/cdk/drag-drop';
// import { CommonModule } from '@angular/common';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { AllStates, TaskDto, TaskStates } from '../../shared/interfaces/task';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
//   standalone: true,
//   imports: [CommonModule, CdkDropListGroup, CdkDropList, CdkDrag],
// })
// export class HomeComponent implements OnInit {
//   states = AllStates;
//   tasks: Signal<TaskDto[] | undefined>;

//   tasksByState = (
//     state: TaskStates,
//   ): Signal<{ state: TaskStates; tasks: TaskDto[] }> =>
//     computed(() => {
//       const tasks = this.tasks();
//       if (!tasks) return { state, tasks: [] };

//       return { state, tasks: tasks.filter((task) => task.state === state) };
//     });

//   constructor(private tasksService: TasksService) {
//     this.tasks = toSignal(this.tasksService.tasks$);
//   }

//   ngOnInit(): void {
//     this.tasksService.getTasks().subscribe();
//   }

//   drop(event: CdkDragDrop<TaskStates, TaskStates, TaskDto>) {
//     event.item.data;
//     if (event.previousContainer !== event.container) {
//       const task = event.item.data;
//       this.tasksService
//         .updateTaskState(task.id, event.container.data)
//         .subscribe();
//       // transferArrayItem(
//       //   event.previousContainer.data,
//       //   event.container.data,
//       //   event.previousIndex,
//       //   event.currentIndex,
//       // );
//     }
//   }
// }
