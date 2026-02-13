import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { LifecycleComponent } from './features/lifecycle/lifecycle.component';
import { PuzzleComponent } from './features/puzzle/puzzle.component';
import { GameComponent } from './features/game/game.component';
import { WorkflowComponent } from './features/workflow/workflow.component';
import { ProfileComponent } from './features/profile/profile.component';
import { GeoSyncComponent } from './features/geo-sync/geo-sync.component';
import { MemoriesComponent } from './features/memories/memories.component';
import { ChatLogComponent } from './features/chat-log/chat-log.component';
import { ActiveOrderComponent } from './features/active-order/active-order.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'active-order', component: ActiveOrderComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'lifecycle', component: LifecycleComponent },
  { path: 'puzzle', component: PuzzleComponent },
  { path: 'game', component: GameComponent },
  { path: 'workflow', component: WorkflowComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'geo-sync', component: GeoSyncComponent },
  { path: 'memories', component: MemoriesComponent },
  { path: 'chat-log', component: ChatLogComponent },
  // Future phases will be added here
];
