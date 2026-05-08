import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

import { COLORS, FONT_FAMILIES } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useRequiredBlurTargetRef } from "@/hooks/useBlurTargetRef";

type SearchItem = {
  id: string;
  keywords: string;
  icon: string;
  titleKey: string;
  subtitleKey: string;
  rightKey: string;
  onPress?: () => void;
  iconDimmed?: boolean;
};

type SearchSection = {
  id: string;
  labelKey: string;
  items: SearchItem[];
};

function Kbd({ children }: { children: string }) {
  return (
    <View style={styles.kbd}>
      <Text style={styles.kbdText}>{children}</Text>
    </View>
  );
}

function SearchIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Circle cx={11} cy={11} r={8} stroke={COLORS.ink4} strokeWidth={2} fill="none" />
      <Line
        x1={21}
        y1={21}
        x2={16.65}
        y2={16.65}
        stroke={COLORS.ink4}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function SearchRow({
  isActive,
  item,
  onPress,
  title,
  subtitle,
  right,
}: {
  isActive: boolean;
  item: SearchItem;
  onPress?: () => void;
  title: string;
  subtitle: string;
  right: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.searchItem,
        (pressed || isActive) && styles.searchItemOn,
        !onPress && styles.searchItemDisabled,
      ]}
    >
      <View style={[styles.siIcon, item.iconDimmed && styles.siIconDimmed]}>
        <Text style={styles.siIconText}>{item.icon}</Text>
      </View>

      <View style={styles.siInfo}>
        <Text numberOfLines={1} style={styles.siTitle}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.siSubtitle}>
          {subtitle}
        </Text>
      </View>

      <Text numberOfLines={1} style={styles.siRight}>
        {right}
      </Text>
    </Pressable>
  );
}

export default function SearchScreen() {
  const { t } = useAppTranslation();
  const inputRef = useRef<TextInput>(null);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const [activeRowId, setActiveRowId] = useState<string | null>(null);

  const close = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/(main)/(tabs)/intelligence");
  }, []);

  const sections = useMemo<SearchSection[]>(() => {
    return [
      {
        id: "quick-actions",
        labelKey: "searchModal.quickActions",
        items: [
          {
            id: "qa-waste",
            keywords: "waste log damaged expired food spoiled",
            icon: "💡",
            titleKey: "searchModal.items.logWaste.title",
            subtitleKey: "searchModal.items.logWaste.subtitle",
            rightKey: "searchModal.items.logWaste.right",
            onPress: () => {
              close();
              router.push("/(main)/(tabs)/intelligence");
            },
          },
          {
            id: "qa-payout",
            keywords: "payout request finance balance withdraw dirham money",
            icon: "💰",
            titleKey: "searchModal.items.requestPayout.title",
            subtitleKey: "searchModal.items.requestPayout.subtitle",
            rightKey: "searchModal.items.requestPayout.right",
            onPress: () => {
              close();
              router.push("/(main)/(tabs)/finance");
            },
          },
          {
            id: "qa-message",
            keywords: "sarah ahmed concierge partner message chat insight",
            icon: "💬",
            titleKey: "searchModal.items.messageSarah.title",
            subtitleKey: "searchModal.items.messageSarah.subtitle",
            rightKey: "searchModal.items.messageSarah.right",
            onPress: () => {
              close();
              router.push("/(main)/(tabs)/concierge");
            },
          },
        ],
      },
      {
        id: "recent-searches",
        labelKey: "searchModal.recentSearches",
        items: [
          {
            id: "rs-4826",
            keywords: "order 4826 khalid delivered",
            icon: "🔍",
            iconDimmed: true,
            titleKey: "searchModal.items.recentOrder4826.title",
            subtitleKey: "searchModal.items.recentOrder4826.subtitle",
            rightKey: "searchModal.items.recentOrder4826.right",
          },
          {
            id: "rs-fattoush",
            keywords: "fattoush salad menu item vegan",
            icon: "🔍",
            iconDimmed: true,
            titleKey: "searchModal.items.recentFattoush.title",
            subtitleKey: "searchModal.items.recentFattoush.subtitle",
            rightKey: "searchModal.items.recentFattoush.right",
          },
          {
            id: "rs-vegan",
            keywords: "vegan expansion insight sarah growth",
            icon: "🔍",
            iconDimmed: true,
            titleKey: "searchModal.items.recentVegan.title",
            subtitleKey: "searchModal.items.recentVegan.subtitle",
            rightKey: "searchModal.items.recentVegan.right",
          },
        ],
      },
      {
        id: "jump",
        labelKey: "searchModal.jumpToSection",
        items: [
          {
            id: "j-live",
            keywords: "live intelligence monitoring real-time pulse operations",
            icon: "⚡",
            titleKey: "searchModal.items.jumpLive.title",
            subtitleKey: "searchModal.items.jumpLive.subtitle",
            rightKey: "searchModal.items.jumpLive.right",
            onPress: () => {
              close();
              router.push("/(main)/(tabs)/intelligence");
            },
          },
          {
            id: "j-finance",
            keywords: "finance payouts revenue commission tier diamond",
            icon: "💰",
            titleKey: "searchModal.items.jumpFinance.title",
            subtitleKey: "searchModal.items.jumpFinance.subtitle",
            rightKey: "searchModal.items.jumpFinance.right",
            onPress: () => {
              close();
              router.push("/(main)/(tabs)/finance");
            },
          },
        ],
      },
    ];
  }, [close]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    if (!normalizedQuery) return sections;

    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          `${item.keywords} ${t(item.titleKey)} ${t(item.subtitleKey)}`
            .toLowerCase()
            .includes(normalizedQuery),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [normalizedQuery, sections, t]);

  const allRowIds = useMemo(() => {
    return filteredSections.flatMap((section) => section.items.map((it) => it.id));
  }, [filteredSections]);

  useEffect(() => {
    const next = allRowIds[0] ?? null;
    setActiveRowId(next);
  }, [allRowIds]);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!activeRowId) return;

        const idx = allRowIds.indexOf(activeRowId);
        const delta = e.key === "ArrowDown" ? 1 : -1;
        const nextIdx = Math.min(Math.max(idx + delta, 0), allRowIds.length - 1);
        setActiveRowId(allRowIds[nextIdx] ?? null);
        return;
      }

      if (e.key === "Enter") {
        if (!activeRowId) return;
        const target = filteredSections
          .flatMap((s) => s.items)
          .find((it) => it.id === activeRowId);
        target?.onPress?.();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeRowId, allRowIds, close, filteredSections]);

  const modalWidth = Math.min(540, windowWidth * 0.82);
  const modalMaxHeight = windowHeight * 0.78;

  const blurTargetRef = useRequiredBlurTargetRef();

  return (
    <View style={styles.root}>
      <View style={[StyleSheet.absoluteFill, styles.backdropTint]} />
      <Pressable onPress={close} style={StyleSheet.absoluteFill}>
        <BlurView
          blurTarget={blurTargetRef}
          style={StyleSheet.absoluteFill}
          intensity={60}
          tint="dark"
          blurMethod="dimezisBlurViewSdk31Plus"
        />
      </Pressable>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.centering}
      >
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
          }}
          style={styles.innerPressable}
        >
          <View style={[styles.modal, { width: modalWidth, maxHeight: modalMaxHeight }]}>
            <View style={styles.searchBox}>
              <SearchIcon />
              <TextInput
                ref={inputRef}
                value={query}
                onChangeText={setQuery}
                placeholder={t("searchModal.placeholder")}
                placeholderTextColor={COLORS.ink5}
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.input}
              />
              <Kbd>{t("searchModal.esc")}</Kbd>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              style={styles.searchResults}
              contentContainerStyle={styles.results}
            >
              {filteredSections.map((section) => (
                <View key={section.id}>
                  <Text style={styles.label}>{t(section.labelKey)}</Text>
                  {section.items.map((item) => {
                    const title = t(item.titleKey);
                    const subtitle = t(item.subtitleKey);
                    const right = t(item.rightKey);
                    const onPress = item.onPress;

                    return (
                      <SearchRow
                        key={item.id}
                        isActive={activeRowId === item.id}
                        item={item}
                        onPress={onPress}
                        title={title}
                        subtitle={subtitle}
                        right={right}
                      />
                    );
                  })}
                </View>
              ))}
            </ScrollView>

            <View style={styles.footer}>
              <View style={styles.footerLeft}>
                <View style={styles.footerInline}>
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                  <Text style={styles.footerText}>
                    {t("searchModal.footer.navigate")}
                  </Text>
                </View>
                <Text style={styles.footerDot}> · </Text>
                <View style={styles.footerInline}>
                  <Kbd>↵</Kbd>
                  <Text style={styles.footerText}>{t("searchModal.footer.select")}</Text>
                </View>
                <Text style={styles.footerDot}> · </Text>
                <View style={styles.footerInline}>
                  <Kbd>{t("searchModal.esc")}</Kbd>
                  <Text style={styles.footerText}>{t("searchModal.footer.close")}</Text>
                </View>
              </View>

              <View style={styles.footerRight}>
                <Text style={styles.footerText}>
                  {t("searchModal.footer.openAnywherePrefix")}
                </Text>
                <View style={styles.footerInline}>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backdropBlur: Platform.select({
    web: {
      // RN web supports these CSS properties; native will ignore.
      ...({
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
      } as unknown as Record<string, unknown>),
    },
    default: {},
  }),
  backdropTint: {
    backgroundColor: "rgba(0,0,0,0.38)",
  },
  centering: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "9%",
  },
  innerPressable: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  modal: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.35,
    shadowRadius: 40,
    elevation: 24,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.hairline,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 0,
    color: COLORS.portalInk,
    fontFamily: FONT_FAMILIES.medium,
    fontSize: 14,
    paddingVertical: 0,
  },
  kbd: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 5,
    backgroundColor: COLORS.blackTertiary,
    borderWidth: 1,
    borderColor: COLORS.hairline,
  },
  kbdText: {
    fontSize: 9,
    fontFamily: FONT_FAMILIES.semiBold,
    color: COLORS.ink4,
    letterSpacing: 0.2,
  },
  results: {
    padding: 8,
  },
  searchResults: {
    flex: 1,
  },
  label: {
    fontSize: 9,
    color: COLORS.ink5,
    fontFamily: FONT_FAMILIES.bold,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 9,
  },
  searchItemOn: {
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  searchItemDisabled: {
    opacity: 1,
  },
  siIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.04)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  siIconDimmed: {
    opacity: 0.65,
  },
  siIconText: {
    fontSize: 14,
    color: COLORS.ink3,
  },
  siInfo: {
    flex: 1,
    minWidth: 0,
  },
  siTitle: {
    fontSize: 12,
    fontFamily: FONT_FAMILIES.semiBold,
    color: COLORS.portalInk,
  },
  siSubtitle: {
    fontSize: 10,
    fontFamily: FONT_FAMILIES.regular,
    color: COLORS.ink4,
    marginTop: 1,
  },
  siRight: {
    fontSize: 9,
    fontFamily: FONT_FAMILIES.medium,
    color: COLORS.ink5,
  },
  footer: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.hairline,
    backgroundColor: "rgba(0,0,0,0.015)",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    flexShrink: 1,
  },
  footerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
  },
  footerInline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 10,
    fontFamily: FONT_FAMILIES.regular,
    color: COLORS.ink4,
    flexShrink: 1,
  },
  footerDot: {
    fontSize: 10,
    fontFamily: FONT_FAMILIES.regular,
    color: COLORS.ink4,
  },
});
