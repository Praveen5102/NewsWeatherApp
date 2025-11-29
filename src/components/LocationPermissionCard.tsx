// src/components/LocationPermissionCard.tsx
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";

interface LocationPermissionCardProps {
  onAllow: () => void;
  onDeny: () => void;
}

const LocationPermissionCard: React.FC<LocationPermissionCardProps> = ({
  onAllow,
  onDeny,
}) => {
  return (
    <Modal transparent animationType="fade" visible={true} statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconContainer}
          >
            <Text style={styles.icon}>📍</Text>
          </LinearGradient>

          <Text style={styles.title}>Enable Location Access</Text>

          <Text style={styles.description}>
            We need your location to provide you with:
          </Text>

          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>
                Accurate weather information for your area
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>
                Trending news relevant to your region
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>
                Personalized content based on your location
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.allowButton}
            onPress={onAllow}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.allowButtonText}>Allow Access</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.denyButton}
            onPress={onDeny}
            activeOpacity={0.7}
          >
            <Text style={styles.denyButtonText}>Use Default Location</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            If denied, we'll use Delhi, India as the default location
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default LocationPermissionCard;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 28,
    width: width - 40,
    maxWidth: 400,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "500",
  },
  featuresList: {
    width: "100%",
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  featureBullet: {
    fontSize: 20,
    color: colors.primary,
    marginRight: 10,
    marginTop: -2,
    fontWeight: "bold",
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    fontWeight: "500",
  },
  allowButton: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  allowButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  denyButton: {
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: colors.divider,
  },
  denyButtonText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: "600",
  },
  disclaimer: {
    marginTop: 16,
    fontSize: 11,
    color: colors.textTertiary,
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 16,
  },
});
