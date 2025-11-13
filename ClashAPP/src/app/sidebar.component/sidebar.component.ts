import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sidebarVisible = false; 

  toggleSidebar(){
    this.sidebarVisible = !this.sidebarVisible;
  }
}
