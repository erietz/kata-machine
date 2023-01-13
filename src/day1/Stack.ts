export default class Stack<T> {
    public length: number;
    private _head?: ListNode<T>;

    constructor() {
        this.length = 0;
    }

    push(item: T): void {
        const node: ListNode<T> = { value: item };

        if (!this._head) {
            this._head = node;
        } else {
            node.next = this._head;
            this._head = node;
        }

        this.length++;
    }

    pop(): T | undefined {
        if (!this._head) {
            return undefined;
        }

        const node = this._head;
        this._head = this._head.next;
        this.length--;
        return node.value;
    }

    peek(): T | undefined {
        return this._head?.value;
    }
}
