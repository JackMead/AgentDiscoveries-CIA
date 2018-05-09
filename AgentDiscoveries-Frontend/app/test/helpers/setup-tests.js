if (!global.window) {
    global.window = {};
}

// Add a mock localStorage implementation

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

// Add a fake event implementation

if (!global.Event) {
    global.Event = class {
        constructor(name) {
            this.name = name;
        }
    };
}
