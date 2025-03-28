import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

const DrawableImportRestaurant = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={148}
    height={118}
    fill="none"
    {...props}
  >
    <Rect
      width={70}
      height={52}
      x={71.704}
      y={64.927}
      stroke={props.color || "#000"}
      strokeWidth={4}
      rx={10}
      transform="rotate(-4.826 71.704 64.927)"
    />
    <Path
      fill={props.color || "#000"}
      d="m74.494 92.658 69.752-5.89 1.178 13.95-69.752 5.89zM132.952 76.327l-7.024 5.794c-1.244 1.027-3.13.233-3.265-1.375l-.873-10.329c-.135-1.607 1.59-2.706 2.989-1.902l7.896 4.534a2 2 0 0 1 .277 3.278"
    />
    <Path
      stroke={props.color || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M102.464 48.49s4.435-15.648-12-20c-16.435-4.35-27.5 18.593-16 22S93.793 10.128 72.83 7.628c-20.962-2.5-28.537 26.5-28.537 26.5m0 0-5.5-13.5m5.5 13.5 13.5-8"
    />
    <Path
      stroke={props.color || "#000"}
      strokeWidth={4}
      d="M38.283 67.784c-1.074 2.712-9.085 6.73-18.463 6.057-9.976-.718-17.83-4.817-17.544-9.156.224-3.393 5.36-5.928 12.36-6.529m23.647 9.628.12-.501m-.12.501c-2.268 9.696-2.13 19.306.56 19.99 2.736.695 6.893-6.737 9.285-16.6 2.392-9.862 2.113-18.42-.622-19.117-2.676-.68-6.535 5.096-8.941 14.572m-.282 1.155q.103-.26.12-.501m-23.767-9.127a32.5 32.5 0 0 0 4.028 4.79c7.212 7.069 16.775 7.464 19.738 4.337m-23.766-9.127C10.5 52.139 9.25 45.834 11.576 43.38c2.964-3.127 11.212.068 18.424 7.137 6.497 6.368 8.789 13.586 8.565 16.112m-23.93-8.473a40 40 0 0 1 6.223-.029c9.976.718 17.83 4.817 17.544 9.156m0 0q.08-.33.163-.654m-.163.654q.126-.237.163-.654"
    />
  </Svg>
);

export default DrawableImportRestaurant;