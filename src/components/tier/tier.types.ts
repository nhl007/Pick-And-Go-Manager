import type Ionicons from "@expo/vector-icons/Ionicons";

export const TIERS = ["bronze", "silver", "gold", "diamond"] as const;
export type Tier = (typeof TIERS)[number];

export type TierTheme = {
  cardBg: string;
  cardBgSoft: string;
  cardBorder: string;
  inkPrimary: string;
  inkSecondary: string;
  inkMuted: string;
  perkBg: string;
  perkBorder: string;
  perkLabelInk: string;
  perkValueInk: string;
  badgeBg: string;
  badgeInk: string;
  medalIcon: React.ComponentProps<typeof Ionicons>["name"];
  medalColor: string;
  medalRibbon: string;
  miniBg: string;
  miniBorder: string;
};

export const TIER_THEMES: Record<Tier, TierTheme> = {
  bronze: {
    cardBg: "#F8DCC0",
    cardBgSoft: "#FBE9D5",
    cardBorder: "#E8C39A",
    inkPrimary: "#7A4A1E",
    inkSecondary: "#8C5A24",
    inkMuted: "#A87544",
    perkBg: "#FFF1E1",
    perkBorder: "#EAD3B5",
    perkLabelInk: "#A06A33",
    perkValueInk: "#5C3611",
    badgeBg: "#FFFFFF",
    badgeInk: "#7A4A1E",
    medalIcon: "medal",
    medalColor: "#C97A35",
    medalRibbon: "#3F7CC4",
    miniBg: "#FBE9D5",
    miniBorder: "#E8C39A",
  },
  silver: {
    cardBg: "#DEE5EE",
    cardBgSoft: "#ECF0F6",
    cardBorder: "#C7D1DD",
    inkPrimary: "#3A4A60",
    inkSecondary: "#4F6178",
    inkMuted: "#7286A0",
    perkBg: "#F5F8FC",
    perkBorder: "#D5DEEA",
    perkLabelInk: "#5A6E87",
    perkValueInk: "#27374D",
    badgeBg: "#FFFFFF",
    badgeInk: "#3A4A60",
    medalIcon: "medal",
    medalColor: "#9AAFC4",
    medalRibbon: "#3F7CC4",
    miniBg: "#ECF0F6",
    miniBorder: "#C7D1DD",
  },
  gold: {
    cardBg: "#F8E69A",
    cardBgSoft: "#FBF0BD",
    cardBorder: "#E6CC6A",
    inkPrimary: "#7A5A0A",
    inkSecondary: "#8B6F00",
    inkMuted: "#A98A30",
    perkBg: "#FFF8DD",
    perkBorder: "#EBD78A",
    perkLabelInk: "#A98A30",
    perkValueInk: "#5C4400",
    badgeBg: "#FFFFFF",
    badgeInk: "#7A5A0A",
    medalIcon: "medal",
    medalColor: "#E5A02A",
    medalRibbon: "#3F7CC4",
    miniBg: "#FBF0BD",
    miniBorder: "#E6CC6A",
  },
  diamond: {
    cardBg: "#CFE6F4",
    cardBgSoft: "#E1EFF8",
    cardBorder: "#9EC9E2",
    inkPrimary: "#1F4F70",
    inkSecondary: "#2A6388",
    inkMuted: "#5A85A4",
    perkBg: "#EFF8FE",
    perkBorder: "#B9D6E8",
    perkLabelInk: "#3F7C9E",
    perkValueInk: "#103A55",
    badgeBg: "#FFFFFF",
    badgeInk: "#1F4F70",
    medalIcon: "diamond",
    medalColor: "#5DB6E2",
    medalRibbon: "#3F7CC4",
    miniBg: "#E1EFF8",
    miniBorder: "#9EC9E2",
  },
};

export const TIER_INDEX: Record<Tier, number> = {
  bronze: 1,
  silver: 2,
  gold: 3,
  diamond: 4,
};

export const TIER_TOTAL = 4;
