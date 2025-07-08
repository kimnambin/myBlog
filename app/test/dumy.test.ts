let store: Record<string, string>;

export const localStorageMock = {
  getItem: (key: string) => store[key] || null,
  setItem: (key: string, value: string) => {
    store[key] = value.toString();
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    store = {};
  },
};

beforeEach(() => {
  store = {}; // 각 테스트마다 초기화
  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
    configurable: true,
  });
});

describe('localStorage tests', () => {
  it('should save and retrieve an item', () => {
    localStorage.setItem('key', 'value');
    expect(localStorage.getItem('key')).toBe('value');
  });

  it('should remove an item', () => {
    localStorage.setItem('key', 'value');
    localStorage.removeItem('key');
    expect(localStorage.getItem('key')).toBeNull();
  });

  it('should clear all items', () => {
    localStorage.setItem('key', 'value');
    localStorage.clear();
    expect(localStorage.getItem('key')).toBeNull();
  });
});
