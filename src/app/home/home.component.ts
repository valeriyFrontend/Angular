import { Component, inject, signal } from "@angular/core";
import { TasksService } from "../tasks/tasks.service";
import { HelloComponent } from "../hello/hello.component";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-home",
  imports: [HelloComponent, ReactiveFormsModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  readonly tasksService = inject(TasksService);

  userName = "Валерію";

  count = signal(0);

  increment(): void {
    this.count.update((value) => value + 1);
  }

  onGreet(): void {
    alert(`Вітаю, ${this.userName}!`);
  }
}
