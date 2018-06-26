import { ConnectedComponentsOperation } from './connected-components-operation';
import { DsRunResult } from '../ds-run-result';

export class ConnectedComponentsRunResult extends DsRunResult {
    operation: ConnectedComponentsOperation;

    constructor(_line: number, _operation: ConnectedComponentsOperation) {
        super(_line);
        this.operation = _operation;
    }
}