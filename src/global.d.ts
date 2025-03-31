export {};
declare global {
  interface Window {
    env: {
      REACT_APP_BASE_URL: string;
      // Add other variables here as needed
    };
  }
}
