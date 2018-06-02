import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ngx-boostrap
import { AlertModule, TabsModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TreeViewComponent } from './shared/components/tree-view/tree-view.component';
import { StackComponent } from './data-structures/stack/stack.component';
import { BreakpointStepPanelComponent } from './shared/components/breakpoint-step-panel/breakpoint-step-panel.component';
import { VisualizationEditorComponent } from './shared/components/visualization-editor/visualization-editor.component';
import { StackVisualizerComponent } from './visualizations/stack-visualizer/stack-visualizer.component';
import { ReversePipe } from './shared/pipes/reverse-pipe.pipe';
import { SimulatorComponent } from './shared/components/simulator/simulator.component';
import { QueueComponent } from './data-structures/queue/queue.component';
import { QueueVisualizerComponent } from './visualizations/queue-visualizer/queue-visualizer.component';
import { DequeComponent } from './data-structures/deque/deque.component';
import { DequeVisualizerComponent } from './visualizations/deque-visualizer/deque-visualizer.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'visualize/stack', component: StackComponent },
  { path: 'visualize/queue', component: QueueComponent },
  { path: 'visualize/deque', component: DequeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, 
    TreeViewComponent,
    StackComponent,
    BreakpointStepPanelComponent,
    VisualizationEditorComponent,
    StackVisualizerComponent,
    ReversePipe,
    SimulatorComponent,
    QueueComponent,
    QueueVisualizerComponent,
    DequeComponent,
    DequeVisualizerComponent
  ],
  imports: [ 
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

