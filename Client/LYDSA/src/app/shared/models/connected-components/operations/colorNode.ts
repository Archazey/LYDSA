import { ConnectedComponentsRunResult } from '../connected-components-run-result';
import { ConnectedComponentsOperation } from '../connected-components-operation';

export class ColorNode extends ConnectedComponentsRunResult {
    index: number;
    color: string;

    constructor(_line: number, _operation: ConnectedComponentsOperation, _index: number, _color: string) {
        super(_line, _operation);

        this.index = _index;
        this.color = _color;
    }
} 