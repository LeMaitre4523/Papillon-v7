import React, { useEffect, useState } from "react";
import type { RouteParameters, Screen } from "@/router/helpers/types";
import { Platform, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

import * as Clipboard from "expo-clipboard";

import Reanimated, { LinearTransition, ZoomIn, ZoomOut } from "react-native-reanimated";

import MaskStars from "@/components/FirstInstallation/MaskStars";
import PapillonShineBubble from "@/components/FirstInstallation/PapillonShineBubble";
import ButtonCta from "@/components/FirstInstallation/ButtonCta";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Check, Link2, TriangleAlert, X } from "lucide-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { createSession } from 'node_modules/netypareo-api';

const NetYPareoManualURL: Screen<"NetYPareoManualURL"> = ({ route, navigation }) => {
  const theme = useTheme();
  const {colors} = theme;
  const insets = useSafeAreaInsets();
  const [instanceURL, setInstanceURL] = useState("");

  // find url in route params
  useEffect(() => {
    if (route.params?.url) {
      setInstanceURL(route.params?.url);
    }
  }, [route.params]);

  const [clipboardFound, setClipboardFound] = useState(false);
  const [clipboardHasBeenFound, setClipboardHasBeenFound] = useState(false);

  // get url from clipboard if ios
  useEffect(() => {
    if (Platform.OS === "ios" && instanceURL === "" && !route.params?.url) {
      Clipboard.getStringAsync().then((clipboardContent) => {
        if (clipboardContent && clipboardContent.startsWith("https://") && clipboardContent.includes("netypareo")) {
          setInstanceURL(clipboardContent);
          setClipboardFound(true);
          setClipboardHasBeenFound(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    setClipboardFound(false);
  }, [instanceURL]);

  const checkNetYPareoInstance = async <ScreenName extends keyof RouteParameters>(
    instanceURL: string,
    navigation: NativeStackNavigationProp<RouteParameters, ScreenName>,
  ): Promise<void> => {

    try {
      let session = await createSession(instanceURL, "1920", "1080"); 
      console.log(session)
      navigation.navigate("NetYPareoCredentials", {
        instanceURL: instanceURL,
        session: session,
      });
    } catch(err) {
      console.log(err)
    }

    
  };



  return (
    <View style={[
      styles.container,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 0,
      }
    ]}>
      <MaskStars />

      <View style={{height: 44 + 20}} />

      <PapillonShineBubble
        message={
          !clipboardFound ?
            "Indique moi l'adresse URL NetYPareo de ton établissement"
            : "J'ai trouvé cette adresse dans ton presse-papier !"
        }
        numberOfLines={2}
        width={250}
        noFlex
      />

      <View style={{
        width: "100%",
      }}>
        <Reanimated.View
          style={[
            styles.searchContainer,
            {
              backgroundColor: colors.text + "15",
              // @ts-expect-error
              color: colors.text,
              borderColor: colors.border,
            }
          ]}
        >
          <Link2 size={24} color={colors.text + "55"} />

          <TextInput
            keyboardType="url"
            autoCapitalize="none"
            placeholder="URL de l'instance NetYPareo"

            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholderTextColor={theme.colors.text + "50"}

            value={instanceURL}
            onChangeText={setInstanceURL}
          />

          {instanceURL.length > 0 && (
            <Reanimated.View
              layout={LinearTransition}
              entering={ZoomIn.springify()}
              exiting={ZoomOut.springify()}
            >
              <TouchableOpacity onPress={() => {
                setInstanceURL("");
              }}>
                <X size={24} color={colors.text + "55"} />
              </TouchableOpacity>
            </Reanimated.View>
          )}
        </Reanimated.View>
      </View>

      <View style={{flex: 1}} />

      <View
        style={styles.buttons}
      >
        <ButtonCta
          value="Confirmer"
          primary
          onPress={() => checkNetYPareoInstance(instanceURL, navigation)}
        />
        {(route.params?.method) && (
          <ButtonCta
            value="Quitter"
            onPress={() => navigation.navigate("AccountSelector")}
          />)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
  },

  buttons: {
    width: "100%",
    paddingHorizontal: 16,
    gap: 9,
    marginBottom: 16,
  },

  searchContainer: {
    marginHorizontal: 16,
    marginTop: 10,

    flexDirection: "row",

    paddingHorizontal: 16,
    paddingVertical: 12,

    borderRadius: 300,
    gap: 12,
  },

  searchInput: {
    flex: 1,
    fontSize: 17,
    fontFamily: "medium",
  }
});

export default NetYPareoManualURL;
