import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS, RADIUS } from "@/constants/styles";
import type { Reservation, ReservationStatus } from "@/mock/reservations";

const DIRHAM = require("@/assets/icons/dirham.png");
const LOCATION_ICON = require("@/assets/icons/location_dark.png");

const STATUS_STYLES: Record<
  ReservationStatus,
  { bg: string; text: string; border: string }
> = {
  Confirmed: { bg: "rgba(0,186,0,0.08)", text: "#000000", border: "#00BA00" },
  Pending: { bg: "rgba(248,152,40,0.08)", text: "#000000", border: "#F89828" },
  Cancelled: { bg: "rgba(220,38,38,0.08)", text: "#000000", border: "#DC2626" },
};

export type ReservationCardProps = {
  reservation: Reservation;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function ReservationCard({
  reservation,
  onPress,
  style,
}: ReservationCardProps) {
  const statusStyle = STATUS_STYLES[reservation.status];

  return (
    <View style={[styles.cardOuter, style]}>
      {/* Top section – restaurant info on #F6F6F6 */}
      <View style={styles.topSection}>
        <View style={styles.topRow}>
          <Image source={reservation.image} style={styles.thumbnail} contentFit="cover" />
          <View style={styles.topInfo}>
            <View style={styles.nameRow}>
              <UiText font="semiBold" size="lg" color="black" numberOfLines={1} style={styles.title}>
                {reservation.restaurantName}
              </UiText>
              <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg, borderColor: statusStyle.border }]}>
                <View style={[styles.statusDot, { backgroundColor: statusStyle.border }]} />
                <UiText font="medium" size={10} style={{ color: statusStyle.text }}>
                  {reservation.status}
                </UiText>
              </View>
            </View>
            <UiText font="regular" size="sm" color="textSecondary">
              Booking ID: {reservation.bookingId}
            </UiText>
          </View>
        </View>
      </View>

      {/* Bottom section – details on white */}
      <View style={styles.bottomSection}>
        <View style={styles.infoGrid}>
          <View style={styles.infoRow}>
            <UiText font="medium" size="xs" color="textSecondary">
              Number of Guests
            </UiText>
            <UiText font="medium" size="sm" color="black">
              · {String(reservation.guests).padStart(2, "0")}
            </UiText>
          </View>
          <View style={styles.infoRow}>
            <UiText font="medium" size="xs" color="textSecondary">
              Date
            </UiText>
            <UiText font="medium" size="sm" color="black">
              · {reservation.date}
            </UiText>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoRow}>
            <UiText font="medium" size="xs" color="textSecondary">
              Time
            </UiText>
            <UiText font="medium" size="sm" color="black">
              · {reservation.time}
            </UiText>
          </View>
          <View style={styles.infoRow}>
            <UiText font="medium" size="xs" color="textSecondary">
              Deposit Paid ·
            </UiText>
            <UiText font="medium" size="sm" color="black">
            <Image source={DIRHAM} style={styles.dirham} contentFit="contain" />
              {reservation.depositPaid}
            </UiText>
          </View>
        </View>

        <View style={styles.footerDivider} />
        <View style={styles.footerRow}>
          <View style={styles.distanceRow}>
            <Image source={LOCATION_ICON} style={styles.locationIcon} contentFit="contain" />
            <UiText font="medium" size="sm" color="textSecondary">
              {reservation.distance}km
            </UiText>
          </View>
          {onPress && (
            <Pressable onPress={onPress} style={styles.viewDetailsBtn}>
              <UiText font="semiBold" size="sm" color="black">
                View Details
              </UiText>
              <UiText font="semiBold" size="sm" color="black">
                {" >"}
              </UiText>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardOuter: {
    borderRadius: 24,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 1,
    overflow: "hidden",
  },
  topSection: {
    padding: 24,
    gap: 8,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  topInfo: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    flex: 1,
    minWidth: 0,
  },
  statusBadge: {
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  bottomSection: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#0000001A",
    borderRadius: 24,
    padding: 24,
    gap: 20,
    alignSelf: "stretch",
  },
  infoGrid: {
    flexDirection: "row",
    gap: 16,
  },
  infoRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerDivider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dirham: {
    width: 12,
    height: 12,
  },
  locationIcon: {
    width: 16,
    height: 16,
  },
  viewDetailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
