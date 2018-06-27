import { AStarRunResult } from '../a-star-run-result';
import { AStarOperation } from '../a-star-operation';

export class ColorCell extends AStarRunResult {
    coordinates: any;
    color: string;

    constructor(_line: number, _operation: AStarOperation, _coordinates: any, _color: string) {
        super(_line, _operation);

        this.coordinates = _coordinates;
        this.color = _color;
    }
} 