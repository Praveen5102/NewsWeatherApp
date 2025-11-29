// src/components/SearchBar.tsx
import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { colors } from "../theme/colors";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search news by keyword...",
}) => {
  const handleClear = () => {
    onChangeText("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            style={styles.clearButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View style={styles.clearIconContainer}>
              <Text style={styles.clearIcon}>✕</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      {value.length > 0 && (
        <Text style={styles.searchHint}>Searching for "{value}"...</Text>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 14,
    height: 52,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    fontWeight: "500",
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearIconContainer: {
    backgroundColor: colors.textTertiary + "20",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  clearIcon: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  searchHint: {
    marginTop: 8,
    marginLeft: 4,
    fontSize: 12,
    color: colors.textTertiary,
    fontWeight: "500",
    fontStyle: "italic",
  },
});
