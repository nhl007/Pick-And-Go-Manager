import Ionicons from "@expo/vector-icons/Ionicons";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import type { PromoTemplateDef } from "@/components/control/ControlPromoTemplatesPanel";
import { type SelectOption,UiSelect } from "@/components/ui/UiSelect";
import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export type PromoBuilderModalCopy = {
  kicker: string;
  cancel: string;
  launch: string;
  bogoSec: string;
  bogoBuy: string;
  bogoGet: string;
  bogoThen: string;
  bogoWhatBuys: string;
  bogoWhatGets: string;
  bogoQty: string;
  bogoSummary: string;
  flashSecItem: string;
  flashSecFp: string;
  flashPickDish: string;
  flashDishLabel: string;
  flashRegular: string;
  flashFlash: string;
  flashSave: string;
  fpFlashCut: string;
  fpWas: string;
  fpFlashPrice: string;
  hhSecPct: string;
  hhApplyOff: string;
  hhShieldNote: string;
  hhWindowSec: string;
  hhStart: string;
  hhEnd: string;
  hhDuration: string;
  hhActiveDays: string;
  hhPresetWeekdays: string;
  hhPresetWeekends: string;
  hhPresetEveryday: string;
  genericSec: string;
  scheduleSec: string;
  scheduleSnooze: string;
  targetSec: string;
  targetNearby: string;
  targetNearbySub: string;
  targetAll: string;
  targetAllSub: string;
  targetAuto: string;
  targetAutoSub: string;
  bogoBuyOpt1: string;
  bogoBuyOpt2: string;
  bogoGetOpt1: string;
  bogoGetOpt2: string;
  flashDish1: string;
  flashDish2: string;
  flashDish3: string;
  flashDish4: string;
  fpDish1: string;
  fpDish2: string;
  fpDish3: string;
  catMezze: string;
  catGrill: string;
  catMezzeCount: string;
  catGrillCount: string;
  itemMezze1: string;
  itemMezze2: string;
  itemGrill1: string;
  itemGrill2: string;
  pr60: string;
  pr45: string;
  pr55: string;
  pr32: string;
};

const QTY_CHIPS = ["1", "2", "3", "4"] as const;
const QTY_CHIPS_SMALL = ["1", "2"] as const;
const HH_PCTS = ["−5%", "−25%", "−50%"] as const;
const FP_CUTS = [5, 25, 50] as const;
const FLASH_PRICES: Record<string, number> = {
  d1: 45,
  d2: 55,
  d3: 60,
  d4: 85,
};

type TargetId = "nearby" | "all" | "auto";

export type ControlPromoBuilderModalProps = {
  visible: boolean;
  promoKey: string | null;
  templates: PromoTemplateDef[];
  copy: PromoBuilderModalCopy;
  isRtl: boolean;
  onClose: () => void;
  onConfirm: (key: string) => void;
};

function QtyChips({
  value,
  onChange,
  labels,
  isRtl,
}: {
  value: string;
  onChange: (v: string) => void;
  labels: readonly string[];
  isRtl: boolean;
}) {
  return (
    <View style={[styles.qtyRow, isRtl && styles.rowRtl]}>
      {labels.map((q) => {
        const on = value === q;
        return (
          <Pressable
            key={q}
            onPress={() => {
              onChange(q);
            }}
            style={[styles.qtyChip, on && styles.qtyChipOn]}
          >
            <UiText style={[styles.qtyChipTxt, on && styles.qtyChipTxtOn]}>{q}</UiText>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ControlPromoBuilderModal({
  visible,
  promoKey,
  templates,
  copy,
  isRtl,
  onClose,
  onConfirm,
}: ControlPromoBuilderModalProps) {
  const tmpl = useMemo(
    () => (promoKey ? templates.find((t) => t.key === promoKey) : undefined),
    [promoKey, templates],
  );

  const [buyQty, setBuyQty] = useState("1");
  const [getQty, setGetQty] = useState("1");
  const [buyVal, setBuyVal] = useState("b1");
  const [getVal, setGetVal] = useState("g1");
  const [flashDish, setFlashDish] = useState("d1");
  const [fpDish, setFpDish] = useState("fp1");
  const [fpCutIdx, setFpCutIdx] = useState(1);
  const [hhStart, setHhStart] = useState("16:00");
  const [hhEnd, setHhEnd] = useState("18:00");
  const [target, setTarget] = useState<TargetId>("nearby");
  const [mezzeOpen, setMezzeOpen] = useState(false);
  const [grillOpen, setGrillOpen] = useState(true);

  useEffect(() => {
    if (!visible) return;
    setBuyQty("1");
    setGetQty("1");
    setBuyVal("b1");
    setGetVal("g1");
    setFlashDish("d1");
    setFpDish("fp1");
    setFpCutIdx(1);
    setHhStart("16:00");
    setHhEnd("18:00");
    setTarget("nearby");
    setMezzeOpen(false);
    setGrillOpen(true);
  }, [visible, promoKey]);

  const buyOptions: SelectOption[] = useMemo(
    () => [
      { value: "b1", label: copy.bogoBuyOpt1 },
      { value: "b2", label: copy.bogoBuyOpt2 },
    ],
    [copy.bogoBuyOpt1, copy.bogoBuyOpt2],
  );
  const getOptions: SelectOption[] = useMemo(
    () => [
      { value: "g1", label: copy.bogoGetOpt1 },
      { value: "g2", label: copy.bogoGetOpt2 },
    ],
    [copy.bogoGetOpt1, copy.bogoGetOpt2],
  );

  const flashDishOptions: SelectOption[] = useMemo(
    () => [
      { value: "d1", label: copy.flashDish1 },
      { value: "d2", label: copy.flashDish2 },
      { value: "d3", label: copy.flashDish3 },
      { value: "d4", label: copy.flashDish4 },
    ],
    [copy.flashDish1, copy.flashDish2, copy.flashDish3, copy.flashDish4],
  );

  const fpDishOptions: SelectOption[] = useMemo(() => {
    return [
      { value: "fp1", label: copy.fpDish1 },
      { value: "fp2", label: copy.fpDish2 },
      { value: "fp3", label: copy.fpDish3 },
    ];
  }, [copy.fpDish1, copy.fpDish2, copy.fpDish3]);

  const regular = FLASH_PRICES[flashDish] ?? 45;
  const flashNew = Math.round(regular * 0.75 * 100) / 100;
  const flashSave = Math.round((regular - flashNew) * 100) / 100;

  const fpPrices: Record<string, number> = { fp1: 45, fp2: 55, fp3: 60 };
  const fpPrice = fpPrices[fpDish] ?? 45;
  const cutPct = FP_CUTS[fpCutIdx] ?? 25;
  const fpNew = Math.round(fpPrice * (1 - cutPct / 100) * 100) / 100;

  const kicker = tmpl
    ? copy.kicker.replace("{{tag}}", tmpl.tag)
    : copy.kicker.replace("{{tag}}", "");
  const launchLabel = tmpl ? copy.launch.replace("{{tag}}", tmpl.tag) : copy.launch;

  const hhHoursStr = (() => {
    const [sh, sm] = hhStart.split(":").map(Number);
    const [eh, em] = hhEnd.split(":").map(Number);
    if (
      sh == null ||
      sm == null ||
      eh == null ||
      em == null ||
      Number.isNaN(sh) ||
      Number.isNaN(sm) ||
      Number.isNaN(eh) ||
      Number.isNaN(em)
    ) {
      return "2";
    }
    const startM = sh * 60 + sm;
    let endM = eh * 60 + em;
    if (endM <= startM) endM += 24 * 60;
    const diff = Math.max(1, Math.round((endM - startM) / 60));
    return String(diff);
  })();

  const hhDurationText = copy.hhDuration.replace("{{hours}}", hhHoursStr);

  const showSchedule = promoKey !== "happyhour";

  if (!visible || !promoKey || !tmpl) {
    return null;
  }

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

        <View style={styles.sheet}>
          <Pressable
            onPress={onClose}
            style={[styles.closeBtn, isRtl ? styles.closeBtnRtl : styles.closeBtnLtr]}
            accessibilityRole="button"
            accessibilityLabel={copy.cancel}
          >
            <Ionicons name="close" size={14} color={COLORS.ink3} />
          </Pressable>

          <UiText style={styles.kicker}>{kicker}</UiText>
          <View style={[styles.headRow, isRtl && styles.headRowRtl]}>
            <View style={styles.headIcon}>
              <Ionicons name={tmpl.icon} size={28} color={COLORS.portalInk} />
            </View>
            <View style={styles.headText}>
              <UiText style={styles.headTitle}>{tmpl.title}</UiText>
              <UiText style={styles.headDesc}>{tmpl.desc}</UiText>
            </View>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollBody}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {promoKey === "bogo" ? (
              <View style={styles.sec}>
                <SecTitle num="1" text={copy.bogoSec} />
                <View style={[styles.bogoPair, isRtl && styles.bogoPairRtl]}>
                  <View style={styles.bogoSide}>
                    <View style={[styles.sideTag, isRtl && styles.sideTagRtl]}>
                      <Ionicons name="cart-outline" size={12} color={COLORS.portalInk} />
                      <UiText style={styles.sideTagTxt}>{copy.bogoBuy}</UiText>
                    </View>
                    <UiSelect
                      label={copy.bogoWhatBuys}
                      options={buyOptions}
                      value={buyVal}
                      onValueChange={setBuyVal}
                      fontSize={12}
                    />
                    <UiText style={styles.fieldLbl}>{copy.bogoQty}</UiText>
                    <QtyChips value={buyQty} onChange={setBuyQty} labels={QTY_CHIPS} isRtl={isRtl} />
                  </View>
                  <View style={styles.bogoArrow}>
                    <Ionicons name="arrow-forward" size={20} color={COLORS.ink3} />
                    <UiText style={styles.bogoThen}>{copy.bogoThen}</UiText>
                  </View>
                  <View style={styles.bogoSide}>
                    <View style={[styles.sideTag, isRtl && styles.sideTagRtl]}>
                      <Ionicons name="gift-outline" size={12} color={COLORS.portalInk} />
                      <UiText style={styles.sideTagTxt}>{copy.bogoGet}</UiText>
                    </View>
                    <UiSelect
                      label={copy.bogoWhatGets}
                      options={getOptions}
                      value={getVal}
                      onValueChange={setGetVal}
                      fontSize={12}
                    />
                    <UiText style={styles.fieldLbl}>{copy.bogoQty}</UiText>
                    <QtyChips
                      value={getQty}
                      onChange={setGetQty}
                      labels={QTY_CHIPS_SMALL}
                      isRtl={isRtl}
                    />
                  </View>
                </View>
                <View style={[styles.infoBox, isRtl && styles.infoBoxRtl]}>
                  <Ionicons name="information-circle-outline" size={14} color={COLORS.ink4} />
                  <UiText style={styles.infoTxt}>{copy.bogoSummary}</UiText>
                </View>
              </View>
            ) : null}

            {promoKey === "flashprice" ? (
              <>
                <View style={styles.sec}>
                  <SecTitle num="1" text={copy.flashSecItem} />
                  <UiSelect
                    label={copy.flashPickDish}
                    options={flashDishOptions}
                    value={flashDish}
                    onValueChange={setFlashDish}
                    fontSize={12}
                  />
                  <View style={[styles.flashPreview, isRtl && styles.flashPreviewRtl]}>
                    <View style={styles.fppCol}>
                      <UiText style={styles.fppLbl}>{copy.flashRegular}</UiText>
                      <UiText style={styles.fppRegular}>
                        {regular} <UiText style={styles.fppCur}>AED</UiText>
                      </UiText>
                    </View>
                    <Ionicons name="arrow-forward" size={18} color={COLORS.ink3} />
                    <View style={styles.fppCol}>
                      <UiText style={styles.fppLbl}>{copy.flashFlash}</UiText>
                      <UiText style={styles.fppFlash}>{flashNew} AED</UiText>
                      <UiText style={styles.fppSave}>
                        {copy.flashSave} {flashSave}
                      </UiText>
                    </View>
                  </View>
                </View>
                <View style={styles.sec}>
                  <SecTitle num="2" text={copy.flashSecFp} />
                  <UiSelect
                    label={copy.flashDishLabel}
                    options={fpDishOptions}
                    value={fpDish}
                    onValueChange={setFpDish}
                    fontSize={12}
                  />
                  <UiText style={styles.fieldLbl}>{copy.fpFlashCut}</UiText>
                  <View style={[styles.hhTop, { marginBottom: 8 }]}>
                    <UiText style={styles.hhLabel}>{copy.hhApplyOff}</UiText>
                    <UiText style={styles.hhVal}>−{cutPct}%</UiText>
                  </View>
                  <View style={styles.ftTrack}>
                    {FP_CUTS.map((p, i) => (
                      <Pressable
                        key={p}
                        onPress={() => {
                          setFpCutIdx(i);
                        }}
                        style={[styles.ftSeg, fpCutIdx === i && styles.ftSegOn]}
                      >
                        <UiText style={[styles.ftSegTxt, fpCutIdx === i && styles.ftSegTxtOn]}>
                          −{p}%
                        </UiText>
                      </Pressable>
                    ))}
                  </View>
                  <View style={[styles.fpPreview, isRtl && styles.fpPreviewRtl]}>
                    <View style={styles.fpCol}>
                      <UiText style={styles.fpLbl}>{copy.fpWas}</UiText>
                      <UiText style={styles.fpWasPrice}>{fpPrice} AED</UiText>
                    </View>
                    <Ionicons name="arrow-forward" size={16} color={COLORS.ink3} />
                    <View style={styles.fpCol}>
                      <UiText style={[styles.fpLbl, { color: COLORS.error }]}>{copy.fpFlashPrice}</UiText>
                      <UiText style={styles.fpNewPrice}>{fpNew} AED</UiText>
                    </View>
                  </View>
                </View>
              </>
            ) : null}

            {promoKey === "happyhour" ? (
              <>
                <View style={styles.sec}>
                  <SecTitle num="1" text={copy.hhSecPct} />
                  <View style={styles.hhCard}>
                    <View style={styles.hhTop}>
                      <UiText style={styles.hhLabel}>{copy.hhApplyOff}</UiText>
                      <UiText style={styles.hhVal}>−25%</UiText>
                    </View>
                    <View style={styles.ftTrack}>
                      <View style={[styles.ftFill, { width: "50%" }]} />
                    </View>
                    <View style={[styles.ftScale, isRtl && styles.rowRtl]}>
                      {HH_PCTS.map((p) => (
                        <UiText key={p} style={styles.ftScaleTxt}>
                          {p}
                        </UiText>
                      ))}
                    </View>
                  </View>
                  <View style={[styles.infoBox, isRtl && styles.infoBoxRtl]}>
                    <Ionicons name="shield-checkmark-outline" size={14} color={COLORS.ink4} />
                    <UiText style={styles.infoTxt}>{copy.hhShieldNote}</UiText>
                  </View>
                </View>
                <View style={styles.sec}>
                  <SecTitle num="2" text={copy.hhWindowSec} />
                  <View style={[styles.hhTimeGrid, isRtl && styles.hhTimeGridRtl]}>
                    <View style={{ flex: 1 }}>
                      <UiText style={styles.fieldLbl}>{copy.hhStart}</UiText>
                      <TextInput
                        value={hhStart}
                        onChangeText={setHhStart}
                        style={styles.timeInput}
                        placeholder="16:00"
                      />
                    </View>
                    <Ionicons name="arrow-forward" size={16} color={COLORS.ink3} style={{ marginTop: 20 }} />
                    <View style={{ flex: 1 }}>
                      <UiText style={styles.fieldLbl}>{copy.hhEnd}</UiText>
                      <TextInput
                        value={hhEnd}
                        onChangeText={setHhEnd}
                        style={styles.timeInput}
                        placeholder="18:00"
                      />
                    </View>
                  </View>
                  <View style={[styles.hhDurRow, isRtl && styles.infoBoxRtl]}>
                    <Ionicons name="time-outline" size={14} color={COLORS.ink4} />
                    <UiText style={styles.hhDurTxt}>{hhDurationText}</UiText>
                  </View>
                  <UiText style={[styles.fieldLbl, { marginTop: SPACING.md }]}>{copy.hhActiveDays}</UiText>
                  <View style={[styles.daysRow, isRtl && styles.rowRtl]}>
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                      <View key={`${d}-${i}`} style={[styles.dayChip, i >= 1 && i <= 5 && styles.dayChipOn]}>
                        <UiText style={[styles.dayChipTxt, i >= 1 && i <= 5 && styles.dayChipTxtOn]}>
                          {d}
                        </UiText>
                      </View>
                    ))}
                  </View>
                  <View style={[styles.dayPresets, isRtl && styles.rowRtl]}>
                    <Pressable style={styles.dayPreset}>
                      <UiText style={styles.dayPresetTxt}>{copy.hhPresetWeekdays}</UiText>
                    </Pressable>
                    <Pressable style={styles.dayPreset}>
                      <UiText style={styles.dayPresetTxt}>{copy.hhPresetWeekends}</UiText>
                    </Pressable>
                    <Pressable style={styles.dayPreset}>
                      <UiText style={styles.dayPresetTxt}>{copy.hhPresetEveryday}</UiText>
                    </Pressable>
                  </View>
                </View>
              </>
            ) : null}

            {promoKey === "freebie" ? (
              <View style={styles.sec}>
                <SecTitle num="1" text={copy.genericSec} />
                <GenericCategory
                  title={copy.catMezze}
                  count={copy.catMezzeCount}
                  icon="🥙"
                  open={mezzeOpen}
                  onToggle={() => {
                    setMezzeOpen((o) => !o);
                  }}
                  isRtl={isRtl}
                >
                  <CheckRow label={copy.itemMezze1} price={copy.pr60} isRtl={isRtl} />
                  <CheckRow label={copy.itemMezze2} price={copy.pr32} isRtl={isRtl} />
                </GenericCategory>
                <GenericCategory
                  title={copy.catGrill}
                  count={copy.catGrillCount}
                  icon="🥩"
                  open={grillOpen}
                  onToggle={() => {
                    setGrillOpen((o) => !o);
                  }}
                  isRtl={isRtl}
                >
                  <CheckRow label={copy.itemGrill1} price={copy.pr45} checked isRtl={isRtl} />
                  <CheckRow label={copy.itemGrill2} price={copy.pr55} checked isRtl={isRtl} />
                </GenericCategory>
              </View>
            ) : null}

            {showSchedule ? (
              <View style={styles.sec}>
                <SecTitle num="2" text={copy.scheduleSec} />
                <Pressable style={[styles.snoozeBtn, isRtl && styles.snoozeBtnRtl]}>
                  <Ionicons name="alarm-outline" size={14} color={COLORS.portalInk} />
                  <UiText style={styles.snoozeBtnTxt}>{copy.scheduleSnooze}</UiText>
                  <Ionicons name="chevron-forward" size={12} color={COLORS.ink3} />
                </Pressable>
              </View>
            ) : null}

            <View style={styles.sec}>
              <SecTitle num={showSchedule ? "3" : "2"} text={copy.targetSec} />
              <TargetRow
                selected={target === "nearby"}
                onPress={() => {
                  setTarget("nearby");
                }}
                title={copy.targetNearby}
                sub={copy.targetNearbySub}
                isRtl={isRtl}
              />
              <TargetRow
                selected={target === "all"}
                onPress={() => {
                  setTarget("all");
                }}
                title={copy.targetAll}
                sub={copy.targetAllSub}
                isRtl={isRtl}
              />
              <TargetRow
                selected={target === "auto"}
                onPress={() => {
                  setTarget("auto");
                }}
                title={copy.targetAuto}
                sub={copy.targetAutoSub}
                isRtl={isRtl}
              />
            </View>
          </ScrollView>

          <View style={[styles.foot, isRtl && styles.footRtl]}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [styles.btnCancel, pressed && styles.pressed]}
            >
              <UiText style={styles.btnCancelTxt}>{copy.cancel}</UiText>
            </Pressable>
            <Pressable
              onPress={() => {
                onConfirm(promoKey);
              }}
              style={({ pressed }) => [styles.btnLaunch, pressed && styles.pressed]}
            >
              <UiText style={styles.btnLaunchTxt}>{launchLabel}</UiText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function SecTitle({ num, text }: { num: string; text: string }) {
  return (
    <View style={styles.secTitleRow}>
      <View style={styles.secNum}>
        <UiText style={styles.secNumTxt}>{num}</UiText>
      </View>
      <UiText style={styles.secTitle}>{text}</UiText>
    </View>
  );
}

function GenericCategory({
  title,
  count,
  icon,
  open,
  onToggle,
  isRtl,
  children,
}: {
  title: string;
  count: string;
  icon: string;
  open: boolean;
  onToggle: () => void;
  isRtl: boolean;
  children: ReactNode;
}) {
  return (
    <View style={styles.pbCat}>
      <Pressable
        onPress={onToggle}
        style={[styles.pbCatHead, isRtl && styles.rowRtl]}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
      >
        <View style={[styles.chev, open && styles.chevOpen]}>
          <Ionicons name="chevron-down" size={12} color={COLORS.ink3} />
        </View>
        <UiText style={styles.pbIc}>{icon}</UiText>
        <UiText style={styles.pbNm}>{title}</UiText>
        <UiText style={styles.pbCt}>{count}</UiText>
      </Pressable>
      {open ? <View style={styles.pbItems}>{children}</View> : null}
    </View>
  );
}

function CheckRow({
  label,
  price,
  checked,
  isRtl,
}: {
  label: string;
  price: string;
  checked?: boolean;
  isRtl: boolean;
}) {
  const [on, setOn] = useState(!!checked);
  return (
    <Pressable
      onPress={() => {
        setOn((v) => !v);
      }}
      style={[styles.pbItem, isRtl && styles.rowRtl]}
    >
      <View style={[styles.pbCbox, on && styles.pbCboxOn]}>{on ? <UiText style={styles.pbCheck}>✓</UiText> : null}</View>
      <UiText style={styles.pbItemNm}>{label}</UiText>
      <UiText style={styles.pbPr}>{price}</UiText>
    </Pressable>
  );
}

function TargetRow({
  selected,
  onPress,
  title,
  sub,
  isRtl,
}: {
  selected: boolean;
  onPress: () => void;
  title: string;
  sub: string;
  isRtl: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.target, selected && styles.targetOn, isRtl && styles.rowRtl]}
    >
      <View style={[styles.pbRadio, selected && styles.pbRadioOn]} />
      <View style={styles.targetBody}>
        <UiText style={styles.targetNm}>{title}</UiText>
        <UiText style={styles.targetDs}>{sub}</UiText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    width: "100%",
    maxWidth: 620,
    maxHeight: "92%",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    paddingTop: SPACING.xl,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 },
    elevation: 14,
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
  closeBtnLtr: { right: SPACING.sm },
  closeBtnRtl: { left: SPACING.sm },
  kicker: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: COLORS.ink4,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  headRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  headRowRtl: { flexDirection: "row-reverse" },
  headIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    alignItems: "center",
    justifyContent: "center",
  },
  headText: { flex: 1, gap: 4 },
  headTitle: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 18,
    color: COLORS.portalInk,
  },
  headDesc: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink3,
    lineHeight: 17,
  },
  scroll: { maxHeight: 480 },
  scrollBody: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  sec: { marginBottom: SPACING.md },
  secTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  secNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.portalInk,
    alignItems: "center",
    justifyContent: "center",
  },
  secNumTxt: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 11,
    color: COLORS.white,
  },
  secTitle: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 12,
    color: COLORS.portalInk,
    flex: 1,
  },
  fieldLbl: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    letterSpacing: 0.8,
    color: COLORS.ink2,
    textTransform: "uppercase",
    marginTop: SPACING.sm,
    marginBottom: 6,
  },
  bogoPair: {
    flexDirection: "row",
    gap: SPACING.sm,
    alignItems: "stretch",
    flexWrap: "wrap",
  },
  bogoPairRtl: { flexDirection: "row-reverse" },
  bogoSide: { flex: 1, minWidth: 140, gap: SPACING.xs },
  sideTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  sideTagRtl: { flexDirection: "row-reverse" },
  sideTagTxt: { fontFamily: "Inter_800ExtraBold", fontSize: 10, color: COLORS.portalInk },
  bogoArrow: { alignItems: "center", justifyContent: "center", paddingVertical: SPACING.md },
  bogoThen: { fontFamily: "Inter_700Bold", fontSize: 10, color: COLORS.ink4, marginTop: 4 },
  qtyRow: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.xs },
  rowRtl: { flexDirection: "row-reverse" },
  qtyChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: RADIUS.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  qtyChipOn: { borderColor: COLORS.portalInk, backgroundColor: COLORS.white },
  qtyChipTxt: { fontFamily: "Inter_700Bold", fontSize: 12, color: COLORS.ink3 },
  qtyChipTxtOn: { color: COLORS.portalInk },
  infoBox: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginTop: SPACING.md,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  infoBoxRtl: { flexDirection: "row-reverse" },
  infoTxt: { flex: 1, fontFamily: "Inter_600SemiBold", fontSize: 11, color: COLORS.ink4, lineHeight: 16 },
  flashPreview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  flashPreviewRtl: { flexDirection: "row-reverse" },
  fppCol: { flex: 1, alignItems: "center", gap: 4 },
  fppLbl: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: COLORS.ink4 },
  fppRegular: { fontFamily: "Inter_800ExtraBold", fontSize: 16, color: COLORS.portalInk },
  fppCur: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: COLORS.ink3 },
  fppFlash: { fontFamily: "Inter_900Black", fontSize: 18, color: COLORS.neonOrange },
  fppSave: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: COLORS.secondary },
  hhCard: {
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  hhTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  hhLabel: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: COLORS.ink4 },
  hhVal: { fontFamily: "Inter_900Black", fontSize: 18, color: COLORS.neonOrange },
  ftTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.hairline,
    marginTop: SPACING.sm,
    flexDirection: "row",
    overflow: "hidden",
  },
  ftFill: {
    height: "100%",
    backgroundColor: COLORS.portalInk,
    borderRadius: 4,
  },
  ftScale: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
  ftScaleTxt: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: COLORS.ink4 },
  ftSeg: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 6 },
  ftSegOn: { backgroundColor: COLORS.white },
  ftSegTxt: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: COLORS.ink3 },
  ftSegTxtOn: { fontFamily: "Inter_800ExtraBold", color: COLORS.portalInk },
  fpPreview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.whiteSecondary,
  },
  fpPreviewRtl: { flexDirection: "row-reverse" },
  fpCol: { flex: 1, alignItems: "center", gap: 4 },
  fpLbl: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: COLORS.ink4 },
  fpWasPrice: { fontFamily: "Inter_800ExtraBold", fontSize: 14, color: COLORS.portalInk },
  fpNewPrice: { fontFamily: "Inter_900Black", fontSize: 16, color: COLORS.error },
  hhTimeGrid: { flexDirection: "row", alignItems: "flex-end", gap: SPACING.sm, marginTop: SPACING.sm },
  hhTimeGridRtl: { flexDirection: "row-reverse" },
  timeInput: {
    borderWidth: 1,
    borderColor: COLORS.hairline,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: COLORS.portalInk,
    backgroundColor: COLORS.whiteSecondary,
  },
  hhDurRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: SPACING.sm,
  },
  hhDurTxt: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: COLORS.ink3, flex: 1 },
  daysRow: { flexDirection: "row", gap: 6, marginTop: SPACING.sm, flexWrap: "wrap" },
  dayChip: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
  },
  dayChipOn: { borderColor: COLORS.portalInk, backgroundColor: COLORS.white },
  dayChipTxt: { fontFamily: "Inter_700Bold", fontSize: 11, color: COLORS.ink4 },
  dayChipTxtOn: { color: COLORS.portalInk },
  dayPresets: { flexDirection: "row", gap: SPACING.xs, marginTop: SPACING.sm, flexWrap: "wrap" },
  dayPreset: {
    paddingVertical: 6,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  dayPresetTxt: { fontFamily: "Inter_600SemiBold", fontSize: 10, color: COLORS.ink3 },
  pbCat: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    overflow: "hidden",
  },
  pbCatHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    padding: SPACING.sm,
    backgroundColor: COLORS.whiteSecondary,
  },
  chev: { transform: [{ rotate: "-90deg" }] },
  chevOpen: { transform: [{ rotate: "0deg" }] },
  pbIc: { fontSize: 16 },
  pbNm: { flex: 1, fontFamily: "Inter_800ExtraBold", fontSize: 13, color: COLORS.portalInk },
  pbCt: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: COLORS.ink4 },
  pbItems: { paddingHorizontal: SPACING.sm, paddingBottom: SPACING.sm, gap: 4 },
  pbItem: { flexDirection: "row", alignItems: "center", gap: SPACING.sm, paddingVertical: 8 },
  pbCbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.hairline,
    alignItems: "center",
    justifyContent: "center",
  },
  pbCboxOn: { backgroundColor: COLORS.portalInk, borderColor: COLORS.portalInk },
  pbCheck: { fontSize: 10, color: COLORS.white, fontFamily: "Inter_800ExtraBold" },
  pbItemNm: { flex: 1, fontFamily: "Inter_600SemiBold", fontSize: 12, color: COLORS.ink3 },
  pbPr: { fontFamily: "Inter_700Bold", fontSize: 11, color: COLORS.portalInk },
  snoozeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  snoozeBtnRtl: { flexDirection: "row-reverse" },
  snoozeBtnTxt: { flex: 1, fontFamily: "Inter_700Bold", fontSize: 12, color: COLORS.portalInk },
  target: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.whiteSecondary,
  },
  targetOn: { borderColor: COLORS.portalInk, backgroundColor: COLORS.white },
  pbRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.hairline,
  },
  pbRadioOn: { borderColor: COLORS.portalInk, borderWidth: 5 },
  targetBody: { flex: 1, gap: 4 },
  targetNm: { fontFamily: "Inter_800ExtraBold", fontSize: 13, color: COLORS.portalInk },
  targetDs: { fontFamily: "Inter_600SemiBold", fontSize: 11, color: COLORS.ink4, lineHeight: 15 },
  foot: {
    flexDirection: "row",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.hairline,
  },
  footRtl: { flexDirection: "row-reverse" },
  btnCancel: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  btnCancelTxt: { fontFamily: "Inter_700Bold", fontSize: 13, color: COLORS.portalInk },
  btnLaunch: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.portalInk,
  },
  btnLaunchTxt: { fontFamily: "Inter_700Bold", fontSize: 13, color: COLORS.white },
  pressed: { opacity: 0.88 },
});
