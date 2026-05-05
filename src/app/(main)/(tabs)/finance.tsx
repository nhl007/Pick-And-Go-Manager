import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { I18nManager, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatCard } from "@/components/StatCard";
import { UICard } from "@/components/ui/UICard";
import { UiDirhamSymbol } from "@/components/ui/UiDirhamSymbol";
import { UiLiveSemiGauge } from "@/components/ui/UiLiveSemiGauge";
import { UiSpacer } from "@/components/ui/UiSpacer";
import { UiText } from "@/components/ui/UiText";
import { COLORS, FONT_FAMILIES, RADIUS, SPACING } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";

const CURRENCY = "Ð";

const MS_DAY = 86_400_000;
const MS_HOUR = 3_600_000;
const MS_MIN = 60_000;
const MS_SEC = 1000;

const PAYOUT_RING_GOLD = "#FFD000";

type TransactionRow = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  amountColor: keyof typeof COLORS;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconBg: keyof typeof COLORS;
  iconColor: keyof typeof COLORS;
};

const TRANSACTIONS: TransactionRow[] = [
  {
    id: "1",
    title: "Settlement #4826",
    subtitle: "Today · 10:42",
    amount: "+125",
    amountColor: "neonOrange",
    icon: "arrow-up",
    iconBg: "whiteSecondary",
    iconColor: "textSecondary",
  },
  {
    id: "2",
    title: "Settlement #4825",
    subtitle: "Today · 10:18",
    amount: "+137",
    amountColor: "neonOrange",
    icon: "arrow-up",
    iconBg: "whiteSecondary",
    iconColor: "textSecondary",
  },
  {
    id: "3",
    title: "Marketing boost",
    subtitle: "Yesterday",
    amount: "-150",
    amountColor: "error",
    icon: "trending-up",
    iconBg: "whiteSecondary",
    iconColor: "textSecondary",
  },
  {
    id: "4",
    title: "Weekly payout",
    subtitle: "Apr 5 · ENBD",
    amount: "41,892",
    amountColor: "textPrimary",
    icon: "arrow-forward",
    iconBg: "gray",
    iconColor: "white",
  },
  {
    id: "5",
    title: "VAT - March",
    subtitle: "Auto-filed FTA",
    amount: "-7,214",
    amountColor: "error",
    icon: "document-text-outline",
    iconBg: "whiteSecondary",
    iconColor: "textSecondary",
  },
];

function formatClockLabel(lang: string, d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const locale = lang === "ar" ? "ar-AE" : "en-GB";
  const weekday = d.toLocaleDateString(locale, { weekday: "short" });
  const rest = d.toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return `${pad(d.getHours())} ${pad(d.getMinutes())} ${pad(d.getSeconds())} ${weekday} · ${rest}`;
}

export default function FinanceScreen() {
  const { t, i18n } = useAppTranslation();
  const [now, setNow] = useState(() => new Date());

  const isRtl = useMemo(
    () => i18n.language === "ar" || I18nManager.isRTL,
    [i18n.language],
  );

  const payoutDeadlineMs = useRef<number | null>(null);
  payoutDeadlineMs.current ??=
    Date.now() + 5 * MS_DAY + 13 * MS_HOUR + 23 * MS_MIN + 18 * MS_SEC;

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const clockLabel = useMemo(
    () => formatClockLabel(i18n.language, now),
    [i18n.language, now],
  );

  const payoutRemaining = useMemo(() => {
    const deadline = payoutDeadlineMs.current ?? now.getTime();
    return Math.max(0, deadline - now.getTime());
  }, [now]);

  const payoutGauge = useMemo(() => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const days = Math.floor(payoutRemaining / MS_DAY);
    const h = Math.floor((payoutRemaining % MS_DAY) / MS_HOUR);
    const m = Math.floor((payoutRemaining % MS_HOUR) / MS_MIN);
    const s = Math.floor((payoutRemaining % MS_MIN) / MS_SEC);
    const centerSub =
      `${pad(h)}${t("financePage.unitHourShort")} ` +
      `${pad(m)}${t("financePage.unitMinuteShort")} ` +
      `${pad(s)}${t("financePage.unitSecondShort")}`;
    const deadline =
      payoutDeadlineMs.current ??
      now.getTime() + 5 * MS_DAY + 13 * MS_HOUR + 23 * MS_MIN + 18 * MS_SEC;
    const dateStr = new Date(deadline).toLocaleDateString(
      i18n.language === "ar" ? "ar-AE" : "en-GB",
      { weekday: "short", month: "short", day: "numeric" },
    );
    const daysWhole = Math.floor(payoutRemaining / MS_DAY);
    const daysLabel =
      payoutRemaining <= 0
        ? t("financePage.nextPayoutDue")
        : daysWhole < 1
          ? t("financePage.nextPayoutLessThanDay")
          : daysWhole === 1
            ? t("financePage.nextPayoutOneDay")
            : t("financePage.nextPayoutDays", { count: daysWhole });
    const nextPayoutMeta = t("financePage.nextPayoutMeta", {
      days: daysLabel,
      date: dateStr,
    });
    return {
      centerMain: pad(days),
      centerSub,
      nextPayoutMeta,
    };
  }, [t, payoutRemaining, i18n.language, now]);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroDisplay}>
          <View style={styles.heroAmountRow}>
            <View style={styles.heroCurrency}>
              <UiDirhamSymbol size={48} color={COLORS.portalInk} />
            </View>
            <UiText style={styles.heroNumber} numberOfLines={1} adjustsFontSizeToFit>
              11,240
            </UiText>
          </View>
        </View>

        <View style={[styles.meta, isRtl && styles.rowRtl]}>
          <View style={styles.metaLeft}>
            <View style={styles.brandStack}>
              <UiText style={styles.brandName}>{t("intelligence.brandName")}</UiText>
              <UiText style={styles.brandBranch}>{t("intelligence.brandBranch")}</UiText>
            </View>
          </View>

          <View style={styles.metaMid}>
            <View style={[styles.metaMidRow, isRtl && styles.rowRtl]}>
              <Ionicons
                name="information-circle-outline"
                size={14}
                color={COLORS.accentAmber}
              />
              <UiText style={styles.metaMidText}>
                {t("financePage.availableBalancePrefix")}
                <UiText style={styles.metaMidStrong}>{" +Ð8,427 today"}</UiText>
              </UiText>
            </View>
            <View style={styles.metaMidRow}>
              <UiText style={styles.metaMidSmall}>{payoutGauge.nextPayoutMeta}</UiText>
            </View>
          </View>

          <View style={[styles.metaRight, isRtl && styles.metaRightRtl]}>
            <UiText style={styles.metaTime}>
              {clockLabel.split(" ")[0]}:{clockLabel.split(" ")[1]}:
              {clockLabel.split(" ")[2]}
            </UiText>
            <UiText style={styles.metaDate}>
              {clockLabel.split(" ").slice(3).join(" ")}
            </UiText>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={[styles.pgHead, isRtl && styles.rowRtl]}>
          <View style={styles.pgHeadTitle}>
            <UiText style={styles.h1Light}>Finance &</UiText>
            <UiText style={styles.h1Strong}>payouts.</UiText>
          </View>
          <UiText style={styles.tag}>
            Revenue streams, settlement cycles, and cash-flow visibility. Every
            transaction tracked · every payout reconciled.
          </UiText>
        </View>

        <View style={[styles.statsRow, isRtl && styles.rowRtl]}>
          <StatCard
            style={styles.statCardInGrid}
            title={t("financePage.gross30dTitle")}
            topRight={t("financePage.gross30dTopRight")}
            topRightColor="neonOrange"
            value={t("financePage.gross30dValue", { currency: CURRENCY })}
            valueColor="neonOrange"
            footer={t("financePage.gross30dFooter")}
            footerColor="neonOrange"
            footerFont="medium"
          />
          <StatCard
            style={styles.statCardInGrid}
            title={t("financePage.platformFeesTitle")}
            topRight={t("financePage.platformFeesTopRight")}
            topRightColor="neonOrange"
            value={t("financePage.platformFeesValue")}
            valueColor="neonOrange"
            footer={t("financePage.platformFeesFooter")}
          />
          <StatCard
            style={styles.statCardInGrid}
            title={t("financePage.vatTitle")}
            topRight={t("financePage.vatTopRight")}
            value={t("financePage.vatValue")}
            valueColor="financeRose"
            footer={t("financePage.vatFooter")}
          />
          <StatCard
            style={styles.statCardInGrid}
            title={t("financePage.netEarningsTitle")}
            topRight={t("financePage.netEarningsTopRight")}
            value={t("financePage.netEarningsValue", { currency: CURRENCY })}
            valueColor="textPrimary"
            footer={t("financePage.netEarningsFooter")}
            footerColor="neonOrange"
            footerFont="medium"
          />
        </View>

        <UiSpacer size="lg" />

        <View style={[styles.mainRow, isRtl && styles.rowRtl]}>
          <UICard style={styles.transactionsCard}>
            <View
              style={[
                styles.transactionsHeader,
                styles.transactionsHeaderSpacing,
                isRtl && styles.rowRtl,
              ]}
            >
              <UiText size="base" font="bold" align="left" style={styles.sectionLabel}>
                {t("financePage.recentTransactions")}
              </UiText>
              <Pressable style={styles.exportBtn}>
                <UiText size="sm" font="medium" color="black" align="center">
                  {t("financePage.export")}
                </UiText>
              </Pressable>
            </View>

            {TRANSACTIONS.map((row, index) => (
              <View key={row.id}>
                {index > 0 ? <View style={styles.divider} /> : null}
                <View style={[styles.txRow, isRtl && styles.rowRtl]}>
                  <View
                    style={[styles.txIconWrap, { backgroundColor: COLORS[row.iconBg] }]}
                  >
                    <Ionicons name={row.icon} size={18} color={COLORS[row.iconColor]} />
                  </View>
                  <View style={styles.txMiddle}>
                    <UiText size="sm" font="bold" align="left">
                      {row.title}
                    </UiText>
                    <UiText size="xs" font="regular" color="textSecondary" align="left">
                      {row.subtitle}
                    </UiText>
                  </View>
                  <UiText size="sm" font="bold" color={row.amountColor} align="right">
                    {row.amount}
                  </UiText>
                </View>
              </View>
            ))}
          </UICard>

          <UICard style={styles.payoutCard}>
            <UiText size="md" font="bold" align="center">
              {t("financePage.payoutCardTitle")}
            </UiText>

            <View style={styles.payoutVisual}>
              <UiLiveSemiGauge
                percent={75}
                size={240}
                strokeColor={PAYOUT_RING_GOLD}
                centerMain={payoutGauge.centerMain}
                centerMainSuffix={t("financePage.unitDayShort")}
                centerSub={payoutGauge.centerSub}
              />
            </View>

            <View style={styles.payoutDivider} />
            <UiText size="sm" font="bold" align="center">
              {t("financePage.expectedPayout", { currency: CURRENCY, amount: "12,840" })}
            </UiText>
          </UICard>
        </View>

        <UiSpacer size="xxl" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    width: "100%",
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  heroDisplay: {
    alignItems: "center",
    marginTop: SPACING.sm,
    marginBottom: 4,
  },
  heroAmountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  heroCurrency: {
    transform: [{ translateY: 4 }],
  },
  heroNumber: {
    fontFamily: "Inter_900Black",
    fontSize: 56,
    letterSpacing: -3,
    fontVariant: ["tabular-nums"],
    color: COLORS.portalInk,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.md,
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  metaLeft: {
    flex: 1,
    minWidth: 120,
  },
  brandStack: {
    gap: 2,
  },
  brandName: {
    fontFamily: "Inter_900Black",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: COLORS.portalInk,
  },
  brandBranch: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    letterSpacing: 1,
    color: COLORS.ink4,
    marginTop: 2,
  },
  metaMid: {
    flex: 1.4,
    alignItems: "center",
    gap: 4,
    minWidth: 200,
  },
  metaMidRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    flexWrap: "wrap",
  },
  metaMidText: {
    flexShrink: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink3,
    textAlign: "center",
    lineHeight: 18,
  },
  metaMidStrong: {
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.neonOrange,
  },
  metaMidSmall: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
    textAlign: "center",
  },
  metaRight: {
    flex: 1,
    alignItems: "flex-end",
    minWidth: 120,
  },
  metaTime: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 15,
    letterSpacing: -0.3,
    fontVariant: ["tabular-nums"],
    color: COLORS.portalInk,
  },
  metaDate: {
    marginTop: 4,
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: COLORS.ink4,
  },
  metaRightRtl: {
    alignItems: "flex-start",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.hairline,
    marginBottom: SPACING.lg,
  },
  pgHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: SPACING.lg,
    marginBottom: SPACING.md,
    flexWrap: "wrap",
  },
  pgHeadTitle: {
    flex: 1,
    minWidth: 220,
    gap: 0,
  },
  h1Light: {
    fontFamily: "Inter_400Regular",
    fontSize: 34,
    letterSpacing: -0.5,
    lineHeight: 38,
    color: COLORS.portalInk,
  },
  h1Strong: {
    fontFamily: "Inter_900Black",
    fontSize: 34,
    letterSpacing: -0.6,
    lineHeight: 38,
    color: COLORS.portalInk,
  },
  tag: {
    flex: 1,
    minWidth: 220,
    maxWidth: 320,
    paddingTop: 6,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.ink3,
  },
  rowRtl: {
    flexDirection: "row-reverse",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: SPACING.lg,
  },
  titleMain: {
    flex: 1,
    maxWidth: "48%",
  },
  titleBlurb: {
    flex: 1,
    maxWidth: 420,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  statCardInGrid: {
    flexGrow: 1,
    flexBasis: "22%",
    minWidth: 160,
  },
  mainRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "stretch",
    gap: SPACING.lg,
    width: "100%",
  },
  transactionsCard: {
    flex: 1,
    minWidth: 0,
    // backgroundColor: COLORS.white,
    // borderRadius: RADIUS.xl,
    // borderWidth: 1,
    // borderColor: COLORS.border,
    // padding: SPACING.lg,
    // shadowColor: COLORS.black,
    // shadowOpacity: 0.08,
    // shadowRadius: 20,
    // shadowOffset: { width: 0, height: 8 },
  },
  transactionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionsHeaderSpacing: {
    marginBottom: SPACING.md,
  },
  sectionLabel: {
    letterSpacing: 0.6,
    textTransform: "uppercase",
    fontFamily: FONT_FAMILIES.bold,
    color: COLORS.textPrimary,
  },
  exportBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  txRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  txIconWrap: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  txMiddle: {
    flex: 1,
    gap: SPACING.xs,
  },
  payoutCard: {
    flex: 1,
    minWidth: 0,
    alignSelf: "stretch",
    // backgroundColor: COLORS.white,
    // borderRadius: RADIUS.xl,
    // borderWidth: 1,
    // borderColor: COLORS.border,
    // padding: SPACING.lg,
    // shadowColor: COLORS.black,
    // shadowOpacity: 0.08,
    // shadowRadius: 20,
    // shadowOffset: { width: 0, height: 8 },
  },
  payoutDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  payoutVisual: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SPACING.md,
  },
});
