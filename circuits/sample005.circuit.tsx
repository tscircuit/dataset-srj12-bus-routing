import { USBC } from "../imports/USBC"

export default () => (
  <board width="30mm" height="36mm" routingDisabled>
    <chip
      name="U1"
      footprint="qfn32"
      doNotPlace
      pcbX={-10}
      pcbY={-12}
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

    <USBC name="USBC1" pcbRotation={90} pcbX={11} pcbY={0} />

    <resistor name="R1" resistance="10k" footprint="0402" doNotPlace pcbX={-4.1} pcbY={10.8} />
    <capacitor name="C1" capacitance="100nF" footprint="0402" doNotPlace pcbX={-0.7} pcbY={9.6} />
    <resistor name="R2" resistance="2.2k" footprint="0603" doNotPlace pcbX={2.8} pcbY={10.7} />
    <capacitor name="C2" capacitance="470nF" footprint="0603" doNotPlace pcbX={4.1} pcbY={5.9} />
    <resistor name="R3" resistance="33k" footprint="0805" doNotPlace pcbX={0.9} pcbY={4.3} />
    <capacitor name="C3" capacitance="1uF" footprint="0805" doNotPlace pcbX={-2.6} pcbY={2.0} />
    <resistor name="R4" resistance="150" footprint="0402" doNotPlace pcbX={3.2} pcbY={-1.3} />
    <capacitor name="C4" capacitance="47nF" footprint="0603" doNotPlace pcbX={-0.4} pcbY={-4.7} />
    <resistor name="R5" resistance="68k" footprint="0603" doNotPlace pcbX={3.8} pcbY={-7.4} />

    <pinheader name="J1" footprint="pinrow4" pinCount={4} doNotPlace pcbY={-12} />

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
