import { KruskalRunResult } from '../kruskal-run-result';
import { KruskalOperation } from '../kruskal-operation';

export class ColorEdge extends KruskalRunResult {
    index: number;
    color: string;

    constructor(_line: number, _operation: KruskalOperation, _index: number, _color: string) {
        super(_line, _operation);

        this.index = _index;
        this.color = _color;
    }
} 