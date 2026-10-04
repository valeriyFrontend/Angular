import { Component, inject } from "@angular/core";
import { TasksService } from "./tasks.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-tasks",
  imports: [ReactiveFormsModule],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent {
  readonly tasksService = inject(TasksService);
  readonly newTask = new FormControl("", { nonNullable: true });

  addTask(): void {
    this.tasksService.addTask(this.newTask.value);
    this.newTask.setValue("");
  }
}
