import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NavbarComponent]
})
export class AppComponent {
  title = 'codepulseui';
}
