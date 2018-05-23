export class EditorInput {
    checked: boolean;
    codeLine: string;
    comment: string;

    constructor(_checked: boolean, _codeLine: string, _comment: string) {
        this.checked = _checked;
        this.codeLine = _codeLine;
        this.comment = _comment;
    }
}