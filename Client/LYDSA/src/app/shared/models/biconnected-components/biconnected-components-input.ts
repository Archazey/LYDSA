import { DsInput } from '../ds-input';

export class BiconnectedComponentsInput extends DsInput {
    numberOfNodes: number;
    numberOfEdges: number;
    edges: any[];

    constructor(_numberOfNodes: number, _numberOfEdges: number, _edges: number[]) {
        super();
        
        this.numberOfNodes = _numberOfNodes;
        this.numberOfEdges = _numberOfEdges;
        this.edges = _edges;
    }
}