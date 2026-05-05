import { Pressable, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { conciergeStyles } from "@/constants/concierge.styles";
import { controlStyles } from "@/constants/control.styles";

export type ConciergeTicketStatus = "progress" | "review" | "wait";

export type ConciergeTicket = {
  key: string;
  statusLabel: string;
  statusType: ConciergeTicketStatus;
  title: string;
  sub: string;
  stepsDone: number;
  stepsActive: number;
  stepsTotal: number;
};

type ConciergeTicketsPanelProps = {
  isRtl: boolean;
  title: string;
  realtimeLabel: string;
  tickets: ConciergeTicket[];
  footerCta: string;
  onFooter: () => void;
};

export function ConciergeTicketsPanel({
  isRtl,
  title,
  realtimeLabel,
  tickets,
  footerCta,
  onFooter,
}: ConciergeTicketsPanelProps) {
  return (
    <>
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
        <UiText style={{ ...controlStyles.panelTitle, marginBottom: 0 }}>{title}</UiText>
        <View style={conciergeStyles.badgeLive}>
          <View style={conciergeStyles.badgeLiveDot} />
          <UiText style={conciergeStyles.badgeLiveText}>{realtimeLabel}</UiText>
        </View>
      </View>

      {tickets.map((t) => {
        const statusStyle =
          t.statusType === "progress"
            ? conciergeStyles.tProgress
            : t.statusType === "review"
              ? conciergeStyles.tReview
              : conciergeStyles.tWait;

        return (
          <View
            key={t.key}
            style={[conciergeStyles.ticket, isRtl && { flexDirection: "row-reverse" }]}
          >
            <View style={[conciergeStyles.tStatus, statusStyle]}>
              <UiText style={conciergeStyles.tStatusText}>{t.statusLabel}</UiText>
            </View>
            <View style={conciergeStyles.tBody}>
              <UiText style={conciergeStyles.tTitle}>{t.title}</UiText>
              <UiText style={conciergeStyles.tSub}>{t.sub}</UiText>
            </View>
            <View style={conciergeStyles.tSteps}>
              {Array.from({ length: t.stepsTotal }).map((_, idx) => {
                const i = idx + 1;
                const isDone = i <= t.stepsDone;
                const isActive = i === t.stepsActive;
                return (
                  <View
                    key={idx}
                    style={[
                      conciergeStyles.step,
                      isDone && conciergeStyles.stepDone,
                      isActive && conciergeStyles.stepActive,
                    ]}
                  />
                );
              })}
            </View>
          </View>
        );
      })}

      <Pressable accessibilityRole="button" onPress={onFooter} style={{ marginTop: 12 }}>
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
            style={{ fontFamily: "Inter_800ExtraBold", fontSize: 13, color: "#0A0A0A" }}
          >
            {footerCta}
          </UiText>
        </View>
      </Pressable>
    </>
  );
}
