import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import type { TFunction } from "i18next";
import { Alert, Platform } from "react-native";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Vector markup for the staff badge / business card (print & share).
 * Content is driven by `settings.*` and `intelligence.*` translation keys.
 */
export function buildSettingsBusinessCardSvg(t: TFunction): string {
  const brand = esc(t("settings.badgePreviewBrand"));
  const branch = esc(t("intelligence.brandBranch"));
  const tier = esc(t("settings.badgePreviewTier"));
  const initials = esc(t("settings.badgePreviewInitials"));
  const name = esc(t("settings.mergedName"));
  const title = esc(t("settings.badgePreviewJobTitle"));
  const empId = esc(t("settings.metaValEmployeeId"));
  const email = esc(t("settings.emailValue"));
  const phone = esc(t("settings.phoneValue"));
  const branchVal = esc(t("settings.metaValBranch"));
  const access = esc(t("settings.metaValAccess"));
  const scan = esc(t("settings.badgePreviewScan"));
  const lblEmail = esc(t("settings.badgeLblEmail"));
  const lblPhone = esc(t("settings.badgeLblPhone"));
  const lblBranch = esc(t("settings.badgeLblBranch"));
  const lblAccess = esc(t("settings.badgeLblAccess"));
  const foot = esc(t("settings.badgePreviewFooter"));

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="620" viewBox="0 0 320 620">
  <rect width="320" height="620" fill="#0a0a0a"/>
  <rect x="0" y="0" width="320" height="56" fill="#141414"/>
  <circle cx="22" cy="28" r="5" fill="#22c55e"/>
  <text x="36" y="24" fill="#f5f5f5" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="700">${brand}</text>
  <text x="36" y="40" fill="#888" font-family="Inter,system-ui,sans-serif" font-size="9">${branch}</text>
  <text x="300" y="32" fill="#ca8a04" font-family="Inter,system-ui,sans-serif" font-size="9" font-weight="800" text-anchor="end">${tier}</text>
  <rect x="120" y="72" width="80" height="80" rx="40" fill="#262626" stroke="#333" stroke-width="1"/>
  <text x="160" y="128" fill="#fafafa" font-family="Inter,system-ui,sans-serif" font-size="22" font-weight="800" text-anchor="middle">${initials}</text>
  <text x="160" y="188" fill="#fafafa" font-family="Inter,system-ui,sans-serif" font-size="17" font-weight="800" text-anchor="middle">${name}</text>
  <text x="160" y="210" fill="#aaa" font-family="Inter,system-ui,sans-serif" font-size="11" text-anchor="middle">${title}</text>
  <text x="160" y="232" fill="#777" font-family="Inter,system-ui,sans-serif" font-size="10" text-anchor="middle">EMP ID · ${empId}</text>
  <rect x="100" y="252" width="120" height="120" fill="#1a1a1a" stroke="#333" stroke-width="1"/>
  <text x="160" y="318" fill="#555" font-family="Inter,system-ui,sans-serif" font-size="11" text-anchor="middle">QR</text>
  <text x="160" y="396" fill="#666" font-family="Inter,system-ui,sans-serif" font-size="8" font-weight="700" letter-spacing="2" text-anchor="middle">${scan}</text>
  <text x="24" y="430" fill="#777" font-family="Inter,system-ui,sans-serif" font-size="8" font-weight="700">${lblEmail}</text>
  <text x="24" y="448" fill="#eee" font-family="Inter,system-ui,sans-serif" font-size="10" font-weight="700">${email}</text>
  <text x="24" y="472" fill="#777" font-family="Inter,system-ui,sans-serif" font-size="8" font-weight="700">${lblPhone}</text>
  <text x="24" y="490" fill="#eee" font-family="Inter,system-ui,sans-serif" font-size="10" font-weight="700">${phone}</text>
  <text x="24" y="514" fill="#777" font-family="Inter,system-ui,sans-serif" font-size="8" font-weight="700">${lblBranch}</text>
  <text x="24" y="532" fill="#eee" font-family="Inter,system-ui,sans-serif" font-size="10" font-weight="700">${branchVal}</text>
  <text x="24" y="556" fill="#777" font-family="Inter,system-ui,sans-serif" font-size="8" font-weight="700">${lblAccess}</text>
  <text x="24" y="574" fill="#eee" font-family="Inter,system-ui,sans-serif" font-size="10" font-weight="700">${access}</text>
  <text x="160" y="608" fill="#555" font-family="Inter,system-ui,sans-serif" font-size="8" text-anchor="middle">${foot}</text>
</svg>`;
}

export function buildVCardString(t: TFunction): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${t("settings.mergedName")}`,
    `TITLE:${t("settings.badgePreviewJobTitle")}`,
    `ORG:${t("intelligence.brandName")}`,
    `TEL;TYPE=CELL:${t("settings.shareCardPlainPhone")}`,
    `EMAIL:${t("settings.emailValue")}`,
    `NOTE:${t("settings.shareCardVerifyUrl")}`,
    "END:VCARD",
  ];
  return lines.join("\r\n");
}

const SVG_FILENAME = "pickgo-business-card.svg";
const VCARD_FILENAME = "pickgo-contact.vcf";

export async function exportSettingsBusinessCardSvg(t: TFunction): Promise<void> {
  const svg = buildSettingsBusinessCardSvg(t);

  if (Platform.OS === "web") {
    await Clipboard.setStringAsync(svg);
    Alert.alert(t("settings.svgClipboardTitle"), t("settings.svgClipboardBody"));
    return;
  }

  try {
    const base = FileSystem.cacheDirectory;
    if (!base) {
      throw new Error("no_cache");
    }

    const uri = `${base}${SVG_FILENAME}`;
    await FileSystem.writeAsStringAsync(uri, svg);

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(uri, {
        mimeType: "image/svg+xml",
        dialogTitle: t("settings.badgePreviewDownloadSvg"),
      });
      return;
    }

    await Clipboard.setStringAsync(svg);
    Alert.alert(t("settings.svgClipboardTitle"), t("settings.svgClipboardBody"));
  } catch {
    try {
      await Clipboard.setStringAsync(svg);
      Alert.alert(t("settings.svgClipboardTitle"), t("settings.svgClipboardBody"));
    } catch {
      Alert.alert(t("settings.svgExportErrorTitle"), t("settings.svgExportErrorBody"));
    }
  }
}

export async function exportVCardFile(t: TFunction): Promise<void> {
  const vcf = buildVCardString(t);

  if (Platform.OS === "web") {
    await Clipboard.setStringAsync(vcf);
    return;
  }

  try {
    const base = FileSystem.cacheDirectory;
    if (!base) {
      throw new Error("no_cache");
    }

    const uri = `${base}${VCARD_FILENAME}`;
    await FileSystem.writeAsStringAsync(uri, vcf);

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(uri, {
        mimeType: "text/vcard",
        dialogTitle: t("settings.shareOptVcardTitle"),
      });
      return;
    }

    await Clipboard.setStringAsync(vcf);
  } catch {
    await Clipboard.setStringAsync(vcf);
  }
}
