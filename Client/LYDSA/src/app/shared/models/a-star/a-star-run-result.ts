import { AStarOperation } from './a-star-operation';
import { DsRunResult } from '../ds-run-result';

export class AStarRunResult extends DsRunResult {
    operation: AStarOperation;

    constructor(_line: number, _operation: AStarOperation) {
        super(_line);
        this.operation = _operation;
    }
}