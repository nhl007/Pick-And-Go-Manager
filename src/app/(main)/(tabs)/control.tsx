import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useMemo, useState } from "react";
import { I18nManager, ScrollView, Text, useWindowDimensions, View } from "react-native";

import { ControlFlashPromotionsSection } from "@/components/control/ControlFlashPromotionsSection";
import type { PromoTrackerRowData } from "@/components/control/ControlLivePromoTracker";
import { ControlMapPresenceSection } from "@/components/control/ControlMapPresenceSection";
import type { PromoTemplateDef } from "@/components/control/ControlPromoTemplatesPanel";
import { ControlQuickMenuSection } from "@/components/control/ControlQuickMenuSection";
import { ControlSmartFeaturesSection } from "@/components/control/ControlSmartFeaturesSection";
import { ControlStatusStrip } from "@/components/control/ControlStatusStrip";
import type { StorefrontViz } from "@/components/control/ControlStorefrontVisibilityPanel";
import Hero from "@/components/Hero";
import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { COLORS, SPACING } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";

const CATEGORY_KEYS = [
  "grill",
  "mezze",
  "seafood",
  "pasta",
  "desserts",
  "dailySpecial",
] as const;

function storefrontTitleForViz(viz: StorefrontViz, t: (k: string) => string) {
  switch (viz) {
    case "online":
      return t("control.vizOnline");
    case "invisible":
      return t("control.vizInvisible");
    case "closed":
      return t("control.vizClosed");
  }
}

export default function LiveControlHubScreen() {
  const { t, i18n } = useAppTranslation();
  const { width } = useWindowDimensions();
  const isRtl = useMemo(
    () => i18n.language === "ar" || I18nManager.isRTL,
    [i18n.language],
  );

  const horizontalPad = Math.min(30, Math.max(SPACING.md, width * 0.02));

  const [viz, setViz] = useState<StorefrontViz>("online");
  const [bannerMessage, setBannerMessage] = useState(() =>
    t("control.bannerPlaceholder"),
  );
  const [category, setCategory] = useState<string>("grill");
  const [itemName, setItemName] = useState(() => t("control.qlItemValueName"));
  const [description, setDescription] = useState(() => t("control.qlItemValueDesc"));
  const [sideItems, setSideItems] = useState("");
  const [price, setPrice] = useState(() => t("control.qlPriceValue"));
  const [crowdBusy, setCrowdBusy] = useState(false);
  const [autoWeatherMenu, setAutoWeatherMenu] = useState(true);
  const [trackerKeys, setTrackerKeys] = useState<string[]>(["r1", "r2", "r3"]);

  const categoryOptions = useMemo(
    () =>
      CATEGORY_KEYS.map((key) => ({
        value: key,
        label: t(`control.categories.${key}`),
      })),
    [t],
  );

  const vizItems = useMemo(
    () => [
      {
        key: "online" as const,
        ledColor: COLORS.secondary,
        name: t("control.vizOnline"),
        desc: t("control.vizOnlineDesc"),
      },
      {
        key: "invisible" as const,
        ledColor: COLORS.neonYellow,
        name: t("control.vizInvisible"),
        desc: t("control.vizInvisibleDesc"),
      },
      {
        key: "closed" as const,
        ledColor: COLORS.neonRed,
        name: t("control.vizClosed"),
        desc: t("control.vizClosedDesc"),
      },
    ],
    [t],
  );

  const promoTemplates = useMemo<PromoTemplateDef[]>(
    () => [
      {
        key: "bogo",
        icon: "gift-outline",
        tag: t("control.promoBogoTag"),
        title: t("control.promoBogoTitle"),
        desc: t("control.promoBogoDesc"),
        statLine1: t("control.promoBogoStat1"),
        statLine1Bold: t("control.promoBogoStat1Hi"),
        statLine2: t("control.promoBogoStat2"),
        createLabel: t("control.promoCreate"),
      },
      {
        key: "happyhour",
        icon: "time-outline",
        tag: t("control.promoHappyTag"),
        title: t("control.promoHappyTitle"),
        desc: t("control.promoHappyDesc"),
        statLine1: t("control.promoHappyStat1"),
        statLine1Bold: t("control.promoHappyStat1Hi"),
        statLine2: t("control.promoHappyStat2"),
        createLabel: t("control.promoCreate"),
        featured: true,
      },
      {
        key: "freebie",
        icon: "basket-outline",
        tag: t("control.promoFreebieTag"),
        title: t("control.promoFreebieTitle"),
        desc: t("control.promoFreebieDesc"),
        statLine1: t("control.promoFreebieStat1"),
        statLine1Bold: t("control.promoFreebieStat1Hi"),
        statLine2: t("control.promoFreebieStat2"),
        createLabel: t("control.promoCreate"),
      },
      {
        key: "flashprice",
        icon: "pricetag-outline",
        tag: t("control.promoFlashTag"),
        title: t("control.promoFlashTitle"),
        desc: t("control.promoFlashDesc"),
        statLine1: t("control.promoFlashStat1"),
        statLine1Bold: t("control.promoFlashStat1Hi"),
        statLine2: t("control.promoFlashStat2"),
        createLabel: t("control.promoCreate"),
      },
    ],
    [t],
  );

  const trackerRowsAll = useMemo<PromoTrackerRowData[]>(
    () => [
      {
        key: "r1",
        dotColor: COLORS.neonOrange,
        title: t("control.ptRow1Title"),
        sub: t("control.ptRow1Sub"),
        reach: t("control.ptRow1Reach"),
        views: t("control.ptRow1Views"),
        orders: t("control.ptRow1Orders"),
        ordersPulse: true,
        cvr: t("control.ptRow1Cvr"),
        timeLeft: t("control.ptRow1Time"),
      },
      {
        key: "r2",
        dotColor: COLORS.neonYellow,
        title: t("control.ptRow2Title"),
        sub: t("control.ptRow2Sub"),
        reach: t("control.ptRow2Reach"),
        views: t("control.ptRow2Views"),
        orders: t("control.ptRow2Orders"),
        cvr: t("control.ptRow2Cvr"),
        timeLeft: t("control.ptRow2Time"),
      },
      {
        key: "r3",
        dotColor: COLORS.neonRed,
        title: t("control.ptRow3Title"),
        sub: t("control.ptRow3Sub"),
        reach: t("control.ptRow3Reach"),
        views: t("control.ptRow3Views"),
        orders: t("control.ptRow3Orders"),
        ordersPulse: true,
        cvr: t("control.ptRow3Cvr"),
        cvrHighlight: true,
        timeLeft: t("control.ptRow3Time"),
      },
    ],
    [t],
  );

  const trackerRows = useMemo(
    () => trackerRowsAll.filter((row) => trackerKeys.includes(row.key)),
    [trackerKeys, trackerRowsAll],
  );

  const onEndPromo = useCallback((key: string) => {
    setTrackerKeys((prev) => prev.filter((k) => k !== key));
  }, []);

  const noop = useCallback(() => {}, []);

  const storefrontLineStrong = storefrontTitleForViz(viz, t);

  return (
    <ScrollView
      style={controlStyles.screen}
      contentContainerStyle={[
        controlStyles.scrollContent,
        { paddingHorizontal: horizontalPad },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={controlStyles.heroDisplay}>
        <UiText style={controlStyles.heroNumber}>{t("control.heroViewers")}</UiText>
      </View>

      <Hero
        locale={i18n.language === "ar" ? "ar-AE" : "en-GB"}
        brandBranch={t("intelligence.brandBranch")}
        brandName={t("intelligence.brandName")}
        subtitle={t("control.subtitle")}
        title={t("control.titleLine1")}
        titleStrong={t("control.titleStrong")}
        isRtl={isRtl}
      >
        <View style={controlStyles.metaMid}>
          <View style={[controlStyles.metaMidRow, isRtl && controlStyles.rowRtl]}>
            <Ionicons name="time-outline" size={14} color={COLORS.accentAmber} />
            <Text style={controlStyles.metaMidText}>
              {t("control.metaViewersLinePrefix")}
              <Text style={controlStyles.metaMidStrong}>
                {t("control.metaViewersHighlight")}
              </Text>
              {t("control.metaViewersSuffix")}
            </Text>
          </View>
          <View style={[controlStyles.metaMidRow, isRtl && controlStyles.rowRtl]}>
            <Text style={controlStyles.metaMidText}>
              {t("control.metaStorefrontLinePrefix")}
              <Text style={controlStyles.metaMidInk}>{storefrontLineStrong}</Text>
              {t("control.metaStorefrontMid")}
            </Text>
          </View>
        </View>
      </Hero>

      <ControlStatusStrip
        isRtl={isRtl}
        onlineLabel={storefrontLineStrong}
        currentStateLabel={t("control.ssCurrentState")}
        viewersLabel={t("control.ssViewersNow")}
        viewersValue={t("control.heroViewers")}
        promoReachLabel={t("control.ssPromoReach")}
        promoReachValue={t("control.ssPromoReachValue")}
        nextReviewLabel={t("control.ssNextReview")}
        nextReviewValue={t("control.ssNextReviewValue")}
      />

      <ControlMapPresenceSection
        isRtl={isRtl}
        sectionTitle={t("control.mapPresenceTitle")}
        sectionCaption={t("control.mapPresenceCaption")}
        viz={viz}
        onVizChange={setViz}
        storefrontTitle={t("control.storefrontVisibilityTitle")}
        vizItems={vizItems}
        vizFooter={t("control.vizFooter")}
        banner={{
          panelTitle: t("control.bannerTitle"),
          dropLabel: t("control.bannerDropLabel"),
          dropSub: t("control.bannerDropSub"),
          placeholder: t("control.bannerPlaceholder"),
          previewLabel: t("control.bannerPreviewLink"),
          snoozeLabel: t("control.snooze"),
          publishLabel: t("control.publish"),
          message: bannerMessage,
          onMessageChange: setBannerMessage,
          onSnooze: noop,
          onPublish: noop,
          onPreview: noop,
          onPickPhoto: noop,
        }}
        persona={{
          panelTitle: t("control.personaTitle"),
          personaName: t("control.personaName"),
          personaSub: t("control.personaSubLive"),
          dropLabel: t("control.personaDropLabel"),
          dropSub: t("control.personaDropSub"),
          footer: t("control.personaFooter"),
          onPickPhoto: noop,
        }}
      />

      <ControlQuickMenuSection
        isRtl={isRtl}
        sectionTitle={t("control.quickMenuTitle")}
        sectionCaption={t("control.quickMenuCaption")}
        stats={{
          panelTitle: t("control.qmmPanelTitle"),
          availableLabel: t("control.qmmAvailable"),
          availableCount: t("control.qmmAvailableCount"),
          snoozedLabel: t("control.qmmSnoozed"),
          snoozedCount: t("control.qmmSnoozedCount"),
          unavailableLabel: t("control.qmmUnavailable"),
          unavailableCount: t("control.qmmUnavailableCount"),
          editMenuLabel: t("control.editFullMenu"),
          onEditFullMenu: noop,
        }}
        quickLaunch={{
          panelTitle: t("control.quickLaunchTitle"),
          photoDropLabel: t("control.qlPhotoLabel"),
          photoDropSub: t("control.qlPhotoSub"),
          categoryLabel: t("control.qlCategory"),
          categoryOptions,
          categoryValue: category,
          onCategoryChange: setCategory,
          itemNameLabel: t("control.qlItemName"),
          itemName,
          onItemNameChange: setItemName,
          descLabel: t("control.qlBriefDescription"),
          description,
          onDescriptionChange: setDescription,
          sideLabel: t("control.qlSideItems"),
          sidePlaceholder: t("control.qlSidePlaceholder"),
          sideItems,
          onSideItemsChange: setSideItems,
          priceLabel: t("control.qlPrice"),
          price,
          onPriceChange: setPrice,
          scheduleLabel: t("control.qlSchedule"),
          scheduleChipLabel: t("control.qlScheduleChip"),
          onSchedulePress: noop,
          launchLabel: t("control.qlLaunchNow"),
          onLaunch: noop,
          onPickPhoto: noop,
        }}
        promo={{
          panelTitle: t("control.promoCreatorTitle"),
          featuredBadgeLabel: t("control.promoFeatured"),
          templates: promoTemplates,
          onCreate: noop,
        }}
      />

      <ControlFlashPromotionsSection
        isRtl={isRtl}
        sectionTitle={t("control.flashPromoTitle")}
        sectionCaption={t("control.flashPromoCaption")}
        tracker={{
          panelTitle: t("control.trackerTitle"),
          realtimeBadge: t("control.trackerRealtime"),
          colPromo: t("control.ptPromo"),
          colReach: t("control.ptReach"),
          colViews: t("control.ptViews"),
          colOrders: t("control.ptOrders"),
          colCvr: t("control.ptCvr"),
          colTimeLeft: t("control.ptTimeLeft"),
          endLabel: t("control.ptEnd"),
          rows: trackerRows,
          onEndRow: onEndPromo,
          isRtl,
        }}
      />

      <ControlSmartFeaturesSection
        isRtl={isRtl}
        sectionTitle={t("control.smartTitle")}
        sectionCaption={t("control.smartCaption")}
        crowd={{
          title: t("control.crowdTitle"),
          showingLabel: t("control.crowdShowing"),
          normalLabel: t("control.crowdNormal"),
          busyLabel: t("control.crowdBusy"),
          description: t("control.crowdDesc"),
          footPrefix: t("control.crowdFootPrefix"),
          footStrong: t("control.crowdFootStrong"),
          footSuffix: t("control.crowdFootSuffix"),
          busy: crowdBusy,
          onBusyChange: setCrowdBusy,
        }}
        weather={{
          title: t("control.weatherTitle"),
          temp: t("control.weatherTemp"),
          unit: t("control.weatherUnit"),
          locLine1: t("control.weatherLocLine1"),
          locLine2: t("control.weatherLocLine2"),
          aiPrefix: t("control.weatherAiLinePrefix"),
          aiStrong: t("control.weatherAiLineStrong"),
          aiSuffix: t("control.weatherAiLineSuffix"),
          createLabel: t("control.weatherCreate"),
          onCreateWeatherMenu: noop,
          autoReorganize: autoWeatherMenu,
          onAutoReorganizeChange: setAutoWeatherMenu,
          autoMenuLabel: t("control.weatherAutoMenu"),
        }}
        sos={{
          title: t("control.sosTitle"),
          description: t("control.sosDesc"),
          sosLabel: t("control.sosLabel"),
          sosSub: t("control.sosSub"),
          onEmergencyActivate: noop,
        }}
      />
    </ScrollView>
  );
}
