import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { RouterModule , Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { CategoryComponent } from './category/category.component';
import { TrackerComponent } from './tracker/tracker.component';
import { ViewallWorkoutsComponent } from './viewall-workouts/viewall-workouts.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { EditWorkoutComponent } from './edit-workout/edit-workout.component';

const appRoutes: Routes = [
  //{path : 'home', component: AppComponent},
  {path : '', component: HomeComponent},//redirectTo: '/app',pathMatch: 'full'},
  {path : 'viewAll',  component: ViewallWorkoutsComponent},
  {path : 'createWorkout', component: CreateWorkoutComponent},
  {path : 'category', component: CategoryComponent},
  {path : 'tracker', component: TrackerComponent},
  {path : 'editWorkout/:id', component: EditWorkoutComponent},
  {path : '**', component: PagenotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CreateWorkoutComponent,
    CategoryComponent,
    TrackerComponent,
    ViewallWorkoutsComponent,
    PagenotfoundComponent,
    HomeComponent,
    EditWorkoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
