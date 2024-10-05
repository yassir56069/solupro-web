import Link from "next/link";

const urls = [
  "https://utfs.io/f/wkZXy01VKbheXBuScdtRbo2xJUel05aLcmVtT8dM3PXfSjCW",
  "https://utfs.io/f/wkZXy01VKbheF907wL41N5WxYy3ZcJLnlmviMaVBw0tHXTUI",
];

const images = urls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main >
    </main>
  );
}
