import { LeeRunResult } from '../lee-run-result';
import { LeeOperation } from '../lee-operation';

export class ColorCell extends LeeRunResult {
    coordinates: any;
    color: string;

    constructor(_line: number, _operation: LeeOperation, _coordinates: any, _color: string) {
        super(_line, _operation);

        this.coordinates = _coordinates;
        this.color = _color;
    }
} 