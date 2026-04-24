import { HDMI } from "../../imports/HDMI"

export default () => (
  <board width="36mm" height="42mm" routingDisabled>
    <HDMI
      name="HDMI1"
      pcbRotation={90}
      pcbX={11}
      pcbY={0}
    />

    <pinheader
      name="J1"
      pinCount={19}
      pitch="1.27mm"
      gender="unpopulated"
      holeDiameter="0.55mm"
      platedDiameter="0.95mm"
      doNotPlace
      showSilkscreenPinLabels
      pcbX={-12}
      pcbY={0}
      pcbRotation={-90}
      pinLabels={[
        "D2_POS",
        "D2_SHIELD",
        "D2_NEG",
        "D1_POS",
        "D1_SHIELD",
        "D1_NEG",
        "D0_POS",
        "D0_SHIELD",
        "D0_NEG",
        "CK_POS",
        "CK_SHIELD",
        "CK_NEG",
        "CEC",
        "HEC",
        "I2C_CLK",
        "I2C_DATA",
        "GND",
        "V5",
        "HOT_PLUG_DET",
      ]}
    />



    <trace from=".HDMI1 > .pin1" to=".J1 > .pin1" />
    <trace from=".HDMI1 > .pin2" to=".J1 > .pin2" />
    <trace from=".HDMI1 > .pin3" to=".J1 > .pin3" />
    <trace from=".HDMI1 > .pin4" to=".J1 > .pin4" />
    <trace from=".HDMI1 > .pin5" to=".J1 > .pin5" />
    <trace from=".HDMI1 > .pin6" to=".J1 > .pin6" />
    <trace from=".HDMI1 > .pin7" to=".J1 > .pin7" />
    <trace from=".HDMI1 > .pin8" to=".J1 > .pin8" />
    <trace from=".HDMI1 > .pin9" to=".J1 > .pin9" />
    <trace from=".HDMI1 > .pin10" to=".J1 > .pin10" />
    <trace from=".HDMI1 > .pin11" to=".J1 > .pin11" />
    <trace from=".HDMI1 > .pin12" to=".J1 > .pin12" />
    <trace from=".HDMI1 > .pin13" to=".J1 > .pin13" />
    <trace from=".HDMI1 > .pin14" to=".J1 > .pin14" />
    <trace from=".HDMI1 > .pin15" to=".J1 > .pin15" />
    <trace from=".HDMI1 > .pin16" to=".J1 > .pin16" />
    <trace from=".HDMI1 > .pin17" to=".J1 > .pin17" />
    <trace from=".HDMI1 > .pin18" to=".J1 > .pin18" />
    <trace from=".HDMI1 > .pin19" to=".J1 > .pin19" />
  </board>
)
