/* eslint-disable max-lines-per-function */
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useMemo, useState } from "react";
import { I18nManager, ScrollView, Text, useWindowDimensions, View } from "react-native";

import type { ControlBannerPublishModalCopy } from "@/components/control/ControlBannerPublishModal";
import type { ControlBannerSnoozeModalCopy } from "@/components/control/ControlBannerSnoozeModal";
import { ControlFlashPromotionsSection } from "@/components/control/ControlFlashPromotionsSection";
import type { ControlFullMenuModalCopy } from "@/components/control/ControlFullMenuModal";
import type { PromoTrackerRowData } from "@/components/control/ControlLivePromoTracker";
import { ControlMapPresenceSection } from "@/components/control/ControlMapPresenceSection";
import {
  type PromoBuilderModalCopy,
} from "@/components/control/ControlPromoBuilderModal";
import type { PromoTemplateDef } from "@/components/control/ControlPromoTemplatesPanel";
import type { ControlQuickLaunchConfirmModalCopy } from "@/components/control/ControlQuickLaunchConfirmModal";
import { ControlQuickMenuSection } from "@/components/control/ControlQuickMenuSection";
import { ControlSmartFeaturesSection } from "@/components/control/ControlSmartFeaturesSection";
import {
  ControlSosShutdownModal,
  type ControlSosShutdownModalCopy,
} from "@/components/control/ControlSosShutdownModal";
import { ControlStatusStrip } from "@/components/control/ControlStatusStrip";
import type { StorefrontViz } from "@/components/control/ControlStorefrontVisibilityPanel";
import {
  ControlWeatherMenuModal,
  type ControlWeatherMenuModalCopy,
  type WeatherMenuSuggestedItemCopy,
} from "@/components/control/ControlWeatherMenuModal";
import Hero from "@/components/Hero";
import type { PhotoUploadModalCopy } from "@/components/media/PhotoUploadModal";
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
  const [weatherMenuOpen, setWeatherMenuOpen] = useState(false);
  const [sosShutdownOpen, setSosShutdownOpen] = useState(false);

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

  const photoModalCopy = useMemo<PhotoUploadModalCopy>(
    () => ({
      bannerTitle: t("control.photoModalBannerTitle"),
      bannerDesc: t("control.photoModalBannerDesc"),
      personaTitle: t("control.photoModalPersonaTitle"),
      personaDesc: t("control.photoModalPersonaDesc"),
      quickLaunchPhotoTitle: t("control.quickLaunchPhotoModalTitle"),
      quickLaunchPhotoDesc: t("control.quickLaunchPhotoModalDesc"),
      dropTitle: t("control.photoModalDropTitle"),
      dropSub: t("control.photoModalDropSub"),
      spec: t("control.photoModalSpec"),
      cropLabel: t("control.photoModalCropLabel"),
      ratio169: t("control.photoModalRatio169"),
      ratio43: t("control.photoModalRatio43"),
      ratio11: t("control.photoModalRatio11"),
      ratioFree: t("control.photoModalRatioFree"),
      altLabel: t("control.photoModalAltLabel"),
      altOptional: t("control.photoModalAltOptional"),
      altPlaceholder: t("control.photoModalAltPlaceholder"),
      optimizeMobile: t("control.photoModalOptimizeMobile"),
      autoEnhance: t("control.photoModalAutoEnhance"),
      saveLibrary: t("control.photoModalSaveLibrary"),
      usePhoto: t("control.photoModalUsePhoto"),
      cancel: t("control.photoModalCancel"),
      fileTooLarge: t("control.photoModalFileTooLarge"),
      permissionDenied: t("control.photoModalPermissionDenied"),
    }),
    [t],
  );

  const bannerPublishModalCopy = useMemo<ControlBannerPublishModalCopy>(
    () => ({
      kicker: t("control.publishModalKicker"),
      title: t("control.publishModalTitle"),
      desc: t("control.publishModalDesc"),
      impactVisibleTo: t("control.publishModalImpactVisibleTo"),
      impactMid: t("control.publishModalImpactMid"),
      impactRadius: t("control.publishModalImpactRadius"),
      cancel: t("control.publishModalCancel"),
      publishNow: t("control.publishModalPublishNow"),
    }),
    [t],
  );

  const bannerSnoozeModalCopy = useMemo<ControlBannerSnoozeModalCopy>(
    () => ({
      kicker: t("control.snoozeModalKicker"),
      title: t("control.snoozeModalTitle"),
      desc: t("control.snoozeModalDesc"),
      preset1h: t("control.snoozePreset1h"),
      preset2h: t("control.snoozePreset2h"),
      preset4h: t("control.snoozePreset4h"),
      presetEod: t("control.snoozePresetEod"),
      presetTomorrow: t("control.snoozePresetTomorrow"),
      presetCustom: t("control.snoozePresetCustom"),
      customDateLabel: t("control.snoozeCustomDate"),
      customTimeLabel: t("control.snoozeCustomTime"),
      summaryPrefix: t("control.snoozeSummaryPrefix"),
      summaryMid: t("control.snoozeSummaryMid"),
      resumeMinutes: t("control.snoozeResumeMinutes"),
      cancel: t("control.snoozeModalCancel"),
      schedule: t("control.snoozeModalSchedule"),
    }),
    [t],
  );

  const fullMenuModalCopy = useMemo<ControlFullMenuModalCopy>(
    () => ({
      kickerTemplate: t("control.fmModalKickerTemplate"),
      title: t("control.fmModalTitle"),
      statLive: t("control.fmModalStatLive"),
      statSnoozed: t("control.fmModalStatSnoozed"),
      statCategories: t("control.fmModalStatCategories"),
      cancel: t("control.fmModalCancel"),
      snoozeSelection: t("control.fmModalSnoozeSelection"),
      saveChanges: t("control.fmModalSave"),
      snoozedBadge: t("control.fmModalSnoozedBadge"),
      catSubMezze: t("control.fmCatSubMezze"),
      catSubGrill: t("control.fmCatSubGrill"),
      catSubSeafood: t("control.fmCatSubSeafood"),
      catSubPasta: t("control.fmCatSubPasta"),
      catSubDesserts: t("control.fmCatSubDesserts"),
    }),
    [t],
  );

  const fullMenuCategoryLabels = useMemo(
    () => ({
      mezze: t("control.categories.mezze"),
      grill: t("control.categories.grill"),
      seafood: t("control.categories.seafood"),
      pasta: t("control.categories.pasta"),
      desserts: t("control.categories.desserts"),
    }),
    [t],
  );

  const quickLaunchConfirmCopy = useMemo<ControlQuickLaunchConfirmModalCopy>(
    () => ({
      title: t("control.qlLaunchModalTitle"),
      descTemplate: t("control.qlLaunchModalDescTemplate"),
      sumCategory: t("control.qlLaunchSumCategory"),
      sumPrice: t("control.qlLaunchSumPrice"),
      sumVisibility: t("control.qlLaunchSumVisibility"),
      sumReach: t("control.qlLaunchSumReach"),
      viewersSuffix: t("control.qlLaunchViewersSuffix"),
      visibilityValue: t("control.qlLaunchVisibilityValue"),
      reviewDetails: t("control.qlLaunchReviewDetails"),
      launchNow: t("control.qlLaunchConfirmLaunch"),
    }),
    [t],
  );

  const promoBuilderCopy = useMemo<PromoBuilderModalCopy>(
    () => ({
      kicker: t("control.promoBuilderKicker"),
      cancel: t("control.promoBuilderCancel"),
      launch: t("control.promoBuilderLaunch"),
      bogoSec: t("control.promoBogoSec"),
      bogoBuy: t("control.promoBogoBuy"),
      bogoGet: t("control.promoBogoGet"),
      bogoThen: t("control.promoBogoThen"),
      bogoWhatBuys: t("control.promoBogoWhatBuys"),
      bogoWhatGets: t("control.promoBogoWhatGets"),
      bogoQty: t("control.promoBogoQty"),
      bogoSummary: t("control.promoBogoSummary"),
      flashSecItem: t("control.promoFlashSecItem"),
      flashSecFp: t("control.promoFlashSecFp"),
      flashPickDish: t("control.promoFlashPickDish"),
      flashDishLabel: t("control.promoFlashDishLabel"),
      flashRegular: t("control.promoFlashRegular"),
      flashFlash: t("control.promoFlashFlash"),
      flashSave: t("control.promoFlashSave"),
      fpFlashCut: t("control.promoFpFlashCut"),
      fpWas: t("control.promoFpWas"),
      fpFlashPrice: t("control.promoFpFlashPrice"),
      hhSecPct: t("control.promoHhSecPct"),
      hhApplyOff: t("control.promoHhApplyOff"),
      hhShieldNote: t("control.promoHhShieldNote"),
      hhWindowSec: t("control.promoHhWindowSec"),
      hhStart: t("control.promoHhStart"),
      hhEnd: t("control.promoHhEnd"),
      hhDuration: t("control.promoHhDuration"),
      hhActiveDays: t("control.promoHhActiveDays"),
      hhPresetWeekdays: t("control.promoHhPresetWeekdays"),
      hhPresetWeekends: t("control.promoHhPresetWeekends"),
      hhPresetEveryday: t("control.promoHhPresetEveryday"),
      genericSec: t("control.promoGenericSec"),
      scheduleSec: t("control.promoScheduleSec"),
      scheduleSnooze: t("control.promoScheduleSnooze"),
      targetSec: t("control.promoTargetSec"),
      targetNearby: t("control.promoTargetNearby"),
      targetNearbySub: t("control.promoTargetNearbySub"),
      targetAll: t("control.promoTargetAll"),
      targetAllSub: t("control.promoTargetAllSub"),
      targetAuto: t("control.promoTargetAuto"),
      targetAutoSub: t("control.promoTargetAutoSub"),
      bogoBuyOpt1: t("control.promoBogoBuyOpt1"),
      bogoBuyOpt2: t("control.promoBogoBuyOpt2"),
      bogoGetOpt1: t("control.promoBogoGetOpt1"),
      bogoGetOpt2: t("control.promoBogoGetOpt2"),
      flashDish1: t("control.promoFlashDish1"),
      flashDish2: t("control.promoFlashDish2"),
      flashDish3: t("control.promoFlashDish3"),
      flashDish4: t("control.promoFlashDish4"),
      fpDish1: t("control.promoFpDish1"),
      fpDish2: t("control.promoFpDish2"),
      fpDish3: t("control.promoFpDish3"),
      catMezze: t("control.promoCatMezze"),
      catGrill: t("control.promoCatGrill"),
      catMezzeCount: t("control.promoCatMezzeCount"),
      catGrillCount: t("control.promoCatGrillCount"),
      itemMezze1: t("control.promoItemMezze1"),
      itemMezze2: t("control.promoItemMezze2"),
      itemGrill1: t("control.promoItemGrill1"),
      itemGrill2: t("control.promoItemGrill2"),
      pr60: t("control.promoPr60"),
      pr45: t("control.promoPr45"),
      pr55: t("control.promoPr55"),
      pr32: t("control.promoPr32"),
    }),
    [t],
  );

  const weatherMenuCopy = useMemo<ControlWeatherMenuModalCopy>(
    () => ({
      title: t("control.wmModalTitle"),
      desc: t("control.wmModalDesc"),
      menuNameLabel: t("control.wmMenuNameLabel"),
      defaultMenuName: t("control.wmDefaultMenuName"),
      triggerLabel: t("control.wmTriggerLabel"),
      aiSuggestedLabel: t("control.wmAiSuggestedLabel"),
      aiSuggestedHint: t("control.wmAiSuggestedHint"),
      previewItemsOn: t("control.wmPreviewItemsOn"),
      previewLift: t("control.wmPreviewLift"),
      previewLiftValue: t("control.wmPreviewLiftValue"),
      previewReach: t("control.wmPreviewReach"),
      previewTriggerValue: t("control.wmPreviewTriggerValue"),
      previewTrigger: t("control.wmPreviewTrigger"),
      optPin: t("control.wmOptPin"),
      optPush: t("control.wmOptPush"),
      optAutoOff: t("control.wmOptAutoOff"),
      saveDraft: t("control.wmSaveDraft"),
      publish: t("control.wmPublish"),
      condUnitC: t("control.wmCondUnitC"),
      condUnitHumidity: t("control.wmCondUnitHumidity"),
    }),
    [t],
  );

  const weatherSuggestedItems = useMemo<WeatherMenuSuggestedItemCopy[]>(
    () => [
      {
        title: t("control.wmItem1Title"),
        meta: t("control.wmItem1Meta"),
        lift: t("control.wmItem1Lift"),
        defaultOn: true,
      },
      {
        title: t("control.wmItem2Title"),
        meta: t("control.wmItem2Meta"),
        lift: t("control.wmItem2Lift"),
        defaultOn: true,
      },
      {
        title: t("control.wmItem3Title"),
        meta: t("control.wmItem3Meta"),
        lift: t("control.wmItem3Lift"),
        defaultOn: true,
      },
      {
        title: t("control.wmItem4Title"),
        meta: t("control.wmItem4Meta"),
        lift: t("control.wmItem4Lift"),
        defaultOn: false,
      },
      {
        title: t("control.wmItem5Title"),
        meta: t("control.wmItem5Meta"),
        lift: t("control.wmItem5Lift"),
        defaultOn: false,
      },
    ],
    [t],
  );

  const weatherTriggerOptions = useMemo(
    () => [
      { value: "above", label: t("control.wmCondAbove") },
      { value: "below", label: t("control.wmCondBelow") },
      { value: "rain", label: t("control.wmCondRain") },
      { value: "humidity", label: t("control.wmCondHumidity") },
    ],
    [t],
  );

  const weatherModalCtx = useMemo(
    () => ({
      temp: `${t("control.weatherTemp")}${t("control.weatherUnit") === "C" ? "C" : t("control.weatherUnit")}`,
      sub: `${t("control.weatherLocLine1")} · ${t("control.weatherLocLine2")}`,
      tag: t("control.wmCtxTag"),
    }),
    [t],
  );

  const sosShutdownCopy = useMemo<ControlSosShutdownModalCopy>(
    () => ({
      title: t("control.sosShutdownTitle"),
      desc: t("control.sosShutdownDesc"),
      effectHide: t("control.sosShutdownEffHide", { viewers: t("control.heroViewers") }),
      effectPromos: t("control.sosShutdownEffPromos", { count: trackerKeys.length }),
      effectOrders: t("control.sosShutdownEffOrders"),
      effectNotify: t("control.sosShutdownEffNotify"),
      holdLabel: t("control.sosShutdownHold"),
      cancelLink: t("control.sosShutdownCancel"),
    }),
    [t, trackerKeys.length],
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
    <>
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
        locale={i18n.language === "ar" ? "ar-AE" : "en-GB"}
        sectionTitle={t("control.mapPresenceTitle")}
        sectionCaption={t("control.mapPresenceCaption")}
        viz={viz}
        onVizChange={setViz}
        storefrontTitle={t("control.storefrontVisibilityTitle")}
        vizItems={vizItems}
        vizFooter={t("control.vizFooter")}
        vizImpactViewersLabel={t("control.heroViewers")}
        vizImpactLivePromos={trackerKeys.length}
        photoModal={photoModalCopy}
        bannerPublishModal={bannerPublishModalCopy}
        bannerSnoozeModal={bannerSnoozeModalCopy}
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
        }}
        fullMenu={{
          copy: fullMenuModalCopy,
          venueBrand: t("control.personaName"),
          categoriesCount: t("control.fmModalCategoriesCount"),
          categoryLabels: fullMenuCategoryLabels,
        }}
        photoModal={photoModalCopy}
        quickLaunchConfirmCopy={quickLaunchConfirmCopy}
        viewersLabel={t("control.heroViewers")}
        promoBuilderCopy={promoBuilderCopy}
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
          onPhotoUse: noop,
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
          onCreateWeatherMenu: () => {
            setWeatherMenuOpen(true);
          },
          autoReorganize: autoWeatherMenu,
          onAutoReorganizeChange: setAutoWeatherMenu,
          autoMenuLabel: t("control.weatherAutoMenu"),
        }}
        sos={{
          title: t("control.sosTitle"),
          description: t("control.sosDesc"),
          sosLabel: t("control.sosLabel"),
          sosSub: t("control.sosSub"),
          onOpenEmergencyShutdown: () => {
            setSosShutdownOpen(true);
          },
        }}
      />
    </ScrollView>

    <ControlWeatherMenuModal
      visible={weatherMenuOpen}
      onClose={() => {
        setWeatherMenuOpen(false);
      }}
      onSaveDraft={noop}
      onPublish={noop}
      copy={weatherMenuCopy}
      ctxTemp={weatherModalCtx.temp}
      ctxSub={weatherModalCtx.sub}
      ctxTag={weatherModalCtx.tag}
      triggerOptions={weatherTriggerOptions}
      defaultTriggerValue="above"
      suggestedItems={weatherSuggestedItems}
      reachDisplay={t("control.heroViewers")}
      isRtl={isRtl}
    />

    <ControlSosShutdownModal
      visible={sosShutdownOpen}
      onClose={() => {
        setSosShutdownOpen(false);
      }}
      onConfirmShutdown={() => {
        setSosShutdownOpen(false);
        noop();
      }}
      copy={sosShutdownCopy}
      isRtl={isRtl}
    />
    </>
  );
}
