import Image from "next/legacy/image";
import { useState } from "react";

export interface StaticImageData {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
    blurWidth?: number;
    blurHeight?: number;
}
interface StaticRequire {
  default: StaticImageData;
}
declare type StaticImport = StaticRequire | StaticImageData;
declare type SafeNumber = number | `${number}`;

export type ImageType = {
    src?: string | StaticImport;
    className?: string;
    alt: string;
    width?: SafeNumber | undefined;
    height?: SafeNumber | undefined;
    placeholderImage?: string | StaticImport;
    sizes?: string;
    layout?: "fill" | "fixed" | "intrinsic" | "responsive" | undefined;
    objectFit?: 'cover' | undefined;
} & React.RefAttributes<HTMLImageElement | null>;

const CustomImage = ({
    src,
    alt,
    placeholderImage,
    ...props
}: ImageType) => {
  const [image, setImage] = useState<string | StaticImport>((src && src) || "");

  return (
        <Image
            {...props}
            alt={alt}
            src={image}
            onError={() => {
                if (placeholderImage) {
                    setImage(placeholderImage);
                }
            }}
        />
    );
};

export default CustomImage;
