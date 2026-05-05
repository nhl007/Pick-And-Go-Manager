import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useMemo, useState } from "react";
import { I18nManager, ScrollView, Text, useWindowDimensions, View } from "react-native";

import Hero from "@/components/Hero";
import { MediaCreativeElementsSection } from "@/components/media/MediaCreativeElementsSection";
import { MediaDailySpotlightSection } from "@/components/media/MediaDailySpotlightSection";
import { MediaGalleryBioSection } from "@/components/media/MediaGalleryBioSection";
import type { MoodKey } from "@/components/media/MediaPageMoodPanel";
import type { ScheduleSlot } from "@/components/media/MediaSmartSchedulePanel";
import { MediaSocialSyncSection } from "@/components/media/MediaSocialSyncSection";
import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { mediaStyles } from "@/constants/media.styles";
import { COLORS, SPACING } from "@/constants/styles";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export default function MediaHubScreen() {
  const { t, i18n } = useAppTranslation();
  const { width } = useWindowDimensions();
  const isRtl = useMemo(
    () => i18n.language === "ar" || I18nManager.isRTL,
    [i18n.language],
  );
  const locale = i18n.language === "ar" ? "ar-AE" : "en-GB";

  const horizontalPad = Math.min(30, Math.max(SPACING.md, width * 0.02));

  const [statusText, setStatusText] = useState(() => t("media.statusDefault"));
  const [bio, setBio] = useState(() => t("media.bioDefault"));
  const [voiceActive, setVoiceActive] = useState("warm");
  const [seasonActive, setSeasonActive] = useState("ramadan");
  const [cineShow, setCineShow] = useState(true);
  const [cineLoop, setCineLoop] = useState(true);
  const [cineMuted, setCineMuted] = useState(true);
  const [syncPull, setSyncPull] = useState(true);
  const [syncPush, setSyncPush] = useState(false);
  const [syncMirror, setSyncMirror] = useState(false);
  const [igFeedOn, setIgFeedOn] = useState(true);
  const [activeMood, setActiveMood] = useState<MoodKey>("lunch");
  const [moodAuto, setMoodAuto] = useState(true);
  const [chefMsg, setChefMsg] = useState(() => t("media.chefMsgDefault"));

  const noop = useCallback(() => {}, []);

  const statusPresets = useMemo(
    () => [
      { key: "p1", label: t("media.preset5yr") },
      { key: "p2", label: t("media.presetWinter") },
      { key: "p3", label: t("media.presetFresh") },
      { key: "p4", label: t("media.presetHappy") },
      { key: "p5", label: t("media.presetRamadan") },
    ],
    [t],
  );

  const voiceChips = useMemo(
    () => [
      { key: "warm", label: t("media.voiceWarm") },
      { key: "playful", label: t("media.voicePlayful") },
      { key: "elegant", label: t("media.voiceElegant") },
      { key: "rustic", label: t("media.voiceRustic") },
    ],
    [t],
  );

  const seasonChips = useMemo(
    () => [
      { key: "winter", label: t("media.seasonWinter") },
      { key: "ramadan", label: t("media.seasonRamadan") },
      { key: "summer", label: t("media.seasonSummer") },
      { key: "eid", label: t("media.seasonEid") },
    ],
    [t],
  );

  const moodDefs = useMemo(
    () => [
      {
        key: "morning" as const,
        name: t("media.moodMorning"),
        time: t("media.moodMorningTime"),
        swatchStyle: mediaStyles.moodMorning,
      },
      {
        key: "lunch" as const,
        name: t("media.moodLunch"),
        time: t("media.moodLunchTime"),
        swatchStyle: mediaStyles.moodLunch,
      },
      {
        key: "dinner" as const,
        name: t("media.moodDinner"),
        time: t("media.moodDinnerTime"),
        swatchStyle: mediaStyles.moodDinner,
      },
      {
        key: "night" as const,
        name: t("media.moodNight"),
        time: t("media.moodNightTime"),
        swatchStyle: mediaStyles.moodNight,
      },
    ],
    [t],
  );

  const scheduleSlots = useMemo<ScheduleSlot[]>(
    () => [
      {
        key: "s1",
        label: t("media.schedBreakfast"),
        time: t("media.schedTime0800"),
        pills: [
          { key: "a", label: t("media.schedPillMorning1") },
          { key: "b", label: t("media.schedPillMorning2") },
        ],
      },
      {
        key: "s2",
        label: t("media.schedLunch"),
        time: t("media.schedTime1300"),
        pills: [{ key: "c", label: t("media.schedPillLunch1") }],
        active: true,
      },
      {
        key: "s3",
        label: t("media.schedDinner"),
        time: t("media.schedTime1930"),
        empty: true,
        emptyText: t("media.schedEmptySlot"),
        pills: [],
      },
      {
        key: "s4",
        label: t("media.schedLate"),
        time: t("media.schedTime2200"),
        pills: [{ key: "d", label: t("media.schedPillLate1") }],
      },
    ],
    [t],
  );

  const igPosts = useMemo(
    () => [
      { likes: t("media.sfPost1Likes"), comments: t("media.sfPost1Comments") },
      { likes: t("media.sfPost2Likes"), comments: t("media.sfPost2Comments") },
      { likes: t("media.sfPost3Likes"), comments: t("media.sfPost3Comments") },
    ],
    [t],
  );

  const notConnected = t("media.socialNotConnected");
  const connect = t("media.connect");

  const socialRows = useMemo(
    () => [
      {
        key: "ig",
        icon: "logo-instagram" as const,
        name: t("media.socialIg"),
        desc: notConnected,
        connectLabel: connect,
        onConnect: noop,
      },
      {
        key: "tt",
        icon: "logo-tiktok" as const,
        name: t("media.socialTiktok"),
        desc: notConnected,
        connectLabel: connect,
        onConnect: noop,
      },
      {
        key: "sc",
        icon: "logo-snapchat" as const,
        name: t("media.socialSnap"),
        desc: notConnected,
        connectLabel: connect,
        onConnect: noop,
      },
      {
        key: "x",
        icon: "logo-twitter" as const,
        name: t("media.socialX"),
        desc: notConnected,
        connectLabel: connect,
        onConnect: noop,
      },
    ],
    [connect, noop, notConnected, t],
  );

  const repostTiles = useMemo(
    () =>
      (["crHandle1", "crHandle2", "crHandle3", "crHandle4"] as const).map((key) => ({
        key,
        handle: t(`media.${key}`),
        onApprove: noop,
        onSkip: noop,
      })),
    [noop, t],
  );

  const belowMeta = (
    <View style={mediaStyles.displaySub}>
      <Text style={mediaStyles.displaySubText}>
        <Text style={mediaStyles.displaySubText}>{t("media.displaySubLead")}</Text>
        <Text style={mediaStyles.displaySubMuted}>{t("media.displaySubTail")}</Text>
      </Text>
    </View>
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
        <UiText style={controlStyles.heroNumber}>{t("media.heroNumber")}</UiText>
      </View>

      <Hero
        belowMeta={belowMeta}
        locale={locale}
        brandBranch={t("intelligence.brandBranch")}
        brandName={t("intelligence.brandName")}
        subtitle={t("media.subtitle")}
        title={t("media.titleLine1")}
        titleStrong={t("media.titleStrong")}
        isRtl={isRtl}
      >
        <View style={controlStyles.metaMid}>
          <View style={[controlStyles.metaMidRow, isRtl && controlStyles.rowRtl]}>
            <Ionicons name="time-outline" size={14} color={COLORS.accentAmber} />
            <Text style={controlStyles.metaMidText}>
              {t("media.metaMomentsPrefix")}
              <Text style={mediaStyles.metaCreatorStrong}>
                {t("media.metaMomentsStrong")}
              </Text>
            </Text>
          </View>
          <View style={controlStyles.metaMidRow}>
            <UiText style={controlStyles.metaMidSmall}>{t("media.metaReachLine")}</UiText>
          </View>
        </View>
      </Hero>

      <MediaDailySpotlightSection
        isRtl={isRtl}
        sectionTitle={t("media.dailySpotlightTitle")}
        sectionCaption={t("media.dailySpotlightCaption")}
        hero={{
          isRtl,
          title: t("media.todayHeroTitle"),
          badgeShowing: t("media.badgeShowingNow"),
          emptyTitle: t("media.heroEmptyTitle"),
          emptySub: t("media.heroEmptySub"),
          uploadLabel: t("media.uploadImage"),
          scheduleLabel: t("media.scheduleRotation"),
          onUpload: noop,
          onSchedule: noop,
        }}
        stories={{
          isRtl,
          title: t("media.liveStoriesTitle"),
          maxHint: t("media.liveStoriesMax"),
          liveBadge: t("media.badgeLiveZero"),
          dropTitle: t("media.storyDropTitle"),
          dropSub: t("media.storyDropSub"),
          onAddStory: noop,
          onDropStory: noop,
        }}
        status={{
          title: t("media.statusOverlayTitle"),
          value: statusText,
          onChange: setStatusText,
          previewLabel: t("media.previewOnStorefront"),
          presetsLabel: t("media.presetsLabel"),
          presets: statusPresets,
          onPreset: setStatusText,
          onOtherPreset: noop,
          otherPresetLabel: t("media.presetOther"),
        }}
      />

      <MediaGalleryBioSection
        isRtl={isRtl}
        sectionTitle={t("media.galleryBioTitle")}
        sectionCaption={t("media.galleryBioCaption")}
        albums={{
          title: t("media.visualAlbumsTitle"),
          emptyTitle: t("media.albumsEmptyTitle"),
          emptySub: t("media.albumsEmptySub"),
          newAlbumLabel: t("media.newAlbum"),
          onNewAlbum: noop,
        }}
        bio={{
          title: t("media.dynamicBioTitle"),
          bio,
          onBioChange: setBio,
          charsSuffix: t("media.bioCharsSuffix"),
          brandVoiceLabel: t("media.brandVoiceLabel"),
          voiceChips,
          voiceActive,
          onVoiceChange: setVoiceActive,
          seasonalLabel: t("media.seasonalLabel"),
          seasonChips,
          seasonActive,
          onSeasonChange: setSeasonActive,
          voiceOtherLabel: t("media.voiceOther"),
          seasonOtherLabel: t("media.seasonOther"),
          onVoiceOther: noop,
          onSeasonOther: noop,
          publishLabel: t("media.publishBio"),
          onPublish: noop,
        }}
        cine={{
          title: t("media.cineTitle"),
          emptyTitle: t("media.cineEmptyTitle"),
          emptySub: t("media.cineEmptySub"),
          cap: t("media.cineCap"),
          showOnOpen: cineShow,
          onShowOnOpen: setCineShow,
          loop: cineLoop,
          onLoop: setCineLoop,
          muted: cineMuted,
          onMuted: setCineMuted,
          showOnOpenLabel: t("media.cineShowOnOpen"),
          loopLabel: t("media.cineLoop"),
          mutedLabel: t("media.cineMuted"),
          uploadLabel: t("media.uploadClip"),
          onUpload: noop,
        }}
      />

      <MediaSocialSyncSection
        isRtl={isRtl}
        sectionTitle={t("media.socialSyncTitle")}
        sectionCaption={t("media.socialSyncCaption")}
        connected={{
          isRtl,
          title: t("media.connectedTitle"),
          socialRows,
          syncSectionTitle: t("media.syncCrossTitle"),
          syncRows: [
            {
              key: "pull",
              title: t("media.syncPullIgTitle"),
              sub: t("media.syncPullIgSub"),
              value: syncPull,
              onChange: setSyncPull,
            },
            {
              key: "push",
              title: t("media.syncPushTitle"),
              sub: t("media.syncPushSub"),
              value: syncPush,
              onChange: setSyncPush,
            },
            {
              key: "mirror",
              title: t("media.syncMirrorTitle"),
              sub: t("media.syncMirrorSub"),
              value: syncMirror,
              onChange: setSyncMirror,
            },
          ],
        }}
        igFeed={{
          isRtl,
          title: t("media.igFeedTitle"),
          enabled: igFeedOn,
          onEnabledChange: setIgFeedOn,
          desc: t("media.igFeedDesc"),
          posts: igPosts,
          note: t("media.igFeedNote"),
        }}
      />

      <MediaCreativeElementsSection
        isRtl={isRtl}
        sectionTitle={t("media.creativeTitle")}
        sectionCaption={t("media.creativeCaption")}
        mood={{
          isRtl,
          title: t("media.pageMoodTitle"),
          badgeLabel: t("media.badgeLunchVibes"),
          moods: moodDefs,
          activeMood,
          onMoodChange: setActiveMood,
          autoSwitchLabel: t("media.moodAutoSwitch"),
          autoSwitch: moodAuto,
          onAutoSwitch: setMoodAuto,
        }}
        chef={{
          isRtl,
          title: t("media.chefsCornerTitle"),
          badgeLabel: t("media.badgeChefLive"),
          chefName: t("media.chefName"),
          chefSub: t("media.chefSub"),
          recordLabel: t("media.record"),
          uploadLabel: t("media.upload"),
          onRecord: noop,
          onUpload: noop,
          message: chefMsg,
          onMessageChange: setChefMsg,
          saveLabel: t("media.saveText"),
          clearLabel: t("media.clearMessage"),
          onSave: noop,
          onClear: () => {
            setChefMsg("");
          },
        }}
        repost={{
          isRtl,
          title: t("media.customerRepostTitle"),
          badgeLabel: t("media.badgePending"),
          desc: t("media.customerRepostDesc"),
          tiles: repostTiles,
          foot: t("media.crFoot"),
          reviewAllLabel: t("media.reviewAll"),
          onReviewAll: noop,
        }}
        schedule={{
          isRtl,
          title: t("media.smartScheduleTitle"),
          badgeLabel: t("media.badgeQueued"),
          slots: scheduleSlots,
          scheduleCtaLabel: t("media.scheduleContent"),
          onScheduleCta: noop,
        }}
      />
    </ScrollView>
  );
}
