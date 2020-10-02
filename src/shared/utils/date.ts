export const getNewDate = (locale: string = 'en') => {
  const d = new Date();
  const opt = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };
  return new Intl.DateTimeFormat(locale, opt).format(d);
};