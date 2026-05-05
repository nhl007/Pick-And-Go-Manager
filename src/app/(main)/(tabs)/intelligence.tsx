import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo } from "react";
import { I18nManager, ScrollView, Text, useWindowDimensions, View } from "react-native";

import Hero from "@/components/Hero";
import { UiDirhamSymbol } from "@/components/ui/UiDirhamSymbol";
import { UiLiveBlinkDot } from "@/components/ui/UiLiveBlinkDot";
import { UiLiveHBarChart } from "@/components/ui/UiLiveHBarChart";
import { UiLiveMetricCard } from "@/components/ui/UiLiveMetricCard";
import { UiLivePeakBars } from "@/components/ui/UiLivePeakBars";
import { UiLivePrepFunnel } from "@/components/ui/UiLivePrepFunnel";
import { UiLiveRingGauge } from "@/components/ui/UiLiveRingGauge";
import { UiLiveSemiGauge } from "@/components/ui/UiLiveSemiGauge";
import { UiText } from "@/components/ui/UiText";
import { styles } from "@/constants/intelligence.styles";
import { COLORS, SPACING } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export default function LiveIntelligenceScreen() {
  const { t, i18n } = useAppTranslation();
  const { width } = useWindowDimensions();

  const isRtl = useMemo(
    () => i18n.language === "ar" || I18nManager.isRTL,
    [i18n.language],
  );

  const horizontalPad = Math.min(30, Math.max(SPACING.md, width * 0.02));

  const funnelStages = useMemo(
    () => [
      { label: t("intelligence.funnelStagesReceived"), count: "28", widthPct: 100 },
      { label: t("intelligence.funnelStagesConfirmed"), count: "22", widthPct: 80 },
      { label: t("intelligence.funnelStagesPreparing"), count: "17", widthPct: 62 },
      { label: t("intelligence.funnelStagesReady"), count: "12", widthPct: 44 },
      { label: t("intelligence.funnelStagesHanded"), count: "8", widthPct: 30 },
    ],
    [t],
  );

  const topSellingItems = useMemo(
    () => [
      { name: "Mezze Platter", value: "14", widthPct: 100, barColor: COLORS.neonOrange },
      { name: "Grilled Salmon", value: "9", widthPct: 64, barColor: COLORS.chartWarm },
      { name: "Fattoush Salad", value: "7", widthPct: 50, barColor: COLORS.chartSand },
      { name: "Lamb Shawarma", value: "6", widthPct: 43, barColor: COLORS.chartSilver },
      { name: "Truffle Pasta", value: "4", widthPct: 29, barColor: COLORS.chartMist },
    ],
    [],
  );

  const peakBars = useMemo(
    () => [
      { label: "9a", heightPct: 25 },
      { label: "10a", heightPct: 35 },
      { label: "11a", heightPct: 55 },
      { label: "12p", heightPct: 85 },
      { label: "1p", heightPct: 100, active: true },
      { label: "2p", heightPct: 80 },
      { label: "3p", heightPct: 60 },
      { label: "4p", heightPct: 45 },
      { label: "5p", heightPct: 52 },
      { label: "6p", heightPct: 70 },
      { label: "7p", heightPct: 80 },
      { label: "8p", heightPct: 55 },
    ],
    [],
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalPad }]}
      showsVerticalScrollIndicator={false}
    >
      <Hero
        locale={i18n.language === "ar" ? "ar-AE" : "en-GB"}
        brandBranch={t("intelligence.brandBranch")}
        brandName={t("intelligence.brandName")}
        title={t("intelligence.titleLine1")}
        titleStrong={t("intelligence.titleStrong")}
        subtitle={t("intelligence.subtitle")}
        isRtl={isRtl}
      >
        <View style={styles.metaMid}>
          <View style={styles.heroDisplay}>
            <View style={[styles.heroAmountRow, isRtl && styles.rowRtl]}>
              <View style={styles.heroCurrency}>
                <UiDirhamSymbol size={72} color={COLORS.portalInk} />
              </View>
              <UiText style={styles.heroNumber} numberOfLines={1} adjustsFontSizeToFit>
                {t("intelligence.heroProjected")}
              </UiText>
            </View>
          </View>
          <View style={[styles.metaMidRow, isRtl && styles.rowRtl]}>
            <Ionicons name="time-outline" size={14} color={COLORS.accentAmber} />
            <Text style={styles.metaMidText}>
              {t("intelligence.projectedLinePrefix")}
              <Text style={styles.metaMidStrong}>
                {t("intelligence.projectedHighlight", { amount: "2,813" })}
              </Text>
            </Text>
          </View>
          <View style={styles.metaMidRow}>
            <UiText style={styles.metaMidSmall}>
              {t("intelligence.syncLineStart")}
              <UiText style={styles.metaMidLive}>{t("intelligence.live")}</UiText>
            </UiText>
          </View>
        </View>
      </Hero>

      <View style={[styles.sectionHeadRow, isRtl && styles.rowRtl]}>
        <UiText style={styles.sectionTitle}>{t("intelligence.operationsTitle")}</UiText>
        <UiText style={styles.sectionCaption}>
          {t("intelligence.operationsCaption")}
        </UiText>
      </View>

      <View style={styles.opsGrid}>
        <View style={styles.opsCardWrap}>
          <UiLiveMetricCard
            title={t("intelligence.preparingTitle")}
            metaRight={t("intelligence.preparingMeta")}
            value={
              <UiText style={styles.metricBig}>{t("intelligence.preparingValue")}</UiText>
            }
            footer={
              <View style={[styles.statRow, isRtl && styles.rowRtl]}>
                <Ionicons name="sunny" size={12} color={COLORS.accentAmber} />
                <UiText style={styles.statText}>
                  {t("intelligence.preparingStat", { minutes: "14" })}
                </UiText>
              </View>
            }
          />
        </View>
        <View style={styles.opsCardWrap}>
          <UiLiveMetricCard
            title={t("intelligence.readyTitle")}
            metaRight={t("intelligence.readyMeta")}
            value={
              <UiText style={styles.metricBig}>{t("intelligence.readyValue")}</UiText>
            }
            footer={
              <View style={[styles.statRow, isRtl && styles.rowRtl]}>
                <Ionicons name="car-outline" size={12} color={COLORS.accentAmber} />
                <UiText style={styles.statText}>
                  {t("intelligence.readyStat", { minutes: "3" })}
                </UiText>
              </View>
            }
          />
        </View>
        <View style={styles.opsCardWrap}>
          <UiLiveMetricCard
            title={t("intelligence.handedTitle")}
            metaRight={t("intelligence.handedMeta")}
            value={
              <UiText style={styles.metricBig}>{t("intelligence.handedValue")}</UiText>
            }
            footer={
              <View style={[styles.statRow, isRtl && styles.rowRtl]}>
                <Ionicons name="star" size={12} color={COLORS.accentAmber} />
                <UiText style={styles.statText}>{t("intelligence.handedStat")}</UiText>
              </View>
            }
          />
        </View>
        <View style={styles.opsCardWrap}>
          <UiLiveMetricCard
            title={t("intelligence.futureTitle")}
            metaRight={t("intelligence.futureMeta")}
            value={
              <UiText style={styles.metricBig}>{t("intelligence.futureValue")}</UiText>
            }
            footer={
              <View style={[styles.statRow, isRtl && styles.rowRtl]}>
                <Ionicons name="calendar-outline" size={12} color={COLORS.accentAmber} />
                <UiText style={styles.statText}>{t("intelligence.futureStat")}</UiText>
              </View>
            }
          />
        </View>
      </View>

      <View style={[styles.finHeadRow, isRtl && styles.rowRtl]}>
        <View style={[styles.finHeadTitles, isRtl && styles.rowRtl]}>
          <UiText style={styles.sectionTitle}>{t("intelligence.financialTitle")}</UiText>
          <UiText style={styles.sectionCaption}>
            {t("intelligence.financialCaption")}
          </UiText>
        </View>
        <View style={[styles.badge, isRtl && styles.rowRtl]}>
          <UiDirhamSymbol size={12} color={COLORS.ink2} />
          <UiText style={styles.badgeText}>{t("intelligence.currencyBadge")}</UiText>
        </View>
      </View>

      <View style={styles.finGrid}>
        <View style={styles.finCardWrap}>
          <UiLiveMetricCard
            style={styles.finCardEqualHeight}
            title={t("intelligence.salesTitle")}
            metaRight={t("intelligence.salesMeta")}
            value={
              <View style={[styles.finBigRow, isRtl && styles.rowRtl]}>
                <UiDirhamSymbol size={28} color={COLORS.portalInk} />
                <UiText style={styles.metricBigXl}>{t("intelligence.salesValue")}</UiText>
              </View>
            }
            footer={
              <View style={[styles.statRow, isRtl && styles.rowRtl]}>
                <Ionicons name="ribbon-outline" size={12} color={COLORS.trendPositive} />
                <UiText style={[styles.statText, styles.statOk]}>
                  {t("intelligence.salesStat")}
                </UiText>
              </View>
            }
          />
        </View>

        <View style={styles.finCardWrap}>
          <UiLiveMetricCard
            style={styles.finCardEqualHeight}
            title={t("intelligence.projectedCardTitle")}
            metaRight={t("intelligence.projectedCardMeta")}
            value={
              <View style={[styles.finBigRow, isRtl && styles.rowRtl]}>
                <UiDirhamSymbol size={28} color={COLORS.portalInk} />
                <UiText style={styles.metricBigXl}>
                  {t("intelligence.projectedCardValue")}
                </UiText>
              </View>
            }
            footer={
              <View style={[styles.statRow, isRtl && styles.rowRtl]}>
                <Ionicons name="sunny" size={12} color={COLORS.accentAmber} />
                <UiText style={styles.statText}>
                  {t("intelligence.projectedCardStatPrefix", { amount: "2,813" })}
                </UiText>
              </View>
            }
          />
        </View>

        <View style={styles.finThird}>
          <View style={styles.finThirdTop}>
            <UiText style={styles.finThirdTitle}>
              {t("intelligence.liabilitiesTitle")}
            </UiText>
            <View style={[styles.liveMeta, isRtl && styles.rowRtl]}>
              <UiText style={styles.finThirdMeta}>
                {t("intelligence.liabilitiesMetaLive")}
              </UiText>
              <UiLiveBlinkDot />
            </View>
          </View>
          <UiLiveRingGauge
            progress={0.75}
            pctLabel={t("intelligence.pctCollected")}
            ringCaption={t("intelligence.ringCollectedCaption")}
            collectedLabel={t("intelligence.collectedLabel")}
            collectedAmount={t("intelligence.collectedValue")}
            owedLabel={t("intelligence.owedLabel")}
            owedAmount={t("intelligence.owedValue")}
          />
        </View>
      </View>

      <View style={styles.chartGrid}>
        <View style={styles.chartRow3}>
          <View style={styles.chartPanel}>
            <View style={styles.chartHead}>
              <UiText style={styles.chartTitle}>{t("intelligence.funnelTitle")}</UiText>
              <UiText style={styles.chartSub}>{t("intelligence.funnelSub")}</UiText>
            </View>
            <UiLivePrepFunnel
              stages={funnelStages}
              legendLeft={
                <Text style={styles.legendText}>
                  {t("intelligence.funnelInPipePrefix")}
                  <Text style={styles.legendStrong}>28</Text>
                </Text>
              }
              legendRight={
                <Text style={[styles.legendText, styles.legendRight]}>
                  {t("intelligence.funnelDonePrefix")}
                  <Text style={styles.legendStrong}>8</Text>
                </Text>
              }
            />
          </View>

          <View style={styles.chartPanel}>
            <View style={styles.chartHead}>
              <UiText style={styles.chartTitle}>{t("intelligence.pickupTitle")}</UiText>
              <UiText style={styles.chartSub}>{t("intelligence.pickupSub")}</UiText>
            </View>
            <UiLiveSemiGauge
              percent={62}
              size={240}
              centerMain={t("intelligence.pickupCenterPct")}
              centerMainSuffix="%"
              centerSub={t("intelligence.pickupCenterLbl")}
            />
            <View style={styles.speedLegend}>
              <UiText style={styles.legendInline}>
                {t("intelligence.pickupLegCurbside", { pct: 62 })}
              </UiText>
              <UiText style={[styles.legendInline, styles.legendRight]}>
                {t("intelligence.pickupLegStore", { pct: 38 })}
              </UiText>
            </View>
          </View>

          <View style={styles.chartPanel}>
            <View style={styles.chartHead}>
              <UiText style={styles.chartTitle}>{t("intelligence.autopickTitle")}</UiText>
              <UiText style={styles.chartSub}>{t("intelligence.autopickSub")}</UiText>
            </View>
            <UiLiveSemiGauge
              percent={78}
              size={240}
              centerMain={t("intelligence.autopickCenterMain")}
              centerSub={t("intelligence.autopickCenterSub")}
            />
            <View style={styles.speedLegend}>
              <Text style={styles.legendText}>
                {t("intelligence.autopickWeekPrefix")}
                <Text style={styles.legendStrong}>23</Text>
              </Text>
              <Text style={[styles.legendText, styles.legendRight]}>
                {t("intelligence.autopickNewPrefix")}
                <Text style={styles.legendOk}>{t("intelligence.autopickNewWord")}</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.chartRow2}>
          <UiLiveHBarChart
            title={t("intelligence.topSellingTitle")}
            subtitle={t("intelligence.topSellingSub")}
            heroValue={t("intelligence.topSellingHero")}
            heroMeta={t("intelligence.topSellingHeroMeta")}
            items={topSellingItems}
          />

          <UiLivePeakBars
            title={t("intelligence.peakTitle")}
            subtitle={t("intelligence.peakSub")}
            heroMain={t("intelligence.peakHero")}
            heroSuffix={t("intelligence.peakHeroSuffix")}
            heroMeta={
              <Text style={styles.peakHeroMeta}>
                {t("intelligence.peakHeroMetaPrefix")}
                <Text style={styles.peakHeroMetaHi}>
                  {t("intelligence.peakHeroMetaHighlight")}
                </Text>
              </Text>
            }
            bars={peakBars}
          />
        </View>
      </View>

      <View style={{ height: SPACING.xxl }} />
    </ScrollView>
  );
}
