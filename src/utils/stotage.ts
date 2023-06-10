export const saveData = (key: string, data: any) => {
  if (!key) return;
  localStorage.setItem(
    key,
    typeof data === "string" ? data : JSON.stringify(data)
  );
};

export const getData = (key: string) => {
  if (!key) return;
  return localStorage.getItem(key);
};

export const deleteData = (key: string) => {
  localStorage.removeItem(key);
};
