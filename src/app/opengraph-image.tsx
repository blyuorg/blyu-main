import { ImageResponse } from "next/og";

export const alt = "Blyu — We build what others can't imagine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "68px 76px",
        background: "#f8f8f6",
        color: "#111115",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", color: "#1215dc", fontSize: 42, fontWeight: 800, letterSpacing: -2 }}>
        BLYU
      </div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 87, lineHeight: 1.02, letterSpacing: -5 }}>
        <div>We build what</div>
        <div style={{ display: "flex", gap: 18 }}>others <span style={{ color: "#1215dc" }}>can&apos;t</span></div>
        <div>imagine.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 23 }}>
        <span>Strategy · Design · Engineering · Automation</span>
        <span style={{ color: "#1215dc", fontWeight: 700 }}>BLYU / DIGITAL STUDIO</span>
      </div>
    </div>,
    size,
  );
}
