export default class Queue<T> {
    public length: number;
    private _head?: ListNode<T>;
    private _tail?: ListNode<T>;

    constructor() {
        this.length = 0;
    }

    enqueue(item: T): void {
        const node: ListNode<T> = { value: item };

        if (this.length === 0) {
            this._head = this._tail = node;
        } else {
            this._tail!.next = node;
            this._tail = node;
        }

        this.length++;
    }

    deque(): T | undefined {
        if (this.length === 0) {
            return
        }

        const head = this._head;
        this._head = this._head!.next;
        this.length--;
        return head!.value;
    }

    peek(): T | undefined {
        return this._head?.value;
    }
}
