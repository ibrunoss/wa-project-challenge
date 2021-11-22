export default function (element: any[]): any[] {
  return element
    .map((value) => ({ value, random: Math.random() }))
    .sort((obj1, obj2) => obj1.random - obj2.random)
    .map((obj) => obj.value);
}
