import { Pressable, StyleSheet, View } from "react-native";

import { UiLiveBlinkDot } from "@/components/ui/UiLiveBlinkDot";
import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export type PromoTrackerRowData = {
  key: string;
  dotColor: string;
  title: string;
  sub: string;
  reach: string;
  views: string;
  orders: string;
  ordersPulse?: boolean;
  cvr: string;
  cvrHighlight?: boolean;
  timeLeft: string;
};

type ControlLivePromoTrackerProps = {
  panelTitle: string;
  realtimeBadge: string;
  colPromo: string;
  colReach: string;
  colViews: string;
  colOrders: string;
  colCvr: string;
  colTimeLeft: string;
  endLabel: string;
  rows: PromoTrackerRowData[];
  onEndRow: (key: string) => void;
  isRtl: boolean;
};

export function ControlLivePromoTracker({
  panelTitle,
  realtimeBadge,
  colPromo,
  colReach,
  colViews,
  colOrders,
  colCvr,
  colTimeLeft,
  endLabel,
  rows,
  onEndRow,
  isRtl,
}: ControlLivePromoTrackerProps) {
  return (
    <>
      <View style={[styles.trackerHead, isRtl && styles.rowRtl]}>
        <UiText style={[controlStyles.panelTitle, styles.headTitle]}>{panelTitle}</UiText>
        <View style={[styles.badgeLive, isRtl && styles.rowRtl]}>
          <UiLiveBlinkDot />
          <UiText style={styles.badgeLiveText}>{realtimeBadge}</UiText>
        </View>
      </View>

      <View style={[styles.ptHead, isRtl && styles.rowRtl]}>
        <UiText style={[styles.ptHeadCell, styles.ptHeadPromo]}>{colPromo}</UiText>
        <UiText style={styles.ptHeadCell}>{colReach}</UiText>
        <UiText style={styles.ptHeadCell}>{colViews}</UiText>
        <UiText style={styles.ptHeadCell}>{colOrders}</UiText>
        <UiText style={styles.ptHeadCell}>{colCvr}</UiText>
        <UiText style={styles.ptHeadCell}>{colTimeLeft}</UiText>
        <View style={styles.ptHeadEndSpacer} />
      </View>

      {rows.map((row) => (
        <View key={row.key} style={[styles.ptRow, isRtl && styles.rowRtl]}>
          <View style={[styles.ptName, isRtl && styles.ptNameRtl]}>
            <View style={[styles.ptDot, { backgroundColor: row.dotColor }]} />
            <View style={styles.ptNameText}>
              <UiText style={styles.ptT}>{row.title}</UiText>
              <UiText style={styles.ptS}>{row.sub}</UiText>
            </View>
          </View>
          <UiText style={styles.ptVal}>{row.reach}</UiText>
          <UiText style={styles.ptVal}>{row.views}</UiText>
          <View style={[styles.ptValRow, isRtl && styles.ptValRowRtl]}>
            <UiText style={styles.ptVal}>{row.orders}</UiText>
            {row.ordersPulse ? <View style={styles.ptPulse} /> : null}
          </View>
          <UiText
            style={[styles.ptVal, styles.ptCvr, row.cvrHighlight && styles.ptCvrHi]}
          >
            {row.cvr}
          </UiText>
          <UiText style={[styles.ptVal, styles.ptTime]}>{row.timeLeft}</UiText>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              onEndRow(row.key);
            }}
            style={styles.endBtn}
          >
            <UiText style={styles.endBtnText}>{endLabel}</UiText>
          </Pressable>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  trackerPanel: {
    marginBottom: SPACING.md,
  },
  trackerHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.md,
    marginBottom: SPACING.md,
    flexWrap: "wrap",
  },
  headTitle: {
    marginBottom: 0,
  },
  badgeLive: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  badgeLiveText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    letterSpacing: 0.5,
    color: COLORS.portalInk,
    textTransform: "uppercase",
  },
  rowRtl: {
    flexDirection: "row-reverse",
  },
  ptHead: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: SPACING.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.hairline,
    gap: 8,
    flexWrap: "wrap",
  },
  ptHeadCell: {
    flex: 1,
    minWidth: 56,
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: COLORS.ink4,
  },
  ptHeadPromo: {
    flexGrow: 2,
    minWidth: 160,
  },
  ptHeadEndSpacer: {
    width: 56,
  },
  ptRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.hairline,
    gap: 8,
    flexWrap: "wrap",
  },
  ptName: {
    flexGrow: 2,
    flexBasis: 200,
    minWidth: 200,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  ptNameRtl: {
    flexDirection: "row-reverse",
  },
  ptDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  ptNameText: {
    flex: 1,
    gap: 4,
  },
  ptT: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 13,
    color: COLORS.portalInk,
    lineHeight: 17,
  },
  ptS: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
    lineHeight: 15,
  },
  ptVal: {
    flex: 1,
    minWidth: 56,
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    fontVariant: ["tabular-nums"],
    color: COLORS.portalInk,
  },
  ptValRow: {
    flex: 1,
    minWidth: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ptValRowRtl: {
    flexDirection: "row-reverse",
  },
  ptPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.neonOrange,
  },
  ptCvr: {},
  ptCvrHi: {
    color: COLORS.secondary,
  },
  ptTime: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink3,
  },
  endBtn: {
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  endBtnText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    color: COLORS.portalInk,
  },
});
