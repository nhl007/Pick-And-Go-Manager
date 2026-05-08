import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { COLORS, FONT_FAMILIES } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";

import {
  IconAlertTriangle,
  IconAward,
  IconBars,
  IconCalendar,
  IconChat,
  IconCheck,
  IconClock,
  IconDollar,
  IconDownload,
  IconFile,
  IconPulse,
  IconRefresh,
  IconStar,
  IconUser,
  IconX,
} from "./notifications.icons";

type NotifCategory = "urgent" | "admin" | "system" | "platform" | "finance";
type FilterCategory = "all" | NotifCategory;

type NotifItem = {
  id: string;
  category: NotifCategory;
  unread: boolean;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  titleKey: string;
  subKey: string;
  metaLeftKey: string;
  metaRightKey: string;
};

type NotifGroup = {
  category: NotifCategory;
  dotColor: string;
  headerKey: string;
  items: NotifItem[];
};

function NotifFilterButton({
  label,
  count,
  isOn,
  onPress,
}: {
  label: string;
  count: number;
  isOn: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.filter,
        isOn && styles.filterOn,
        pressed && !isOn && styles.filterPressed,
      ]}
    >
      <Text style={[styles.filterText, isOn && styles.filterTextOn]}>{label}</Text>
      <View style={[styles.filterCount, isOn && styles.filterCountOn]}>
        <Text style={[styles.filterCountText, isOn && styles.filterCountTextOn]}>
          {count}
        </Text>
      </View>
    </Pressable>
  );
}

function createGroups(): NotifGroup[] {
  const urgentColor = COLORS.neonRed;
  const platformDot = "#7c3aed";
  const financeDot = COLORS.trendPositiveDeep;

  const mk = (p: Omit<NotifItem, "icon"> & { iconName: string }) => {
    const icon = (() => {
      if (p.iconName === "alert") return <IconAlertTriangle color={p.iconColor} />;
      if (p.iconName === "clock") return <IconClock color={p.iconColor} />;
      if (p.iconName === "check") return <IconCheck color={p.iconColor} />;
      if (p.iconName === "user") return <IconUser color={p.iconColor} />;
      if (p.iconName === "calendar") return <IconCalendar color={p.iconColor} />;
      if (p.iconName === "file") return <IconFile color={p.iconColor} />;
      if (p.iconName === "award") return <IconAward color={p.iconColor} />;
      if (p.iconName === "pulse") return <IconPulse color={p.iconColor} />;
      if (p.iconName === "download") return <IconDownload color={p.iconColor} />;
      if (p.iconName === "refresh") return <IconRefresh color={p.iconColor} />;
      if (p.iconName === "bars") return <IconBars color={p.iconColor} />;
      if (p.iconName === "star") return <IconStar color={p.iconColor} />;
      if (p.iconName === "chat") return <IconChat color={p.iconColor} />;
      if (p.iconName === "dollar") return <IconDollar color={p.iconColor} />;
      return null;
    })();

    return { ...p, icon };
  };

  return [
    {
      category: "urgent",
      dotColor: urgentColor,
      headerKey: "notificationsDrawer.groups.urgent",
      items: [
        mk({
          id: "urgent-connection",
          category: "urgent",
          unread: true,
          iconBg: "rgba(255,51,85,.13)",
          iconColor: urgentColor,
          iconName: "alert",
          titleKey: "notificationsDrawer.items.urgentConnectionLostTitle",
          subKey: "notificationsDrawer.items.urgentConnectionLostSub",
          metaLeftKey: "notificationsDrawer.items.urgentConnectionLostMetaLeft",
          metaRightKey: "notificationsDrawer.items.urgentConnectionLostMetaRight",
        }),
        mk({
          id: "urgent-late-shift",
          category: "urgent",
          unread: true,
          iconBg: "rgba(255,51,85,.13)",
          iconColor: urgentColor,
          iconName: "clock",
          titleKey: "notificationsDrawer.items.urgentLateShiftTitle",
          subKey: "notificationsDrawer.items.urgentLateShiftSub",
          metaLeftKey: "notificationsDrawer.items.urgentLateShiftMetaLeft",
          metaRightKey: "notificationsDrawer.items.urgentLateShiftMetaRight",
        }),
      ],
    },
    {
      category: "admin",
      dotColor: COLORS.sky500,
      headerKey: "notificationsDrawer.groups.admin",
      items: [
        mk({
          id: "admin-clean",
          category: "admin",
          unread: true,
          iconBg: "rgba(14,165,233,.12)",
          iconColor: "#0369a1",
          iconName: "check",
          titleKey: "notificationsDrawer.items.adminCleanlinessTitle",
          subKey: "notificationsDrawer.items.adminCleanlinessSub",
          metaLeftKey: "notificationsDrawer.items.adminCleanlinessMetaLeft",
          metaRightKey: "notificationsDrawer.items.adminCleanlinessMetaRight",
        }),
        mk({
          id: "admin-handover",
          category: "admin",
          unread: true,
          iconBg: "rgba(14,165,233,.12)",
          iconColor: "#0369a1",
          iconName: "user",
          titleKey: "notificationsDrawer.items.adminHandoverTitle",
          subKey: "notificationsDrawer.items.adminHandoverSub",
          metaLeftKey: "notificationsDrawer.items.adminHandoverMetaLeft",
          metaRightKey: "notificationsDrawer.items.adminHandoverMetaRight",
        }),
        mk({
          id: "admin-schedule",
          category: "admin",
          unread: false,
          iconBg: "rgba(14,165,233,.12)",
          iconColor: "#0369a1",
          iconName: "calendar",
          titleKey: "notificationsDrawer.items.adminScheduleUpdatedTitle",
          subKey: "notificationsDrawer.items.adminScheduleUpdatedSub",
          metaLeftKey: "notificationsDrawer.items.adminScheduleUpdatedMetaLeft",
          metaRightKey: "notificationsDrawer.items.adminScheduleUpdatedMetaRight",
        }),
        mk({
          id: "admin-review",
          category: "admin",
          unread: false,
          iconBg: "rgba(14,165,233,.12)",
          iconColor: "#0369a1",
          iconName: "file",
          titleKey: "notificationsDrawer.items.adminReviewScheduledTitle",
          subKey: "notificationsDrawer.items.adminReviewScheduledSub",
          metaLeftKey: "notificationsDrawer.items.adminReviewScheduledMetaLeft",
          metaRightKey: "notificationsDrawer.items.adminReviewScheduledMetaRight",
        }),
      ],
    },
    {
      category: "system",
      dotColor: "#64748b",
      headerKey: "notificationsDrawer.groups.system",
      items: [
        mk({
          id: "system-tier",
          category: "system",
          unread: true,
          iconBg: "rgba(255,229,0,.13)",
          iconColor: "#B86200",
          iconName: "award",
          titleKey: "notificationsDrawer.items.systemTierAlertTitle",
          subKey: "notificationsDrawer.items.systemTierAlertSub",
          metaLeftKey: "notificationsDrawer.items.systemTierAlertMetaLeft",
          metaRightKey: "notificationsDrawer.items.systemTierAlertMetaRight",
        }),
        mk({
          id: "system-dispatch",
          category: "system",
          unread: true,
          iconBg: "rgba(100,116,139,.12)",
          iconColor: "#475569",
          iconName: "pulse",
          titleKey: "notificationsDrawer.items.systemDispatchAssignedTitle",
          subKey: "notificationsDrawer.items.systemDispatchAssignedSub",
          metaLeftKey: "notificationsDrawer.items.systemDispatchAssignedMetaLeft",
          metaRightKey: "notificationsDrawer.items.systemDispatchAssignedMetaRight",
        }),
        mk({
          id: "system-report",
          category: "system",
          unread: true,
          iconBg: "rgba(100,116,139,.12)",
          iconColor: "#475569",
          iconName: "download",
          titleKey: "notificationsDrawer.items.systemDailyReportReadyTitle",
          subKey: "notificationsDrawer.items.systemDailyReportReadySub",
          metaLeftKey: "notificationsDrawer.items.systemDailyReportReadyMetaLeft",
          metaRightKey: "notificationsDrawer.items.systemDailyReportReadyMetaRight",
        }),
        mk({
          id: "system-sync",
          category: "system",
          unread: false,
          iconBg: "rgba(100,116,139,.12)",
          iconColor: "#475569",
          iconName: "refresh",
          titleKey: "notificationsDrawer.items.systemLiveFeedUpdatedTitle",
          subKey: "notificationsDrawer.items.systemLiveFeedUpdatedSub",
          metaLeftKey: "notificationsDrawer.items.systemLiveFeedUpdatedMetaLeft",
          metaRightKey: "notificationsDrawer.items.systemLiveFeedUpdatedMetaRight",
        }),
        mk({
          id: "system-analytics",
          category: "system",
          unread: false,
          iconBg: "rgba(100,116,139,.12)",
          iconColor: "#475569",
          iconName: "bars",
          titleKey: "notificationsDrawer.items.systemAnalyticsRefreshedTitle",
          subKey: "notificationsDrawer.items.systemAnalyticsRefreshedSub",
          metaLeftKey: "notificationsDrawer.items.systemAnalyticsRefreshedMetaLeft",
          metaRightKey: "notificationsDrawer.items.systemAnalyticsRefreshedMetaRight",
        }),
      ],
    },
    {
      category: "platform",
      dotColor: platformDot,
      headerKey: "notificationsDrawer.groups.platform",
      items: [
        mk({
          id: "platform-festival",
          category: "platform",
          unread: true,
          iconBg: "rgba(124,58,237,.13)",
          iconColor: platformDot,
          iconName: "star",
          titleKey: "notificationsDrawer.items.platformFestivalApprovedTitle",
          subKey: "notificationsDrawer.items.platformFestivalApprovedSub",
          metaLeftKey: "notificationsDrawer.items.platformFestivalApprovedMetaLeft",
          metaRightKey: "notificationsDrawer.items.platformFestivalApprovedMetaRight",
        }),
        mk({
          id: "platform-reply",
          category: "platform",
          unread: true,
          iconBg: "rgba(124,58,237,.13)",
          iconColor: platformDot,
          iconName: "chat",
          titleKey: "notificationsDrawer.items.platformSarahRepliedTitle",
          subKey: "notificationsDrawer.items.platformSarahRepliedSub",
          metaLeftKey: "notificationsDrawer.items.platformSarahRepliedMetaLeft",
          metaRightKey: "notificationsDrawer.items.platformSarahRepliedMetaRight",
        }),
        mk({
          id: "platform-eid",
          category: "platform",
          unread: false,
          iconBg: "rgba(124,58,237,.13)",
          iconColor: platformDot,
          iconName: "file",
          titleKey: "notificationsDrawer.items.platformEidTermsUpdatedTitle",
          subKey: "notificationsDrawer.items.platformEidTermsUpdatedSub",
          metaLeftKey: "notificationsDrawer.items.platformEidTermsUpdatedMetaLeft",
          metaRightKey: "notificationsDrawer.items.platformEidTermsUpdatedMetaRight",
        }),
      ],
    },
    {
      category: "finance",
      dotColor: financeDot,
      headerKey: "notificationsDrawer.groups.finance",
      items: [
        mk({
          id: "finance-payout",
          category: "finance",
          unread: true,
          iconBg: "rgba(0,160,80,.12)",
          iconColor: "#8B6F00",
          iconName: "dollar",
          titleKey: "notificationsDrawer.items.financeWeeklyPayoutTitle",
          subKey: "notificationsDrawer.items.financeWeeklyPayoutSub",
          metaLeftKey: "notificationsDrawer.items.financeWeeklyPayoutMetaLeft",
          metaRightKey: "notificationsDrawer.items.financeWeeklyPayoutMetaRight",
        }),
        mk({
          id: "finance-invoice",
          category: "finance",
          unread: true,
          iconBg: "rgba(0,160,80,.12)",
          iconColor: "#8B6F00",
          iconName: "file",
          titleKey: "notificationsDrawer.items.financeInvoiceAvailableTitle",
          subKey: "notificationsDrawer.items.financeInvoiceAvailableSub",
          metaLeftKey: "notificationsDrawer.items.financeInvoiceAvailableMetaLeft",
          metaRightKey: "notificationsDrawer.items.financeInvoiceAvailableMetaRight",
        }),
        mk({
          id: "finance-commission",
          category: "finance",
          unread: false,
          iconBg: "rgba(0,160,80,.12)",
          iconColor: "#8B6F00",
          iconName: "pulse",
          titleKey: "notificationsDrawer.items.financeCommissionAddedTitle",
          subKey: "notificationsDrawer.items.financeCommissionAddedSub",
          metaLeftKey: "notificationsDrawer.items.financeCommissionAddedMetaLeft",
          metaRightKey: "notificationsDrawer.items.financeCommissionAddedMetaRight",
        }),
      ],
    },
  ];
}

export function NotificationsDrawerModal() {
  const { t } = useAppTranslation();
  const { width: windowWidth } = useWindowDimensions();

  const close = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/(main)/(tabs)/intelligence");
  }, []);

  const [groups, setGroups] = useState<NotifGroup[]>(() => createGroups());
  const [filter, setFilter] = useState<FilterCategory>("all");

  const flatItems = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const totalCount = flatItems.length;
  const unreadCount = flatItems.filter((i) => i.unread).length;

  const filteredGroups = useMemo(() => {
    if (filter === "all") return groups;
    return groups.filter((g) => g.category === filter);
  }, [filter, groups]);

  const countsByCategory = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      all: flatItems.length,
      urgent: 0,
      admin: 0,
      system: 0,
      platform: 0,
      finance: 0,
    };

    for (const it of flatItems) {
      counts[it.category] += 1;
    }

    return counts;
  }, [flatItems]);

  const markAllRead = useCallback(() => {
    setGroups((prev) =>
      prev.map((g) => ({ ...g, items: g.items.map((it) => ({ ...it, unread: false })) })),
    );
  }, []);

  const markRead = useCallback((id: string) => {
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        items: g.items.map((it) => (it.id === id ? { ...it, unread: false } : it)),
      })),
    );
  }, []);

  const panelWidth = Math.min(440, windowWidth * 0.92);

  return (
    <View style={styles.root}>
      <Pressable onPress={close} style={StyleSheet.absoluteFill} />

      <View style={[StyleSheet.absoluteFill, styles.backdropTint]} />

      <View style={styles.row}>
        <Pressable onPress={close} style={styles.spacer} />

        <View style={[styles.panel, { width: panelWidth }]}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{t("notificationsDrawer.title")}</Text>

              <Text style={styles.sub}>
                {t("notificationsDrawer.unreadAndTotal", {
                  unread: unreadCount,
                  total: totalCount,
                })}
              </Text>
            </View>

            <View style={styles.headerActions}>
              <Pressable
                onPress={markAllRead}
                style={({ pressed }) => [
                  styles.markAll,
                  pressed && styles.markAllPressed,
                ]}
              >
                <IconCheck color={COLORS.portalInk} />
                <Text style={styles.markAllText}>
                  {t("notificationsDrawer.markAllRead")}
                </Text>
              </Pressable>

              <Pressable
                accessibilityLabel={t("notificationsDrawer.close")}
                onPress={close}
                style={({ pressed }) => [
                  styles.closeBtn,
                  pressed && styles.closeBtnPressed,
                ]}
              >
                <IconX color={COLORS.ink3} />
              </Pressable>
            </View>
          </View>

          <ScrollView
            horizontal
            style={{
              flexGrow: 0,
              flexShrink: 0,
            }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filters}
          >
            <NotifFilterButton
              label={t("notificationsDrawer.filters.all")}
              count={countsByCategory.all}
              isOn={filter === "all"}
              onPress={() => {
                setFilter("all");
              }}
            />
            <NotifFilterButton
              label={`🔴 ${t("notificationsDrawer.filters.urgent")}`}
              count={countsByCategory.urgent}
              isOn={filter === "urgent"}
              onPress={() => {
                setFilter("urgent");
              }}
            />
            <NotifFilterButton
              label={`👤 ${t("notificationsDrawer.filters.admin")}`}
              count={countsByCategory.admin}
              isOn={filter === "admin"}
              onPress={() => {
                setFilter("admin");
              }}
            />
            <NotifFilterButton
              label={`⚙ ${t("notificationsDrawer.filters.system")}`}
              count={countsByCategory.system}
              isOn={filter === "system"}
              onPress={() => {
                setFilter("system");
              }}
            />
            <NotifFilterButton
              label={`🏢 ${t("notificationsDrawer.filters.platform")}`}
              count={countsByCategory.platform}
              isOn={filter === "platform"}
              onPress={() => {
                setFilter("platform");
              }}
            />
            <NotifFilterButton
              label={`💳 ${t("notificationsDrawer.filters.finance")}`}
              count={countsByCategory.finance}
              isOn={filter === "finance"}
              onPress={() => {
                setFilter("finance");
              }}
            />
          </ScrollView>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
            {filteredGroups.map((group) => {
              const groupUnread = group.items.filter((i) => i.unread).length;

              return (
                <View key={group.category} style={styles.group}>
                  <View style={styles.groupHead}>
                    <View
                      style={[
                        styles.catDot,
                        { backgroundColor: group.dotColor, shadowColor: group.dotColor },
                      ]}
                    />
                    <Text style={styles.catName}>{t(group.headerKey)}</Text>
                    <Text style={styles.catCount}>
                      {t("notificationsDrawer.unreadCount", { count: groupUnread })}
                    </Text>
                  </View>

                  {group.items.map((item) => (
                    <Pressable
                      key={item.id}
                      onPress={() => {
                        markRead(item.id);
                      }}
                      style={({ pressed }) => [
                        styles.item,
                        item.unread ? styles.itemUnread : styles.itemRead,
                        pressed && styles.itemPressed,
                      ]}
                    >
                      {item.unread ? (
                        <View style={styles.unreadDot} />
                      ) : (
                        <View style={styles.unreadDotSpacer} />
                      )}
                      <View style={[styles.notifIcon, { backgroundColor: item.iconBg }]}>
                        {item.icon}
                      </View>

                      <View style={styles.itemBody}>
                        <Text
                          numberOfLines={2}
                          style={[
                            styles.itemTitle,
                            item.unread && styles.itemTitleUnread,
                          ]}
                        >
                          {t(item.titleKey)}
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={[styles.itemSub, !item.unread && styles.itemSubRead]}
                        >
                          {t(item.subKey)}
                        </Text>
                        <View style={styles.metaRow}>
                          <Text style={styles.metaText}>{t(item.metaLeftKey)}</Text>
                          <Text style={styles.metaText}>·</Text>
                          <Text style={styles.metaText}>{t(item.metaRightKey)}</Text>
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.footerHint}>{t("notificationsDrawer.footerHint")}</Text>
            <Pressable
              style={({ pressed }) => [styles.viewAll, pressed && styles.viewAllPressed]}
            >
              <Text style={styles.viewAllText}>
                {t("notificationsDrawer.viewArchived")}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  backdropTint: { backgroundColor: "rgba(0,0,0,0.38)" },
  row: { flex: 1, flexDirection: "row", justifyContent: "flex-end" },
  spacer: { flex: 1 },
  panel: {
    height: "100%",
    backgroundColor: "#ededed",
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255,255,255,0.4)",
    shadowColor: COLORS.black,
    shadowOffset: { width: -12, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.hairline,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: FONT_FAMILIES.black,
    color: COLORS.portalInk,
    letterSpacing: -0.6,
    lineHeight: 20,
    marginBottom: 6,
  },
  sub: { fontSize: 11, fontFamily: FONT_FAMILIES.bold, color: COLORS.ink4 },
  subStrong: { color: COLORS.portalInk, fontFamily: FONT_FAMILIES.black },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 6 },
  markAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 11,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.hairline,
    borderRadius: 8,
  },
  markAllPressed: { borderColor: COLORS.portalInk, backgroundColor: "#fafafa" },
  markAllText: { fontSize: 10, fontFamily: FONT_FAMILIES.extraBold, color: COLORS.ink2 },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceCanvas,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnPressed: { backgroundColor: COLORS.hairline },
  filters: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.hairline,
    gap: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 11,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.hairline,
    borderRadius: 14,
  },
  filterPressed: { borderColor: COLORS.ink3 },
  filterOn: { backgroundColor: COLORS.portalInk, borderColor: COLORS.portalInk },
  filterText: { fontSize: 10, fontFamily: FONT_FAMILIES.bold, color: COLORS.ink3 },
  filterTextOn: { color: COLORS.white },
  filterCount: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceCanvas,
  },
  filterCountOn: { backgroundColor: "rgba(255,255,255,0.18)" },
  filterCountText: { fontSize: 9, fontFamily: FONT_FAMILIES.black, color: COLORS.ink4 },
  filterCountTextOn: { color: COLORS.white },
  list: { flex: 1, paddingVertical: 4 },
  group: { marginBottom: 6 },
  groupHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 8,
    backgroundColor: "#fafafa",
  },
  catDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  catName: {
    fontSize: 10,
    fontFamily: FONT_FAMILIES.black,
    color: COLORS.portalInk,
    letterSpacing: 0.2,
    textTransform: "uppercase",
  },
  catCount: {
    marginLeft: "auto",
    fontSize: 9,
    fontFamily: FONT_FAMILIES.extraBold,
    color: COLORS.ink4,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  item: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.04)",
  },
  itemPressed: { backgroundColor: "rgba(255,255,255,0.7)" },
  itemUnread: { backgroundColor: COLORS.white },
  itemRead: { backgroundColor: "transparent" },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: COLORS.sky500,
    shadowColor: COLORS.sky500,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    marginTop: 11,
  },
  unreadDotSpacer: { width: 7, height: 7, marginTop: 11 },
  notifIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemBody: { flex: 1, minWidth: 0 },
  itemTitle: {
    fontSize: 12,
    fontFamily: FONT_FAMILIES.extraBold,
    color: COLORS.portalInk,
    letterSpacing: -0.2,
    lineHeight: 15,
    marginBottom: 3,
  },
  itemTitleUnread: { fontFamily: FONT_FAMILIES.black },
  itemSub: {
    fontSize: 10.5,
    fontFamily: FONT_FAMILIES.medium,
    color: COLORS.ink3,
    lineHeight: 14.7,
    marginBottom: 5,
  },
  itemSubRead: { color: COLORS.ink4 },
  metaRow: { flexDirection: "row", gap: 4, alignItems: "center" },
  metaText: {
    fontSize: 9,
    fontFamily: FONT_FAMILIES.bold,
    color: COLORS.ink4,
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.hairline,
  },
  footerHint: {
    fontSize: 10,
    fontFamily: FONT_FAMILIES.semiBold,
    color: COLORS.ink4,
    flexShrink: 1,
  },
  viewAll: {
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: COLORS.hairline,
    borderRadius: 7,
  },
  viewAllPressed: { borderColor: COLORS.portalInk },
  viewAllText: { fontSize: 10, fontFamily: FONT_FAMILIES.extraBold, color: COLORS.ink2 },
});
