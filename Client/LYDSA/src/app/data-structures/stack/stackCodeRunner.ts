import { StackInput } from "../../shared/models/stack/stack-input";
import { StackRunResult } from "../../shared/models/stack/stack-run-result";
import { EditorInput } from "../../shared/models/editor-input";
import { StackOperation } from "../../shared/models/stack/stack-operation";
import { DsCodeRunner } from '../../shared/models/ds-code-runner';

// codes
import * as codes from './data/codes.json';
import * as comments from './data/comments.json';

export class StackCodeRunner extends DsCodeRunner { 
    data: StackRunResult[];

    runCode(input: StackInput[]): StackRunResult[] {
        this.data = []; 

        this.run(input);

        return this.data;
    }

    run(input: StackInput[]) {
        var stack: number[] = [];
        this.logLine(new StackRunResult(0, StackOperation.None));
        this.logLine(new StackRunResult(1, StackOperation.None));
        for (var item of input) {
            this.logLine(new StackRunResult(2, StackOperation.None));
            if (item.operation == 'Push') {
                stack.push(item.data);
                this.logLine(new StackRunResult(3, StackOperation.Push, item.data));
            }

            this.logLine(new StackRunResult(4, StackOperation.None));
            if (item.operation == 'Pop') {
                stack.pop();
                this.logLine(new StackRunResult(5, StackOperation.Pop));
            }

            this.logLine(new StackRunResult(6, StackOperation.None));
            this.logLine(new StackRunResult(1, StackOperation.None));
        }
    }

    parseInput(input: string): StackInput[] {
        // split string into lines
        var lines: string[] = input.split('\n');
        var res: StackInput[] = [];

        for (var line of lines) {
            var words: string[] = line.split(' ');
            var op: string = words[0];
            var num: number = parseInt(words[1]);

            res.push(new StackInput(op, num));
        }

        return res;
    }
    
    getCode(codeLanguage: string): EditorInput[] {
        var code: string[] = codes[codeLanguage];

        var result: EditorInput[] = [];
        for (let i in code)
            result.push(new EditorInput(false, code[i], comments[i].trim()))

        return result;
    }

    logLine(line: StackRunResult) {
        this.data.push(line);
    }
}