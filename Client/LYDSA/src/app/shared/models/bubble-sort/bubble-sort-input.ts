import { DsInput } from '../ds-input';

export class BubbleSortInput extends DsInput {
    item: number;

    constructor(_item: number) {
        super();
        
        this.item = _item;
    }
}