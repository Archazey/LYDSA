import { KruskalOperation } from './kruskal-operation';
import { DsRunResult } from '../ds-run-result';

export class KruskalRunResult extends DsRunResult {
    operation: KruskalOperation;

    constructor(_line: number, _operation: KruskalOperation) {
        super(_line);
        this.operation = _operation;
    }
}