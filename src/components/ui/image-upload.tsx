"use client";

import { useState, useEffect } from "react";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

function ImageUpload({ disabled, onChange, onRemove, value }: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {/* <div className="flex h-64 w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-100"> */}
      <div className="mb-4 flex items-center gap-4">
        {value.map((image) => (
          <div key={image} className="relative h-[200px] w-[200px] overflow-hidden rounded-md">
            <div className="absolute right-2 top-2 z-10">
              <Button
                size="icon"
                type="button"
                variant="destructive"
                onClick={() => onRemove(image)}
              >
                <Trash className="h-6 w-6 text-white" />
              </Button>
            </div>
            <Image fill alt="Image" className="h-64 w-full rounded-md object-cover" src={image} />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="esfalkx9" onUpload={onUpload}>
        {({ open }) => {
          const onClick = () => {
            if (disabled) {
              return;
            }

            open();
          };

          return (
            <Button
              disabled={disabled}
              size="sm"
              type="button"
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

export default ImageUpload;
