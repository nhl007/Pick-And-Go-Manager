import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

import { UiButton } from "../ui/UiButton";

export type PromoTemplateDef = {
  key: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  tag: string;
  title: string;
  desc: string;
  statLine1: string;
  statLine1Bold: string;
  statLine2: string;
  createLabel: string;
  featured?: boolean;
};

type ControlPromoTemplatesPanelProps = {
  panelTitle: string;
  templates: PromoTemplateDef[];
  featuredBadgeLabel: string;
  onCreate: (key: string) => void;
};

export function ControlPromoTemplatesPanel({
  panelTitle,
  templates,
  featuredBadgeLabel,
  onCreate,
}: ControlPromoTemplatesPanelProps) {
  return (
    <>
      <UiText style={[controlStyles.panelTitle, styles.panelTitleMerged]}>
        {panelTitle}
      </UiText>
      <View style={styles.promoGrid}>
        {templates.map((tmpl) => (
          <View
            key={tmpl.key}
            style={[styles.promoTemplate, tmpl.featured && styles.promoTemplateFeatured]}
          >
            <View style={styles.promoHead}>
              <View style={styles.promoHeadContent}>
                <View style={styles.promoIc}>
                  <Ionicons name={tmpl.icon} size={20} color={COLORS.portalInk} />
                  <UiText style={styles.promoTag}>{tmpl.tag}</UiText>
                </View>
                {tmpl.featured ? (
                  <View style={styles.featuredBadge}>
                    <UiText style={styles.featuredBadgeText}>{featuredBadgeLabel}</UiText>
                  </View>
                ) : null}
              </View>
            </View>
            <UiText style={styles.promoTitle}>{tmpl.title}</UiText>
            <UiText style={styles.promoDesc}>{tmpl.desc}</UiText>
            <View style={styles.promoStats}>
              <UiText style={styles.promoStatLine}>
                {tmpl.statLine1}
                <UiText style={styles.promoStatHi}>{tmpl.statLine1Bold}</UiText>
              </UiText>
              <UiText style={styles.promoStatLineMuted}>{tmpl.statLine2}</UiText>
            </View>
            <UiButton
              variant="outline"
              onPress={() => {
                onCreate(tmpl.key);
              }}
              height={40}
            >
              <UiText style={styles.btnLaunchText}>{tmpl.createLabel}</UiText>
            </UiButton>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  merged: {
    paddingBottom: SPACING.lg,
  },
  panelTitleMerged: {
    marginBottom: SPACING.md,
  },
  promoGrid: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 12,
  },
  promoHeadContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    justifyContent: "space-between",
  },
  promoTemplate: {
    flex: 1,
    maxWidth: "24.2%",
    minWidth: 0,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  promoTemplateFeatured: {
    borderColor: COLORS.neonOrange,
    borderWidth: 2,
  },
  featuredBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: COLORS.neonOrange,
  },
  featuredBadgeText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 9,
    letterSpacing: 0.6,
    color: COLORS.white,
    textTransform: "uppercase",
  },
  promoHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  promoIc: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  promoTag: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    letterSpacing: 0.6,
    color: COLORS.neonOrange,
    textTransform: "uppercase",
  },
  promoTitle: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 14,
    color: COLORS.portalInk,
    lineHeight: 18,
  },
  promoDesc: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink3,
    lineHeight: 15,
  },
  promoStats: {
    gap: 4,
    marginTop: 4,
  },
  promoStatLine: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink3,
  },
  promoStatHi: {
    fontFamily: "Inter_900Black",
    color: COLORS.portalInk,
  },
  promoStatLineMuted: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
  },
  btnLaunch: {
    marginTop: SPACING.sm,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.portalInk,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  btnLaunchText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 12,
    color: COLORS.portalInk,
  },
});
