import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
