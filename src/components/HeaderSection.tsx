// src/components/HeaderSection.tsx
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { format } from "date-fns";
import { colors } from "../theme/colors";

interface HeaderSectionProps {
  locationName: string;
  country: string;
  isDefaultLocation?: boolean;
  onEnableLocation?: () => void;
  showEnableButton?: boolean;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  locationName,
  country,
  isDefaultLocation = false,
  onEnableLocation,
  showEnableButton = false,
}) => {
  const currentDate = format(new Date(), "EEE, MMM d");
  const currentTime = format(new Date(), "h:mm a");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Text style={styles.title}> News & Weather</Text>
          <View style={styles.locationRow}>
            <Image
              source={require("../../assets/location-pin.png")}
              style={styles.enableIcon}
            />
            <Text style={styles.subtitle}>
              {locationName}, {country}
            </Text>
            {/* Enable Location Button */}
            {showEnableButton && onEnableLocation && (
              <TouchableOpacity onPress={onEnableLocation} activeOpacity={0.8}>
                <Text style={styles.enableText}>↻</Text>
              </TouchableOpacity>
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
  leftSection: {
    flex: 1,
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

  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  enableIcon: {
    width: 20,
    height: 30,
  },
  enableText: {
    marginLeft: 8,
    marginBottom: 4,
    fontSize: 26,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
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
