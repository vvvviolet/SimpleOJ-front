export function TimestampToDate(Timestamp: number) {
  const now = new Date(Timestamp);
  const [y, m, d] = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
  return (
    y +
    '-' +
    (m < 10 ? '0' + m : m) +
    '-' +
    (d < 10 ? '0' + d : d) +
    ' ' +
    now.toTimeString().substring(0, 8)
  );
}
