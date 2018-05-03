// Add a mock localStorage implementation

if (!global.window) {
    global.window = {};
}

if (!global.window.localStorage) {
    global.window.localStorage = createMockLocalStorage();
}

function createMockLocalStorage() {
    const store = {};
    return {
        setItem: (key, value) => store[key] = value + '',
        getItem: (key) => store[key],
        clear: (key) => delete store[key]
    };
}
