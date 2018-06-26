import { BiconnectedComponentsRunResult } from '../biconnected-components-run-result';
import { BiconnectedComponentsOperation } from '../biconnected-components-operation';

export class ColorNode extends BiconnectedComponentsRunResult {
    index: number;
    color: string;

    constructor(_line: number, _operation: BiconnectedComponentsOperation, _index: number, _color: string) {
        super(_line, _operation);

        this.index = _index;
        this.color = _color;
    }
} 