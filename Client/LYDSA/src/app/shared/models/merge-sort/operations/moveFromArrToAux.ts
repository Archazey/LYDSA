import { MergeSortRunResult } from '../merge-sort-run-result';
import { MergeSortOperation } from '../merge-sort-operation';

export class MoveFromArrToAux extends MergeSortRunResult {
    moveFrom: number;
    moveTo: number;

    constructor(_line: number, _operation: MergeSortOperation, _moveFrom: number, _moveTo: number) {
        super(_line, _operation);
        this.moveFrom = _moveFrom;
        this.moveTo = _moveTo;
    }
}