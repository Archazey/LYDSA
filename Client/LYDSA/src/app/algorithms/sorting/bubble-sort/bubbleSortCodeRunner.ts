import { BubbleSortInput } from "../../../shared/models/bubble-sort/bubble-sort-input";
import { BubbleSortRunResult } from "../../../shared/models/bubble-sort/bubble-sort-run-result";
import { EditorInput } from "../../../shared/models/editor-input";
import { BubbleSortOperation } from "../../../shared/models/bubble-sort/bubble-sort-operation";
import { DsCodeRunner } from '../../../shared/models/ds-code-runner';

// codes
import * as codes from './data/codes.json';
import * as comments from './data/comments.json';

export class BubbleSortCodeRunner extends DsCodeRunner {
    data: BubbleSortRunResult[];

    runCode(input: BubbleSortInput[]): BubbleSortRunResult[] {
        this.data = [];

        this.run(input);

        return this.data;
    }

    run(input: BubbleSortInput[]) {
        this.logLine(new BubbleSortRunResult(0, BubbleSortOperation.None));
        let ok: boolean = true;
        this.logLine(new BubbleSortRunResult(1, BubbleSortOperation.None));
        while (ok == true) {
            this.logLine(new BubbleSortRunResult(2, BubbleSortOperation.None));
            ok = false;
            this.logLine(new BubbleSortRunResult(3, BubbleSortOperation.None));
            for (let i = 1; i < input.length; i++) {
                this.logLine(new BubbleSortRunResult(4, BubbleSortOperation.None));
                if (input[i].item < input[i - 1].item) {
                    this.logLine(new BubbleSortRunResult(5, BubbleSortOperation.Swap, i - 1, i));
                    let aux = input[i];
                    input[i] = input[i - 1];
                    input[i - 1] = aux;
                    this.logLine(new BubbleSortRunResult(6, BubbleSortOperation.None));
                    ok = true;
                    this.logLine(new BubbleSortRunResult(7, BubbleSortOperation.None));
                }
                this.logLine(new BubbleSortRunResult(3, BubbleSortOperation.None));
            }
            this.logLine(new BubbleSortRunResult(8, BubbleSortOperation.None));
        } 
    }

    parseInput(input: string): BubbleSortInput[] {
        // split input in words
        var words = input.split(' ');
        var res: BubbleSortInput[] = [];
        for (var word of     words) 
            res.push(new BubbleSortInput(parseInt(word)));
        
        return res;
    }

    getCode(codeLanguage: string): EditorInput[] {
        var code: string[] = codes[codeLanguage];

        var result: EditorInput[] = [];
        for (let i in code)
            result.push(new EditorInput(false, code[i], comments[i].trim()))

        return result;
    }

    logLine(line: BubbleSortRunResult) {
        this.data.push(line);
    }
}