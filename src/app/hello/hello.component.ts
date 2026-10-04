import { Component, input, output } from "@angular/core";

@Component({
  selector: "app-hello",
  imports: [],
  templateUrl: "./hello.component.html",
  styleUrl: "./hello.component.scss",
})
export class HelloComponent {
  name = input.required<string>();

  greet = output<void>();

  onClick(): void {
    this.greet.emit();
  }
}
