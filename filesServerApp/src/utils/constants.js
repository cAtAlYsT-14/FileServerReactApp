const OPERATING_SYSTEM_MAPPING = {
    0: 'Windows',
    1: 'Linux'
}

const serverInitialState = {
    id: null,
    name: "",
    ipAddress: "",
    operatingSystem: 0,
    softwareVersion: ""
}

export {
    OPERATING_SYSTEM_MAPPING,
    serverInitialState
}