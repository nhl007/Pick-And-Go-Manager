import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useMemo } from "react";
import { I18nManager, ScrollView, Text, useWindowDimensions, View } from "react-native";

import { ConciergeAuditPanel } from "@/components/concierge/ConciergeAuditPanel";
import { ConciergeBetaEventsSection } from "@/components/concierge/ConciergeBetaEventsSection";
import { ConciergeEscalationSection } from "@/components/concierge/ConciergeEscalationSection";
import { ConciergePartnerCard } from "@/components/concierge/ConciergePartnerCard";
import { ConciergePerformanceSection } from "@/components/concierge/ConciergePerformanceSection";
import { ConciergeSmartSection } from "@/components/concierge/ConciergeSmartSection";
import { ConciergeStatCards } from "@/components/concierge/ConciergeStatCards";
import Hero from "@/components/Hero";
import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { COLORS, SPACING } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export default function ConciergeScreen() {
  const { t, i18n } = useAppTranslation();
  const { width } = useWindowDimensions();

  const isRtl = useMemo(
    () => i18n.language === "ar" || I18nManager.isRTL,
    [i18n.language],
  );
  const locale = i18n.language === "ar" ? "ar-AE" : "en-GB";

  const horizontalPad = Math.min(30, Math.max(SPACING.md, width * 0.02));
  const noop = useCallback(() => {}, []);

  const statCards = useMemo(
    () => [
      {
        key: "p",
        name: t("concierge.statsPartnership"),
        meta: t("concierge.statsPartnershipMeta"),
        big: t("concierge.statsPartnershipBig"),
        stat: t("concierge.statsPartnershipStat"),
      },
      {
        key: "m",
        name: t("concierge.statsMessages"),
        meta: t("concierge.statsMessagesMeta"),
        big: t("concierge.statsMessagesBig"),
        stat: t("concierge.statsMessagesStat"),
      },
      {
        key: "i",
        name: t("concierge.statsInsights"),
        meta: t("concierge.statsInsightsMeta"),
        big: t("concierge.statsInsightsBig"),
        stat: t("concierge.statsInsightsStat"),
      },
      {
        key: "r",
        name: t("concierge.statsRevenue"),
        meta: t("concierge.statsRevenueMeta"),
        big: t("concierge.statsRevenueBig"),
        stat: t("concierge.statsRevenueStat"),
        bigVariant: "revenue" as const,
      },
    ],
    [t],
  );

  return (
    <ScrollView
      style={controlStyles.screen}
      contentContainerStyle={[
        controlStyles.scrollContent,
        { paddingHorizontal: horizontalPad },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={controlStyles.heroDisplay}>
        <UiText style={controlStyles.heroNumber}>{t("concierge.heroRating")}</UiText>
      </View>

      <Hero
        locale={locale}
        brandBranch={t("intelligence.brandBranch")}
        brandName={t("intelligence.brandName")}
        subtitle={t("concierge.subtitle")}
        title={t("concierge.titleLine1")}
        titleStrong={t("concierge.titleStrong")}
        isRtl={isRtl}
      >
        <View style={controlStyles.metaMid}>
          <View style={[controlStyles.metaMidRow, isRtl && controlStyles.rowRtl]}>
            <Ionicons name="time-outline" size={14} color={COLORS.accentAmber} />
            <Text style={controlStyles.metaMidText}>
              {t("concierge.metaLinePrefix")}
              <Text style={[controlStyles.metaMidStrong, { color: COLORS.neonOrange }]}>
                {t("concierge.metaLineStrong")}
              </Text>
              {t("concierge.metaLineSuffix")}
            </Text>
          </View>
          <View style={controlStyles.metaMidRow}>
            <UiText style={controlStyles.metaMidSmall}>{t("concierge.metaLine2")}</UiText>
          </View>
        </View>
      </Hero>

      <ConciergePartnerCard
        isRtl={isRtl}
        name={t("concierge.partnerName")}
        statusLabel={t("concierge.partnerStatus")}
        role={t("concierge.partnerRole")}
        since={t("concierge.partnerSince")}
        tags={[
          t("concierge.tag1"),
          t("concierge.tag2"),
          t("concierge.tag3"),
          t("concierge.tag4"),
        ]}
        ctaChat={t("concierge.ctaChat")}
        ctaCall={t("concierge.ctaCall")}
        ctaMeeting={t("concierge.ctaMeeting")}
        ctaWhatsapp={t("concierge.ctaWhatsapp")}
        onChat={noop}
        onCall={noop}
        onMeeting={noop}
        onWhatsapp={noop}
      />

      <ConciergeStatCards isRtl={isRtl} cards={statCards} />

      <ConciergePerformanceSection
        isRtl={isRtl}
        title={t("concierge.perfTitle")}
        caption={t("concierge.perfCaption")}
        opportunities={{
          isRtl,
          title: t("concierge.oppTitle"),
          badgeLabel: t("concierge.oppBadge"),
          applyLabel: t("concierge.applyRec"),
          opportunities: [
            {
              key: "opp1",
              icon: "pulse-outline",
              title: t("concierge.opp1Title"),
              sub: t("concierge.opp1Sub"),
              lift: t("concierge.opp1Lift"),
              liftUnit: t("concierge.opp1LiftUnit"),
            },
            {
              key: "opp2",
              icon: "time-outline",
              title: t("concierge.opp2Title"),
              sub: t("concierge.opp2Sub"),
              lift: t("concierge.opp2Lift"),
              liftUnit: t("concierge.opp2LiftUnit"),
            },
            {
              key: "opp3",
              icon: "wallet-outline",
              title: t("concierge.opp3Title"),
              sub: t("concierge.opp3Sub"),
              lift: t("concierge.opp3Lift"),
              liftUnit: t("concierge.opp3LiftUnit"),
            },
          ],
          onApply: noop,
        }}
        menu={{
          isRtl,
          title: t("concierge.menuEngTitle"),
          badgeLabel: t("concierge.menuEngBadge"),
          rows: [
            {
              key: "m1",
              type: "star",
              rank: t("concierge.star"),
              title: t("concierge.menuRow1Title"),
              sub: t("concierge.menuRow1Sub"),
              price: t("concierge.menuRow1Price"),
              priceLabel: t("concierge.keepPricing"),
            },
            {
              key: "m2",
              type: "star",
              rank: t("concierge.star"),
              title: t("concierge.menuRow2Title"),
              sub: t("concierge.menuRow2Sub"),
              price: t("concierge.menuRow2Price"),
              priceLabel: t("concierge.keepPricing"),
            },
            {
              key: "m3",
              type: "fix",
              rank: t("concierge.fix"),
              title: t("concierge.menuRow3Title"),
              sub: t("concierge.menuRow3Sub"),
              fixLabel: t("concierge.fixNow"),
              onFix: noop,
            },
            {
              key: "m4",
              type: "fix",
              rank: t("concierge.fix"),
              title: t("concierge.menuRow4Title"),
              sub: t("concierge.menuRow4Sub"),
              fixLabel: t("concierge.fixNow"),
              onFix: noop,
            },
            {
              key: "m5",
              type: "hold",
              rank: t("concierge.hold"),
              title: t("concierge.menuRow5Title"),
              sub: t("concierge.menuRow5Sub"),
              metaN: t("concierge.menuRow5Meta"),
              metaL: t("concierge.relaunch"),
            },
          ],
          footerCta: t("concierge.seeFullReport"),
          onFooter: noop,
        }}
      />

      <ConciergeEscalationSection
        isRtl={isRtl}
        title={t("concierge.escalationTitle")}
        caption={t("concierge.escalationCaption")}
        tickets={{
          isRtl,
          title: t("concierge.ticketsTitle"),
          realtimeLabel: t("concierge.ticketsRealtime"),
          tickets: [
            {
              key: "t1",
              statusLabel: t("concierge.ticket1Status"),
              statusType: "progress",
              title: t("concierge.ticket1Title"),
              sub: t("concierge.ticket1Sub"),
              stepsDone: 2,
              stepsActive: 3,
              stepsTotal: 4,
            },
            {
              key: "t2",
              statusLabel: t("concierge.ticket2Status"),
              statusType: "review",
              title: t("concierge.ticket2Title"),
              sub: t("concierge.ticket2Sub"),
              stepsDone: 1,
              stepsActive: 2,
              stepsTotal: 4,
            },
            {
              key: "t3",
              statusLabel: t("concierge.ticket3Status"),
              statusType: "wait",
              title: t("concierge.ticket3Title"),
              sub: t("concierge.ticket3Sub"),
              stepsDone: 0,
              stepsActive: 1,
              stepsTotal: 4,
            },
          ],
          footerCta: t("concierge.viewAllTickets"),
          onFooter: noop,
        }}
        emergency={{
          title: t("concierge.emergencyTitle"),
          desc: t("concierge.emergencyDesc"),
          warn: t("concierge.emergencyWarn"),
          cta: t("concierge.emergencyCta"),
          foot: t("concierge.emergencyFoot"),
          onEscalate: noop,
        }}
      />

      <ConciergeBetaEventsSection
        isRtl={isRtl}
        title={t("concierge.exclusiveTitle")}
        caption={t("concierge.exclusiveCaption")}
        beta={{
          title: t("concierge.betaTitle"),
          badgeLabel: t("concierge.betaInvited"),
          items: [
            {
              key: "b1",
              icon: "globe-outline",
              title: t("concierge.beta1Title"),
              sub: t("concierge.beta1Sub"),
              detailsLabel: t("concierge.viewDetails"),
              onDetails: noop,
              ctaLabel: t("concierge.enroll"),
              onCta: noop,
            },
            {
              key: "b2",
              icon: "desktop-outline",
              title: t("concierge.beta2Title"),
              sub: t("concierge.beta2Sub"),
              detailsLabel: t("concierge.viewDetails"),
              onDetails: noop,
              ctaLabel: t("concierge.enroll"),
              onCta: noop,
            },
            {
              key: "b3",
              icon: "aperture-outline",
              title: t("concierge.beta3Title"),
              sub: t("concierge.beta3Sub"),
              detailsLabel: t("concierge.viewDetails"),
              onDetails: noop,
              activeTag: t("concierge.activeTag"),
            },
          ],
        }}
        events={{
          title: t("concierge.eventsTitle"),
          badgeLabel: t("concierge.eventsBadge"),
          items: [
            {
              key: "e1",
              day: "17",
              month: "MAY",
              tag: t("concierge.event1Tag"),
              title: t("concierge.event1Title"),
              sub: t("concierge.event1Sub"),
              detailsLabel: t("concierge.viewDetails"),
              onDetails: noop,
              ctaLabel: t("concierge.rsvp"),
              onCta: noop,
            },
            {
              key: "e2",
              day: "03",
              month: "JUN",
              tag: t("concierge.event2Tag"),
              title: t("concierge.event2Title"),
              sub: t("concierge.event2Sub"),
              detailsLabel: t("concierge.viewDetails"),
              onDetails: noop,
              ctaLabel: t("concierge.rsvp"),
              onCta: noop,
            },
          ],
        }}
      />

      <ConciergeAuditPanel
        isRtl={isRtl}
        title={t("concierge.financialTitle")}
        caption={t("concierge.financialCaption")}
        auditTitle={t("concierge.auditTitle")}
        auditSub={t("concierge.auditSub")}
        auditCta={t("concierge.auditCta")}
        onNewAudit={noop}
        recentLabel={t("concierge.recentAudits")}
        recent={[
          {
            key: "a1",
            date: t("concierge.audit1Date"),
            title: t("concierge.audit1Title"),
            tag: t("concierge.audit1Tag"),
          },
          {
            key: "a2",
            date: t("concierge.audit2Date"),
            title: t("concierge.audit2Title"),
            tag: t("concierge.audit2Tag"),
          },
          {
            key: "a3",
            date: t("concierge.audit3Date"),
            title: t("concierge.audit3Title"),
            tag: t("concierge.audit3Tag"),
          },
        ]}
      />

      <ConciergeSmartSection
        isRtl={isRtl}
        title={t("concierge.smartTitle")}
        caption={t("concierge.smartCaption")}
        wall={{
          title: t("concierge.wallTitle"),
          badge: t("concierge.wallBadge"),
          desc: t("concierge.wallDesc"),
          goals: [
            {
              key: "g1",
              title: t("concierge.goal1Title"),
              pct: 78,
              pctLabel: t("concierge.goal1Pct"),
              sub: t("concierge.goal1Sub"),
            },
            {
              key: "g2",
              title: t("concierge.goal2Title"),
              pct: 33,
              pctLabel: t("concierge.goal2Pct"),
              sub: t("concierge.goal2Sub"),
            },
            {
              key: "g3",
              title: t("concierge.goal3Title"),
              pct: 92,
              pctLabel: t("concierge.goal3Pct"),
              sub: t("concierge.goal3Sub"),
            },
          ],
          openLabel: t("concierge.openWall"),
          onOpen: noop,
        }}
        vault={{
          title: t("concierge.vaultTitle"),
          badge: t("concierge.vaultEncrypted"),
          desc: t("concierge.vaultDesc"),
          files: [
            {
              key: "v1",
              name: t("concierge.vaultFile1Name"),
              sub: t("concierge.vaultFile1Sub"),
              tag: t("concierge.vaultFile1Tag"),
            },
            {
              key: "v2",
              name: t("concierge.vaultFile2Name"),
              sub: t("concierge.vaultFile2Sub"),
              tag: t("concierge.vaultFile2Tag"),
            },
            {
              key: "v3",
              name: t("concierge.vaultFile3Name"),
              sub: t("concierge.vaultFile3Sub"),
              tag: t("concierge.vaultFile3Tag"),
              pending: true,
            },
          ],
          uploadLabel: t("concierge.vaultUpload"),
          onUpload: noop,
        }}
        vids={{
          title: t("concierge.vidsTitle"),
          badge: t("concierge.vidsBadge"),
          desc: t("concierge.vidsDesc"),
          items: [
            {
              key: "vd1",
              title: t("concierge.vid1Title"),
              sub: t("concierge.vid1Sub"),
              isNew: true,
            },
            { key: "vd2", title: t("concierge.vid2Title"), sub: t("concierge.vid2Sub") },
            { key: "vd3", title: t("concierge.vid3Title"), sub: t("concierge.vid3Sub") },
          ],
          allLabel: t("concierge.allBriefings"),
          onAll: noop,
        }}
      />

      <View style={{ height: SPACING.xxl }} />
    </ScrollView>
  );
}
