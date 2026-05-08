import Ionicons from "@expo/vector-icons/Ionicons";
import type { TFunction } from "i18next";
import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";

import { operationalChecklistStyles as s } from "@/components/staff/OperationalChecklistCard.styles";
import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

type ChecklistTask = {
  id: string;
  titleKey: string;
  metaKey: string;
  metaParams?: Record<string, string | number>;
  done: boolean;
};

const INITIAL_TASKS: ChecklistTask[] = [
  {
    id: "milk",
    titleKey: "staff.taskMilkInventory",
    metaKey: "staff.taskMetaDone",
    metaParams: { who: "Layla", at: "08:14" },
    done: true,
  },
  {
    id: "grill",
    titleKey: "staff.taskGrillCleaning",
    metaKey: "staff.taskMetaDone",
    metaParams: { who: "Rami", at: "14:02" },
    done: false,
  },
  {
    id: "coffee",
    titleKey: "staff.taskCoffeeDescaling",
    metaKey: "staff.taskMetaAssignedDue",
    metaParams: { who: "Layla", at: "18:00" },
    done: false,
  },
  {
    id: "waste",
    titleKey: "staff.taskWasteLog",
    metaKey: "staff.taskMetaAssignedDue",
    metaParams: { who: "Yousef", at: "22:30" },
    done: true,
  },
  {
    id: "closing",
    titleKey: "staff.taskClosingInventory",
    metaKey: "staff.taskMetaManagerReview",
    metaParams: { at: "23:00" },
    done: true,
  },
];

const BASE_DONE_OFFSET = 12;
const TOTAL_COUNT = 22;

export type OperationalChecklistCardProps = {
  t: TFunction;
};

export function OperationalChecklistCard({ t }: OperationalChecklistCardProps) {
  const [tasks, setTasks] = useState<ChecklistTask[]>(INITIAL_TASKS);

  const doneCount = useMemo(
    () => BASE_DONE_OFFSET + tasks.filter((task) => task.done).length,
    [tasks],
  );
  const pct = Math.min(100, Math.round((doneCount / TOTAL_COUNT) * 100));

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  };

  return (
    <View style={s.card}>
      <View style={s.headerRow}>
        <UiText style={s.headerTitle} numberOfLines={1}>
          {t("staff.checklistTitle")}
        </UiText>
        <View style={s.doneBadge}>
          <UiText style={s.doneBadgeTxt}>
            {t("staff.checklistDoneCount", { done: doneCount, total: TOTAL_COUNT })}
          </UiText>
        </View>
      </View>

      <View style={s.progressRow}>
        <View style={s.progressTrack}>
          <View style={[s.progressFill, { width: `${pct}%` }]} />
        </View>
        <UiText style={s.progressPctTxt}>{pct}%</UiText>
      </View>

      {tasks.map((task) => (
        <Pressable
          key={task.id}
          onPress={() => { toggleTask(task.id); }}
          hitSlop={4}
          style={[s.taskItem, task.done && s.taskItemDone]}
        >
          <View style={[s.checkBox, task.done && s.checkBoxDone]}>
            {task.done ? (
              <Ionicons name="checkmark" size={14} color={COLORS.white} />
            ) : null}
          </View>
          <View style={s.taskBody}>
            <UiText style={s.taskTitle} numberOfLines={1}>
              {t(task.titleKey)}
            </UiText>
            <UiText style={s.taskMeta} numberOfLines={1}>
              {t(task.metaKey, task.metaParams)}
            </UiText>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
