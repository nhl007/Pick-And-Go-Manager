import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { Pressable, View } from "react-native";

import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";
import { UiText } from "@/components/ui/UiText";
import { conciergeStyles } from "@/constants/concierge.styles";
import { controlStyles } from "@/constants/control.styles";

import { UICard } from "../ui/UICard";

type BetaItem = {
  key: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  title: string;
  sub: string;
  detailsLabel: string;
  onDetails: () => void;
  ctaLabel?: string;
  onCta?: () => void;
  activeTag?: string;
};

type EventItem = {
  key: string;
  day: string;
  month: string;
  tag: string;
  title: string;
  sub: string;
  detailsLabel: string;
  onDetails: () => void;
  ctaLabel: string;
  onCta: () => void;
};

type ConciergeBetaEventsSectionProps = {
  isRtl: boolean;
  title: string;
  caption: string;
  beta: {
    title: string;
    badgeLabel: string;
    items: BetaItem[];
  };
  events: {
    title: string;
    badgeLabel: string;
    items: EventItem[];
  };
};

export function ConciergeBetaEventsSection({
  isRtl,
  title,
  caption,
  beta,
  events,
}: ConciergeBetaEventsSectionProps) {
  return (
    <View>
      <ControlSectionHeader title={title} caption={caption} isRtl={isRtl} tightTop />
      <View style={controlStyles.g2}>
        <View style={controlStyles.g2Half}>
          <UICard>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
                flexWrap: "wrap",
              }}
            >
              <UiText style={{ ...controlStyles.panelTitle, marginBottom: 0 }}>
                {beta.title}
              </UiText>
              <View style={conciergeStyles.badgeLive}>
                <View style={conciergeStyles.badgeLiveDot} />
                <UiText style={conciergeStyles.badgeLiveText}>{beta.badgeLabel}</UiText>
              </View>
            </View>
            {beta.items.map((b) => (
              <View
                key={b.key}
                style={[
                  conciergeStyles.betaRow,
                  isRtl && { flexDirection: "row-reverse" },
                ]}
              >
                <View style={conciergeStyles.betaIcon}>
                  <Ionicons name={b.icon} size={18} color="#0A0A0A" />
                </View>
                <View style={conciergeStyles.betaBody}>
                  <UiText style={conciergeStyles.betaTitle}>{b.title}</UiText>
                  <UiText style={conciergeStyles.betaSub}>{b.sub}</UiText>
                  <Pressable accessibilityRole="button" onPress={b.onDetails}>
                    <UiText style={conciergeStyles.betaDetails}>{b.detailsLabel}</UiText>
                  </Pressable>
                </View>
                {b.activeTag ? (
                  <View style={conciergeStyles.betaTag}>
                    <UiText style={conciergeStyles.betaTagText}>{b.activeTag}</UiText>
                  </View>
                ) : (
                  <Pressable
                    accessibilityRole="button"
                    onPress={b.onCta}
                    style={conciergeStyles.betaBtn}
                  >
                    <UiText style={conciergeStyles.betaBtnText}>{b.ctaLabel}</UiText>
                  </Pressable>
                )}
              </View>
            ))}
          </UICard>
        </View>

        <View style={controlStyles.g2Half}>
          <UICard>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
                flexWrap: "wrap",
              }}
            >
              <UiText style={{ ...controlStyles.panelTitle, marginBottom: 0 }}>
                {events.title}
              </UiText>
              <View style={conciergeStyles.badgeNeutral}>
                <UiText style={conciergeStyles.badgeNeutralText}>
                  {events.badgeLabel}
                </UiText>
              </View>
            </View>

            {events.items.map((e) => (
              <View
                key={e.key}
                style={[conciergeStyles.event, isRtl && { flexDirection: "row-reverse" }]}
              >
                <View style={conciergeStyles.eventDate}>
                  <UiText style={conciergeStyles.eventD}>{e.day}</UiText>
                  <UiText style={conciergeStyles.eventM}>{e.month}</UiText>
                </View>
                <View style={conciergeStyles.eventBody}>
                  <UiText style={conciergeStyles.eventTag}>{e.tag}</UiText>
                  <UiText style={conciergeStyles.eventTitle}>{e.title}</UiText>
                  <UiText style={conciergeStyles.eventSub}>{e.sub}</UiText>
                  <Pressable accessibilityRole="button" onPress={e.onDetails}>
                    <UiText style={conciergeStyles.eventDetails}>{e.detailsLabel}</UiText>
                  </Pressable>
                </View>
                <Pressable
                  accessibilityRole="button"
                  onPress={e.onCta}
                  style={conciergeStyles.eventBtn}
                >
                  <UiText style={conciergeStyles.eventBtnText}>{e.ctaLabel}</UiText>
                </Pressable>
              </View>
            ))}
          </UICard>
        </View>
      </View>
    </View>
  );
}
