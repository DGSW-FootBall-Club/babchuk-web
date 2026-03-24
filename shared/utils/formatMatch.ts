export function formatMatchTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const ampm = h < 12 ? "오전" : "오후";
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${ampm} ${hour}:${String(m).padStart(2, "0")}`;
}

export function formatMatchDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${days[d.getDay()]}요일`;
}