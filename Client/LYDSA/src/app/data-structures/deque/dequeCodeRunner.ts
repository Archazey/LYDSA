import { DequeInput } from "../../shared/models/deque/deque-input";
import { DequeRunResult } from "../../shared/models/deque/deque-run-result";
import { EditorInput } from "../../shared/models/editor-input";
import { DequeOperation } from "../../shared/models/deque/deque-operation";
import { DsCodeRunner } from '../../shared/models/ds-code-runner';

// codes
import * as codes from './data/codes.json';
import * as comments from './data/comments.json';

export class DequeCodeRunner extends DsCodeRunner { 
    data: DequeRunResult[];

    runCode(input: DequeInput[]): DequeRunResult[] {
        this.data = []; 

        this.run(input);

        return this.data;
    }

    run(input: DequeInput[]) {
        var deque: number[] = [];
        this.logLine(new DequeRunResult(0, DequeOperation.None));
        this.logLine(new DequeRunResult(1, DequeOperation.None));
        for (var item of input) {
            this.logLine(new DequeRunResult(2, DequeOperation.None));
            if (item.operation == 'PushFront') {
                deque.splice(0, 0, item.data);
                this.logLine(new DequeRunResult(3, DequeOperation.PushFront, item.data));
            }

            this.logLine(new DequeRunResult(4, DequeOperation.None));
            if (item.operation == 'PushBack') {
                deque.push(item.data);
                this.logLine(new DequeRunResult(5, DequeOperation.PushBack, item.data));
            }

            this.logLine(new DequeRunResult(6, DequeOperation.None));
            if (item.operation == 'PopFront') {
                deque.splice(0, 1);
                this.logLine(new DequeRunResult(7, DequeOperation.PopFront, item.data));
            }

            this.logLine(new DequeRunResult(8, DequeOperation.None));
            if (item.operation == 'PopBack') {
                deque.splice(deque.length - 1, 1);
                this.logLine(new DequeRunResult(9, DequeOperation.PopBack, item.data));
            }

            this.logLine(new DequeRunResult(10, DequeOperation.None));
            this.logLine(new DequeRunResult(1, DequeOperation.None));
        }
    }

    parseInput(input: string): DequeInput[] {
        // split string into lines
        var lines: string[] = input.split('\n');
        var res: DequeInput[] = [];

        for (var line of lines) {
            var words: string[] = line.split(' ');
            var op: string = words[0];
            var num: number = parseInt(words[1]);

            res.push(new DequeInput(op, num));
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

    logLine(line: DequeRunResult) {
        this.data.push(line);
    }
}