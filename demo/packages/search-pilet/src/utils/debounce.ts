export function debounce(callback: Function, wait: number) {
  let timeout: number | NodeJS.Timeout;

  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}
