import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";

import { ControlSectionHeader } from "@/components/control/ControlSectionHeader";
import { UiText } from "@/components/ui/UiText";
import { conciergeStyles } from "@/constants/concierge.styles";
import { controlStyles } from "@/constants/control.styles";
import { COLORS } from "@/constants/styles";

import { UICard } from "../ui/UICard";

type Goal = { key: string; title: string; pct: number; pctLabel: string; sub: string };

type VaultFile = {
  key: string;
  name: string;
  sub: string;
  tag: string;
  pending?: boolean;
};

type VideoItem = { key: string; title: string; sub: string; isNew?: boolean };

type ConciergeSmartSectionProps = {
  isRtl: boolean;
  title: string;
  caption: string;
  wall: {
    title: string;
    badge: string;
    desc: string;
    goals: Goal[];
    openLabel: string;
    onOpen: () => void;
  };
  vault: {
    title: string;
    badge: string;
    desc: string;
    files: VaultFile[];
    uploadLabel: string;
    onUpload: () => void;
  };
  vids: {
    title: string;
    badge: string;
    desc: string;
    items: VideoItem[];
    allLabel: string;
    onAll: () => void;
  };
};

export function ConciergeSmartSection({
  isRtl,
  title,
  caption,
  wall,
  vault,
  vids,
}: ConciergeSmartSectionProps) {
  return (
    <View>
      <ControlSectionHeader title={title} caption={caption} isRtl={isRtl} tightTop />
      <View style={controlStyles.g3}>
        <View style={controlStyles.g3Item}>
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
                {wall.title}
              </UiText>
              <View style={conciergeStyles.badgeNeutral}>
                <UiText style={conciergeStyles.badgeNeutralText}>{wall.badge}</UiText>
              </View>
            </View>
            <UiText style={conciergeStyles.escDesc}>{wall.desc}</UiText>
            <View>
              {wall.goals.map((g) => (
                <View key={g.key} style={conciergeStyles.goal}>
                  <View
                    style={[
                      conciergeStyles.goalHead,
                      isRtl && { flexDirection: "row-reverse" },
                    ]}
                  >
                    <UiText style={conciergeStyles.goalTitle}>{g.title}</UiText>
                    <UiText style={conciergeStyles.goalPct}>{g.pctLabel}</UiText>
                  </View>
                  <View style={conciergeStyles.goalBar}>
                    <View style={[conciergeStyles.goalFill, { width: `${g.pct}%` }]} />
                  </View>
                  <UiText style={conciergeStyles.goalSub}>{g.sub}</UiText>
                </View>
              ))}
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={wall.onOpen}
              style={{ marginTop: 12 }}
            >
              <View
                style={{
                  paddingVertical: 14,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.08)",
                  backgroundColor: "rgba(0,0,0,0.03)",
                  alignItems: "center",
                }}
              >
                <UiText
                  style={{
                    fontFamily: "Inter_800ExtraBold",
                    fontSize: 13,
                    color: "#0A0A0A",
                  }}
                >
                  {wall.openLabel}
                </UiText>
              </View>
            </Pressable>
          </UICard>
        </View>

        <View style={controlStyles.g3Item}>
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
                {vault.title}
              </UiText>
              <View
                style={[
                  conciergeStyles.badgeNeutral,
                  { flexDirection: "row", alignItems: "center", gap: 6 },
                ]}
              >
                <Ionicons name="lock-closed-outline" size={12} color={COLORS.portalInk} />
                <UiText style={conciergeStyles.badgeNeutralText}>{vault.badge}</UiText>
              </View>
            </View>
            <UiText style={conciergeStyles.vaultDesc}>{vault.desc}</UiText>
            {vault.files.map((f) => (
              <View
                key={f.key}
                style={[
                  conciergeStyles.vaultFile,
                  isRtl && { flexDirection: "row-reverse" },
                ]}
              >
                <View style={conciergeStyles.vaultIcon}>
                  <Ionicons name="document-outline" size={16} color={COLORS.portalInk} />
                </View>
                <View style={conciergeStyles.vaultBody}>
                  <UiText style={conciergeStyles.vaultName}>{f.name}</UiText>
                  <UiText style={conciergeStyles.vaultSub}>{f.sub}</UiText>
                </View>
                <View
                  style={[
                    conciergeStyles.vaultTag,
                    f.pending && conciergeStyles.vaultTagPending,
                  ]}
                >
                  <UiText style={conciergeStyles.vaultTagText}>{f.tag}</UiText>
                </View>
              </View>
            ))}
            <Pressable
              accessibilityRole="button"
              onPress={vault.onUpload}
              style={{ marginTop: 12 }}
            >
              <View
                style={{
                  paddingVertical: 14,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.08)",
                  backgroundColor: "rgba(0,0,0,0.03)",
                  alignItems: "center",
                }}
              >
                <UiText
                  style={{
                    fontFamily: "Inter_800ExtraBold",
                    fontSize: 13,
                    color: "#0A0A0A",
                  }}
                >
                  {vault.uploadLabel}
                </UiText>
              </View>
            </Pressable>
          </UICard>
        </View>

        <View style={controlStyles.g3Item}>
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
                {vids.title}
              </UiText>
              <View style={conciergeStyles.badgeAmber}>
                <UiText style={conciergeStyles.badgeAmberText}>{vids.badge}</UiText>
              </View>
            </View>
            <UiText style={conciergeStyles.vidsDesc}>{vids.desc}</UiText>
            {vids.items.map((v) => (
              <View
                key={v.key}
                style={[
                  conciergeStyles.vidItem,
                  v.isNew && conciergeStyles.vidNew,
                  isRtl && { flexDirection: "row-reverse" },
                ]}
              >
                <View style={conciergeStyles.vidThumb}>
                  <Ionicons name="play" size={22} color={COLORS.white} />
                </View>
                <View style={conciergeStyles.vidBody}>
                  <UiText style={conciergeStyles.vidTitle}>{v.title}</UiText>
                  <UiText style={conciergeStyles.vidSub}>{v.sub}</UiText>
                </View>
              </View>
            ))}
            <Pressable
              accessibilityRole="button"
              onPress={vids.onAll}
              style={{ marginTop: 12 }}
            >
              <View
                style={{
                  paddingVertical: 14,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.08)",
                  backgroundColor: "rgba(0,0,0,0.03)",
                  alignItems: "center",
                }}
              >
                <UiText
                  style={{
                    fontFamily: "Inter_800ExtraBold",
                    fontSize: 13,
                    color: "#0A0A0A",
                  }}
                >
                  {vids.allLabel}
                </UiText>
              </View>
            </Pressable>
          </UICard>
        </View>
      </View>
    </View>
  );
}
