export function getKSTNow() {
  const now = new Date();
  const kst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  return {
    h: kst.getHours(),
    m: kst.getMinutes(),
    date: `${kst.getFullYear()}-${String(kst.getMonth() + 1).padStart(2, "0")}-${String(kst.getDate()).padStart(2, "0")}`,
  };
}

export function isPastTimeOnDate(dateStr: string, timeStr: string): boolean {
  if (!dateStr || !timeStr) return false;
  const kstNow = getKSTNow();
  if (dateStr !== kstNow.date) return false;
  const [h, m] = timeStr.split(":").map(Number);
  return h < kstNow.h || (h === kstNow.h && m <= kstNow.m);
}
