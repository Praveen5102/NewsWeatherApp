// src/components/NewsCard.tsx
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { formatDistanceToNow } from "date-fns";
import { Article } from "../types";
import { colors } from "../theme/colors";

interface NewsCardProps {
  article: Article;
  onPress: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onPress }) => {
  const [imageLoading, setImageLoading] = React.useState(true);
  const [imageError, setImageError] = React.useState(false);

  const formattedDate = React.useMemo(() => {
    try {
      return formatDistanceToNow(new Date(article.publishedAt), {
        addSuffix: true,
      });
    } catch {
      return new Date(article.publishedAt).toLocaleDateString();
    }
  }, [article.publishedAt]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {article.image && !imageError && (
        <View style={styles.imageContainer}>
          {imageLoading && (
            <ActivityIndicator
              size="small"
              color={colors.primary}
              style={styles.imageLoader}
            />
          )}
          <Image
            source={{ uri: article.image }}
            style={styles.image}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
          <View style={styles.imageBadge}>
            <Text style={styles.badgeText}>📰</Text>
          </View>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={3}>
          {article.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {article.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.sourceContainer}>
            <Text style={styles.sourceLabel}>Source</Text>
            <Text style={styles.source} numberOfLines={1}>
              {article.source.name}
            </Text>
          </View>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginHorizontal: 12,
    marginVertical: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  imageContainer: {
    width: "100%",
    height: 180,
    backgroundColor: colors.divider,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageLoader: {
    position: "absolute",
  },
  imageBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 6,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  badgeText: {
    fontSize: 14,
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
    fontWeight: "400",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  sourceContainer: {
    flex: 1,
    backgroundColor: colors.primaryLight + "15",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  sourceLabel: {
    fontSize: 9,
    color: colors.textTertiary,
    fontWeight: "600",
    marginBottom: 2,
  },
  source: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: "700",
  },
  date: {
    fontSize: 10,
    color: colors.textTertiary,
    fontWeight: "500",
  },
});
