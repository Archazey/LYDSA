import { StackInput } from "../../shared/models/stack-input";
import { StackRunResult } from "../../shared/models/stack-run-result";
import { EditorInput } from "../../shared/models/editor-input";
import { StackOperation } from "../../shared/models/stack-operation";

export class StackCodeRunner {
    static data: StackRunResult[];

    static runCode(input: StackInput[]): StackRunResult[] {
        StackCodeRunner.data = [];

        StackCodeRunner.run(input);

        return StackCodeRunner.data;
    }

    static run(input: StackInput[]) {
        var stack: number[] = [];
        StackCodeRunner.logLine(new StackRunResult(0, StackOperation.None));
        StackCodeRunner.logLine(new StackRunResult(1, StackOperation.None));
        for (var item of input) {
            StackCodeRunner.logLine(new StackRunResult(2, StackOperation.None));
            if (item.operation == 'Push') {
                stack.push(item.data);
                StackCodeRunner.logLine(new StackRunResult(3, StackOperation.Push));
            }

            StackCodeRunner.logLine(new StackRunResult(4, StackOperation.None));
            if (item.operation == 'Pop') {
                stack.pop();
                StackCodeRunner.logLine(new StackRunResult(5, StackOperation.Pop));
            }

            StackCodeRunner.logLine(new StackRunResult(6, StackOperation.None));
            StackCodeRunner.logLine(new StackRunResult(1, StackOperation.None));
        }
    }

    static getCode(): EditorInput[] {
        var code: string[] = `var stack: number[] = [];
for (var item of input) {
    if (item.operation == 'Push') 
        stack.push(item.data);
    if (item.operation == 'Pop') 
        stack.pop();
}`.split('\n');

        var comments: string[] = `declare stack
        
        if operation is push
        push number to stack
        if operation is pop
        pop item from stack
        `.split('\n');

        var result: EditorInput[] = [];
        for (let i in code)
            result.push(new EditorInput(false, code[i], comments[i].trim()))
        
        return result;
    }

    static logLine(line: StackRunResult) {
        StackCodeRunner.data.push(line);
    }
}