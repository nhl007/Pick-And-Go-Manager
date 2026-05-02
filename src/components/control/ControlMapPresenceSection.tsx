import { View } from "react-native";

import { ControlMapBannerPanel } from "@/components/control/ControlMapBannerPanel";
import { ControlMapPersonaPanel } from "@/components/control/ControlMapPersonaPanel";
import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";
import {
  ControlStorefrontVisibilityPanel,
  StorefrontViz,
} from "@/components/control/ControlStorefrontVisibilityPanel";
import { controlStyles } from "@/constants/control.styles";

import { UICard } from "../ui/UICard";

type ControlMapPresenceSectionProps = {
  isRtl: boolean;
  sectionTitle: string;
  sectionCaption: string;
  viz: StorefrontViz;
  onVizChange: (v: StorefrontViz) => void;
  storefrontTitle: string;
  vizItems: {
    key: StorefrontViz;
    ledColor: string;
    name: string;
    desc: string;
  }[];
  vizFooter: string;
  banner: {
    panelTitle: string;
    dropLabel: string;
    dropSub: string;
    placeholder: string;
    previewLabel: string;
    snoozeLabel: string;
    publishLabel: string;
    message: string;
    onMessageChange: (t: string) => void;
    onSnooze: () => void;
    onPublish: () => void;
    onPreview: () => void;
    onPickPhoto: () => void;
  };
  persona: {
    panelTitle: string;
    personaName: string;
    personaSub: string;
    dropLabel: string;
    dropSub: string;
    footer: string;
    onPickPhoto: () => void;
  };
};

export function ControlMapPresenceSection({
  isRtl,
  sectionTitle,
  sectionCaption,
  viz,
  onVizChange,
  storefrontTitle,
  vizItems,
  vizFooter,
  banner,
  persona,
}: ControlMapPresenceSectionProps) {
  return (
    <View>
      <ControlSectionHeader title={sectionTitle} caption={sectionCaption} isRtl={isRtl} />
      <View style={controlStyles.g3}>
        <UICard style={controlStyles.g3Item}>
          <ControlStorefrontVisibilityPanel
            value={viz}
            onChange={onVizChange}
            panelTitle={storefrontTitle}
            items={vizItems}
            footer={vizFooter}
          />
        </UICard>
        <UICard style={controlStyles.g3Item}>
          <ControlMapBannerPanel {...banner} />
        </UICard>
        <UICard style={controlStyles.g3Item}>
          <ControlMapPersonaPanel {...persona} />
        </UICard>
      </View>
    </View>
  );
}
