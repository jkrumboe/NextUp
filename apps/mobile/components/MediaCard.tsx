import { Card, XStack, YStack, Text, Image } from 'tamagui';
import { router } from 'expo-router';
import type { MediaItem } from '@vibelink/types';

interface MediaCardProps {
  item: MediaItem;
}

export function MediaCard({ item }: MediaCardProps) {
  return (
    <Card
      elevate
      size="$4"
      bordered
      onPress={() => router.push(`/media/${item.id}`)}
      animation="bouncy"
      hoverStyle={{ scale: 0.98 }}
      pressStyle={{ scale: 0.95 }}
    >
      <Card.Header padded>
        <XStack space="$3" alignItems="center">
          {item.coverUrl && (
            <Image source={{ uri: item.coverUrl, width: 60, height: 90 }} borderRadius="$2" />
          )}
          <YStack flex={1} space="$1">
            <Text fontSize="$lg" fontWeight="600">
              {item.title}
            </Text>
            {item.subtitle && (
              <Text fontSize="$sm" color="$colorSecondary">
                {item.subtitle}
              </Text>
            )}
            <Text fontSize="$sm" color="$colorSecondary">
              {item.type} {item.year && `• ${item.year}`}
            </Text>
            {item.averageRating && (
              <Text fontSize="$sm" fontWeight="500">
                ⭐ {item.averageRating.toFixed(1)}/10
              </Text>
            )}
          </YStack>
        </XStack>
      </Card.Header>
    </Card>
  );
}
