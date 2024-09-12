import createScreen from "@/router/helpers/create-screen";

import NetYPareoManualURL from "@/views/login/netypareo/NetYPareoManualURL";
import NetYPareoCredentials from "@/views/login/netypareo/NetYPareoCredentials";

export default [
  createScreen("NetYPareoManualURL", NetYPareoManualURL, {
    headerTitle: "",
    headerTransparent: true,
    headerBackVisible: true
  }),
  createScreen("NetYPareoCredentials", NetYPareoCredentials, {
    headerTitle: "Connexion à NetYPareo",
    headerBackVisible: true
  }),
] as const;
