import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { conciergeStyles } from "@/constants/concierge.styles";
import { COLORS } from "@/constants/styles";

import { UICard } from "../ui/UICard";

type ConciergePartnerCardProps = {
  isRtl: boolean;
  name: string;
  statusLabel: string;
  role: string;
  since: string;
  tags: string[];
  ctaChat: string;
  ctaCall: string;
  ctaMeeting: string;
  ctaWhatsapp: string;
  onChat: () => void;
  onCall: () => void;
  onMeeting: () => void;
  onWhatsapp: () => void;
};

export function ConciergePartnerCard({
  isRtl,
  name,
  statusLabel,
  role,
  since,
  tags,
  ctaChat,
  ctaCall,
  ctaMeeting,
  ctaWhatsapp,
  onChat,
  onCall,
  onMeeting,
  onWhatsapp,
}: ConciergePartnerCardProps) {
  return (
    <UICard
      style={[conciergeStyles.partnerCard, isRtl && { flexDirection: "row-reverse" }]}
    >
      <View style={conciergeStyles.avatarLg}>
        <UiText style={conciergeStyles.avatarText}>SA</UiText>
      </View>
      <View style={conciergeStyles.partnerBody}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <UiText style={conciergeStyles.partnerName}>{name}</UiText>
          <View style={conciergeStyles.statusNeon}>
            <View style={conciergeStyles.statusDot} />
            <UiText style={conciergeStyles.statusText}>{statusLabel}</UiText>
          </View>
        </View>
        <UiText style={conciergeStyles.partnerRole}>{role}</UiText>
        <UiText style={conciergeStyles.partnerSince}>{since}</UiText>
        <View
          style={[conciergeStyles.tagsRow, isRtl && { flexDirection: "row-reverse" }]}
        >
          {tags.map((tag) => (
            <View key={tag} style={conciergeStyles.tag}>
              <UiText style={conciergeStyles.tagText}>{tag}</UiText>
            </View>
          ))}
        </View>
      </View>
      <View style={conciergeStyles.actionsCol}>
        <Pressable
          accessibilityRole="button"
          onPress={onChat}
          style={conciergeStyles.ctaPrimary}
        >
          <Ionicons name="chatbubble-outline" size={16} color={COLORS.white} />
          <UiText style={conciergeStyles.ctaPrimaryText}>{ctaChat}</UiText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onCall}
          style={conciergeStyles.ctaGhost}
        >
          <Ionicons name="call-outline" size={16} color={COLORS.portalInk} />
          <UiText style={conciergeStyles.ctaGhostText}>{ctaCall}</UiText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onMeeting}
          style={conciergeStyles.ctaGhost}
        >
          <Ionicons name="calendar-outline" size={16} color={COLORS.portalInk} />
          <UiText style={conciergeStyles.ctaGhostText}>{ctaMeeting}</UiText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={onWhatsapp}
          style={[conciergeStyles.ctaGhost, conciergeStyles.ctaWa]}
        >
          <Ionicons name="logo-whatsapp" size={16} color={COLORS.white} />
          <UiText style={[conciergeStyles.ctaGhostText, conciergeStyles.ctaWaText]}>
            {ctaWhatsapp}
          </UiText>
        </Pressable>
      </View>
    </UICard>
  );
}
