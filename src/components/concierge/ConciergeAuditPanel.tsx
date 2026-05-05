import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { conciergeStyles } from "@/constants/concierge.styles";
import { COLORS } from "@/constants/styles";

import { UICard } from "../ui/UICard";

type AuditRow = {
  key: string;
  date: string;
  title: string;
  tag: string;
};

type ConciergeAuditPanelProps = {
  isRtl: boolean;
  title: string;
  caption: string;
  auditTitle: string;
  auditSub: string;
  auditCta: string;
  onNewAudit: () => void;
  recentLabel: string;
  recent: AuditRow[];
};

export function ConciergeAuditPanel({
  isRtl,
  title,
  caption,
  auditTitle,
  auditSub,
  auditCta,
  onNewAudit,
  recentLabel,
  recent,
}: ConciergeAuditPanelProps) {
  return (
    <View>
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "baseline",
          gap: 8,
          flexWrap: "wrap",
          marginTop: 24,
          marginBottom: 10,
        }}
      >
        <UiText
          style={{
            fontFamily: "Inter_800ExtraBold",
            fontSize: 15,
            letterSpacing: -0.3,
            color: "#0A0A0A",
          }}
        >
          {title}
        </UiText>
        <UiText
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 11,
            color: "#888",
            flex: 1,
            minWidth: 160,
          }}
        >
          {caption}
        </UiText>
      </View>

      <UICard style={[{ paddingBottom: 18 }]}>
        <View
          style={[conciergeStyles.auditRow, isRtl && { flexDirection: "row-reverse" }]}
        >
          <View style={{ flex: 1, minWidth: 220, gap: 6 }}>
            <UiText style={conciergeStyles.auditTitle}>{auditTitle}</UiText>
            <UiText style={conciergeStyles.auditSub}>{auditSub}</UiText>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={onNewAudit}
            style={conciergeStyles.auditBtn}
          >
            <Ionicons name="document-text-outline" size={16} color={COLORS.white} />
            <UiText style={conciergeStyles.auditBtnText}>{auditCta}</UiText>
          </Pressable>
        </View>

        <View>
          <UiText style={conciergeStyles.recentLbl}>{recentLabel}</UiText>
          {recent.map((r) => (
            <View
              key={r.key}
              style={[
                conciergeStyles.auditHistRow,
                isRtl && { flexDirection: "row-reverse" },
              ]}
            >
              <UiText style={conciergeStyles.auditDate}>{r.date}</UiText>
              <UiText style={conciergeStyles.auditHistTitle}>{r.title}</UiText>
              <UiText style={conciergeStyles.auditTag}>{r.tag}</UiText>
            </View>
          ))}
        </View>
      </UICard>
    </View>
  );
}
