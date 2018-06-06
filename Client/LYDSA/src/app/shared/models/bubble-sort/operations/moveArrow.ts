import { BubbleSortOperation } from './../bubble-sort-operation';
import { BubbleSortRunResult } from './../bubble-sort-run-result';

export class MoveArrow extends BubbleSortRunResult {
    pos: number;

    constructor(_line: number, _operation: BubbleSortOperation, _pos: number) {
        super(_line, _operation);
        this.pos = _pos;
    }
}