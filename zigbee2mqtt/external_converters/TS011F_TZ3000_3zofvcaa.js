const reporting = require("zigbee-herdsman-converters/lib/reporting");
const tuya = require("zigbee-herdsman-converters/lib/tuya");

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
    try {
      await tuya.configureMagicPacket(device, coordinatorEndpoint);
      for (const endpointID of [1, 2, 3, 4]) {
        const endpoint = device.getEndpoint(endpointID);
        await reporting.bind(endpoint, coordinatorEndpoint, ["genOnOff"]);
        await reporting.onOff(endpoint);
      }
    } catch (error) {
      // It may fail, but the device will still work.
    }
  },
};
module.exports = definition;
