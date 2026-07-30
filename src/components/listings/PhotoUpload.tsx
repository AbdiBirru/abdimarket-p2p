"use client";

import { useState, useRef } from "react";
import { upload } from "@vercel/blob/client";
import { X, ImagePlus, Loader2 } from "lucide-react";

const MAX_PHOTOS = 6;

type UploadedPhoto = { url: string; uploading: boolean; error?: string };

export default function PhotoUpload() {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    const remaining = MAX_PHOTOS - photos.length;
    const selected = Array.from(files).slice(0, remaining);

    for (const file of selected) {
      const placeholder: UploadedPhoto = { url: "", uploading: true };
      setPhotos((prev) => [...prev, placeholder]);

      try {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
        setPhotos((prev) =>
          prev.map((p) => (p === placeholder ? { url: blob.url, uploading: false } : p))
        );
      } catch {
        setPhotos((prev) =>
          prev.map((p) =>
            p === placeholder ? { url: "", uploading: false, error: "Upload failed" } : p
          )
        );
      }
    }
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <p className="mb-2 block text-sm font-medium text-coffee-950">
        Photos ({photos.filter((p) => p.url).length}/{MAX_PHOTOS})
      </p>

      <div className="grid grid-cols-3 gap-2">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-xl border border-coffee-950/10 bg-coffee-950/5"
          >
            {photo.uploading && (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-coffee-950/40" />
              </div>
            )}
            {photo.error && (
              <div className="flex h-full items-center justify-center px-2 text-center text-xs text-brick-600">
                {photo.error}
              </div>
            )}
            {photo.url && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt="" className="h-full w-full object-cover" />
                <input type="hidden" name="photos" value={photo.url} />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute right-1 top-1 rounded-full bg-coffee-950/70 p-1 text-cream-50"
                  aria-label="Remove photo"
                >
                  <X className="h-3 w-3" />
                </button>
              </>
            )}
          </div>
        ))}

        {photos.length < MAX_PHOTOS && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-coffee-950/20 text-coffee-950/50 hover:border-marigold-500 hover:text-marigold-600"
          >
            <ImagePlus className="h-6 w-6" />
            <span className="text-xs">Add</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
