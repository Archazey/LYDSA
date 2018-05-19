import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ngx-boostrap
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TreeViewComponent } from './shared/components/tree-view/tree-view.component';
import { StackComponent } from './data-structures/stack/stack.component';
import { FunctionStepperEditorComponent } from './shared/components/function-stepper-editor/function-stepper-editor.component';
import { BreakpointStepPanelComponent } from './shared/components/breakpoint-step-panel/breakpoint-step-panel.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'visualize/stack', component: StackComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TreeViewComponent,
    StackComponent,
    FunctionStepperEditorComponent,
    BreakpointStepPanelComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
