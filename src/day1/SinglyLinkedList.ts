export default class SinglyLinkedList<T> {
    public length: number;
    private _head?: ListNode<T>;
    private _tail?: ListNode<T>;

    constructor() {
        this.length = 0;
    }

    private getPredecessor(item: T): ListNode<T> | undefined {
        let curr = this._head;
        while (curr && curr.next) {
            if (curr.next.value === item) {
                return curr;
            }
            curr = curr.next;
        }
        return undefined;
    }

    prepend(item: T): void {
        const node: ListNode<T> = { value: item };

        if (this.length === 0) {
            this._head = this._tail = node;
        } else {
            node.next = this._head;
            this._head = node;
        }

        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("Invalid index");
        }

        if (idx === 0) {
            this.prepend(item);
            return;
        }

        if (idx === this.length) {
            this.append(item);
            return;
        }

        let curr = this._head;
        for (let i = 0; i < idx; i++, curr = curr!.next) { }

        const node: ListNode<T> = { value: item };
        node.next = curr!.next;
        curr!.next = node;
        this.length++;
    }

    append(item: T): void {
        const node: ListNode<T> = { value: item };

        if (!this._tail) {
            this._head = this._tail = node;
        } else {
            this._tail.next = node;
            this._tail = node;
        }

        this.length++;
    }

    remove(item: T): T | undefined {
        if (!this._head || !this._tail) {
            throw new Error("Cannot remove from empty list");
        }

        // remove head node
        if (this._head.value === item) {
            let tmp = this._head.value;
            this._head = this._head.next;
            this.length--;
            return tmp;
        }

        let predecessor = this.getPredecessor(item);

        // item not in list
        if (predecessor === undefined) { return; }

        let nodeBeingRemoved = predecessor.next;

        // remove tail node
        if (nodeBeingRemoved?.next === undefined) {
            predecessor.next = undefined;
            this._tail = predecessor;
        } else {
            predecessor.next = nodeBeingRemoved?.next;
        }

        this.length--;
        return nodeBeingRemoved?.value;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return;
        }

        let curr = this._head;
        for (let i = 0; i < idx; i++, curr = curr!.next) { }
        return curr!.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            throw new Error("Invalid index");
        }

        // remove head node
        if (idx === 0) {
            let tmp = this._head!.value;
            this._head = this._head!.next;
            this.length--;
            return tmp;
        }

        let predecessor = this._head;
        for (let i = 0; i < idx - 1; i++, predecessor = predecessor!.next) { }

        let tmp = predecessor!.next!.value;
        if (idx === this.length - 1) {
            this._tail = predecessor;
        } else {
            predecessor!.next = predecessor!.next!.next;
        }

        this.length--;
        return tmp;
    }

}
