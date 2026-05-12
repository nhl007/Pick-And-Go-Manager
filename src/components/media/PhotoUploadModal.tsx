import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import UICheckBox from "@/components/ui/UICheckBox";
import { UiText } from "@/components/ui/UiText";
import { COLORS, FONT_FAMILIES, RADIUS, SPACING } from "@/constants/styles";

export type PhotoCropRatio = "16:9" | "4:3" | "1:1" | "free";

export type PhotoUploadResult = {
  uri: string;
  width?: number;
  height?: number;
  fileName?: string;
  fileSize?: number;
  altText: string;
  cropRatio: PhotoCropRatio;
  optimizeMobile: boolean;
  autoEnhance: boolean;
  saveToLibrary: boolean;
};

export type PhotoUploadModalCopy = {
  bannerTitle: string;
  bannerDesc: string;
  personaTitle: string;
  personaDesc: string;
  quickLaunchPhotoTitle: string;
  quickLaunchPhotoDesc: string;
  dropTitle: string;
  dropSub: string;
  spec: string;
  cropLabel: string;
  ratio169: string;
  ratio43: string;
  ratio11: string;
  ratioFree: string;
  altLabel: string;
  altOptional: string;
  altPlaceholder: string;
  optimizeMobile: string;
  autoEnhance: string;
  saveLibrary: string;
  usePhoto: string;
  cancel: string;
  fileTooLarge: string;
  permissionDenied: string;
};

export type PhotoUploadModalProps = {
  visible: boolean;
  variant: "banner" | "persona" | "quickLaunch";
  copy: PhotoUploadModalCopy;
  onClose: () => void;
  onUsePhoto: (result: PhotoUploadResult) => void;
  isRtl?: boolean;
  /** Defaults to 2MB (prototype spec). */
  maxBytes?: number;
};

const DEFAULT_MAX_BYTES = 2 * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

type PickedAsset = {
  uri: string;
  width?: number;
  height?: number;
  fileName?: string;
  fileSize?: number;
};

export function PhotoUploadModal({
  visible,
  variant,
  copy,
  onClose,
  onUsePhoto,
  isRtl = false,
  maxBytes = DEFAULT_MAX_BYTES,
}: PhotoUploadModalProps) {
  const showCropRatio = variant === "banner" || variant === "quickLaunch";
  const title =
    variant === "banner"
      ? copy.bannerTitle
      : variant === "persona"
        ? copy.personaTitle
        : copy.quickLaunchPhotoTitle;
  const description =
    variant === "banner"
      ? copy.bannerDesc
      : variant === "persona"
        ? copy.personaDesc
        : copy.quickLaunchPhotoDesc;

  const [phase, setPhase] = useState<"idle" | "progress" | "preview">("idle");
  const [picked, setPicked] = useState<PickedAsset | null>(null);
  const [progressPct, setProgressPct] = useState(0);
  const [cropRatio, setCropRatio] = useState<PhotoCropRatio>("16:9");
  const [altText, setAltText] = useState("");
  const [optimizeMobile, setOptimizeMobile] = useState(true);
  const [autoEnhance, setAutoEnhance] = useState(true);
  const [saveLibrary, setSaveLibrary] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setPhase("idle");
    setPicked(null);
    setProgressPct(0);
    setCropRatio("16:9");
    setAltText("");
    setOptimizeMobile(true);
    setAutoEnhance(true);
    setSaveLibrary(false);
  }, [visible]);

  useEffect(() => {
    if (phase !== "progress") return;

    setProgressPct(0);
    let pct = 0;
    const id = setInterval(() => {
      pct = Math.min(100, pct + 14);
      setProgressPct(pct);
      if (pct >= 100) {
        clearInterval(id);
        setPhase("preview");
      }
    }, 70);

    return () => {
      clearInterval(id);
    };
  }, [phase]);

  const launchPicker = useCallback(async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("", copy.permissionDenied);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (result.canceled || result.assets.length === 0) return;

    const asset = result.assets[0];
    const size = asset.fileSize;
    if (typeof size === "number" && size > maxBytes) {
      Alert.alert("", copy.fileTooLarge);
      return;
    }

    setPicked({
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      fileName: asset.fileName ?? undefined,
      fileSize: asset.fileSize,
    });
    setPhase("progress");
  }, [copy.fileTooLarge, copy.permissionDenied, maxBytes]);

  const handleRemove = useCallback(() => {
    setPicked(null);
    setPhase("idle");
    setProgressPct(0);
  }, []);

  const handleConfirm = useCallback(() => {
    if (!picked) return;
    onUsePhoto({
      uri: picked.uri,
      width: picked.width,
      height: picked.height,
      fileName: picked.fileName,
      fileSize: picked.fileSize,
      altText,
      cropRatio,
      optimizeMobile,
      autoEnhance,
      saveToLibrary: saveLibrary,
    });
    onClose();
  }, [
    altText,
    autoEnhance,
    cropRatio,
    onClose,
    onUsePhoto,
    optimizeMobile,
    picked,
    saveLibrary,
  ]);

  const displayName = picked?.fileName ?? "photo.jpg";
  const totalLabel =
    picked?.fileSize != null ? formatFileSize(picked.fileSize) : "—";
  const kbSoFar =
    picked?.fileSize != null
      ? formatFileSize(Math.round((picked.fileSize * progressPct) / 100))
      : "0 KB";

  const metaLine =
    picked?.width != null && picked.height != null
      ? `${picked.fileSize != null ? `${formatFileSize(picked.fileSize)} · ` : ""}${picked.width}×${picked.height}`
      : "—";

  const usePhotoEnabled = phase === "preview" && picked != null;

  const ratioOptions: { key: PhotoCropRatio; label: string }[] = [
    { key: "16:9", label: copy.ratio169 },
    { key: "4:3", label: copy.ratio43 },
    { key: "1:1", label: copy.ratio11 },
    { key: "free", label: copy.ratioFree },
  ];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      presentationStyle={Platform.OS === "ios" ? "overFullScreen" : undefined}
    >
      <View style={styles.root} accessibilityViewIsModal>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={copy.cancel}
        />

        <View style={styles.sheet}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollBody}
          >
            <Pressable
              onPress={onClose}
              style={[styles.closeBtn, isRtl ? styles.closeBtnRtl : styles.closeBtnLtr]}
              accessibilityRole="button"
              accessibilityLabel={copy.cancel}
            >
              <Ionicons name="close" size={14} color={COLORS.ink3} />
            </Pressable>

            <UiText style={styles.title}>{title}</UiText>
            <UiText style={styles.desc}>{description}</UiText>

            {phase === "idle" ? (
              <Pressable
                onPress={() => {
                  void launchPicker();
                }}
                style={styles.dropZone}
                accessibilityRole="button"
              >
                <View style={styles.dropIcWrap}>
                  <Ionicons name="images-outline" size={36} color={COLORS.ink3} />
                </View>
                <UiText style={styles.dropTitle}>{copy.dropTitle}</UiText>
                <UiText style={styles.dropSub}>{copy.dropSub}</UiText>
                <UiText style={styles.spec}>{copy.spec}</UiText>
              </Pressable>
            ) : null}

            {phase === "progress" && picked ? (
              <View style={styles.progressBlock}>
                <View style={[styles.progRow, isRtl && styles.rowRtl]}>
                  <View style={styles.progIcWrap}>
                    <Ionicons name="image-outline" size={18} color={COLORS.portalInk} />
                  </View>
                  <View style={styles.progBody}>
                    <UiText style={styles.progName} numberOfLines={1}>
                      {displayName}
                    </UiText>
                    <UiText style={styles.progMeta}>
                      {progressPct}% · {kbSoFar} of {totalLabel}
                    </UiText>
                  </View>
                </View>
                <View style={styles.progBar}>
                  <View style={[styles.progFill, { width: `${progressPct}%` }]} />
                </View>
              </View>
            ) : null}

            {phase === "preview" && picked ? (
              <View style={styles.previewWrap}>
                <View style={styles.previewImg}>
                  <Image source={{ uri: picked.uri }} style={styles.previewImage} contentFit="cover" />
                  <Pressable
                    style={styles.previewRemove}
                    onPress={handleRemove}
                    accessibilityRole="button"
                    accessibilityLabel="Remove"
                  >
                    <UiText style={styles.previewRemoveTxt}>×</UiText>
                  </Pressable>
                </View>
                <UiText style={styles.previewNm} numberOfLines={1}>
                  {displayName}
                </UiText>
                <UiText style={styles.previewMs}>{metaLine}</UiText>
              </View>
            ) : null}

            {showCropRatio ? (
              <View style={styles.field}>
                <UiText style={styles.fieldLabel}>{copy.cropLabel}</UiText>
                <View style={[styles.ratios, isRtl && styles.ratiosRtl]}>
                  {ratioOptions.map((opt) => {
                    const on = cropRatio === opt.key;
                    return (
                      <Pressable
                        key={opt.key}
                        onPress={() => {
                          setCropRatio(opt.key);
                        }}
                        style={[styles.ratioChip, on && styles.ratioChipOn]}
                        accessibilityRole="button"
                        accessibilityState={{ selected: on }}
                      >
                        <UiText style={[styles.ratioChipTxt, on && styles.ratioChipTxtOn]}>
                          {opt.label}
                        </UiText>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : null}

            <View style={styles.field}>
              <View style={[styles.altLabelRow, isRtl && styles.altLabelRowRtl]}>
                <UiText style={styles.fieldLabel}>{copy.altLabel}</UiText>
                <UiText style={styles.fieldOpt}>{copy.altOptional}</UiText>
              </View>
              <TextInput
                value={altText}
                onChangeText={setAltText}
                placeholder={copy.altPlaceholder}
                placeholderTextColor={COLORS.ink4}
                maxLength={80}
                style={styles.altInput}
              />
            </View>

            <View style={styles.opts}>
              <UICheckBox
                checked={optimizeMobile}
                onChange={setOptimizeMobile}
                label={copy.optimizeMobile}
              />
              <UICheckBox
                checked={autoEnhance}
                onChange={setAutoEnhance}
                label={copy.autoEnhance}
              />
              <UICheckBox
                checked={saveLibrary}
                onChange={setSaveLibrary}
                label={copy.saveLibrary}
              />
            </View>

            <View style={[styles.actions, isRtl && styles.actionsRtl]}>
              <Pressable
                onPress={onClose}
                style={({ pressed }) => [styles.btnGhost, pressed && styles.btnPressed]}
                accessibilityRole="button"
              >
                <UiText style={styles.btnGhostTxt}>{copy.cancel}</UiText>
              </Pressable>
              <Pressable
                onPress={handleConfirm}
                disabled={!usePhotoEnabled}
                style={({ pressed }) => [
                  styles.btnPrimary,
                  !usePhotoEnabled && styles.btnPrimaryDisabled,
                  pressed && usePhotoEnabled && styles.btnPressed,
                ]}
                accessibilityRole="button"
              >
                <UiText style={styles.btnPrimaryTxt}>{copy.usePhoto}</UiText>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    width: "100%",
    maxWidth: 440,
    maxHeight: "88%",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  scrollBody: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  closeBtn: {
    position: "absolute",
    top: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    zIndex: 2,
  },
  closeBtnLtr: {
    right: SPACING.sm,
  },
  closeBtnRtl: {
    left: SPACING.sm,
  },
  title: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 20,
    letterSpacing: -0.4,
    color: COLORS.portalInk,
    textAlign: "center",
    marginBottom: SPACING.xs,
    paddingHorizontal: SPACING.xl,
  },
  desc: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.ink3,
    textAlign: "center",
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  dropZone: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
    marginBottom: SPACING.md,
    gap: 6,
  },
  dropIcWrap: {
    marginBottom: 4,
  },
  dropTitle: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 14,
    color: COLORS.portalInk,
  },
  dropSub: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
    textAlign: "center",
  },
  spec: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
    marginTop: 4,
  },
  progressBlock: {
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  progRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  rowRtl: {
    flexDirection: "row-reverse",
  },
  progIcWrap: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  progBody: {
    flex: 1,
    gap: 4,
  },
  progName: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  progMeta: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
  },
  progBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.whiteSecondary,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  progFill: {
    height: "100%",
    backgroundColor: COLORS.portalInk,
    borderRadius: 3,
  },
  previewWrap: {
    marginBottom: SPACING.md,
  },
  previewImg: {
    borderRadius: RADIUS.md,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.whiteSecondary,
    marginBottom: SPACING.sm,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  previewRemove: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    alignItems: "center",
    justifyContent: "center",
  },
  previewRemoveTxt: {
    fontSize: 22,
    lineHeight: 24,
    fontFamily: "Inter_600SemiBold",
    color: COLORS.portalInk,
    marginTop: -2,
  },
  previewNm: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.portalInk,
  },
  previewMs: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: COLORS.ink4,
    marginTop: 2,
  },
  field: {
    marginBottom: SPACING.md,
    gap: SPACING.xs,
  },
  altLabelRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    gap: 6,
  },
  altLabelRowRtl: {
    flexDirection: "row-reverse",
  },
  fieldLabel: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: COLORS.portalInk,
  },
  fieldOpt: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: COLORS.ink4,
    textTransform: "none",
  },
  altInput: {
    borderWidth: 1,
    borderColor: COLORS.hairline,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 10,
    fontFamily: FONT_FAMILIES.semiBold,
    fontSize: 13,
    color: COLORS.portalInk,
    backgroundColor: COLORS.whiteSecondary,
  },
  ratios: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.xs,
  },
  ratiosRtl: {
    flexDirection: "row-reverse",
  },
  ratioChip: {
    paddingVertical: 8,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  ratioChipOn: {
    borderColor: COLORS.portalInk,
    backgroundColor: COLORS.white,
  },
  ratioChipTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: COLORS.ink3,
  },
  ratioChipTxtOn: {
    color: COLORS.portalInk,
  },
  opts: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  actionsRtl: {
    flexDirection: "row-reverse",
  },
  btnGhost: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.whiteSecondary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
  },
  btnPrimary: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.portalInk,
  },
  btnPrimaryDisabled: {
    opacity: 0.45,
  },
  btnPressed: {
    opacity: 0.88,
  },
  btnGhostTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.portalInk,
  },
  btnPrimaryTxt: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: COLORS.white,
  },
});
