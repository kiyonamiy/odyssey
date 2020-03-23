/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function(head) {
  if (head == null || head.next == null) {
    return head;
  }

  const head1 = head;
  const head1Cur = head;

  const head2 = head.next;
  const head2Cur = head2;

  while (head2Cur != null && head2Cur.next != null) {
    head1Cur.next = head2Cur.next;
    head1Cur = head1Cur.next;

    head2Cur.next = head1Cur.next;
    head2Cur = head2Cur.next;
  }

  head1Cur.next = head2;
  return head1;
};
