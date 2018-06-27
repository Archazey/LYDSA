import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { MergeSortComponent } from './algorithms/sorting/merge-sort/merge-sort.component';
import { MergeSortVisualizerComponent } from './visualizations/sorting/merge-sort-visualizer/merge-sort-visualizer.component';
import { BubbleSortComponent } from './algorithms/sorting/bubble-sort/bubble-sort.component';
import { BubbleSortVisualizerComponent } from './visualizations/sorting/bubble-sort-visualizer/bubble-sort-visualizer.component';
import { QuickSortComponent } from './algorithms/sorting/quick-sort/quick-sort.component';
import { QuickSortVisualizerComponent } from './visualizations/sorting/quick-sort-visualizer/quick-sort-visualizer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ConnectedComponentsComponent } from './algorithms/graphs/connected-components/connected-components.component';
import { ConnectedComponentsVisualizerComponent } from './visualizations/graphs/connected-components-visualizer/connected-components-visualizer.component';
import { KruskalComponent } from './algorithms/graphs/kruskal/kruskal.component';
import { KruskalVisualizerComponent } from './visualizations/graphs/kruskal-visualizer/kruskal-visualizer.component';
import { BiconnectedComponentsComponent } from './algorithms/graphs/biconnected-components/biconnected-components.component';
import { BiconnectedComponentsVisualizerComponent } from './visualizations/graphs/biconnected-components-visualizer/biconnected-components-visualizer.component';
import { LeeComponent } from './algorithms/matrix/lee/lee.component';
import { LeeVisualizerComponent } from './visualizations/matrix/lee-visualizer/lee-visualizer.component';
import { AStarComponent } from './algorithms/matrix/a-star/a-star.component';
import { AStarVisualizerComponent } from './visualizations/matrix/a-star-visualizer/a-star-visualizer.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:user', component: ProfileComponent },
  { path: 'visualize/stack', component: StackComponent },
  { path: 'visualize/queue', component: QueueComponent },
  { path: 'visualize/deque', component: DequeComponent },
  { path: 'visualize/merge-sort', component: MergeSortComponent },
  { path: 'visualize/bubble-sort', component: BubbleSortComponent },
  { path: 'visualize/quick-sort', component: QuickSortComponent },
  { path: 'visualize/connected-components', component: ConnectedComponentsComponent },
  { path: 'visualize/kruskal', component: KruskalComponent },
  { path: 'visualize/biconnected-components', component: BiconnectedComponentsComponent },
  { path: 'visualize/lee', component: LeeComponent },
  { path: 'visualize/a-star', component: AStarComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
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
    DequeVisualizerComponent,
    MergeSortComponent,
    MergeSortVisualizerComponent,
    BubbleSortComponent,
    BubbleSortVisualizerComponent,
    QuickSortComponent,
    QuickSortVisualizerComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ConnectedComponentsComponent,
    ConnectedComponentsVisualizerComponent,
    KruskalComponent,
    KruskalVisualizerComponent,
    BiconnectedComponentsComponent,
    BiconnectedComponentsVisualizerComponent,
    LeeComponent,
    LeeVisualizerComponent,
    AStarComponent,
    AStarVisualizerComponent
  ],
  imports: [
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

