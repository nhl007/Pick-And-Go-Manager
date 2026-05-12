import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export type SettingsBadgePreviewModalCopy = {
  title: string;
  desc: string;
  brand: string;
  branch: string;
  tier: string;
  initials: string;
  name: string;
  jobTitle: string;
  empIdLine: string;
  scanLabel: string;
  lblEmail: string;
  lblPhone: string;
  lblBranch: string;
  lblAccess: string;
  email: string;
  phone: string;
  branchVal: string;
  access: string;
  footer: string;
  share: string;
  downloadSvg: string;
  qrUrl: string;
  qrA11y: string;
};

export type SettingsBadgePreviewModalProps = {
  visible: boolean;
  onClose: () => void;
  onShareSvg: () => void;
  onDownloadSvg: () => void;
  copy: SettingsBadgePreviewModalCopy;
  isRtl: boolean;
};

export function SettingsBadgePreviewModal({
  visible,
  onClose,
  onShareSvg,
  onDownloadSvg,
  copy,
  isRtl,
}: SettingsBadgePreviewModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      presentationStyle={Platform.OS === "ios" ? "overFullScreen" : undefined}
    >
      <View style={styles.root} accessibilityViewIsModal>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button" />

        <View style={[styles.sheet, isRtl && styles.sheetRtl]}>
          <Pressable
            onPress={onClose}
            style={[styles.closeBtn, isRtl ? styles.closeBtnRtl : styles.closeBtnLtr]}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Ionicons name="close" size={14} color={COLORS.ink3} />
          </Pressable>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={[styles.headRow, isRtl && styles.headRowRtl]}>
              <View style={styles.headIc}>
                <Ionicons name="eye-outline" size={18} color={COLORS.portalInk} />
              </View>
              <View style={styles.headText}>
                <UiText style={styles.title}>{copy.title}</UiText>
                <UiText style={styles.subtitle}>{copy.desc}</UiText>
              </View>
            </View>

            <View style={styles.frame}>
              <View style={styles.badge}>
                <View style={[styles.badgeHero, isRtl && styles.rowRtl]}>
                  <View style={styles.heroDot} />
                  <View style={styles.heroBrand}>
                    <UiText style={styles.brandT}>{copy.brand}</UiText>
                    <UiText style={styles.brandS}>{copy.branch}</UiText>
                  </View>
                  <View style={[styles.tierPill, isRtl && styles.rowRtl]}>
                    <Ionicons name="bag-handle" size={9} color={COLORS.financeAccent} />
                    <UiText style={styles.tierTxt}>{copy.tier}</UiText>
                  </View>
                </View>

                <View style={styles.photoWrap}>
                  <View style={styles.photoAv}>
                    <UiText style={styles.photoAvTxt}>{copy.initials}</UiText>
                  </View>
                </View>

                <UiText style={styles.badgeNm}>{copy.name}</UiText>
                <UiText style={styles.badgeTtl}>{copy.jobTitle}</UiText>
                <UiText style={styles.badgeId}>{copy.empIdLine}</UiText>

                <View
                  style={styles.qrBox}
                  accessibilityRole="image"
                  accessibilityLabel={copy.qrA11y}
                >
                  <QRCode
                    value={copy.qrUrl}
                    size={100}
                    backgroundColor={COLORS.white}
                    color={COLORS.portalInk}
                  />
                </View>

                <UiText style={styles.scan}>{copy.scanLabel}</UiText>

                <View style={styles.info}>
                  <View style={[styles.infoRow, isRtl && styles.infoRowRtl]}>
                    <UiText style={styles.infoL}>{copy.lblEmail}</UiText>
                    <UiText style={[styles.infoV, isRtl ? styles.infoVStart : styles.infoVEnd]}>
                      {copy.email}
                    </UiText>
                  </View>
                  <View style={[styles.infoRow, isRtl && styles.infoRowRtl]}>
                    <UiText style={styles.infoL}>{copy.lblPhone}</UiText>
                    <UiText style={[styles.infoV, isRtl ? styles.infoVStart : styles.infoVEnd]}>
                      {copy.phone}
                    </UiText>
                  </View>
                  <View style={[styles.infoRow, isRtl && styles.infoRowRtl]}>
                    <UiText style={styles.infoL}>{copy.lblBranch}</UiText>
                    <UiText style={[styles.infoV, isRtl ? styles.infoVStart : styles.infoVEnd]}>
                      {copy.branchVal}
                    </UiText>
                  </View>
                  <View style={[styles.infoRow, isRtl && styles.infoRowRtl]}>
                    <UiText style={styles.infoL}>{copy.lblAccess}</UiText>
                    <UiText style={[styles.infoV, isRtl ? styles.infoVStart : styles.infoVEnd]}>
                      {copy.access}
                    </UiText>
                  </View>
                </View>

                <UiText style={styles.foot}>{copy.footer}</UiText>
              </View>
            </View>
          </ScrollView>

          <View style={[styles.actions, isRtl && styles.actionsRtl]}>
            <Pressable
              onPress={onShareSvg}
              style={({ pressed }) => [styles.btnGhost, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <Ionicons name="share-social-outline" size={14} color={COLORS.portalInk} />
              <UiText style={styles.btnGhostTxt}>{copy.share}</UiText>
            </Pressable>
            <Pressable
              onPress={onDownloadSvg}
              style={({ pressed }) => [styles.btnPrimary, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <Ionicons name="download-outline" size={14} color={COLORS.white} />
              <UiText style={styles.btnPrimaryTxt}>{copy.downloadSvg}</UiText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    width: "100%",
    maxWidth: 420,
    maxHeight: "92%",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  sheetRtl: {
    direction: "rtl",
  },
  closeBtn: {
    position: "absolute",
    top: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    zIndex: 2,
  },
  closeBtnLtr: {
    right: SPACING.sm,
  },
  closeBtnRtl: {
    left: SPACING.sm,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl + 8,
    paddingBottom: SPACING.md,
  },
  headRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  headRowRtl: {
    flexDirection: "row-reverse",
  },
  headIc: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  headText: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  title: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 20,
    letterSpacing: -0.4,
    color: COLORS.portalInk,
  },
  subtitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.ink3,
  },
  frame: {
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    backgroundColor: COLORS.chartMist,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  badge: {
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.portalInk,
    padding: SPACING.md,
    alignItems: "center",
  },
  badgeHero: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  rowRtl: {
    flexDirection: "row-reverse",
  },
  heroDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
  },
  heroBrand: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  brandT: {
    fontFamily: "Inter_900Black",
    fontSize: 11,
    letterSpacing: 1,
    color: COLORS.white,
  },
  brandS: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: COLORS.ink4,
  },
  tierPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    backgroundColor: "rgba(202, 138, 4, 0.2)",
    borderWidth: 1,
    borderColor: COLORS.financeAccent,
  },
  tierTxt: {
    fontFamily: "Inter_900Black",
    fontSize: 8,
    letterSpacing: 0.8,
    color: COLORS.financeAccent,
  },
  photoWrap: {
    marginBottom: SPACING.sm,
  },
  photoAv: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.ink2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.hairline,
  },
  photoAvTxt: {
    fontFamily: "Inter_900Black",
    fontSize: 22,
    color: COLORS.white,
  },
  badgeNm: {
    fontFamily: "Inter_900Black",
    fontSize: 17,
    color: COLORS.white,
    marginBottom: 4,
  },
  badgeTtl: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.chartSilver,
    marginBottom: 4,
  },
  badgeId: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
    marginBottom: SPACING.sm,
  },
  qrBox: {
    width: 112,
    height: 112,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.white,
    padding: 6,
    marginBottom: SPACING.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  scan: {
    fontFamily: "Inter_900Black",
    fontSize: 8,
    letterSpacing: 2,
    color: COLORS.ink4,
    marginBottom: SPACING.md,
  },
  info: {
    alignSelf: "stretch",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: SPACING.md,
  },
  infoRowRtl: {
    flexDirection: "row-reverse",
  },
  infoL: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 8,
    letterSpacing: 0.6,
    color: COLORS.ink4,
    width: 56,
  },
  infoV: {
    flex: 1,
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: COLORS.white,
  },
  infoVEnd: {
    textAlign: "right",
  },
  infoVStart: {
    textAlign: "left",
  },
  foot: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 8,
    lineHeight: 12,
    color: COLORS.ink4,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.hairline,
  },
  actionsRtl: {
    flexDirection: "row-reverse",
  },
  btnGhost: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  btnGhostTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  btnPrimary: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.portalInk,
  },
  btnPrimaryTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.88,
  },
});
