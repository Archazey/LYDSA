import { DsInput } from '../ds-input';

export class LeeInput extends DsInput {
    height: number;
    width: number;
    start: any;
    stop: any;
    walls: any[];

    constructor(_height: number, _width: number, _start: any, _stop: any, _walls: any[]) {
        super();
        
        this.height = _height;
        this.width = _width;
        this.start = _start;
        this.stop = _stop;
        this.walls = _walls;
    }
}