export default class DoublyLinkedList<T> {
    public length: number;
    private _head?: ListNode<T>;
    private _tail?: ListNode<T>;

    constructor() {
        this.length = 0;
    }

    private removeNode(node: ListNode<T> | undefined): T | undefined {
        // item not in list
        if (!node) {
            return;
        }

        const returnValue = node.value;

        // remove only item in list
        if (!node.next && !node.prev) {
            this._head = this._tail = undefined;
        }

        // remove head
        if (!node.prev) {
            this._head = node.next;
        }

        // remove tail
        if (!node.next) {
            this._tail = node.prev;
        }

        // remove from middle
        if (node.prev && node.next) {
            node.prev.next = node.next
            node.next.prev = node.prev;
        }

        this.length--;
        return returnValue;
    }

    prepend(item: T): void {
        const node: ListNode<T> = { value: item };

        if (!this._head) {
            this._head = this._tail = node;
        } else {
            node.next = this._head;
            this._head.prev = node;
            this._head = node;
        }

        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx >= this.length) {
            return
        }

        if (idx === 0) {
            this.prepend(item);
        } else if (this.length) {
            this.append(item);
        } else {
            let curr = this._head;
            for (let i = 0; i < idx && curr; i++, curr = curr.next) {}
            // curr is not null since we iterated < idx
            curr = curr as ListNode<T>;

            const node: ListNode<T> = { value: item };
            node.next = curr;
            node.prev = curr.prev;
            curr.prev = node;
            curr.prev.next = node;
            this.length++;
        }
    }

    append(item: T): void {
        const node: ListNode<T> = { value: item };

        if (!this._tail) {
            this._head = this._tail = node;
        } else {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;
        }

        this.length++;
    }

    remove(item: T): T | undefined {
        let curr = this._head;
        for (let i = 0; i < this.length && curr; i++) {
            if (curr.value === item) {
                return this.removeNode(curr);
            }
            curr = curr.next;
        }
        return undefined;
    }

    get(idx: number): T | undefined {
        let curr = this._head;
        for (let i = 0; i < idx && curr; i++, curr = curr.next) { }
        return curr?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx > this.length || this.length === 0) {
            return;
        }

        if (idx === 0) {
            return this.removeNode(this._head);
        }

        if (idx === this.length - 1) {
            return this.removeNode(this._tail);
        }

        let curr = this._head;
        for (let i = 0; i < idx && curr; i++, curr = curr.next) { }
        return this.removeNode(curr);
    }
}
