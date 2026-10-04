import { Component, inject } from "@angular/core";
import { TasksService } from "./tasks.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { OnInit } from "@angular/core";
import { TruncatePipe } from "../shared/truncate.pipe";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: "app-tasks",
  imports: [ReactiveFormsModule, TitleCasePipe, TruncatePipe],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent implements OnInit {
  readonly tasksService = inject(TasksService);
  readonly newTask = new FormControl("", { nonNullable: true });

  ngOnInit(): void {
    this.tasksService.loadTasks();
  }

  addTask(): void {
    this.tasksService.addTask(this.newTask.value);
    this.newTask.setValue("");
  }
}
