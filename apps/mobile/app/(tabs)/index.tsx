import { View, Text, YStack, XStack, Card, H2, Paragraph, ScrollView } from 'tamagui';
import { useMediaQuery } from '@/features/media/useMediaQuery';
import { MediaCard } from '@/components/MediaCard';

export default function HomeScreen() {
  const { data, isLoading } = useMediaQuery({ limit: 10 });

  return (
    <ScrollView>
      <YStack padding={16} space={16}>
        <H2>Discover</H2>
        <Paragraph color="$colorTransparent">Find your next favorite thing</Paragraph>

        <YStack space={12}>
          <Text fontSize="$lg" fontWeight="600">
            Recent Additions
          </Text>
          {isLoading && <Text>Loading...</Text>}
          {data?.data?.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </YStack>
      </YStack>
    </ScrollView>
  );
}
