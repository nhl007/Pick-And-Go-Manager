import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo, useState } from "react";
import { I18nManager, ScrollView, Text, useWindowDimensions, View } from "react-native";

import Hero from "@/components/Hero";
import {
  type Tier,
  TIER_INDEX,
  TierDiamondBenefitsModal,
  TierKpiCard,
  TierMiniCard,
  TierPeerBenchmarkCard,
  TierPreviewSelector,
  TierPrivilegesTable,
  TierProgressCard,
  TierProtectionAlertCard,
  TIERS,
  TierStatusCard,
  TierUnlocksCard,
} from "@/components/tier";
import { UiText } from "@/components/ui/UiText";
import { COLORS, SPACING } from "@/constants/styles";
import { tierStyles as styles } from "@/constants/tier.styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";

const CURRENT_TIER: Tier = "gold";

const NEXT_TIER_KEY: Record<Tier, string> = {
  bronze: "tier.nextTierBronze",
  silver: "tier.nextTierSilver",
  gold: "tier.nextTierGold",
  diamond: "tier.nextTierDiamond",
};

const PROGRESS_REQUIREMENTS = [
  {
    id: "rating",
    done: true,
    titleKey: "tier.reqCustomerRatingTitle",
    metaKey: "tier.reqCustomerRatingMeta",
    valueKey: "tier.reqCustomerRatingValue",
  },
  {
    id: "compliance",
    done: true,
    titleKey: "tier.reqComplianceTitle",
    metaKey: "tier.reqComplianceMeta",
    valueKey: "tier.reqComplianceValue",
  },
  {
    id: "orderSuccess",
    done: false,
    titleKey: "tier.reqOrderSuccessTitle",
    metaKey: "tier.reqOrderSuccessMeta",
    valueKey: "tier.reqOrderSuccessValue",
  },
  {
    id: "prepAccuracy",
    done: false,
    titleKey: "tier.reqPrepAccuracyTitle",
    metaKey: "tier.reqPrepAccuracyMeta",
    valueKey: "tier.reqPrepAccuracyValue",
  },
  {
    id: "orderCount",
    done: false,
    titleKey: "tier.reqOrderCountTitle",
    metaKey: "tier.reqOrderCountMeta",
    valueKey: "tier.reqOrderCountValue",
  },
];

export default function TierAndQualityScreen() {
  const { t, i18n } = useAppTranslation();
  const { width } = useWindowDimensions();

  const isRtl = useMemo(
    () => i18n.language === "ar" || I18nManager.isRTL,
    [i18n.language],
  );

  const horizontalPad = Math.min(30, Math.max(SPACING.md, width * 0.02));

  const [previewTier, setPreviewTier] = useState<Tier>(CURRENT_TIER);
  const [diamondBenefitsOpen, setDiamondBenefitsOpen] = useState(false);

  const miniState = (tier: Tier): "active" | "next" | "locked" => {
    if (tier === CURRENT_TIER) return "active";
    if (TIER_INDEX[tier] === TIER_INDEX[CURRENT_TIER] + 1) return "next";
    return "locked";
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalPad }]}
      showsVerticalScrollIndicator={false}
    >
      <Hero
        locale={i18n.language === "ar" ? "ar-AE" : "en-GB"}
        brandBranch={t("tier.brandBranch")}
        brandName={t("tier.brandName")}
        title={t("tier.titleLine1")}
        titleStrong={t("tier.titleStrong")}
        subtitle={t("tier.subtitle")}
        isRtl={isRtl}
        belowMeta={
          <UiText style={styles.roadmapLine}>{t("tier.syncRoadmap")}</UiText>
        }
      >
        <View style={styles.metaMid}>
          <View style={styles.heroDisplay}>
            <View style={[styles.heroAmountRow, isRtl && styles.rowRtl]}>
              <UiText style={styles.heroNumber} numberOfLines={1} adjustsFontSizeToFit>
                {t("tier.heroQualityScore")}
              </UiText>
            </View>
          </View>
          <View style={[styles.metaMidRow, isRtl && styles.rowRtl]}>
            <Ionicons name="moon-outline" size={14} color={COLORS.ink4} />
            <Text style={styles.metaMidText}>
              {t("tier.qualityLinePrefix")}
              <Text style={styles.metaMidStrong}>
                {t("tier.qualityHighlight", { tier: t(`tier.tier${capitalize(CURRENT_TIER)}`) })}
              </Text>
            </Text>
          </View>
          <View style={styles.metaMidRow}>
            <UiText style={styles.metaMidSmall}>
              {t("tier.activeLineStart")}
              <UiText style={styles.metaMidLive}>
                {t("tier.activeDays", { count: 184 })}
              </UiText>
              {t("tier.activeMidSeparator")}
              <UiText style={styles.metaMidLive}>
                {t("tier.activeProgress", {
                  pct: 72,
                  nextTier: t(NEXT_TIER_KEY[CURRENT_TIER]),
                })}
              </UiText>
            </UiText>
          </View>
        </View>
      </Hero>

      <View style={[styles.sectionHeadRow, isRtl && styles.rowRtl]}>
        <View style={[styles.sectionHeadTitles, isRtl && styles.rowRtl]}>
          <UiText style={styles.sectionTitle}>{t("tier.sectionTitle")}</UiText>
          <UiText style={styles.sectionCaption}>{t("tier.sectionCaption")}</UiText>
        </View>
        <TierPreviewSelector
          active={previewTier}
          current={CURRENT_TIER}
          onSelect={setPreviewTier}
          isRtl={isRtl}
          t={t}
        />
      </View>

      <View style={styles.cardWrap}>
        <TierStatusCard
          tier={previewTier}
          isCurrent={previewTier === CURRENT_TIER}
          isRtl={isRtl}
          t={t}
        />
      </View>

      <View style={styles.miniGrid}>
        {TIERS.map((tier) => (
          <TierMiniCard
            key={tier}
            tier={tier}
            state={miniState(tier)}
            isPreviewActive={tier === previewTier}
            onPress={() => setPreviewTier(tier)}
            t={t}
          />
        ))}
      </View>

      <View style={styles.progressWrap}>
        <TierProgressCard
          nextTier="diamond"
          nextTierLabelKey="tier.tierDiamond"
          progressPct={74}
          requirements={PROGRESS_REQUIREMENTS}
          isRtl={isRtl}
          t={t}
        />
      </View>

      <View style={[styles.scorecardHeadRow, isRtl && styles.rowRtl]}>
        <View style={[styles.scorecardHeadLeft, isRtl && styles.rowRtl]}>
          <UiText style={styles.sectionTitle}>{t("tier.scorecardTitle")}</UiText>
          <UiText style={styles.sectionCaption}>{t("tier.scorecardCaption")}</UiText>
        </View>
        <View style={styles.liveChip}>
          <View style={styles.liveDot} />
          <UiText style={styles.liveText}>{t("tier.scorecardLive")}</UiText>
        </View>
      </View>

      <View style={styles.kpiGrid}>
        <TierKpiCard
          title={t("tier.kpiOrderSuccessTitle")}
          badgeLabel={t("tier.kpiOrderSuccessBadge")}
          badgeTone="ok"
          progress={0.978}
          centerValue={t("tier.kpiOrderSuccessValue")}
          centerUnit={t("tier.kpiOrderSuccessUnit")}
          delta={t("tier.kpiOrderSuccessDelta")}
          deltaTrend="up"
          targetLabel={t("tier.kpiOrderSuccessTargetLabel")}
          targetValue={t("tier.kpiOrderSuccessTargetValue")}
        />
        <TierKpiCard
          title={t("tier.kpiPrepAccuracyTitle")}
          badgeLabel={t("tier.kpiPrepAccuracyBadge")}
          badgeTone="warn"
          progress={0.959}
          centerValue={t("tier.kpiPrepAccuracyValue")}
          centerUnit={t("tier.kpiPrepAccuracyUnit")}
          delta={t("tier.kpiPrepAccuracyDelta")}
          deltaTrend="down"
          targetLabel={t("tier.kpiPrepAccuracyTargetLabel")}
          targetValue={t("tier.kpiPrepAccuracyTargetValue")}
        />
        <TierKpiCard
          title={t("tier.kpiCustomerSatTitle")}
          badgeLabel={t("tier.kpiCustomerSatBadge")}
          badgeTone="exceed"
          progress={4.97 / 5}
          centerValue={t("tier.kpiCustomerSatValue")}
          centerUnit={t("tier.kpiCustomerSatUnit")}
          delta={t("tier.kpiCustomerSatDelta")}
          deltaTrend="up"
          targetLabel={t("tier.kpiCustomerSatTargetLabel")}
          targetValue={t("tier.kpiCustomerSatTargetValue")}
        />
        <TierKpiCard
          title={t("tier.kpiHygieneTitle")}
          badgeLabel={t("tier.kpiHygieneBadge")}
          badgeTone="excellent"
          progress={4.92 / 5}
          centerValue={t("tier.kpiHygieneValue")}
          centerUnit={t("tier.kpiHygieneUnit")}
          delta={t("tier.kpiHygieneDelta")}
          deltaTrend="up"
          targetLabel={t("tier.kpiHygieneTargetLabel")}
          targetValue={t("tier.kpiHygieneTargetValue")}
        />
      </View>

      {/* <View style={[styles.privilegesHeadRow, isRtl && styles.rowRtl]}>
        <UiText style={styles.sectionTitle}>{t("tier.privilegesTitle")}</UiText>
        <UiText style={styles.sectionCaption}>{t("tier.privilegesCaption")}</UiText>
      </View>

      <TierPrivilegesTable currentTier={CURRENT_TIER} t={t} /> */}

      {/* <View style={[styles.smartHeadRow, isRtl && styles.rowRtl]}>
        <UiText style={styles.sectionTitle}>{t("tier.smartTitle")}</UiText>
        <UiText style={styles.sectionCaption}>{t("tier.smartCaption")}</UiText>
      </View>

      <View style={styles.smartGrid}>
        <View style={styles.smartCardWrap}>
          <TierProtectionAlertCard t={t} />
        </View>
        <View style={styles.smartCardWrap}>
          <TierUnlocksCard t={t} onSeeAll={() => setDiamondBenefitsOpen(true)} />
        </View>
        <View style={styles.smartCardWrap}>
          <TierPeerBenchmarkCard t={t} />
        </View>
      </View> */}

      <View style={{ height: SPACING.xxl }} />

      <TierDiamondBenefitsModal
        visible={diamondBenefitsOpen}
        onClose={() => setDiamondBenefitsOpen(false)}
        t={t}
      />
    </ScrollView>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
