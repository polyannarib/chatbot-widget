import { PlayerModel } from './PlayerModel';

export class ActivityModel {

    playerId: Number;
    playerName: String;
    dayText: String;
    day: number;
    month: number;
    year: number;
    progress: Number;
    activities: Array< any >;
    playersRated: Array< any > = new Array< any >();
    playersAvailable: Array< any > = new Array< any >();
    playersRatedFiltered: Array< any > = new Array< any >();
    playersAvailableFiltered: Array< any > = new Array< any >();
    minDate: any;

    constructor() { }

}
