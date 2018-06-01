import { DsInput } from "../../shared/models/ds-input";
import { DsRunResult } from "../../shared/models/ds-run-result";
import { EditorInput } from "../../shared/models/editor-input";

export class DsCodeRunner {
    data: DsRunResult[];

    runCode(input: DsInput[]): DsRunResult[] {
        return [];
    }

    run(input: DsInput[]): void {

    }

    parseInput(input: string): DsInput[] {
        return [];
    }

    getCode(): EditorInput[] {
        return [];
    }

    logLine(line: DsRunResult) {

    }
}