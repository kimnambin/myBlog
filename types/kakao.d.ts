export {};

declare global {
  interface Window {
    Kakao: Kakao;
  }
}

interface Kakao {
  init: (key: string) => void;
  isInitialized: () => boolean;
  share: {
    sendDefault(arg0: {
      objectType: string;
      content: {
        title: string;
        description: string;
        imageUrl: string;
        link: { mobileWebUrl: string; webUrl: string };
      };
      buttons: { title: string; link: { mobileWebUrl: string; webUrl: string } }[];
    }): unknown;
    sendCustom: (options: { templateId: number; templateArgs?: Record<string, string> }) => void;
  };
}
