export class DequeVisualizerData {
    animation: string;
    data: number;
    hashValue: string;

    constructor(_animation: string, _hashValue: string, _data: number) {
        this.animation = _animation;
        this.hashValue = _hashValue;
        this.data = _data;
    }
}