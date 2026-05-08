import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt =
  "Центр Плоскирів — стоматологія у Хмельницькому: лікування, імплантація, брекети";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logoPath = join(process.cwd(), "public", "logo", "logo.png");
  const logoBytes = readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #FAF7F2 0%, #F0E8D9 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt=""
            width={120}
            height={120}
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 800,
              color: "#1F1A14",
              letterSpacing: "-1.5px",
            }}
          >
            <span>Плоски</span>
            <span style={{ color: "#E07B39" }}>рів</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 22px",
              borderRadius: 999,
              background: "#E07B39",
              color: "white",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
            }}
          >
            Хмельницький · Стоматологія
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#1F1A14",
              letterSpacing: "-2.5px",
              maxWidth: 1040,
            }}
          >
            <span>Ваша&nbsp;</span>
            <span style={{ color: "#E07B39" }}>здорова&nbsp;</span>
            <span>посмішка — наша турбота</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#5F574B",
            fontWeight: 500,
          }}
        >
          <span>вул. Бажана, 19 · Хмельницький</span>
          <span style={{ color: "#1F1A14", fontWeight: 700 }}>+38 068 38 00 052</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
