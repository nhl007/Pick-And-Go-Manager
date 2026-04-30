import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useMemo, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import { addTeamMemberModalStyles as a } from "@/components/staff/AddTeamMemberModal.styles";
import { StaffBaseModal } from "@/components/staff/StaffBaseModal";
import { staffBaseModalStyles as mb } from "@/components/staff/StaffBaseModal.styles";
import { UiSelect } from "@/components/ui/UiSelect";
import { UiText } from "@/components/ui/UiText";
import { COLORS, SPACING } from "@/constants/styles";

import { OptInSuccessModal } from "./OptInSuccessModal";

export type AddTeamMemberModalProps = {
  visible: boolean;
  onClose: () => void;
  t: TFunction;
};

type Step = 1 | 2 | 3;
type AccessLevel = "basic" | "standard" | "advanced" | "admin";

type RoleDef = {
  id: string;
  labelKey: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

const ROLES: RoleDef[] = [
  { id: "head_chef", labelKey: "staff.roleHeadChef", icon: "restaurant-outline" },
  { id: "line_cook", labelKey: "staff.roleLineCook", icon: "flame-outline" },
  { id: "prep_cook", labelKey: "staff.rolePrepCook", icon: "file-tray-outline" },
  { id: "pastry_chef", labelKey: "staff.rolePastryChef", icon: "ice-cream-outline" },
  { id: "expeditor", labelKey: "staff.roleExpeditor", icon: "clipboard-outline" },
  { id: "dishwasher", labelKey: "staff.roleDishwasher", icon: "water-outline" },
  { id: "runner", labelKey: "staff.roleRunner", icon: "bicycle-outline" },
  { id: "barista", labelKey: "staff.roleBarista", icon: "cafe-outline" },
  { id: "cashier", labelKey: "staff.roleCashier", icon: "card-outline" },
  { id: "server", labelKey: "staff.roleServer", icon: "fast-food-outline" },
  { id: "host", labelKey: "staff.roleHost", icon: "person-outline" },
  { id: "busboy", labelKey: "staff.roleBusboy", icon: "trash-outline" },
  { id: "manager", labelKey: "staff.roleManager", icon: "briefcase-outline" },
];

type AccessDef = {
  id: AccessLevel;
  titleKey: string;
  descKey: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  badge?: "default" | "full";
};

const ACCESS_LEVELS: AccessDef[] = [
  {
    id: "basic",
    titleKey: "staff.accessBasicTitle",
    descKey: "staff.accessBasicDesc",
    icon: "time-outline",
    badge: "default",
  },
  {
    id: "standard",
    titleKey: "staff.accessStandardTitle",
    descKey: "staff.accessStandardDesc",
    icon: "reader-outline",
  },
  {
    id: "advanced",
    titleKey: "staff.accessAdvancedTitle",
    descKey: "staff.accessAdvancedDesc",
    icon: "create-outline",
  },
  {
    id: "admin",
    titleKey: "staff.accessAdminTitle",
    descKey: "staff.accessAdminDesc",
    icon: "shield-checkmark-outline",
    badge: "full",
  },
];

const DAYS: { id: string; labelKey: string }[] = [
  { id: "mon", labelKey: "staff.dayMon" },
  { id: "tue", labelKey: "staff.dayTue" },
  { id: "wed", labelKey: "staff.dayWed" },
  { id: "thu", labelKey: "staff.dayThu" },
  { id: "fri", labelKey: "staff.dayFri" },
  { id: "sat", labelKey: "staff.daySat" },
  { id: "sun", labelKey: "staff.daySun" },
];

const STATION_OPTIONS = [
  { label: "Kitchen", value: "Kitchen" },
  { label: "Front of House", value: "FrontOfHouse" },
  { label: "Prep Area", value: "PrepArea" },
  { label: "Pastry", value: "Pastry" },
  { label: "Bar", value: "Bar" },
];

const TIME_OPTIONS = [
  { label: "12:00 AM", value: "12:00" },
  { label: "01:00 AM", value: "01:00" },
  { label: "02:00 AM", value: "02:00" },
  { label: "03:00 AM", value: "03:00" },
  { label: "04:00 AM", value: "04:00" },
  { label: "05:00 AM", value: "05:00" },
  { label: "06:00 AM", value: "06:00" },
  { label: "07:00 AM", value: "07:00" },
  { label: "08:00 AM", value: "08:00" },
  { label: "09:00 AM", value: "09:00" },
  { label: "10:00 AM", value: "10:00" },
  { label: "11:00 AM", value: "11:00" },
  { label: "12:00 PM", value: "12:00" },
  { label: "01:00 PM", value: "13:00" },
  { label: "02:00 PM", value: "14:00" },
  { label: "03:00 PM", value: "15:00" },
  { label: "04:00 PM", value: "16:00" },
  { label: "05:00 PM", value: "17:00" },
  { label: "06:00 PM", value: "18:00" },
  { label: "07:00 PM", value: "19:00" },
  { label: "08:00 PM", value: "20:00" },
  { label: "09:00 PM", value: "21:00" },
  { label: "10:00 PM", value: "22:00" },
  { label: "11:00 PM", value: "23:00" },
];

const generateRequestId = () => {
  const a1 = Math.floor(Math.random() * 9000) + 1000;
  const a2 = Math.floor(Math.random() * 9000) + 1000;
  return `#STAFF-${a1}-${a2}`;
};

export function AddTeamMemberModal({ visible, onClose, t }: AddTeamMemberModalProps) {
  const [step, setStep] = useState<Step>(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [roleId, setRoleId] = useState<string | null>(null);
  const [station, setStation] = useState("Kitchen");
  const [shiftStart, setShiftStart] = useState("12:00");
  const [shiftEnd, setShiftEnd] = useState("15:00");
  const [activeDays, setActiveDays] = useState<Set<string>>(
    new Set(["mon", "tue", "wed", "thu", "fri"]),
  );

  const [accessLevel, setAccessLevel] = useState<AccessLevel>("standard");

  const [successVisible, setSuccessVisible] = useState(false);
  const [requestId, setRequestId] = useState("");

  const selectedRole = useMemo(
    () => ROLES.find((r) => r.id === roleId) ?? null,
    [roleId],
  );
  const memberFullName =
    [firstName.trim(), lastName.trim()].filter(Boolean).join(" ") || "—";
  const roleLabel = selectedRole ? t(selectedRole.labelKey) : "—";
  const dayCount = activeDays.size;
  const accessLabel = useMemo(() => {
    const found = ACCESS_LEVELS.find((x) => x.id === accessLevel);
    return found ? t(found.titleKey) : "—";
  }, [accessLevel, t]);
  const rolesByRows = useMemo(() => {
    const rolesPerRow = 5;
    const rows: RoleDef[][] = [];
    for (let i = 0; i < ROLES.length; i += rolesPerRow) rows.push(ROLES.slice(i, i + rolesPerRow));
    return rows;
  }, []);

  const canContinueStep1 =
    firstName.trim().length > 0 && lastName.trim().length > 0 && phone.trim().length > 0;
  const canContinueStep2 = roleId !== null && dayCount > 0;
  const canSend = true;

  const resetAll = () => {
    setStep(1);
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setRoleId(null);
    setStation("Kitchen");
    setShiftStart("12:00");
    setShiftEnd("15:00");
    setActiveDays(new Set(["mon", "tue", "wed", "thu", "fri"]));
    setAccessLevel("standard");
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetAll, 250);
  };

  const handleContinue = () => {
    if (step === 1 && canContinueStep1) setStep(2);
    else if (step === 2 && canContinueStep2) setStep(3);
    else if (step === 3) handleSend();
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  const handleSend = () => {
    setRequestId(generateRequestId());
    setSuccessVisible(true);
  };

  const handleSuccessDone = () => {
    setSuccessVisible(false);
    onClose();
    setTimeout(resetAll, 250);
  };

  const toggleDay = (id: string) => {
    setActiveDays((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const continueDisabled =
    (step === 1 && !canContinueStep1) ||
    (step === 2 && !canContinueStep2) ||
    (step === 3 && !canSend);

  const continueLabel = step === 3 ? t("staff.btnSendInvite") : t("staff.btnContinue");

  return (
    <>
      <StaffBaseModal
        maxWidth={780}
        visible={visible && !successVisible}
        onClose={handleClose}
        scrollableBody
        bodyContentContainerStyle={{ paddingHorizontal: 0 }}
        header={
          <View style={a.addModalHeaderLeft}>
            <View style={a.addIconBox}>
              <Ionicons name="person-add-outline" size={22} color={COLORS.white} />
            </View>
            <View style={{ flex: 1, gap: 4, paddingEnd: SPACING.xs }}>
              <UiText style={[mb.modalTitle, { marginBottom: 0, fontSize: 18 }]}>
                {t("staff.addMemberTitle")}
              </UiText>
              <UiText style={mb.modalSubtitle}>{t("staff.addMemberSubtitle")}</UiText>
            </View>
          </View>
        }
        footer={
          <View style={[mb.modalFooterRow, a.footerActionsRow]}>
            <Pressable style={[mb.outlineBtn, a.footerActionBtn]} onPress={handleClose}>
              <UiText style={mb.outlineBtnLabel}>{t("staff.cancel")}</UiText>
            </Pressable>
            <Pressable
              style={[mb.outlineBtn, a.footerActionBtn, step === 1 && { opacity: 0.45 }]}
              disabled={step === 1}
              onPress={handleBack}
            >
              <View style={a.footerIconLabel}>
                <Ionicons
                  name="chevron-back-outline"
                  size={16}
                  color={step === 1 ? COLORS.ink4 : COLORS.portalInk}
                />
                <UiText style={[mb.outlineBtnLabel, step === 1 && { color: COLORS.ink4 }]}>
                  {t("staff.btnBack")}
                </UiText>
              </View>
            </Pressable>
            <Pressable
              style={[mb.outlineBtnStrong, a.footerActionBtn, continueDisabled && { opacity: 0.45 }]}
              onPress={handleContinue}
              disabled={continueDisabled}
            >
              <View style={a.footerIconLabel}>
                <UiText style={[mb.outlineBtnLabel, continueDisabled && { color: COLORS.ink5 }]}>
                  {continueLabel}
                </UiText>
                <Ionicons
                  name={step === 3 ? "send-outline" : "chevron-forward-outline"}
                  size={16}
                  color={continueDisabled ? COLORS.ink5 : COLORS.portalInk}
                />
              </View>
            </Pressable>
          </View>
        }
      >
        <View style={a.addDivider} />

        {/* Stepper — always visible */}
        <View style={a.stepperRow}>
          {([1, 2, 3] as Step[]).map((n, i) => {
            const isActive = step === n;
            const isDone = step > n;
            const labelKey =
              n === 1
                ? "staff.stepProfile"
                : n === 2
                  ? "staff.stepRole"
                  : "staff.stepAccess";
            return (
              <React.Fragment key={n}>
                <View style={{ alignItems: "center" }}>
                  <View
                    style={[
                      a.stepCircle,
                      isActive && a.stepCircleActive,
                      isDone && a.stepCircleDone,
                      !isActive && !isDone && a.stepCircleIdle,
                    ]}
                  >
                    {isDone ? (
                      <Ionicons name="checkmark" size={14} color={COLORS.white} />
                    ) : (
                      <UiText style={[a.stepNum, !isActive && !isDone && a.stepNumIdle]}>
                        {n}
                      </UiText>
                    )}
                  </View>
                  <UiText style={[a.stepLabel, !isActive && !isDone && a.stepLabelIdle]}>
                    {t(labelKey)}
                  </UiText>
                </View>
                {i < 2 && <View style={a.stepConnector} />}
              </React.Fragment>
            );
          })}
        </View>

        {step === 1 && (
          <View style={a.bodyPad}>
            <UiText style={[a.fieldLabel, { marginTop: 4 }]}>
              {t("staff.photoOptional")}
            </UiText>
            <View style={a.uploadZone}>
              <View style={a.uploadAvatarCircle}>
                <Ionicons name="image-outline" size={28} color={COLORS.ink4} />
              </View>
              <View style={{ flex: 1, gap: 6 }}>
                <UiText style={a.uploadTitle}>{t("staff.uploadPhotoTitle")}</UiText>
                <UiText style={mb.modalSubtitle}>{t("staff.uploadPhotoHint")}</UiText>
                <Pressable style={[a.primarySmBtn, { alignSelf: "flex-start" }]}>
                  <UiText style={a.primarySmBtnTxt}>{t("staff.chooseFile")}</UiText>
                </Pressable>
              </View>
            </View>

            <View style={a.fieldGrid}>
              <View style={a.fieldHalf}>
                <UiText style={a.fieldLabel}>{t("staff.firstNameLabel")}</UiText>
                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder={t("staff.firstNamePlaceholder")}
                  placeholderTextColor={COLORS.ink5}
                  style={a.textField}
                />
              </View>
              <View style={a.fieldHalf}>
                <UiText style={a.fieldLabel}>{t("staff.lastNameLabel")}</UiText>
                <TextInput
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder={t("staff.lastNamePlaceholder")}
                  placeholderTextColor={COLORS.ink5}
                  style={a.textField}
                />
              </View>
            </View>
            <View style={a.fieldGrid}>
              <View style={a.fieldHalf}>
                <UiText style={a.fieldLabel}>{t("staff.phoneLabel")}</UiText>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder={t("staff.phonePlaceholder")}
                  placeholderTextColor={COLORS.ink5}
                  keyboardType="phone-pad"
                  style={a.textField}
                />
              </View>
              <View style={a.fieldHalf}>
                <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6 }}>
                  <UiText style={a.fieldLabel}>{t("staff.emailLabel")}</UiText>
                  <UiText style={a.fieldLabelOpt}>{t("staff.optionalSuffix")}</UiText>
                </View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder={t("staff.emailPlaceholder")}
                  placeholderTextColor={COLORS.ink5}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={a.textField}
                />
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={a.bodyPad}>
            <View style={a.sectionBlock}>
              <UiText style={a.sectionKicker}>{t("staff.selectRoleLabel")}</UiText>
              <View style={a.roleGrid}>
                {rolesByRows.map((row, rowIndex) => (
                  <View key={`role-row-${rowIndex}`} style={a.roleGridRow}>
                    {row.map((r) => {
                      const isActive = roleId === r.id;
                      return (
                        <Pressable
                          key={r.id}
                          onPress={() => setRoleId(r.id)}
                          style={[a.roleTile, isActive && a.roleTileActive]}
                        >
                          <Ionicons
                            name={r.icon}
                            size={20}
                            color={isActive ? COLORS.white : COLORS.portalInk}
                          />
                          <UiText
                            style={[a.roleTileLabel, isActive && a.roleTileLabelActive]}
                            numberOfLines={1}
                          >
                            {t(r.labelKey)}
                          </UiText>
                        </Pressable>
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>

            <View style={a.sectionBlock}>
              <UiText style={a.sectionKicker}>{t("staff.stationLabel")}</UiText>
              <UiText style={a.sectionKickerSub}>{t("staff.stationSubLabel")}</UiText>
              <UiSelect
                options={STATION_OPTIONS}
                value={station}
                onValueChange={setStation}
              />
            </View>

            <View style={a.sectionBlockTight}>
              <UiText style={a.sectionKicker}>{t("staff.shiftScheduleLabel")}</UiText>
              <View style={a.shiftRow}>
                <View style={{ flex: 1 }}>
                  <UiSelect
                    options={TIME_OPTIONS}
                    value={shiftStart}
                    onValueChange={setShiftStart}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <UiSelect
                    options={TIME_OPTIONS}
                    value={shiftEnd}
                    onValueChange={setShiftEnd}
                  />
                </View>
              </View>
            </View>
            <View style={a.daysRow}>
              {DAYS.map((d) => {
                const isActive = activeDays.has(d.id);
                return (
                  <Pressable
                    key={d.id}
                    onPress={() => toggleDay(d.id)}
                    style={[a.dayPill, isActive && a.dayPillActive]}
                  >
                    <UiText style={[a.dayPillTxt, isActive && a.dayPillTxtActive]}>
                      {t(d.labelKey)}
                    </UiText>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={a.bodyPad}>
            <UiText style={a.sectionKicker}>{t("staff.accessLevelLabel")}</UiText>
            {ACCESS_LEVELS.map((lvl) => {
              const isActive = accessLevel === lvl.id;
              return (
                <Pressable
                  key={lvl.id}
                  onPress={() => setAccessLevel(lvl.id)}
                  style={[a.accessCard, isActive && a.accessCardActive]}
                >
                  <View style={a.accessCardHeader}>
                    <View style={a.accessCardHeaderLeft}>
                      <View style={[a.accessIconBox, isActive && a.accessIconBoxActive]}>
                        <Ionicons
                          name={lvl.icon}
                          size={16}
                          color={isActive ? COLORS.white : COLORS.portalInk}
                        />
                      </View>
                      <UiText style={a.accessTitle}>{t(lvl.titleKey)}</UiText>
                    </View>
                    {lvl.badge === "default" && (
                      <View style={a.accessBadgeMuted}>
                        <UiText style={a.accessBadgeMutedTxt}>
                          {t("staff.accessDefault")}
                        </UiText>
                      </View>
                    )}
                    {lvl.badge === "full" && (
                      <View style={a.accessBadgeGold}>
                        <UiText style={a.accessBadgeGoldTxt}>
                          {t("staff.accessFullAccess")}
                        </UiText>
                      </View>
                    )}
                  </View>
                  <UiText style={a.accessDesc}>{t(lvl.descKey)}</UiText>
                </Pressable>
              );
            })}

            <View style={a.summaryBox}>
              <UiText style={a.summaryHeader}>{t("staff.invitationSummaryLabel")}</UiText>

              <View style={a.summaryRow}>
                <UiText style={a.summaryLabel}>{t("staff.summaryName")}</UiText>
                <UiText style={a.summaryValue} numberOfLines={1}>
                  {memberFullName}
                </UiText>
              </View>
              <View style={a.summaryDivider} />

              <View style={a.summaryRow}>
                <UiText style={a.summaryLabel}>{t("staff.summaryRole")}</UiText>
                <UiText style={a.summaryValue} numberOfLines={1}>
                  {roleLabel}
                </UiText>
              </View>
              <View style={a.summaryDivider} />

              <View style={a.summaryRow}>
                <UiText style={a.summaryLabel}>{t("staff.summaryShift")}</UiText>
                <UiText style={a.summaryValue} numberOfLines={1}>
                  {shiftStart}–{shiftEnd} ·{" "}
                  {t("staff.summaryDaysPerWeek", { count: dayCount })}
                </UiText>
              </View>
              <View style={a.summaryDivider} />

              <View style={a.summaryRow}>
                <UiText style={a.summaryLabel}>{t("staff.summaryAccess")}</UiText>
                <UiText style={a.summaryValue} numberOfLines={1}>
                  {accessLabel}
                </UiText>
              </View>

              <UiText style={a.summaryFooter}>{t("staff.summaryFooterText")}</UiText>
            </View>
          </View>
        )}
      </StaffBaseModal>
      
      <OptInSuccessModal
        visible={successVisible}
        onClose={handleSuccessDone}
        memberName={memberFullName}
        roleLabel={roleLabel}
        requestId={requestId}
        t={t}
      />
    </>
  );
}
