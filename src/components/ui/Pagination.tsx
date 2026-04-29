import React from "react";
import { Pressable,StyleSheet, View } from "react-native";

import { UiText } from "@/components/ui/UiText";
import { COLORS } from "@/constants/styles";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (currentPage <= 3 || currentPage >= totalPages - 2) {
      pages.push(1, 2, 3, "ellipsis", totalPages - 2, totalPages - 1, totalPages);
      return pages;
    }

    pages.push(
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    );
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => { currentPage > 1 && onPageChange(currentPage - 1); }}
        style={({ pressed }) => [
          styles.arrowButton,
          currentPage === 1 && styles.arrowDisabled,
          pressed && styles.pressed,
        ]}
        disabled={currentPage === 1}
      >
        <UiText font="medium" size="sm" color={currentPage === 1 ? "textSecondary" : "black"}>
          ←
        </UiText>
      </Pressable>

      {visiblePages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <View key={`ellipsis-${index}`} style={styles.ellipsis}>
              <UiText font="regular" size="sm" color="textSecondary">
                ...
              </UiText>
            </View>
          );
        }

        const isActive = page === currentPage;
        return (
          <Pressable
            key={page}
            onPress={() => { onPageChange(page); }}
            style={({ pressed }) => [
              styles.pageButton,
              isActive && styles.pageButtonActive,
              pressed && styles.pressed,
            ]}
          >
            <UiText
              font="medium"
              size="sm"
              color={isActive ? "white" : "black"}
            >
              {page}
            </UiText>
          </Pressable>
        );
      })}

      <Pressable
        onPress={() => { currentPage < totalPages && onPageChange(currentPage + 1); }}
        style={({ pressed }) => [
          styles.arrowButton,
          currentPage === totalPages && styles.arrowDisabled,
          pressed && styles.pressed,
        ]}
        disabled={currentPage === totalPages}
      >
        <UiText font="medium" size="sm" color={currentPage === totalPages ? "textSecondary" : "black"}>
          →
        </UiText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
  },
  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.backgroundSecondary,
  },
  arrowDisabled: {
    opacity: 0.5,
  },
  pageButton: {
    minWidth: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    backgroundColor: "transparent",
  },
  pageButtonActive: {
    backgroundColor: COLORS.black,
  },
  ellipsis: {
    paddingHorizontal: 2,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
