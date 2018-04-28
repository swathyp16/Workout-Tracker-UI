import { IAddWorkout } from '../create-workout/create-workout';
export interface IStartEndWorkout extends IAddWorkout{
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
}