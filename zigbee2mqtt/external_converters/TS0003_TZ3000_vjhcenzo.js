const fz = require("zigbee-herdsman-converters/converters/fromZigbee");
const tz = require("zigbee-herdsman-converters/converters/toZigbee");
const exposes = require("zigbee-herdsman-converters/lib/exposes");
const reporting = require("zigbee-herdsman-converters/lib/reporting");
const ota = require("zigbee-herdsman-converters/lib/ota");
const tuya = require("zigbee-herdsman-converters/lib/tuya");
const e = exposes.presets;
const ea = exposes.access;

const definition = {
  fingerprint: tuya.fingerprint("TS0003", ["_TZ3000_vjhcenzo"]),
  model: "TBZ25",
  vendor: "Zemismart",
  description: "2-Gang Smart Light Switch + 10A socket Zemismart",
  extend: [
    tuya.modernExtend.tuyaOnOff({
      powerOnBehavior2: true,
      endpoints: ["l1", "l2", "l3"],
    }),
  ],
  endpoint: (device) => {
    return { l1: 1, l2: 2, l3: 3 };
  },
  meta: { multiEndpoint: true },
  configure: async (device, coordinatorEndpoint) => {
    try {
      await tuya.configureMagicPacket(device, coordinatorEndpoint);
      await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, [
        "genOnOff",
      ]);
      await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, [
        "genOnOff",
      ]);
      await reporting.bind(device.getEndpoint(3), coordinatorEndpoint, [
        "genOnOff",
      ]);
    } catch (error) {
      // It may fail, but the device will still work.
    }
  },
};
module.exports = definition;
