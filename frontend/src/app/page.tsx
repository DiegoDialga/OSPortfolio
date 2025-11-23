"use client";
import {useScreenSize} from "@/context/ScreenSizeContext.jsx";
import SplashScreen from "../../src/components/SplashScreen";

export default function Home() {
  const {isMobile} = useScreenSize();

  return (
    <>
      {isMobile ? (
        <p style={{ textAlign: "center", padding: "20px" }}>
          Not viewable on mobile
        </p>
      ) : (
        <SplashScreen />
      )}
    </>
  );
}
