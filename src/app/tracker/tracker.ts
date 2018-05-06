import { IAddWorkout } from '.././create-workout/create-workout';

export interface ITrackWorkouts{
   workoutTimeOfDay : number;
   workoutTimeOfWeek : number;
   workoutTimeOfMonth : number;
   weeklyWorkouts : IAddWorkout[];
   monthlyWorkouts :  IAddWorkout[];
   yearlyWorkouts :  IAddWorkout[];
}