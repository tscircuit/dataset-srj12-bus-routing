import { USBC } from "../imports/USBC"

export default () => (
  <board width="30mm" height="36mm" routingDisabled>
    <chip
      name="U1"
      footprint="qfn32"
      doNotPlace
      pcbX={0}
      pcbY={12}
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

    <USBC name="USBC1" pcbRotation={90} pcbX={11} pcbY={-8} />

    <capacitor name="C1" capacitance="100nF" footprint="0402" doNotPlace pcbX={-3.7} pcbY={2} />
    <resistor name="R1" resistance="3.3k" footprint="0603" doNotPlace pcbX={0.5} pcbY={7.1} />
    <capacitor name="C2" capacitance="1uF" footprint="0603" doNotPlace pcbX={3.7} pcbY={4} />
    <resistor name="R2" resistance="12k" footprint="0805" doNotPlace pcbX={2.0} pcbY={2.6} />
    <capacitor name="C3" capacitance="2.2uF" footprint="0805" doNotPlace pcbX={-1.5} pcbY={-1.0} />
    <resistor name="R3" pcbRotation={90} resistance="100" footprint="0402" doNotPlace pcbX={3.5} pcbY={-4.6} />
    <capacitor name="C4" pcbRotation={90} capacitance="22nF" footprint="0603" doNotPlace pcbX={-2.8} pcbY={-8.0} />
    <resistor name="R4" pcbRotation={90} resistance="47k" footprint="0603" doNotPlace pcbX={1.2} pcbY={-10.6} />

    <trace from=".U1 > .pin17" to=".USBC1 > .pin7" />
    <trace from=".U1 > .pin18" to=".USBC1 > .pin3" />
    <trace from=".U1 > .pin19" to=".USBC1 > .pin10" />
    <trace from=".U1 > .pin20" to=".USBC1 > .pin1" />
    <trace from=".U1 > .pin21" to=".USBC1 > .pin9" />
    <trace from=".U1 > .pin22" to=".USBC1 > .pin5" />
    <trace from=".U1 > .pin23" to=".USBC1 > .pin12" />
    <trace from=".U1 > .pin24" to=".USBC1 > .pin2" />
    <trace from=".U1 > .pin25" to=".USBC1 > .pin8" />
    <trace from=".U1 > .pin16" to=".USBC1 > .pin4" />
    <trace from=".U1 > .pin27" to=".USBC1 > .pin11" />
  </board>
)
