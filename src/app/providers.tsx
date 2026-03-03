"use client";

export default function Providers({ children }: { children: React.ReactNode }) {
  
  // Wrap children in provicers if needed...
  return (
    <>
      {children}
    </>
  );
}