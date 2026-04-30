import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatCard } from "@/components/StatCard";
import { UiSpacer } from "@/components/ui/UiSpacer";
import { UiText } from "@/components/ui/UiText";
import { COLORS, FONT_FAMILIES, RADIUS, SPACING } from "@/constants/styles";

const CURRENCY = "Ð";

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
    amount: `+125`,
    amountColor: "financeOrange",
    icon: "arrow-up",
    iconBg: "whiteSecondary",
    iconColor: "textSecondary",
  },
  {
    id: "2",
    title: "Settlement #4825",
    subtitle: "Today · 10:18",
    amount: `+137`,
    amountColor: "financeOrange",
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

function formatClockLabel(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return `${pad(d.getHours())} ${pad(d.getMinutes())} ${pad(d.getSeconds())} ${days[d.getDay()]} · ${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function FinanceScreen() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const clockLabel = useMemo(() => formatClockLabel(now), [now]);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
     
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <UiText size="lg" font="bold" align="left">
              FRENCH BAKERY
            </UiText>
            <UiText size="sm" font="regular" color="textSecondary" align="left">
              Dubai Downtown · Branch
            </UiText>
          </View>

          <View style={styles.headerCenter}>
            <UiText size={48} font="bold" align="center">
              {/* <Image source={require("@/assets/images/logo-glow.png")} /> */}
              {CURRENCY} 47,283
            </UiText>
            <UiText size="sm" font="regular" color="textSecondary" align="center">
              Available balance ·{" "}
              <UiText size="sm" font="semiBold" color="financeAccent">
                +{CURRENCY} 8,427 today
              </UiText>
            </UiText>
            <UiText size="xs" font="regular" color="textSecondary" align="center">
              Next payout in{" "}
              <UiText size="xs" font="semiBold" color="textPrimary">
                5 days
              </UiText>{" "}
              · Mon, April 25
            </UiText>
          </View>

          <View style={styles.headerRight}>
            <UiText size="xs" font="medium" color="textSecondary" align="right">
              {clockLabel}
            </UiText>
          </View>
        </View>

        <UiSpacer size="lg" />

        <View style={styles.titleRow}>
          <UiText size="xxxl" font="bold" align="left" style={styles.titleMain}>
            Finance & payouts.
          </UiText>
          <UiText
            size="sm"
            font="regular"
            color="textSecondary"
            align="right"
            style={styles.titleBlurb}
          >
            Revenue streams, settlement cycles, and cash-flow visibility. Every
            transaction tracked · every payout reconciled.
          </UiText>
        </View>

        <UiSpacer size="md" />

        <View style={styles.statsRow}>
          <StatCard
            style={styles.statCardInGrid}
            title="Gross (30d)"
            topRight="+34%"
            topRightColor="financeAccent"
            value={`${CURRENCY} 187K`}
            valueColor="financeAccent"
            footer="• Up"
            footerColor="financeAccent"
            footerFont="medium"
          />
          <StatCard
            style={styles.statCardInGrid}
            title="Platform fees"
            topRight="0% Gold"
            topRightColor="financeOrange"
            value="Zero"
            valueColor="financeOrange"
            footer="Gold tier"
          />
          <StatCard
            style={styles.statCardInGrid}
            title="VAT (5%)"
            topRight="Auto"
            value="-8.9K"
            valueColor="financeRose"
            footer="Remitted"
          />
          <StatCard
            style={styles.statCardInGrid}
            title="Net earnings"
            topRight="83.2%"
            value={`${CURRENCY} 158,451*`}
            valueColor="textPrimary"
            footer="▼ Net"
            footerColor="financeOrange"
            footerFont="medium"
          />
        </View>

        <UiSpacer size="lg" />

        <View style={styles.mainRow}>
          <View style={styles.transactionsCard}>
            <View style={[styles.transactionsHeader, styles.transactionsHeaderSpacing]}>
              <UiText size={"base"} font="bold" align="left" style={styles.sectionLabel}>
                ↓ RECENT TRANSACTIONS
              </UiText>
              <Pressable style={styles.exportBtn}>
                <UiText size="sm" font="medium" color="black" align="center">
                  Export
                </UiText>
              </Pressable>
            </View>

            {TRANSACTIONS.map((row, index) => (
              <View key={row.id}>
                {index > 0 ? <View style={styles.divider} /> : null}
                <View style={styles.txRow}>
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
          </View>

          <View style={styles.payoutCard}>
            <UiText size="md" font="bold" align="center">
              Next payout in
            </UiText>

            <View style={styles.payoutVisual}>
              <ProgressChart
                data={{ data: [0.75] }}
                width={220}
                height={220}
                strokeWidth={14}
                radius={80}
                chartConfig={{
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) => `rgba(255, 208, 0, ${opacity})`, // gold #FFD000
                  strokeWidth: 14,
                }}
                hideLegend
                style={styles.progressChart}
              />

              <View style={styles.payoutCenter} pointerEvents="none">
                <UiText size="xxl" font="bold" align="center">
                  05
                  <UiText size="md" font="medium" color="textSecondary">
                    d
                  </UiText>
                </UiText>
                <UiText size="xs" font="medium" color="textSecondary" align="center">
                  13H 23M 18S
                </UiText>
              </View>
            </View>

            <View style={styles.payoutDivider} />
            <UiText size="sm" font="bold" align="center">
              EXPECTED {CURRENCY} 12,840
            </UiText>
          </View>
        </View>

        <UiSpacer size="xxl" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    width: "100%",
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: SPACING.md,
  },
  headerLeft: {
    flex: 1,
    minWidth: 140,
    gap: SPACING.xs,
  },
  headerCenter: {
    flex: 1.4,
    alignItems: "center",
    gap: SPACING.xs,
  },
  headerRight: {
    flex: 1,
    minWidth: 140,
    alignItems: "flex-end",
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
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
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
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
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
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    shadowColor: COLORS.black,
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },
  payoutRingTrack: {
    width: "100%",
    maxWidth: 280,
    height: 10,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.backgroundSecondary,
    overflow: "hidden",
  },
  payoutRingFill: {
    height: "100%",
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.financeAccent,
  },
  payoutDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  payoutVisual: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: SPACING.md,
  },
  progressChart: {
    // chart-kit renders with a small internal padding; this keeps it centered
    marginVertical: 0,
  },
  payoutCenter: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
  },
});
