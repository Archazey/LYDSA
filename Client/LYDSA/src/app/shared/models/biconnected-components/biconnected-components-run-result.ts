import { BiconnectedComponentsOperation } from './biconnected-components-operation';
import { DsRunResult } from '../ds-run-result';

export class BiconnectedComponentsRunResult extends DsRunResult {
    operation: BiconnectedComponentsOperation;

    constructor(_line: number, _operation: BiconnectedComponentsOperation) {
        super(_line);
        this.operation = _operation;
    }
}