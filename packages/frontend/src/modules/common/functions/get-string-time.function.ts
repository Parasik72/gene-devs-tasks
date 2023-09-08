const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export const getStringTime = (milliseconds: number): string => {
  const hours = Math.floor(milliseconds / HOUR);
  const minutes = Math.floor((milliseconds % HOUR) / MINUTE);
  const seconds = Math.floor((milliseconds % MINUTE) / SECOND);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
