"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { DEFAULT_VIDEO_ID } from "@/constants";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading]: [boolean, (isLoading: boolean) => void] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      router.push(`/video/${DEFAULT_VIDEO_ID}`); // Playing default 1st video
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <section className="w-full h-screen">
      {isLoading
        ? <Loader message="Setting up your watch" />
        : <></>
      }
    </section>
  );
}
