import type { Personalization } from "@/stores/account/types";
import { defaultTabs } from "@/views/settings/SettingsTabs";

import colors from "@/utils/data/colors.json";


const defaultLocalTabs = [
  "Home",

] as typeof defaultTabs[number]["tab"][];

export default async function defaultPersonalization (): Promise<Partial<Personalization>> {
  return {
    color: colors[0],
    magicEnabled: true,
    profilePictureB64: undefined,

    tabs: defaultTabs.filter(current => defaultLocalTabs.includes(current.tab)).map((tab, index) => ({
      name: tab.tab,
      enabled: index <= 4
    })),
  };
}
