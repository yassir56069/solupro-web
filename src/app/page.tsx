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
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
