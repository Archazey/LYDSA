import { DsInput } from '../ds-input';

export class QuickSortInput extends DsInput {
    item: number;

    constructor(_item: number) {
        super();
        
        this.item = _item;
    }
}