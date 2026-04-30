import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  View,
  type ViewProps,
} from "react-native";

import { staffBaseModalStyles as s } from "@/components/staff/StaffBaseModal.styles";
import { COLORS } from "@/constants/styles";

export type StaffBaseModalProps = {
  visible: boolean;
  onClose: () => void;
  header?: React.ReactNode;
  children: React.ReactNode;
  showCloseIcon?: boolean;
  footer?: React.ReactNode;
  scrollableBody?: boolean;
  bodyContentContainerStyle?: ViewProps["style"];
  maxWidth?: number;
  maxHeight?: number;
};

export function StaffBaseModal({
  visible,
  onClose,
  header,
  children,
  showCloseIcon = true,
  footer,
  scrollableBody = true,
  bodyContentContainerStyle,
  maxWidth = 980,
  maxHeight = 720
}: StaffBaseModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={s.modalRoot}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable
          style={s.modalBackdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
        />
        <View style={[s.modalSheet, { maxWidth, maxHeight }]}>
          {(header != null || showCloseIcon) && (
            <View style={s.modalHeader}>
              <View style={{ flex: 1 }}>{header}</View>
              {showCloseIcon && (
                <Pressable
                  onPress={onClose}
                  style={s.modalCloseBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                >
                  <Ionicons name="close" size={22} color={COLORS.portalInk} />
                </Pressable>
              )}
            </View>
          )}
          {scrollableBody ? (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[s.modalBodyPad, bodyContentContainerStyle]}
            >
              {children}
            </ScrollView>
          ) : (
            <View style={[s.modalBodyPad, bodyContentContainerStyle]}>{children}</View>
          )}
          {footer}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
