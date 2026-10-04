import { computed, Injectable, signal } from "@angular/core";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private nextId = 3;

  readonly tasks = signal<Task[]>([
    { id: 1, title: "Вивчити signal", done: false },
    { id: 2, title: "Вивчити @for", done: false },
  ]);

  readonly remainingCount = computed(
    () => this.tasks().filter((task) => !task.done).length,
  );

  addTask(title: string): void {
    const value = title.trim();
    if (!value) return;

    this.tasks.update((list) => [
      ...list,
      { id: this.nextId++, title: value, done: false },
    ]);
  }

  removeTask(id: number): void {
    this.tasks.update((list) => list.filter((task) => task.id !== id));
  }

  toggleTask(id: number): void {
    this.tasks.update((list) =>
      list.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }
}
