import { Component, signal } from "@angular/core";
import { HelloComponent } from "../hello/hello.component";

@Component({
  selector: "app-home",
  imports: [HelloComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  userName = "Валерію";

  count = signal(0);

  increment(): void {
    this.count.update((value) => value + 1);
  }

  onGreet(): void {
    alert(`Вітаю, ${this.userName}!`);
  }
}
