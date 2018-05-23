import { StackOperation } from "./stack-operation";

export class StackRunResult {
    line: number;
    operation: StackOperation;

    constructor(_line: number, _operation: StackOperation) {
        this.line = _line;
        this.operation = _operation;
    }
}