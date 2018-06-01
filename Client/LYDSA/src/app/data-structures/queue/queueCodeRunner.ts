import { QueueInput } from "../../shared/models/queue/queue-input";
import { QueueRunResult } from "../../shared/models/queue/queue-run-result";
import { EditorInput } from "../../shared/models/editor-input";
import { QueueOperation } from "../../shared/models/queue/queue-operation";
import { DsCodeRunner } from '../../shared/models/ds-code-runner';

// codes
import * as codes from './data/codes.json';
import * as comments from './data/comments.json';

export class QueueCodeRunner extends DsCodeRunner { 
    data: QueueRunResult[];

    runCode(input: QueueInput[]): QueueRunResult[] {
        this.data = []; 

        this.run(input);

        return this.data;
    }

    run(input: QueueInput[]) {
        var stack: number[] = [];
        this.logLine(new QueueRunResult(0, QueueOperation.None));
        this.logLine(new QueueRunResult(1, QueueOperation.None));
        for (var item of input) {
            this.logLine(new QueueRunResult(2, QueueOperation.None));
            if (item.operation == 'Push') {
                stack.push(item.data);
                this.logLine(new QueueRunResult(3, QueueOperation.Push, item.data));
            }

            this.logLine(new QueueRunResult(4, QueueOperation.None));
            if (item.operation == 'Pop') {
                stack.pop();
                this.logLine(new QueueRunResult(5, QueueOperation.Pop));
            }

            this.logLine(new QueueRunResult(6, QueueOperation.None));
            this.logLine(new QueueRunResult(1, QueueOperation.None));
        }
    }

    parseInput(input: string): QueueInput[] {
        // split string into lines
        var lines: string[] = input.split('\n');
        var res: QueueInput[] = [];

        for (var line of lines) {
            var words: string[] = line.split(' ');
            var op: string = words[0];
            var num: number = parseInt(words[1]);

            res.push(new QueueInput(op, num));
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

    logLine(line: QueueRunResult) {
        this.data.push(line);
    }
}