import { StackOperation } from "./stack-operation";

export class StackRunResult {
    line: number;
    operation: StackOperation;
    data: number

    constructor(_line: number, _operation: StackOperation, _data?: number) {
        this.line = _line;
        this.operation = _operation;
        this.data = _data || 0;
    }
}