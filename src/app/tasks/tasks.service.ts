import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private readonly http = inject(HttpClient);
  private nextId = 3;

  readonly tasks = signal<Task[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly remainingCount = computed(
    () => this.tasks().filter((task) => !task.completed).length,
  );

  loadTasks(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<Task[]>("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .subscribe({
        next: (todos) => {
          this.tasks.set(
            todos.map((todo) => ({
              id: todo.id,
              title: todo.title,
              completed: todo.completed,
            })),
          );
          this.nextId = Math.max(...todos.map((todo) => todo.id), 0) + 1;
          this.loading.set(false);
        },
        error: () => {
          this.error.set("Не вдалося завантажити задачі");
          this.loading.set(false);
        },
      });
  }

  addTask(title: string): void {
    const value = title.trim();
    if (!value) return;

    this.tasks.update((list) => [
      ...list,
      { id: this.nextId++, title: value, completed: false },
    ]);
  }

  removeTask(id: number): void {
    this.tasks.update((list) => list.filter((task) => task.id !== id));
  }

  toggleTask(id: number): void {
    this.tasks.update((list) =>
      list.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }
}
