import localFont from 'next/font/local';

const  EdgeCutting = localFont({
    src: [{ path: '../assets/fonts/edgecutting/EdgecuttingLiteSharp.woff2'}],
    variable: '--font-edgecutting'
});


const CreatoDisplay = localFont({
    src: [
      {
        path: "../assets/fonts/creato-display/CreatoDisplay-Light.woff2",
        weight: "200",
        style: "normal",
      },
      {
        path: "../assets/fonts/creato-display/CreatoDisplay-Medium.woff2",
        weight: "400",
        style: "normal",
      },
      {
        path: "../assets/fonts/creato-display/CreatoDisplay-Regular.woff2",
        weight: "500",
        style: "normal",
      },
    ],
    variable: "--font-creato-display",
  });
  
  export { EdgeCutting, CreatoDisplay };
