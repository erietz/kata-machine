// NOTE: There are an infinite number of ways to be off by one in this
// algorithm. Be careful and draw a picture.

export default function bs_list(haystack: number[], needle: number): boolean {
  return bs_list_recursive(haystack, needle, 0, haystack.length - 1)
  // return bs_iterative(haystack, needle);
}

function bs_list_recursive(haystack: number[], needle: number, low: number, high: number): boolean {
  if (low > high) {
    return false;
  }

  const mid = Math.floor((high - low)/2) + low;
  const value = haystack[mid];

  if (needle === value) {
    return true;
  } else if (needle > value) {
    return bs_list_recursive(haystack, needle, mid + 1, high);
  } else {
    return bs_list_recursive(haystack, needle, low, mid - 1);
  }
}

function bs_iterative(haystack: number[], needle: number): boolean {
  let low = 0;
  let high = haystack.length - 1;

  while (low <= high) {
    const mid = Math.floor((high - low)/2) + low;
    const value = haystack[mid];

    if (needle === value) {
      return true;
    } else if (needle > value) {
      low = mid + 1; 
    } else {
      high = mid - 1;
    }
  }

  return false;
}
