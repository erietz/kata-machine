const GROWTH_FACTOR: number = 2;

export default class ArrayList<T> {
    public length: number;
    private _array: Array<T>;
    private _capacity: number;

    constructor(capacity: number = 2) {
        this._capacity = capacity;
        this._array = [];
        this._array.length = capacity;
        this.length = 0;
    }

    private grow(): void {
        const tmp = this._array;
        this._array = [];
        this._capacity *= GROWTH_FACTOR;
        this._array.length = this._capacity;

        for (let i = 0; i < this.length; i++) {
            this._array[i] = tmp[i];
        }
    }

    private shiftRight(idx: number): void {
        if (this.length === this._capacity) {
            this.grow();
        }

        for (let i = this.length; i > idx; i--) {
            this._array[i] = this._array[i - 1];
        }

        this.length++;
    }

    prepend(item: T): void {
        this.shiftRight(0);
        this._array[0] = item;
    }

    insertAt(item: T, idx: number): void {
        this.shiftRight(idx);
        this._array[idx] = item;
    }

    append(item: T): void {
        if (this.length === this._capacity) {
            this.grow();
        }

        this._array[this.length] = item;
        this.length++;
    }

    remove(item: T): T | undefined {
        let i = 0;
        for (; i < this.length; i++) {
            if (this._array[i] === item) {
                break;
            }
        }

        if (i === this.length) {
            return undefined;
        }

        return this.removeAt(i);
    }

    get(idx: number): T | undefined {
        return this._array[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        const value = this._array[idx];
        for (let i = idx; i < this.length - 1; i++) {
            this._array[i] = this._array[i+1];
        }

        this.length--;
        return value;
    }

}
