import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import UICheckBox from "@/components/ui/UICheckBox";
import { UiInput } from "@/components/ui/UiInput";
import { type SelectOption, UiSelect } from "@/components/ui/UiSelect";
import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export type WeatherMenuSuggestedItemCopy = {
  title: string;
  meta: string;
  lift: string;
  defaultOn: boolean;
};

export type ControlWeatherMenuModalCopy = {
  title: string;
  desc: string;
  menuNameLabel: string;
  defaultMenuName: string;
  triggerLabel: string;
  aiSuggestedLabel: string;
  aiSuggestedHint: string;
  previewItemsOn: string;
  previewLift: string;
  previewLiftValue: string;
  previewReach: string;
  previewTriggerValue: string;
  previewTrigger: string;
  optPin: string;
  optPush: string;
  optAutoOff: string;
  saveDraft: string;
  publish: string;
  condUnitC: string;
  condUnitHumidity: string;
};

export type ControlWeatherMenuModalProps = {
  visible: boolean;
  onClose: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  copy: ControlWeatherMenuModalCopy;
  /** Context bar: main temperature line (e.g. 38°C) */
  ctxTemp: string;
  /** Sub line under temperature */
  ctxSub: string;
  /** Badge e.g. HEATWAVE */
  ctxTag: string;
  triggerOptions: SelectOption[];
  defaultTriggerValue: string;
  suggestedItems: WeatherMenuSuggestedItemCopy[];
  /** Shown in preview stats (e.g. 3,847) */
  reachDisplay: string;
  isRtl: boolean;
};

export function ControlWeatherMenuModal({
  visible,
  onClose,
  onSaveDraft,
  onPublish,
  copy,
  ctxTemp,
  ctxSub,
  ctxTag,
  triggerOptions,
  defaultTriggerValue,
  suggestedItems,
  reachDisplay,
  isRtl,
}: ControlWeatherMenuModalProps) {
  const [menuName, setMenuName] = useState(copy.defaultMenuName);
  const [triggerValue, setTriggerValue] = useState(defaultTriggerValue);
  const [threshold, setThreshold] = useState("32");
  const [itemOn, setItemOn] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    suggestedItems.forEach((it, i) => {
      init[i] = it.defaultOn;
    });
    return init;
  });
  const [pinTop, setPinTop] = useState(true);
  const [pushNearby, setPushNearby] = useState(true);
  const [autoOff, setAutoOff] = useState(false);

  useEffect(() => {
    if (visible) {
      setMenuName(copy.defaultMenuName);
      setTriggerValue(defaultTriggerValue);
      setThreshold("32");
      const init: Record<number, boolean> = {};
      suggestedItems.forEach((it, i) => {
        init[i] = it.defaultOn;
      });
      setItemOn(init);
      setPinTop(true);
      setPushNearby(true);
      setAutoOff(false);
    }
  }, [visible, copy.defaultMenuName, defaultTriggerValue, suggestedItems]);

  const selectedCount = useMemo(
    () => Object.values(itemOn).filter(Boolean).length,
    [itemOn],
  );

  const showThreshold = triggerValue !== "rain";
  const unitLabel = triggerValue === "humidity" ? copy.condUnitHumidity : copy.condUnitC;

  const toggleItem = useCallback((index: number) => {
    setItemOn((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  const handleSaveDraft = useCallback(() => {
    onSaveDraft();
    onClose();
  }, [onSaveDraft, onClose]);

  const handlePublish = useCallback(() => {
    onPublish();
    onClose();
  }, [onPublish, onClose]);

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
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <UiText style={styles.modalTitle}>{copy.title}</UiText>
            <UiText style={styles.modalDesc}>{copy.desc}</UiText>

            <View style={styles.ctxBar}>
              <View style={styles.ctxIc}>
                <Ionicons name="sunny-outline" size={22} color={COLORS.portalInk} />
              </View>
              <View style={styles.ctxMain}>
                <UiText style={styles.ctxTemp}>{ctxTemp}</UiText>
                <UiText style={styles.ctxSub}>{ctxSub}</UiText>
              </View>
              <View style={styles.ctxTagWrap}>
                <UiText style={styles.ctxTag}>{ctxTag}</UiText>
              </View>
            </View>

            <UiText style={styles.fieldLabel}>{copy.menuNameLabel}</UiText>
            <UiInput
              value={menuName}
              onChangeText={setMenuName}
              maxLength={42}
              height={44}
              containerStyle={styles.fieldGap}
            />

            <UiText style={styles.fieldLabel}>{copy.triggerLabel}</UiText>
            <View style={[styles.triggerRow, isRtl && styles.triggerRowRtl]}>
              <View style={styles.triggerSelect}>
                <UiSelect
                  options={triggerOptions}
                  value={triggerValue}
                  onValueChange={setTriggerValue}
                />
              </View>
              {showThreshold ? (
                <View style={[styles.condVal, isRtl && styles.condValRtl]}>
                  <UiInput
                    value={threshold}
                    onChangeText={setThreshold}
                    keyboardType="number-pad"
                    height={44}
                    style={styles.condInput}
                  />
                  <UiText style={styles.condUnit}>{unitLabel}</UiText>
                </View>
              ) : null}
            </View>

            <UiText style={styles.fieldLabel}>
              {copy.aiSuggestedLabel}
              <UiText style={styles.optHint}> {copy.aiSuggestedHint}</UiText>
            </UiText>
            <View style={styles.itemsWrap}>
              {suggestedItems.map((it, index) => (
                <Pressable
                  key={it.title}
                  onPress={() => {
                    toggleItem(index);
                  }}
                  style={({ pressed }) => [styles.wmItem, pressed && styles.wmItemPressed]}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: itemOn[index] ?? false }}
                >
                  <View
                    style={[styles.wmItemBox, (itemOn[index] ?? false) && styles.wmItemBoxOn]}
                  >
                    {(itemOn[index] ?? false) ? (
                      <UiText style={styles.wmItemTick}>✓</UiText>
                    ) : null}
                  </View>
                  <View style={styles.wmItemBody}>
                    <UiText style={styles.wmItemTitle}>{it.title}</UiText>
                    <UiText style={styles.wmItemMeta}>{it.meta}</UiText>
                  </View>
                  <UiText style={styles.wmItemLift}>{it.lift}</UiText>
                </Pressable>
              ))}
            </View>

            <View style={styles.previewRow}>
              <View style={styles.prevStat}>
                <UiText style={styles.prevN}>{String(selectedCount)}</UiText>
                <UiText style={styles.prevL}>{copy.previewItemsOn}</UiText>
              </View>
              <View style={styles.prevStat}>
                <UiText style={styles.prevN}>{copy.previewLiftValue}</UiText>
                <UiText style={styles.prevL}>{copy.previewLift}</UiText>
              </View>
              <View style={styles.prevStat}>
                <UiText style={styles.prevN}>{reachDisplay}</UiText>
                <UiText style={styles.prevL}>{copy.previewReach}</UiText>
              </View>
              <View style={styles.prevStat}>
                <UiText style={styles.prevN}>{copy.previewTriggerValue}</UiText>
                <UiText style={styles.prevL}>{copy.previewTrigger}</UiText>
              </View>
            </View>

            <View style={styles.optsCol}>
              <UICheckBox checked={pinTop} onChange={setPinTop} label={copy.optPin} />
              <UICheckBox checked={pushNearby} onChange={setPushNearby} label={copy.optPush} />
              <UICheckBox checked={autoOff} onChange={setAutoOff} label={copy.optAutoOff} />
            </View>
          </ScrollView>

          <View style={[styles.actions, isRtl && styles.actionsRtl]}>
            <Pressable
              onPress={handleSaveDraft}
              style={({ pressed }) => [styles.btnGhost, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <UiText style={styles.btnGhostTxt}>{copy.saveDraft}</UiText>
            </Pressable>
            <Pressable
              onPress={handlePublish}
              style={({ pressed }) => [styles.btnPrimary, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <UiText style={styles.btnPrimaryTxt}>{copy.publish}</UiText>
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
    maxWidth: 560,
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
  scroll: {
    maxHeight: "100%",
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl + 8,
    paddingBottom: SPACING.md,
  },
  modalTitle: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 20,
    letterSpacing: -0.4,
    color: COLORS.portalInk,
    marginBottom: SPACING.xs,
  },
  modalDesc: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.ink3,
    marginBottom: SPACING.md,
  },
  ctxBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    marginBottom: SPACING.md,
  },
  ctxIc: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  ctxMain: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  ctxTemp: {
    fontFamily: "Inter_900Black",
    fontSize: 22,
    color: COLORS.portalInk,
  },
  ctxSub: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink3,
    lineHeight: 15,
  },
  ctxTagWrap: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: "rgba(255, 229, 0, 0.35)",
    borderWidth: 1,
    borderColor: COLORS.neonYellow,
  },
  ctxTag: {
    fontFamily: "Inter_900Black",
    fontSize: 10,
    letterSpacing: 1,
    color: COLORS.trendPositiveDeep,
  },
  fieldLabel: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    letterSpacing: 0.8,
    color: COLORS.ink2,
    textTransform: "uppercase",
    marginBottom: 6,
    marginTop: SPACING.sm,
  },
  fieldGap: {
    marginBottom: SPACING.xs,
  },
  triggerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  triggerRowRtl: {
    flexDirection: "row-reverse",
  },
  triggerSelect: {
    flex: 1,
    minWidth: 120,
  },
  condVal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: 120,
  },
  condValRtl: {
    flexDirection: "row-reverse",
  },
  condInput: {
    flex: 1,
    minWidth: 0,
  },
  condUnit: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.ink3,
  },
  optHint: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    letterSpacing: 0,
    textTransform: "none",
    color: COLORS.ink4,
  },
  itemsWrap: {
    gap: SPACING.xs,
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
  },
  wmItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  wmItemPressed: {
    opacity: 0.92,
  },
  wmItemBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  wmItemBoxOn: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  wmItemTick: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 12,
    color: COLORS.white,
  },
  wmItemBody: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  wmItemTitle: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  wmItemMeta: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
  },
  wmItemLift: {
    fontFamily: "Inter_900Black",
    fontSize: 12,
    color: COLORS.secondary,
  },
  previewRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    marginBottom: SPACING.md,
  },
  prevStat: {
    minWidth: "22%",
    flexGrow: 1,
    gap: 2,
  },
  prevN: {
    fontFamily: "Inter_900Black",
    fontSize: 16,
    color: COLORS.portalInk,
  },
  prevL: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  optsCol: {
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
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
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
    justifyContent: "center",
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
