import type { ComponentProps } from "react";
import { useMemo, useState } from "react";
import { View } from "react-native";

import {
  ControlFullMenuModal,
  type ControlFullMenuModalCopy,
} from "@/components/control/ControlFullMenuModal";
import {
  ControlPromoBuilderModal,
  type PromoBuilderModalCopy,
} from "@/components/control/ControlPromoBuilderModal";
import { ControlPromoTemplatesPanel } from "@/components/control/ControlPromoTemplatesPanel";
import {
  ControlQuickLaunchConfirmModal,
  type ControlQuickLaunchConfirmModalCopy,
} from "@/components/control/ControlQuickLaunchConfirmModal";
import { ControlQuickLaunchPanel } from "@/components/control/ControlQuickLaunchPanel";
import { ControlQuickMenuStatsPanel } from "@/components/control/ControlQuickMenuStatsPanel";
import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";
import {
  PhotoUploadModal,
  type PhotoUploadModalCopy,
} from "@/components/media/PhotoUploadModal";
import { controlStyles } from "@/constants/control.styles";

import { UICard } from "../ui/UICard";
import type { PromoTemplateDef } from "./ControlPromoTemplatesPanel";

type FullMenuConfig = {
  copy: ControlFullMenuModalCopy;
  venueBrand: string;
  categoriesCount: string;
  categoryLabels: Record<string, string>;
};

type ControlQuickMenuSectionProps = {
  isRtl: boolean;
  sectionTitle: string;
  sectionCaption: string;
  stats: {
    panelTitle: string;
    availableLabel: string;
    availableCount: string;
    snoozedLabel: string;
    snoozedCount: string;
    unavailableLabel: string;
    unavailableCount: string;
    editMenuLabel: string;
  };
  fullMenu: FullMenuConfig;
  photoModal: PhotoUploadModalCopy;
  quickLaunchConfirmCopy: ControlQuickLaunchConfirmModalCopy;
  viewersLabel: string;
  promoBuilderCopy: PromoBuilderModalCopy;
  quickLaunch: ComponentProps<typeof ControlQuickLaunchPanel>;
  promo: {
    panelTitle: string;
    featuredBadgeLabel: string;
    templates: PromoTemplateDef[];
    onCreate: (key: string) => void;
  };
};

export function ControlQuickMenuSection({
  isRtl,
  sectionTitle,
  sectionCaption,
  stats,
  fullMenu,
  photoModal,
  quickLaunchConfirmCopy,
  viewersLabel,
  promoBuilderCopy,
  quickLaunch,
  promo,
}: ControlQuickMenuSectionProps) {
  const [fullMenuOpen, setFullMenuOpen] = useState(false);
  const [qlPhotoOpen, setQlPhotoOpen] = useState(false);
  const [qlLaunchOpen, setQlLaunchOpen] = useState(false);
  const [promoBuilderKey, setPromoBuilderKey] = useState<string | null>(null);

  const quickLaunchCategoryLabel = useMemo(() => {
    const opt = quickLaunch.categoryOptions.find((o) => o.value === quickLaunch.categoryValue);
    return opt?.label ?? quickLaunch.categoryValue;
  }, [quickLaunch.categoryOptions, quickLaunch.categoryValue]);

  return (
    <View>
      <ControlSectionHeader
        title={sectionTitle}
        caption={sectionCaption}
        isRtl={isRtl}
        tightTop
      />
      <View style={controlStyles.g2}>
        <UICard>
          <ControlQuickMenuStatsPanel
            {...stats}
            onEditFullMenu={() => {
              setFullMenuOpen(true);
            }}
          />
        </UICard>
        <UICard>
          <ControlQuickLaunchPanel
            {...quickLaunch}
            onPickPhoto={() => {
              setQlPhotoOpen(true);
            }}
            onLaunch={() => {
              setQlLaunchOpen(true);
            }}
          />
        </UICard>
      </View>
      <UICard style={[controlStyles.g2Full, { marginVertical: 16 }]}>
        <ControlPromoTemplatesPanel
          {...promo}
          onCreate={(key) => {
            setPromoBuilderKey(key);
          }}
        />
      </UICard>

      <ControlFullMenuModal
        visible={fullMenuOpen}
        onClose={() => {
          setFullMenuOpen(false);
        }}
        copy={fullMenu.copy}
        venueBrand={fullMenu.venueBrand}
        liveCount={stats.availableCount}
        snoozedCount={stats.snoozedCount}
        categoriesCount={fullMenu.categoriesCount}
        categoryLabels={fullMenu.categoryLabels}
        isRtl={isRtl}
      />

      <PhotoUploadModal
        visible={qlPhotoOpen}
        variant="quickLaunch"
        copy={photoModal}
        onClose={() => {
          setQlPhotoOpen(false);
        }}
        onUsePhoto={(result) => {
          quickLaunch.onPhotoUse?.(result);
        }}
        isRtl={isRtl}
      />

      <ControlPromoBuilderModal
        visible={promoBuilderKey !== null}
        promoKey={promoBuilderKey}
        templates={promo.templates}
        copy={promoBuilderCopy}
        isRtl={isRtl}
        onClose={() => {
          setPromoBuilderKey(null);
        }}
        onConfirm={(key) => {
          promo.onCreate(key);
          setPromoBuilderKey(null);
        }}
      />

      <ControlQuickLaunchConfirmModal
        visible={qlLaunchOpen}
        onClose={() => {
          setQlLaunchOpen(false);
        }}
        onConfirm={() => {
          quickLaunch.onLaunch();
          setQlLaunchOpen(false);
        }}
        copy={quickLaunchConfirmCopy}
        itemName={quickLaunch.itemName}
        categoryLabel={quickLaunchCategoryLabel}
        price={quickLaunch.price}
        viewersLabel={viewersLabel}
        isRtl={isRtl}
      />
    </View>
  );
}
