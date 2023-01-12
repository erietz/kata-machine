export default function two_crystal_balls(breaks: boolean[]): number {

  const calcStory = (i: number) => i * Math.floor(Math.sqrt(breaks.length));

  let broke = false;
  let story;
  let i = 0;
  do {
    story = calcStory(i);
    if (breaks[story]) {
      broke = true;
      break;
    }
    i++;
  } while (story < breaks.length)

  if (broke) {
    for (let j = calcStory(i - 1); j < calcStory(i); j++) {
      if (breaks[j]) {
        return j;
      }
    }
  }

  return -1;
}
