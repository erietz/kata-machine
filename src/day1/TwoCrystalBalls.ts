export default function two_crystal_balls(breaks: boolean[]): number {

  const jmpAmount = Math.floor(Math.sqrt(breaks.length));

  let story = jmpAmount;
  let broke = false;
  for (; story < breaks.length; story += jmpAmount) {
    if (breaks[story]) {
      broke = true;
      break
    }
  }

  story -= jmpAmount;

  if (broke) {
    for (let i = 0; i < jmpAmount; i++) {
      if (breaks[story + i]) {
        return story + i;
      }
    }
  }

  return -1;
}
