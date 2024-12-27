const fz = require("zigbee-herdsman-converters/converters/fromZigbee");
const tz = require("zigbee-herdsman-converters/converters/toZigbee");
const exposes = require("zigbee-herdsman-converters/lib/exposes");
const reporting = require("zigbee-herdsman-converters/lib/reporting");
const ota = require("zigbee-herdsman-converters/lib/ota");
const tuya = require("zigbee-herdsman-converters/lib/tuya");
const e = exposes.presets;
const ea = exposes.access;

const definition = {
  fingerprint: tuya.fingerprint("TS011F", ["_TZ3000_3zofvcaa"]),
  model: "TBZ242",
  vendor: "Zemismart",
  description: "2 10A socket + USB + USB type-C Zemismart",
  extend: [
    tuya.modernExtend.tuyaOnOff({
      indicatorMode: true,
      endpoints: ["l1", "l2", "l3", "l4"],
      childLock: true,
    }),
  ],
  endpoint: () => {
    return { l1: 1, l2: 2, l3: 3, l4: 4 };
  },
  meta: { multiEndpoint: true },
  configure: async (device, coordinatorEndpoint) => {
    await tuya.configureMagicPacket(device, coordinatorEndpoint);
    for (const endpointID of [1, 2, 3, 4]) {
      const endpoint = device.getEndpoint(endpointID);
      await reporting.bind(endpoint, coordinatorEndpoint, ["genOnOff"]);
      await reporting.onOff(endpoint);
    }
  },
};
module.exports = definition;
