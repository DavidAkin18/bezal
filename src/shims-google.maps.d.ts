// src/shims-google.maps.d.ts
declare global {
    interface Window {
      google: typeof google;
    }
  }
  
  export {};
  