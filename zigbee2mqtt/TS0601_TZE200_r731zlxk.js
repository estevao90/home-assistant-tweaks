const fz = require("zigbee-herdsman-converters/converters/fromZigbee");
const tz = require("zigbee-herdsman-converters/converters/toZigbee");
const exposes = require("zigbee-herdsman-converters/lib/exposes");
const reporting = require("zigbee-herdsman-converters/lib/reporting");
const ota = require("zigbee-herdsman-converters/lib/ota");
const tuya = require("zigbee-herdsman-converters/lib/tuya");
const legacy = require("zigbee-herdsman-converters/lib/legacy");
const e = exposes.presets;
const ea = exposes.access;

const definition = {
  fingerprint: tuya.fingerprint("TS0601", ["_TZE200_r731zlxk"]),
  model: "TBZ26M-6",
  vendor: "Tuya",
  description: "6-Gang Smart Light Switch Zemismart",
  exposes: [
    e.switch().withEndpoint("l1").setAccess("state", ea.STATE_SET),
    e.switch().withEndpoint("l2").setAccess("state", ea.STATE_SET),
    e.switch().withEndpoint("l3").setAccess("state", ea.STATE_SET),
    e.switch().withEndpoint("l4").setAccess("state", ea.STATE_SET),
    e.switch().withEndpoint("l5").setAccess("state", ea.STATE_SET),
    e.switch().withEndpoint("l6").setAccess("state", ea.STATE_SET),
  ],
  fromZigbee: [fz.ignore_basic_report, legacy.fz.tuya_switch],
  toZigbee: [legacy.tz.tuya_switch_state],
  meta: { multiEndpoint: true },
  endpoint: (device) => {
    return { l1: 1, l2: 1, l3: 1, l4: 1, l5: 1, l6: 1 };
  },
  configure: async (device, coordinatorEndpoint) => {
    try {
      if (device.getEndpoint(1))
        await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, [
          "genOnOff",
        ]);
      if (device.getEndpoint(2))
        await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, [
          "genOnOff",
        ]);
      if (device.getEndpoint(3))
        await reporting.bind(device.getEndpoint(3), coordinatorEndpoint, [
          "genOnOff",
        ]);
      if (device.getEndpoint(4))
        await reporting.bind(device.getEndpoint(4), coordinatorEndpoint, [
          "genOnOff",
        ]);
      if (device.getEndpoint(5))
        await reporting.bind(device.getEndpoint(5), coordinatorEndpoint, [
          "genOnOff",
        ]);
      if (device.getEndpoint(6))
        await reporting.bind(device.getEndpoint(6), coordinatorEndpoint, [
          "genOnOff",
        ]);
    } catch (error) {
      // It may fail, but the device will still work.
    }
    device.powerSource = "Mains (single phase)";
    device.save();
  },
};
module.exports = definition;
