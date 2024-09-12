import React, { useState } from "react";
import type { Screen } from "@/router/helpers/types";
import { StyleSheet } from "react-native";

import uuid from "@/utils/uuid-v4";

import { useAccounts, useCurrentAccount } from "@/stores/account";
import { Account, AccountService } from "@/stores/account/types";

import defaultPersonalization from "@/services/netypareo/default-personalization";
import LoginView from "@/components/Templates/LoginView";

import { loginCredentials } from 'node_modules/netypareo-api';


const NetYPareoCredentials: Screen<"NetYPareoCredentials"> = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createStoredAccount = useAccounts(store => store.create);
  const switchTo = useCurrentAccount(store => store.switchTo);

  const handleLogin = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const accountID = uuid();      

      let session = route.params.session
      let name = await loginCredentials(session, username, password);

      const account: Account = {
        instance: undefined,

        localID: accountID,
        service: AccountService.NetYPareo,

        isExternal: false,
        linkedExternalLocalIDs: [],

        name,
        className: "Inconnu",
        schoolName: "Inconnu",
        studentName: {
          first: name.split(" ")[0],
          last: name.split(" ")[1]
        },

        authentication: { username, password, token: session.token ? session.token : [] },
        personalization: await defaultPersonalization()
      };

      createStoredAccount(account);
      setLoading(false);
      switchTo(account);

      // We need to wait a tick to make sure the account is set before navigating.
      queueMicrotask(() => {
        // Reset the navigation stack to the "Home" screen.
        // Prevents the user from going back to the login screen.
        navigation.reset({
          index: 0,
          routes: [{ name: "AccountCreated" }],
        });
      });
    }
    catch (error) {
      setLoading(false);

      if (error instanceof Error) {
        setError(error.message);
      }
      else {
        setError("Erreur inconnue");
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <LoginView
      serviceIcon={require("@/../assets/images/service_netypareo.png")}
      serviceName="NetYPareo"
      onLogin={(username, password) => handleLogin(username, password)}
      loading={loading}
      error={error}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },

  serviceContainer: {
    alignItems: "center",
    marginBottom: 20,
    gap: 4,
  },

  serviceLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderCurve: "continuous",
    marginBottom: 10,
  },

  serviceName: {
    fontSize: 15,
    fontFamily: "medium",
    opacity: 0.6,
    textAlign: "center",
  },

  serviceSchool: {
    fontSize: 18,
    fontFamily: "semibold",
    textAlign: "center",
  },

  textInputContainer: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderCurve: "continuous",
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  textInput: {
    fontFamily: "medium",
    fontSize: 16,
    flex: 1,
  },
});

export default NetYPareoCredentials;
