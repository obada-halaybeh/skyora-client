import { Plane } from "lucide-react";

export default function SkyoraWordmark({ size = 28 }) {
  return (
    <div
      className="skyora-wordmark inline-flex items-center gap-2"
      style={{ fontSize: size }}
    >
      <Plane size={size * 0.9} className="text-rausch" fill="currentColor" />
      <span>Skyora</span>
    </div>
  );
}
