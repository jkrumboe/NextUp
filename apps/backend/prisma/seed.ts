import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data (optional - comment out if you want to keep data)
  console.log('🧹 Cleaning existing data...');
  await prisma.activity.deleteMany();
  await prisma.link.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.mediaItemTag.deleteMany();
  await prisma.mediaItemCreator.deleteMany();
  await prisma.mediaSearchIndex.deleteMany();
  await prisma.mediaItem.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.creator.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Cleaned existing data');

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'test@vibelink.com',
      username: 'testuser',
      password: hashedPassword,
      avatarUrl: 'https://i.pravatar.cc/150?u=testuser',
    },
  });

  console.log('✅ Created user:', user.username);

  // Create creators
  const creators = await Promise.all([
    prisma.creator.create({
      data: {
        name: 'Brandon Sanderson',
        aliases: ['Brandon Sanderson'],
        bio: 'American fantasy and science fiction writer',
      },
    }),
    prisma.creator.create({
      data: {
        name: 'Christopher Nolan',
        aliases: ['Christopher Nolan', 'Chris Nolan'],
        bio: 'British-American film director and screenwriter',
      },
    }),
    prisma.creator.create({
      data: {
        name: 'Hayao Miyazaki',
        aliases: ['Miyazaki Hayao', '宮崎駿'],
        bio: 'Japanese animator, director, and co-founder of Studio Ghibli',
      },
    }),
    prisma.creator.create({
      data: {
        name: 'Radiohead',
        aliases: ['Radiohead'],
        bio: 'English rock band formed in 1985',
      },
    }),
  ]);

  console.log('✅ Created creators:', creators.map((c) => c.name).join(', '));

  // Create tags
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'Fantasy', kind: 'GENRE' } }),
    prisma.tag.create({ data: { name: 'Sci-Fi', kind: 'GENRE' } }),
    prisma.tag.create({ data: { name: 'Drama', kind: 'GENRE' } }),
    prisma.tag.create({ data: { name: 'Dystopian', kind: 'MOOD' } }),
    prisma.tag.create({ data: { name: 'Epic', kind: 'MOOD' } }),
    prisma.tag.create({ data: { name: 'Atmospheric', kind: 'MOOD' } }),
    prisma.tag.create({ data: { name: 'Magic System', kind: 'TOPIC' } }),
    prisma.tag.create({ data: { name: 'Time', kind: 'TOPIC' } }),
    prisma.tag.create({ data: { name: 'Identity', kind: 'TOPIC' } }),
    prisma.tag.create({ data: { name: 'Cinematic', kind: 'STYLE' } }),
  ]);

  console.log('✅ Created tags');

  // Create media items
  const mistborn = await prisma.mediaItem.create({
    data: {
      type: 'BOOK',
      title: 'Mistborn: The Final Empire',
      subtitle: 'Book One of Mistborn',
      description:
        'In a world where ash falls from the sky, and mist dominates the night, an unlikely hero rises to challenge an immortal emperor.',
      year: 2006,
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51qY5UDx1jL.jpg',
      externalIds: { goodreads: '68428', isbn: '9780765311788' },
      creators: {
        create: [{ creatorId: creators[0].id, role: 'AUTHOR' }],
      },
      tags: {
        create: [
          { tagId: tags[0].id }, // Fantasy
          { tagId: tags[3].id }, // Dystopian
          { tagId: tags[4].id }, // Epic
          { tagId: tags[6].id }, // Magic System
        ],
      },
    },
  });

  const inception = await prisma.mediaItem.create({
    data: {
      type: 'MOVIE',
      title: 'Inception',
      description:
        'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
      year: 2010,
      coverUrl: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._SY679_.jpg',
      externalIds: { imdb: 'tt1375666', tmdb: '27205' },
      creators: {
        create: [{ creatorId: creators[1].id, role: 'DIRECTOR' }],
      },
      tags: {
        create: [
          { tagId: tags[1].id }, // Sci-Fi
          { tagId: tags[5].id }, // Atmospheric
          { tagId: tags[7].id }, // Time
          { tagId: tags[9].id }, // Cinematic
        ],
      },
    },
  });

  const spiritedAway = await prisma.mediaItem.create({
    data: {
      type: 'MOVIE',
      title: 'Spirited Away',
      subtitle: '千と千尋の神隠し',
      description:
        'A young girl becomes trapped in a mysterious spirit world and must find a way to free her parents and return home.',
      year: 2001,
      coverUrl: 'https://m.media-amazon.com/images/I/51JtXdEbAyL._SY679_.jpg',
      externalIds: { imdb: 'tt0245429', tmdb: '129' },
      creators: {
        create: [{ creatorId: creators[2].id, role: 'DIRECTOR' }],
      },
      tags: {
        create: [
          { tagId: tags[0].id }, // Fantasy
          { tagId: tags[5].id }, // Atmospheric
          { tagId: tags[8].id }, // Identity
        ],
      },
    },
  });

  const okComputer = await prisma.mediaItem.create({
    data: {
      type: 'ALBUM',
      title: 'OK Computer',
      description: "Radiohead's third studio album, exploring themes of modern alienation.",
      year: 1997,
      coverUrl: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png',
      externalIds: { spotify: '6dVIqQ8qmQ5GBnJ9shOYGE' },
      creators: {
        create: [{ creatorId: creators[3].id, role: 'MUSICIAN' }],
      },
      tags: {
        create: [
          { tagId: tags[3].id }, // Dystopian
          { tagId: tags[5].id }, // Atmospheric
        ],
      },
    },
  });

  console.log('✅ Created media items');

  // Create ratings
  await prisma.rating.createMany({
    data: [
      { userId: user.id, mediaItemId: mistborn.id, score: 9, reviewText: 'Amazing magic system!' },
      {
        userId: user.id,
        mediaItemId: inception.id,
        score: 10,
        reviewText: 'Mind-bending masterpiece',
      },
      {
        userId: user.id,
        mediaItemId: spiritedAway.id,
        score: 10,
        reviewText: 'Beautiful and imaginative',
      },
      { userId: user.id, mediaItemId: okComputer.id, score: 8 },
    ],
  });

  console.log('✅ Created ratings');

  // Create links
  await prisma.link.createMany({
    data: [
      {
        fromMediaId: mistborn.id,
        toMediaId: spiritedAway.id,
        userId: user.id,
        linkType: 'VIBE',
        strength: 0.7,
        note: 'Both feature imaginative worlds with unique magic/spiritual systems',
      },
      {
        fromMediaId: inception.id,
        toMediaId: okComputer.id,
        userId: user.id,
        linkType: 'THEME',
        strength: 0.6,
        note: 'Explore themes of reality, consciousness, and modern alienation',
      },
    ],
  });

  console.log('✅ Created links');

  // Create activities
  await prisma.activity.createMany({
    data: [
      { userId: user.id, kind: 'RATE', refId: mistborn.id },
      { userId: user.id, kind: 'RATE', refId: inception.id },
      { userId: user.id, kind: 'LINK', refId: mistborn.id },
    ],
  });

  console.log('✅ Created activities');

  // Update search index
  const mediaItems = [mistborn, inception, spiritedAway, okComputer];
  for (const item of mediaItems) {
    const itemWithRelations = await prisma.mediaItem.findUnique({
      where: { id: item.id },
      include: {
        creators: { include: { creator: true } },
        tags: { include: { tag: true } },
        ratings: true,
      },
    });

    const avgRating =
      itemWithRelations!.ratings.length > 0
        ? itemWithRelations!.ratings.reduce((sum, r) => sum + r.score, 0) /
          itemWithRelations!.ratings.length
        : null;

    await prisma.mediaSearchIndex.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        title: item.title,
        type: item.type,
        creatorNames: itemWithRelations!.creators.map((c) => c.creator.name),
        tagNames: itemWithRelations!.tags.map((t) => t.tag.name),
        year: item.year,
        averageRating: avgRating,
        ratingsCount: itemWithRelations!.ratings.length,
      },
    });
  }

  console.log('✅ Updated search index');
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
