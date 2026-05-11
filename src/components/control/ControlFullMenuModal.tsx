import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

export type ControlFullMenuModalCopy = {
  kickerTemplate: string;
  title: string;
  statLive: string;
  statSnoozed: string;
  statCategories: string;
  cancel: string;
  snoozeSelection: string;
  saveChanges: string;
  snoozedBadge: string;
  catSubMezze: string;
  catSubGrill: string;
  catSubSeafood: string;
  catSubPasta: string;
  catSubDesserts: string;
};

export type ControlFullMenuModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave?: () => void;
  onSnoozeSelection?: () => void;
  copy: ControlFullMenuModalCopy;
  venueBrand: string;
  liveCount: string;
  snoozedCount: string;
  categoriesCount: string;
  /** Labels for category ids: mezze, grill, seafood, pasta, desserts */
  categoryLabels: Record<string, string>;
  isRtl: boolean;
};

type MenuSub = {
  id: string;
  name: string;
  price: string;
  on: boolean;
};

type MenuItem = {
  id: string;
  icon: string;
  name: string;
  priceLine: string;
  on: boolean;
  snoozed?: boolean;
  subs?: MenuSub[];
};

type MenuCategoryModel = {
  id: string;
  icon: string;
  nameKey: keyof Pick<
    ControlFullMenuModalCopy,
    | "catSubMezze"
    | "catSubGrill"
    | "catSubSeafood"
    | "catSubPasta"
    | "catSubDesserts"
  >;
  subtitleAccent?: boolean;
  categoryOn: boolean;
  items: MenuItem[];
};

function initialMenuModel(): MenuCategoryModel[] {
  return [
    {
      id: "mezze",
      icon: "🥙",
      nameKey: "catSubMezze",
      categoryOn: true,
      items: [
        {
          id: "m1",
          icon: "🥗",
          name: "Mezze Platter",
          priceLine: "60 Dh · #1 Hero",
          on: true,
          subs: [
            { id: "m1s1", name: "+ Extra pita bread", price: "+5", on: true },
            { id: "m1s2", name: "+ Extra hummus", price: "+8", on: true },
          ],
        },
        {
          id: "m2",
          icon: "🥙",
          name: "Hummus Beiruti",
          priceLine: "32 AED",
          on: true,
        },
        {
          id: "m3",
          icon: "🍆",
          name: "Baba Ganoush",
          priceLine: "28 AED",
          on: true,
        },
      ],
    },
    {
      id: "grill",
      icon: "🥩",
      nameKey: "catSubGrill",
      categoryOn: true,
      items: [
        {
          id: "g1",
          icon: "🥙",
          name: "Lamb Shawarma",
          priceLine: "45 AED",
          on: true,
        },
        {
          id: "g2",
          icon: "🍗",
          name: "Saffron Chicken",
          priceLine: "55 AED · chef pick",
          on: true,
          subs: [{ id: "g2s1", name: "+ Extra saffron rub", price: "+10", on: true }],
        },
        {
          id: "g3",
          icon: "🥩",
          name: "Beef Kofta",
          priceLine: "50 AED",
          on: true,
        },
      ],
    },
    {
      id: "seafood",
      icon: "🐟",
      nameKey: "catSubSeafood",
      subtitleAccent: true,
      categoryOn: true,
      items: [
        {
          id: "s1",
          icon: "🐟",
          name: "Grilled Salmon",
          priceLine: "85 AED",
          on: true,
          subs: [
            { id: "s1s1", name: "+ Lemon butter sauce", price: "+8", on: true },
            { id: "s1s2", name: "+ Garlic aioli", price: "+6", on: true },
          ],
        },
        {
          id: "s2",
          icon: "🦐",
          name: "Shrimp Skewers",
          priceLine: "65 AED",
          on: false,
          snoozed: true,
        },
      ],
    },
    {
      id: "pasta",
      icon: "🍝",
      nameKey: "catSubPasta",
      categoryOn: true,
      items: [
        {
          id: "p1",
          icon: "🍝",
          name: "Truffle Pasta",
          priceLine: "85 AED",
          on: true,
        },
      ],
    },
    {
      id: "desserts",
      icon: "🍰",
      nameKey: "catSubDesserts",
      categoryOn: true,
      items: [
        {
          id: "d1",
          icon: "🥮",
          name: "Baklava Platter",
          priceLine: "35 AED",
          on: true,
        },
        {
          id: "d2",
          icon: "🍰",
          name: "Saffron Kunafa",
          priceLine: "40 AED",
          on: true,
        },
      ],
    },
  ];
}

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <Pressable
      onPress={() => {
        onChange(!value);
      }}
      style={[
        styles.toggleTrack,
        value && styles.toggleTrackOn,
        value ? styles.toggleTrackJustifyEnd : styles.toggleTrackJustifyStart,
      ]}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
    >
      <View style={styles.toggleThumb} />
    </Pressable>
  );
}

export function ControlFullMenuModal({
  visible,
  onClose,
  onSave,
  onSnoozeSelection,
  copy,
  venueBrand,
  liveCount,
  snoozedCount,
  categoriesCount,
  categoryLabels,
  isRtl,
}: ControlFullMenuModalProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ mezze: true });
  const [cats, setCats] = useState<MenuCategoryModel[]>(() => initialMenuModel());

  useEffect(() => {
    if (!visible) return;
    setExpanded({ mezze: true });
    setCats(initialMenuModel());
  }, [visible]);

  const kicker = useMemo(() => copy.kickerTemplate.replace("{{brand}}", venueBrand), [
    copy.kickerTemplate,
    venueBrand,
  ]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const setCatOn = (catId: string, on: boolean) => {
    setCats((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, categoryOn: on } : c)),
    );
  };

  const setItemOn = (catId: string, itemId: string, on: boolean) => {
    setCats((prev) =>
      prev.map((c) =>
        c.id !== catId
          ? c
          : {
              ...c,
              items: c.items.map((it) =>
                it.id === itemId ? { ...it, on } : it,
              ),
            },
      ),
    );
  };

  const setSubOn = (catId: string, itemId: string, subId: string, on: boolean) => {
    setCats((prev) =>
      prev.map((c) =>
        c.id !== catId
          ? c
          : {
              ...c,
              items: c.items.map((it) =>
                it.id !== itemId || !it.subs
                  ? it
                  : {
                      ...it,
                      subs: it.subs.map((s) => (s.id === subId ? { ...s, on } : s)),
                    },
              ),
            },
      ),
    );
  };

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

          <View style={[styles.titleRow, isRtl && styles.titleRowRtl]}>
            <UiText style={[styles.title, isRtl && styles.titleRtl]}>{copy.title}</UiText>
            <View style={[styles.statsInline, isRtl && styles.statsInlineRtl]}>
              <Text style={styles.statTiny}>
                <Text style={styles.statStrong}>{liveCount}</Text>
                {` ${copy.statLive}`}
              </Text>
              <Text style={styles.dotSep}> · </Text>
              <Text style={[styles.statTiny, styles.statSnoozedMuted]}>
                <Text style={[styles.statStrong, styles.statStrongAccent]}>{snoozedCount}</Text>
                {` ${copy.statSnoozed}`}
              </Text>
              <Text style={styles.dotSep}> · </Text>
              <Text style={styles.statTiny}>
                <Text style={styles.statStrong}>{categoriesCount}</Text>
                {` ${copy.statCategories}`}
              </Text>
            </View>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollBody}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {cats.map((cat) => {
              const isOpen = expanded[cat.id] ?? false;
              const subtitle = copy[cat.nameKey];
              return (
                <View key={cat.id} style={styles.cat}>
                  <View style={[styles.catHeadRow, isRtl && styles.catHeadRowRtl]}>
                    <Pressable
                      onPress={() => {
                        toggleExpand(cat.id);
                      }}
                      style={[styles.catHeadMain, isRtl && styles.catHeadMainRtl]}
                      accessibilityRole="button"
                      accessibilityState={{ expanded: isOpen }}
                    >
                      <View style={[styles.chev, isOpen && styles.chevOpen]}>
                        <Ionicons name="chevron-down" size={14} color={COLORS.ink3} />
                      </View>
                      <UiText style={styles.catIc}>{cat.icon}</UiText>
                      <View style={styles.catHeadText}>
                        <UiText style={styles.catNm}>
                          {categoryLabels[cat.id] ?? cat.id}
                        </UiText>
                        <UiText
                          style={[
                            styles.catSubCount,
                            cat.subtitleAccent && { color: COLORS.neonOrange },
                          ]}
                        >
                          {subtitle}
                        </UiText>
                      </View>
                    </Pressable>
                    <Toggle value={cat.categoryOn} onChange={(v) => setCatOn(cat.id, v)} />
                  </View>

                  {isOpen ? (
                    <View style={styles.items}>
                      {cat.items.map((item) => (
                        <View key={item.id}>
                          <View
                            style={[
                              styles.itemRow,
                              (!item.on || item.snoozed) && styles.itemRowMuted,
                              isRtl && styles.itemRowRtl,
                            ]}
                          >
                            <UiText style={styles.itemIc}>{item.icon}</UiText>
                            <View style={styles.itemInfo}>
                              <UiText style={styles.itemNm}>{item.name}</UiText>
                              <View style={[styles.priceRow, isRtl && styles.priceRowRtl]}>
                                {item.snoozed ? (
                                  <View style={styles.snoozeBadge}>
                                    <UiText style={styles.snoozeBadgeTxt}>
                                      {copy.snoozedBadge}
                                    </UiText>
                                  </View>
                                ) : null}
                                <UiText style={styles.itemPrice}>{item.priceLine}</UiText>
                              </View>
                            </View>
                            <Toggle
                              value={item.on}
                              onChange={(v) => setItemOn(cat.id, item.id, v)}
                            />
                          </View>
                          {item.subs && item.subs.length > 0 ? (
                            <View style={styles.subs}>
                              {item.subs.map((sub) => (
                                <View
                                  key={sub.id}
                                  style={[styles.subRow, isRtl && styles.subRowRtl]}
                                >
                                  <UiText style={styles.subNm}>{sub.name}</UiText>
                                  <UiText style={styles.subPrice}>{sub.price}</UiText>
                                  <Toggle
                                    value={sub.on}
                                    onChange={(v) => setSubOn(cat.id, item.id, sub.id, v)}
                                  />
                                </View>
                              ))}
                            </View>
                          ) : null}
                        </View>
                      ))}
                    </View>
                  ) : null}
                </View>
              );
            })}
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
                onSnoozeSelection?.();
              }}
              style={({ pressed }) => [styles.btnSnoozeChip, pressed && styles.pressed]}
            >
              <Ionicons name="alarm-outline" size={14} color={COLORS.portalInk} />
              <UiText style={styles.btnSnoozeChipTxt}>{copy.snoozeSelection}</UiText>
            </Pressable>
            <Pressable
              onPress={() => {
                onSave?.();
                onClose();
              }}
              style={({ pressed }) => [styles.btnSave, pressed && styles.pressed]}
            >
              <UiText style={styles.btnSaveTxt}>{copy.saveChanges}</UiText>
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
    paddingHorizontal: SPACING.md,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    width: "100%",
    maxWidth: 560,
    maxHeight: "90%",
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
  closeBtnLtr: {
    right: SPACING.sm,
  },
  closeBtnRtl: {
    left: SPACING.sm,
  },
  kicker: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: COLORS.ink4,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  titleRow: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
    gap: SPACING.xs,
  },
  titleRowRtl: {
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 18,
    letterSpacing: -0.4,
    color: COLORS.portalInk,
    textAlign: "left",
  },
  titleRtl: {
    textAlign: "right",
  },
  statsInline: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 2,
  },
  statsInlineRtl: {
    flexDirection: "row-reverse",
  },
  statTiny: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink3,
  },
  statSnoozedMuted: {
    color: COLORS.neonOrange,
  },
  statStrong: {
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.portalInk,
  },
  statStrongAccent: {
    color: COLORS.neonOrange,
  },
  dotSep: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
  },
  scroll: {
    maxHeight: 420,
  },
  scrollBody: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  cat: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.hairline,
    paddingVertical: SPACING.xs,
  },
  catHeadRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  catHeadRowRtl: {
    flexDirection: "row-reverse",
  },
  catHeadMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  catHeadMainRtl: {
    flexDirection: "row-reverse",
  },
  chev: {
    width: 22,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-90deg" }],
  },
  chevOpen: {
    transform: [{ rotate: "0deg" }],
  },
  catIc: {
    fontSize: 20,
  },
  catHeadText: {
    flex: 1,
    gap: 2,
  },
  catNm: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 14,
    color: COLORS.portalInk,
  },
  catSubCount: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
  },
  items: {
    paddingStart: 28,
    paddingBottom: SPACING.sm,
    gap: SPACING.xs,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
  },
  itemRowRtl: {
    flexDirection: "row-reverse",
  },
  itemRowMuted: {
    opacity: 0.72,
  },
  itemIc: {
    fontSize: 18,
    width: 28,
    textAlign: "center",
  },
  itemInfo: {
    flex: 1,
    gap: 2,
  },
  itemNm: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  priceRowRtl: {
    flexDirection: "row-reverse",
  },
  snoozeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.neonOrange,
  },
  snoozeBadgeTxt: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 9,
    letterSpacing: 0.4,
    color: COLORS.neonOrange,
  },
  itemPrice: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink3,
  },
  subs: {
    marginStart: 38,
    marginBottom: SPACING.xs,
    paddingStart: SPACING.sm,
    borderStartWidth: 2,
    borderStartColor: COLORS.hairline,
    gap: SPACING.xs,
  },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingVertical: 6,
  },
  subRowRtl: {
    flexDirection: "row-reverse",
  },
  subNm: {
    flex: 1,
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: COLORS.ink3,
  },
  subPrice: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: COLORS.portalInk,
  },
  toggleTrack: {
    width: 44,
    height: 26,
    borderRadius: 13,
    paddingHorizontal: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
    flexDirection: "row",
    alignItems: "center",
  },
  toggleTrackJustifyStart: {
    justifyContent: "flex-start",
  },
  toggleTrackJustifyEnd: {
    justifyContent: "flex-end",
  },
  toggleTrackOn: {
    backgroundColor: COLORS.portalInk,
    borderColor: COLORS.portalInk,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  foot: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.hairline,
  },
  footRtl: {
    flexDirection: "row-reverse",
  },
  btnCancel: {
    flexGrow: 1,
    minWidth: 100,
    height: 44,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  btnCancelTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  btnSnoozeChip: {
    flexGrow: 1,
    flexDirection: "row",
    minWidth: 120,
    height: 44,
    gap: 8,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  btnSnoozeChipTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.portalInk,
  },
  btnSave: {
    flexGrow: 1,
    minWidth: 120,
    height: 44,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.portalInk,
  },
  btnSaveTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.88,
  },
});
