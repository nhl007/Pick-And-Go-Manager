import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";

import { digitalSignOffCardStyles as s } from "@/components/staff/DigitalSignOffCard.styles";
import { SignAndHandOverModal } from "@/components/staff/SignAndHandOverModal";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type SignTask = {
  id: string;
  titleKey: string;
  done: boolean;
};

const INITIAL_TASKS: SignTask[] = [
  { id: "grill", titleKey: "staff.signCheckGrill", done: true },
  { id: "coffee", titleKey: "staff.signCheckCoffee", done: true },
  { id: "waste", titleKey: "staff.signCheckWaste", done: false },
  { id: "cash", titleKey: "staff.signCheckCash", done: false },
  { id: "prep", titleKey: "staff.signCheckPrep", done: false },
];

export type DigitalSignOffCardProps = {
  t: TFunction;
};

export function DigitalSignOffCard({ t }: DigitalSignOffCardProps) {
  const [tasks, setTasks] = useState<SignTask[]>(INITIAL_TASKS);
  const [signModalVisible, setSignModalVisible] = useState(false);

  const doneCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  };

  return (
    <>
    <View style={s.card}>
      <View style={s.headerRow}>
        <UiText style={s.headerTitle} numberOfLines={1}>
          {t("staff.digitalSignOffTitle")}
        </UiText>
        <View style={s.handoverBadge}>
          <UiText style={s.handoverBadgeTxt}>
            {t("staff.nextHandoverAt", { at: "22:00" })}
          </UiText>
        </View>
      </View>

      <View style={s.subHeaderRow}>
        <UiText style={s.subHeaderKicker} numberOfLines={1}>
          {t("staff.closingShiftChecklist")}
        </UiText>
        <UiText style={s.subHeaderProgress}>
          {t("staff.handoverProgress", { done: doneCount, total: tasks.length })}
        </UiText>
      </View>

      {tasks.map((task) => (
        <Pressable
          key={task.id}
          onPress={() => {
            toggleTask(task.id);
          }}
          hitSlop={4}
          style={[s.taskItem, task.done && s.taskItemDone]}
        >
          <View style={[s.checkBox, task.done && s.checkBoxDone]}>
            {task.done ? (
              <Ionicons name="checkmark" size={14} color={COLORS.white} />
            ) : null}
          </View>
          <UiText style={s.taskTitle} numberOfLines={1}>
            {t(task.titleKey)}
          </UiText>
        </Pressable>
      ))}

      <View style={s.divider} />

      <UiText style={s.handoverKicker}>{t("staff.handoverToLabel")}</UiText>
      <View style={s.handoverRow}>
        <View style={s.handoverIconWrap}>
          <Ionicons name="briefcase-outline" size={14} color={COLORS.portalInk} />
        </View>
        <View style={s.handoverBody}>
          <UiText style={s.handoverName} numberOfLines={1}>
            {t("staff.handoverToName")}
          </UiText>
          <UiText style={s.handoverShift} numberOfLines={1}>
            {t("staff.handoverToShift")}
          </UiText>
        </View>
        <Pressable
          style={s.signBtn}
          hitSlop={6}
          onPress={() => {
            setSignModalVisible(true);
          }}
        >
          <Ionicons name="create-outline" size={12} color={COLORS.portalInk} />
          <UiText style={s.signBtnTxt}>{t("staff.signAndHandOver")}</UiText>
        </Pressable>
      </View>
    </View>

    <SignAndHandOverModal
      visible={signModalVisible}
      onClose={() => {
        setSignModalVisible(false);
      }}
      doneCount={doneCount}
      totalCount={tasks.length}
      t={t}
    />
    </>
  );
}
