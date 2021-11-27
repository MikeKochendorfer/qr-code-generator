import { useState, ChangeEvent, useRef, FormEvent } from "react";
import QRCode from "qrcode.react";
import styles from '../styles/QRCardStyles.module.css'

export default function QRCard(): JSX.Element {
  const [inputs, setInputs] = useState({
    url: "",
    fgColor: "black",
    bgColor: "white",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  let qrCanvas = useRef(null);
  function handleSubmit(e: FormEvent): void {
    e.preventDefault();

    //@ts-ignore
    let canvas = qrCanvas.current.querySelector("canvas");
    let image = canvas.toDataURL("/image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = "custom-qr-code.png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  return (
    <div
      className={styles.card}
    >
      <h1>QR Code Generator</h1>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <label htmlFor="url">URL:</label>
        <input
          type="url"
          name="url"
          placeholder="Paste your link here"
          value={inputs.url}
          onChange={handleChange}
        />

        <label htmlFor="fgColor">Foreground Color (any valid CSS color):</label>
        <input
          name="fgColor"
          placeholder="Foreground color"
          value={inputs.fgColor}
          onChange={handleChange}
        />

        <label htmlFor="bgColor">Background Color (any valid CSS color):</label>
        <input
          name="bgColor"
          placeholder="Background color"
          value={inputs.bgColor}
          onChange={handleChange}
        />
        <button type="submit">Download QR Code</button>
      </form>
      <br />

      <div ref={qrCanvas} style={{ display: "grid", justifyContent: "center" }}>
        {
          <QRCode
            value={inputs.url}
            fgColor={inputs.fgColor}
            bgColor={inputs.bgColor}
            size={200}
          />
        }
      </div>
    </div>
  );
}
