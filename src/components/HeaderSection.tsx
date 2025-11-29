// src/components/HeaderSection.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";
import { colors } from "../theme/colors";

interface HeaderSectionProps {
  locationName: string;
  country: string;
  isDefaultLocation?: boolean;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  locationName,
  country,
  isDefaultLocation = false,
}) => {
  const currentDate = format(new Date(), "EEE, MMM d");
  const currentTime = format(new Date(), "h:mm a");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>📰 News & Weather</Text>
          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.subtitle}>
              {locationName}, {country}
            </Text>
            {isDefaultLocation && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBadge}>
          <Text style={styles.infoIcon}>📅</Text>
          <Text style={styles.infoText}>{currentDate}</Text>
        </View>
        <View style={styles.infoBadge}>
          <Text style={styles.infoIcon}>🕐</Text>
          <Text style={styles.infoText}>{currentTime}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  defaultBadge: {
    backgroundColor: colors.warning + "20",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: colors.warning + "40",
  },
  defaultText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.warning,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoBadge: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.divider,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 8,
  },
  infoIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  infoText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
  },
});
