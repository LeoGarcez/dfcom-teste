// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async setItem(key, value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  },
  async getItem(key) {
    const item = localStorage.getItem(key);
    return JSON.parse(item);
  },
  async removeItem(key) {
    localStorage.removeItem(key);
  },
};
