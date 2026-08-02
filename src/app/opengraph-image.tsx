import { ImageResponse } from "next/og";

export const alt = "AbdiMarket-P2P — Buy and sell locally across Ethiopia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(font: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    font
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);

  if (match) {
    const response = await fetch(match[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error(`Failed to load font: ${font} ${weight}`);
}

const CATEGORY_SWATCHES = [
  { label: "Electronics", price: "Br 18,500", color: "#e8a33d" },
  { label: "Vehicles", price: "Br 285,000", color: "#3f6b4f" },
  { label: "Clothing", price: "Br 4,200", color: "#b5432e" },
];

export default async function Image() {
  const headlineText = "AbdiMarket-P2P Buy & Sell Directly";
  const bodyText =
    "A modern P2P marketplace for everyday buying and selling. Electronics Vehicles Clothing Br 18,500 285,000 4,200";

  const [displayBold, displayMedium] = await Promise.all([
    loadGoogleFont("Bricolage Grotesque", 800, headlineText),
    loadGoogleFont("Bricolage Grotesque", 500, bodyText),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundImage:
            "linear-gradient(135deg, #2b1810 0%, #4a2e1d 55%, #6b4226 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: "rgba(232,163,61,0.18)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -80,
            width: 380,
            height: 380,
            borderRadius: 9999,
            background: "rgba(251,243,231,0.06)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontFamily: "BricolageBold", fontSize: 40, color: "#fbf3e7" }}>
            AbdiMarket
          </span>
          <span style={{ fontFamily: "BricolageBold", fontSize: 40, color: "#e8a33d" }}>
            -P2P
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
            <div
              style={{
                fontFamily: "BricolageBold",
                fontSize: 64,
                lineHeight: 1.1,
                color: "#fbf3e7",
              }}
            >
              Buy & Sell Directly
            </div>
            <div
              style={{
                marginTop: 20,
                fontFamily: "BricolageMedium",
                fontSize: 26,
                lineHeight: 1.4,
                color: "rgba(251,243,231,0.75)",
              }}
            >
              A modern P2P marketplace for everyday buying and selling.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {CATEGORY_SWATCHES.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  width: 340,
                  backgroundColor: "rgba(251,243,231,0.08)",
                  borderRadius: 20,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 64,
                    height: 64,
                    borderRadius: 14,
                    backgroundColor: item.color,
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "BricolageMedium", fontSize: 20, color: "#fbf3e7" }}>
                    {item.label}
                  </span>
                  <span style={{ fontFamily: "BricolageMedium", fontSize: 18, color: "#e8a33d" }}>
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: 2,
                backgroundColor: i % 2 === 0 ? "#e8a33d" : "#fbf3e7",
                opacity: i % 2 === 0 ? 1 : 0.25,
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "BricolageBold", data: displayBold, style: "normal", weight: 800 },
        { name: "BricolageMedium", data: displayMedium, style: "normal", weight: 500 },
      ],
    }
  );
}
