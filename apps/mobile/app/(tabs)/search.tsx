import { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { YStack, Text, ScrollView } from 'tamagui';
import { useDebounce } from '@/hooks/useDebounce';
import { useMediaQuery } from '@/features/media/useMediaQuery';
import { MediaCard } from '@/components/MediaCard';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading } = useMediaQuery({
    query: debouncedQuery,
    enabled: debouncedQuery.length > 0,
  });

  return (
    <YStack flex={1} padding={16} space={16}>
      <TextInput
        placeholder="Search media..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <ScrollView>
        <YStack space={12}>
          {isLoading && <Text>Searching...</Text>}
          {!isLoading && data?.data?.length === 0 && <Text>No results found</Text>}
          {data?.data?.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});
