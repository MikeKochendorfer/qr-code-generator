import { useState, ChangeEvent, useRef, FormEvent } from "react";
import QRCode from "qrcode.react";
import styles from "../styles/QRCardStyles.module.css";

export default function QRCard(): JSX.Element {
  const [inputs, setInputs] = useState({
    url: "https://",
    fgColor: "black",
    bgColor: "white",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const qrCanvas = useRef<HTMLDivElement>(null);
  function handleSubmit(e: FormEvent): void {
    e.preventDefault();

    let canvas = qrCanvas?.current?.querySelector("canvas");
    let image = canvas?.toDataURL("/image/png");
    let anchor = document.createElement("a");
    if (image) {
      anchor.href = image;
      anchor.download = "custom-qr-code.png";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else
      console.error(
        "Oops! There must be an image string in order to download."
      );
  }

  return (
    <div className={styles.card}>
      <form className={styles.form} onSubmit={handleSubmit}>
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

      <div className={styles.qrWrapper} ref={qrCanvas}>
        {
          <QRCode
            value={inputs.url}
            fgColor={inputs.fgColor}
            bgColor={inputs.bgColor}
            size={250}
          />
        }
      </div>
    </div>
  );
}
