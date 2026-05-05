import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Центр Плоскирів — стоматологія у Хмельницькому";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #FBF1E8 0%, #F5D9BF 60%, #C97B3F 100%)",
          color: "#1F2937",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 96,
              height: 96,
              background: "#C97B3F",
              color: "#FFFFFF",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            ЦП
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: "0.04em" }}>
              ЦЕНТР ПЛОСКИРІВ
            </div>
            <div style={{ fontSize: 22, color: "#6B7280" }}>стоматологія</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, maxWidth: 980 }}>
            Стоматологія у Хмельницькому
          </div>
          <div style={{ fontSize: 30, color: "#1F2937", maxWidth: 880, lineHeight: 1.3 }}>
            Лікування, імплантація, брекети, відбілювання, дитяча стоматологія
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 22, color: "#1F2937" }}>вул. Бажана, 19 · Хмельницький</div>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#A85F2C" }}>
            +38 068 38 00 052
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
