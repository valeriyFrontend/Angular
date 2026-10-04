import { Injectable, signal } from "@angular/core";

export interface Task {
  id: number;
  title: string;
}

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private nextId = 3;
  readonly tasks = signal<Task[]>([
    { id: 1, title: "Вивчити signal" },
    { id: 2, title: "Вивчити @for" },
  ]);

  addTask(title: string): void {
    const value = title.trim();
    if (!value) return;

    this.tasks.update((list) => [...list, { id: this.nextId++, title: value }]);
  }

  removeTask(id: number): void {
    this.tasks.update((list) => list.filter((task) => task.id !== id));
  }
}
