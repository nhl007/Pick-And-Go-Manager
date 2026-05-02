import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, View } from "react-native";

import { UiButton } from "@/components/ui/UiButton";
import { UiDirhamSymbol } from "@/components/ui/UiDirhamSymbol";
import { UiInput } from "@/components/ui/UiInput";
import { SelectOption, UiSelect } from "@/components/ui/UiSelect";
import { UiText } from "@/components/ui/UiText";
import { controlStyles } from "@/constants/control.styles";
import { COLORS, RADIUS, SPACING } from "@/constants/styles";

type ControlQuickLaunchPanelProps = {
  panelTitle: string;
  photoDropLabel: string;
  photoDropSub: string;
  categoryLabel: string;
  categoryOptions: SelectOption[];
  categoryValue: string;
  onCategoryChange: (v: string) => void;
  itemNameLabel: string;
  itemName: string;
  onItemNameChange: (v: string) => void;
  descLabel: string;
  description: string;
  onDescriptionChange: (v: string) => void;
  sideLabel: string;
  sidePlaceholder: string;
  sideItems: string;
  onSideItemsChange: (v: string) => void;
  priceLabel: string;
  price: string;
  onPriceChange: (v: string) => void;
  scheduleLabel: string;
  scheduleChipLabel: string;
  onSchedulePress: () => void;
  launchLabel: string;
  onLaunch: () => void;
  onPickPhoto: () => void;
};

export function ControlQuickLaunchPanel({
  panelTitle,
  photoDropLabel,
  photoDropSub,
  categoryLabel,
  categoryOptions,
  categoryValue,
  onCategoryChange,
  itemNameLabel,
  itemName,
  onItemNameChange,
  descLabel,
  description,
  onDescriptionChange,
  sideLabel,
  sidePlaceholder,
  sideItems,
  onSideItemsChange,
  priceLabel,
  price,
  onPriceChange,
  scheduleLabel,
  scheduleChipLabel,
  onSchedulePress,
  launchLabel,
  onLaunch,
  onPickPhoto,
}: ControlQuickLaunchPanelProps) {
  return (
    <>
      <UiText style={controlStyles.panelTitle}>{panelTitle}</UiText>
      <View style={styles.quickLaunch}>
        <Pressable
          accessibilityRole="button"
          onPress={onPickPhoto}
          style={styles.qlPhoto}
        >
          <Ionicons name="image-outline" size={24} color={COLORS.ink3} />
          <UiText style={styles.qlPhotoLbl}>{photoDropLabel}</UiText>
          <UiText style={styles.qlPhotoSub}>{photoDropSub}</UiText>
        </Pressable>

        <View style={styles.qlForm}>
          <View style={styles.qlRow}>
            <View style={styles.qlField}>
              <UiSelect
                labelStyle={{ marginBottom: 0 }}
                style={{ paddingVertical: 4, borderRadius: 4 }}
                fontSize={12}
                label={categoryLabel}
                options={categoryOptions}
                value={categoryValue}
                onValueChange={onCategoryChange}
              />
            </View>
            <View style={styles.qlField}>
              <FieldLabel text={itemNameLabel} />
              <UiInput
                containerStyle={styles.qlInputContainer}
                style={styles.qlInput}
                value={itemName}
                onChangeText={onItemNameChange}
              />
            </View>
          </View>
          <View style={styles.qlRow}>
            <View style={styles.qlField}>
              <FieldLabel text={descLabel} />
              <UiInput
                containerStyle={styles.qlInputContainer}
                style={styles.qlInput}
                value={description}
                onChangeText={onDescriptionChange}
              />
            </View>
            <View style={styles.qlField}>
              <FieldLabel text={sideLabel} />
              <UiInput
                containerStyle={styles.qlInputContainer}
                style={styles.qlInput}
                placeholder={sidePlaceholder}
                value={sideItems}
                onChangeText={onSideItemsChange}
              />
            </View>
          </View>
          <View style={styles.qlRow}>
            <View style={styles.qlField}>
              <FieldLabel text={priceLabel} />
              <UiInput
                containerStyle={styles.qlInputContainer}
                style={styles.qlInput}
                value={price}
                onChangeText={onPriceChange}
                keyboardType="decimal-pad"
                logo={
                  <View style={styles.dhLogo}>
                    <UiDirhamSymbol size={16} color={COLORS.portalInk} />
                  </View>
                }
              />
            </View>
            <View style={styles.qlField}>
              <FieldLabel text={scheduleLabel} />
              <Pressable
                accessibilityRole="button"
                onPress={onSchedulePress}
                style={styles.qlSnoozeChip}
              >
                <Ionicons name="time-outline" size={14} color={COLORS.portalInk} />
                <UiText style={styles.qlSnoozeChipText}>{scheduleChipLabel}</UiText>
              </Pressable>
            </View>
          </View>

          <UiButton
            variant="outline"
            onPress={onLaunch}
            style={styles.launchMain}
            height={40}
          >
            <Ionicons name="rocket-outline" size={18} color={COLORS.portalInk} />
            <UiText style={styles.launchMainText}>{launchLabel}</UiText>
          </UiButton>
        </View>
      </View>
    </>
  );
}

function FieldLabel({ text }: { text: string }) {
  return <UiText style={styles.fieldLbl}>{text}</UiText>;
}

const styles = StyleSheet.create({
  quickLaunch: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
    alignItems: "stretch",
  },
  qlInput: {
    fontSize: 12,
    paddingVertical: 4,
  },
  qlInputContainer: {
    borderRadius: 4,
  },
  qlPhoto: {
    width: 120,
    minHeight: 160,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.sm,
    gap: 6,
  },
  qlPhotoLbl: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: COLORS.portalInk,
    textAlign: "center",
  },
  qlPhotoSub: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: COLORS.ink4,
    textAlign: "center",
  },
  qlForm: {
    flex: 1,
    minWidth: 260,
    gap: SPACING.sm,
  },
  qlRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  qlField: {
    flex: 1,
    minWidth: 100,
    gap: 6,
  },
  fieldLbl: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 10,
    letterSpacing: 0.8,
    color: COLORS.ink2,
    textTransform: "uppercase",
  },
  dhLogo: {
    marginLeft: 4,
  },
  qlSnoozeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.hairline,
    backgroundColor: COLORS.whiteSecondary,
  },
  qlSnoozeChipText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: COLORS.portalInk,
    flex: 1,
  },
  launchMain: {
    marginTop: 4,
    gap: 10,
  },
  launchMainText: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 14,
    color: COLORS.portalInk,
  },
});
