import { Component, signal } from "@angular/core";

@Component({
  selector: "app-tasks",
  imports: [],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent {
  tasks = signal<string[]>(["Вивчити signal", "Вивчити @for"]);

  addTask(): void {
    this.tasks.update((list) => [...list, `Задача ${list.length + 1}`]);
  }
}
