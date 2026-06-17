const reporting = require("zigbee-herdsman-converters/lib/reporting");
const tuya = require("zigbee-herdsman-converters/lib/tuya");

const definition = {
  fingerprint: tuya.fingerprint("TS0003", ["_TZ3000_eqsair32"]),
  model: "TBZ26-3",
  vendor: "Zemismart",
  description: "3-Gang Smart Light Switch Zemismart",
  extend: [
    tuya.clusters.addTuyaGenOnOffCluster(),
    tuya.modernExtend.tuyaOnOff({
      powerOnBehavior2: true,
      backlightModeOffOn: true,
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
