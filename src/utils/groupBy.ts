

export default function groupBy(array: any, key: string) {
  return array.reduce((result: any, currentValue: any) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue,
    );
    return result;
  }, []);
};