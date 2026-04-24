import { USBC } from "../../imports/USBC"

export default () => (
  <board width="30mm" height="36mm" routingDisabled>
    <chip
      name="U1"
      footprint="qfn32"
      doNotPlace
      pcbX={-8}
      pcbY={3}
      pinLabels={{
        pin16: "BUS_09",
        pin17: "BUS_00",
        pin18: "BUS_01",
        pin19: "BUS_02",
        pin20: "VBUS_IN",
        pin21: "BUS_04",
        pin22: "BUS_05",
        pin23: "GND",
        pin24: "BUS_07",
        pin25: "BUS_08",
        pin27: "BUS_10",
      }}
      pinAttributes={{
        BUS_00: { mustBeConnected: true },
        BUS_01: { mustBeConnected: true },
        BUS_02: { mustBeConnected: true },
        VBUS_IN: { requiresPower: true, mustBeConnected: true },
        BUS_04: { mustBeConnected: true },
        BUS_05: { mustBeConnected: true },
        GND: { requiresGround: true, mustBeConnected: true },
        BUS_07: { mustBeConnected: true },
        BUS_08: { mustBeConnected: true },
        BUS_09: { mustBeConnected: true },
        BUS_10: { mustBeConnected: true },
      }}
    />

    <USBC name="USBC1" pcbRotation={90} pcbX={11} pcbY={-13} />

    <capacitor  pcbRotation={90} name="C2" capacitance="4.7uF" footprint="0805" doNotPlace pcbX={1.8} pcbY={-2.8} />
    <resistor name="R3" resistance="22k" footprint="0603" doNotPlace pcbX={-2.2} pcbY={-5.5} />
    <capacitor  name="C3" capacitance="10nF" footprint="0402" doNotPlace pcbX={3.4} pcbY={-6.7} />

    <trace from=".USBC1 > .DP1" to=".U1 > .pin25" />
    <trace from=".USBC1 > .DP2" to=".U1 > .pin26" />

  </board>
)
