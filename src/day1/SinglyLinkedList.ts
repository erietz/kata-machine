export default class SinglyLinkedList<T> {
  public length: number;
  private _head?: ListNode<T>;
  private _tail?: ListNode<T>;


  constructor() {
    this.length = 0;
  }

  prepend(item: T): void {
    const node = new Node<T>(item);

    if (this.length === 0) {
      this._head = node;
      this._tail = node;
      this.length++;
      return;
    }

    node.next = this._head;
    this._head = node;
    this.length++;
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length || idx < 0) {
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
    for (let i = 0; i < idx; i++) {
      curr = curr!.next;
    }

    const node = new Node<T>(item);
    node.next = curr!.next;
    curr!.next = node;
    this.length++;
  }

  append(item: T): void {
    const node = new Node<T>(item);

    if (this.length === 0) {
      this._head = node;
      this._tail = node;
      this.length++;
      return undefined;
    }

    this._tail!.next = node;
    this._tail = node;
    this.length++;
  }

  remove(item: T): T | undefined {
    if (this.length === 0 ) {
      throw new Error("Cannot remove from empty list");
    }

    // remove the head node
    if (this._head!.value === item) {
      return this.removeAt(0);
    }

    // traverse until find item
    let curr = this._head;
    let i = 0;
    while (curr?.next && curr?.next.value !== item) {
      curr = curr.next;
      i++;
    }

    // item not found in list
    if (curr?.next === undefined) {
      return undefined;
    }

    // item was at end of list
    if (i + 1 === this.length - 1) {
      curr.next = curr.next?.next;
      this._tail = curr;
      this.length--;
      return undefined;
    }

    // remove item from middle
    curr.next = curr.next?.next;
    this.length--;
    return undefined;
  }

  get(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      return;
    }

    let curr = this._head;
    for (let i = 0; i < idx; i++) {
      curr = curr?.next
    }

    return curr?.value;
  }

  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      // throw new Error("Invalid index");
      return;
    }

    if (idx === 0) {
      let tmp = this._head;
      this._head = this._head?.next;
      this.length--;
      return tmp?.value;
    }

    let curr = this._head;
    let i = 0;
    for (; i < idx - 1; i++) {
      curr = curr!.next;
    }

    // remove from tail
    if (idx === this.length - 1) {
      let tmp = curr?.next;
      this._tail = curr;
      this.length--;
      return tmp?.value;
    }

    // remove from middle
    let tmp = curr?.next;
    curr!.next = curr!.next?.next;
    this.length--;
    return tmp?.value;
  }

}

class Node<T> implements ListNode<T> {
  public value: T;
  next?: ListNode<T>;

  constructor(value: T) {
    this.value = value;
  }
}
