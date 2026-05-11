import { useMemo, useState } from "react";
import { View } from "react-native";

import {
  ControlBannerPublishModal,
  type ControlBannerPublishModalCopy,
} from "@/components/control/ControlBannerPublishModal";
import {
  ControlBannerSnoozeModal,
  type ControlBannerSnoozeModalCopy,
} from "@/components/control/ControlBannerSnoozeModal";
import { ControlMapBannerPanel } from "@/components/control/ControlMapBannerPanel";
import { ControlMapPersonaPanel } from "@/components/control/ControlMapPersonaPanel";
import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";
import {
  ControlStorefrontVisibilityPanel,
  StorefrontViz,
} from "@/components/control/ControlStorefrontVisibilityPanel";
import { ControlStorefrontVizConfirmModal } from "@/components/control/ControlStorefrontVizConfirmModal";
import {
  PhotoUploadModal,
  type PhotoUploadModalCopy,
  type PhotoUploadResult,
} from "@/components/media/PhotoUploadModal";
import { controlStyles } from "@/constants/control.styles";
import { COLORS } from "@/constants/styles";

import { UICard } from "../ui/UICard";

type ControlMapPresenceSectionProps = {
  isRtl: boolean;
  locale: string;
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
  vizImpactViewersLabel: string;
  vizImpactLivePromos: number;
  photoModal: PhotoUploadModalCopy;
  bannerPublishModal: ControlBannerPublishModalCopy;
  bannerSnoozeModal: ControlBannerSnoozeModalCopy;
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
    onPhotoUse?: (result: PhotoUploadResult) => void;
  };
  persona: {
    panelTitle: string;
    personaName: string;
    personaSub: string;
    dropLabel: string;
    dropSub: string;
    footer: string;
    onPickPhoto: () => void;
    onPhotoUse?: (result: PhotoUploadResult) => void;
  };
};

export function ControlMapPresenceSection({
  isRtl,
  locale,
  sectionTitle,
  sectionCaption,
  viz,
  onVizChange,
  storefrontTitle,
  vizItems,
  vizFooter,
  vizImpactViewersLabel,
  vizImpactLivePromos,
  photoModal,
  bannerPublishModal,
  bannerSnoozeModal,
  banner,
  persona,
}: ControlMapPresenceSectionProps) {
  const [pendingViz, setPendingViz] = useState<StorefrontViz | null>(null);
  const [photoTarget, setPhotoTarget] = useState<"banner" | "persona" | null>(null);
  const [bannerPublishOpen, setBannerPublishOpen] = useState(false);
  const [bannerSnoozeOpen, setBannerSnoozeOpen] = useState(false);

  const pendingDef = useMemo(() => {
    if (!pendingViz) return undefined;
    return vizItems.find((i) => i.key === pendingViz);
  }, [pendingViz, vizItems]);

  return (
    <View>
      <ControlSectionHeader title={sectionTitle} caption={sectionCaption} isRtl={isRtl} />
      <View style={controlStyles.g3}>
        <UICard style={controlStyles.g3Item}>
          <ControlStorefrontVisibilityPanel
            value={viz}
            onChange={onVizChange}
            onChangeRequest={(next) => {
              setPendingViz(next);
            }}
            panelTitle={storefrontTitle}
            items={vizItems}
            footer={vizFooter}
          />
        </UICard>
        <UICard style={controlStyles.g3Item}>
          <ControlMapBannerPanel
            {...banner}
            onPickPhoto={() => {
              setPhotoTarget("banner");
            }}
            onPublish={() => {
              setBannerPublishOpen(true);
            }}
            onSnooze={() => {
              setBannerSnoozeOpen(true);
            }}
          />
        </UICard>
        <UICard style={controlStyles.g3Item}>
          <ControlMapPersonaPanel
            {...persona}
            onPickPhoto={() => {
              setPhotoTarget("persona");
            }}
          />
        </UICard>
      </View>

      <ControlBannerPublishModal
        visible={bannerPublishOpen}
        onClose={() => {
          setBannerPublishOpen(false);
        }}
        onConfirm={() => {
          banner.onPublish();
          setBannerPublishOpen(false);
        }}
        bannerQuote={banner.message}
        viewersLabel={vizImpactViewersLabel}
        copy={bannerPublishModal}
        isRtl={isRtl}
      />

      <ControlBannerSnoozeModal
        visible={bannerSnoozeOpen}
        onClose={() => {
          setBannerSnoozeOpen(false);
        }}
        onConfirm={() => {
          banner.onSnooze();
          setBannerSnoozeOpen(false);
        }}
        copy={bannerSnoozeModal}
        locale={locale}
        isRtl={isRtl}
      />

      <PhotoUploadModal
        visible={photoTarget !== null}
        variant={photoTarget === "persona" ? "persona" : "banner"}
        copy={photoModal}
        onClose={() => {
          setPhotoTarget(null);
        }}
        onUsePhoto={(result) => {
          if (photoTarget === "banner") {
            banner.onPhotoUse?.(result);
          } else if (photoTarget === "persona") {
            persona.onPhotoUse?.(result);
          }
        }}
        isRtl={isRtl}
      />

      <ControlStorefrontVizConfirmModal
        visible={pendingViz != null}
        onClose={() => {
          setPendingViz(null);
        }}
        onConfirm={() => {
          if (pendingViz != null) {
            onVizChange(pendingViz);
          }
          setPendingViz(null);
        }}
        ledColor={pendingDef?.ledColor ?? vizItems[0]?.ledColor ?? COLORS.secondary}
        targetDesc={pendingDef?.desc ?? "—"}
        impactViewersLabel={vizImpactViewersLabel}
        livePromosCount={vizImpactLivePromos}
        isRtl={isRtl}
      />
    </View>
  );
}
