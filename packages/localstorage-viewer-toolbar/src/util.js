export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event("localstorage-update"));
};

export const getLocalStorageItem = (key) => {
  return localStorage.getItem(key);
};
