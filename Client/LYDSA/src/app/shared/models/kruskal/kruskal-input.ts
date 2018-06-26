import { DsInput } from '../ds-input';

export class KruskalInput extends DsInput {
    numberOfNodes: number;
    numberOfEdges: number;
    edges: any[];

    constructor(_numberOfNodes: number, _numberOfEdges: number, _edges: any[]) {
        super();
        
        this.numberOfNodes = _numberOfNodes;
        this.numberOfEdges = _numberOfEdges;
        this.edges = _edges;
    }
}