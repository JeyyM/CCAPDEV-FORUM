const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb://localhost:27017";
const dbName = "forum";
const forumsVar = "forums";
const usersVar = "users"
const postsVar = "posts"
const commentsVar = "comments"

const client = new MongoClient(uri);

const mongo = {
    async initializeDB() {
        try {
            await client.connect();
            console.log("Connected to MongoDB");

            const db = client.db(dbName);

            const collections = await db.listCollections({}, { nameOnly: true }).toArray();
            const collectionExists = collections.some(col => col.name === forumsVar);

            if (!collectionExists) {
                await db.createCollection(forumsVar);
                console.log(`Collection "${forumsVar}" created`);
            } else {
                console.log(`Collection "${forumsVar}" already exists`);
            }

        } catch (error) {
            console.error("Connection message: ", error);
        }
    },

    async insertSampleForum() {
        try {
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            const existingForums = await forumsCollection.countDocuments();
            if (existingForums === 0) {
                const sampleForums = [
                    {
                        _id: new ObjectId("67c7b80a8f936822ab91789f"),
                        name: "Minecraft",
                        description: "I love miners",
                        forumImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Minecraft-creeper-face.jpg/800px-Minecraft-creeper-face.jpg",
                        bannerImage: "https://store-images.s-microsoft.com/image/apps.58378.13850085746326678.826cc014-d610-46af-bdb3-c5c96be4d22c.64287a91-c69e-4723-bb61-03fecd348c2a?q=90&w=480&h=270",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        membersCount: 0,
                        postsCount: 5,
                        admins: ["67c792cfb3ba6d9c76f699d5", "67c792cfb3ba6d9c76f699d6"],
                        bannedUsers: []
                    },
                    {
                        _id: new ObjectId("67c7b80a8f936822ab9178a0"),
                        name: "Valorant",
                        description: "Tactical FPS shooter discussion.",
                        forumImage: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Valorant_cover.jpg/220px-Valorant_cover.jpg",
                        bannerImage: "https://assets.xboxservices.com/assets/4e/bc/4ebcb533-e184-42f3-833b-9aa47a81f39e.jpg?n=153142244433_Poster-Image-1084_1920x720.jpg",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        membersCount: 0,
                        postsCount: 5,
                        admins: ["67c792cfb3ba6d9c76f699d7", "67c792cfb3ba6d9c76f699d9"],
                        bannedUsers: []
                    },
                    {
                        _id: new ObjectId("67c7b80a8f936822ab9178a1"),
                        name: "Fortnite",
                        description: "Battle Royale & Creative Mode fun.",
                        forumImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK92FCICZrxikCaiZ6uy3SxTj3f3RH-6r3Aw&s",
                        bannerImage: "https://cdn2.unrealengine.com/social-image-chapter4-s3-3840x2160-d35912cc25ad.jpg",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        membersCount: 0,
                        postsCount: 5,
                        admins: ["67c792cfb3ba6d9c76f699d5", "67c792cfb3ba6d9c76f699d6"],
                        bannedUsers: []
                    },
                    {
                        _id: new ObjectId("67c7b80a8f936822ab9178a2"),
                        name: "Anime",
                        description: "Discuss your favorite anime & manga.",
                        forumImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA-9w-zOzzGAyK-ExVZvG6IU4fznAvxDylAg&s",
                        bannerImage: "https://assets-prd.ignimgs.com/2022/08/17/top25animecharacters-blogroll-1660777571580.jpg",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        membersCount: 0,
                        postsCount: 5,
                        admins: ["67c792cfb3ba6d9c76f699d5", "67c792cfb3ba6d9c76f699d6"],
                        bannedUsers: []
                    },
                    {
                        _id: new ObjectId("67c7b80a8f936822ab9178a3"),
                        name: "CSGO",
                        description: "Counter-Strike Global Offensive chat.",
                        forumImage: "https://chrischow.github.io/dataandstuff/img/csgo_full.png",
                        bannerImage: "https://images.squarespace-cdn.com/content/v1/611d60fe1bdfad3944022ea3/1631105961707-JPE2RY0093NEBB6SXZ4C/CSGO-Operation-10-Details.jpg",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        membersCount: 0,
                        postsCount: 5,
                        admins: ["67c792cfb3ba6d9c76f699d7", "67c792cfb3ba6d9c76f699d9"],
                        bannedUsers: []
                    }
                ];

                await forumsCollection.insertMany(sampleForums);
                console.log("5 sample forums inserted.");
            } else {
                console.log("Forum data already exists.");
            }
        } catch (error) {
            console.error("Error inserting sample forums: ", error);
        }
    },

    async insertSampleUser() {
        try {
            const db = client.db(dbName);
            const usersCollection = db.collection(usersVar);

            const existingUsers = await usersCollection.countDocuments();
            if (existingUsers === 0) {
                const sampleUsers = [{
                    "_id": {
                      "$oid": "67c792cfb3ba6d9c76f699d5"
                    },
                    "username": "WanderlustNomad",
                    "email": "apple@email.com",
                    "profileImage": "https://cdn.gigwise.com/wp-content/uploads/2024/12/Balancing-Work-and-Wanderlust%E2%80%94Lessons-from-a-Digital-Nomad-1024x574.png",
                    "bannerImage": "https://assets.entrepreneur.com/content/3x2/2000/20180405210852-GettyImages-639808346.jpeg",
                    "password": "123",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.950Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.950Z"
                    },
                    "bio": "Exploring the world one country at a time. Currently obsessed with trying street food everywhere. I'm also an amateur photographer capturing landscapes & cultures",
                    "joinedForums": [
                      "67c7b80a8f936822ab91789f"
                    ],
                    "following": [],
                    "followersCount": 0,
                    "postsCount": 6,
                    "commentsCount": 25,
                    "votes": [],
                    "commentVotes": []
                  },
                  {
                    "_id": {
                      "$oid": "67c792cfb3ba6d9c76f699d6"
                    },
                    "username": "MidnightPhilosopher",
                    "email": "banana@email.com",
                    "profileImage": "https://img.freepik.com/free-photo/front-view-epiphany-day-candles-with-copy-space-gift-box_23-2148746758.jpg",
                    "bannerImage": "https://images.unsplash.com/photo-1485498128961-422168ba5f87?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3JpdGluZyUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D",
                    "password": "123",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.950Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.950Z"
                    },
                    "bio": "\"Yes bio.\"",
                    "joinedForums": [],
                    "following": [],
                    "followersCount": 0,
                    "postsCount": 5,
                    "commentsCount": 25,
                    "votes": []
                  },
                  {
                    "_id": {
                      "$oid": "67c792cfb3ba6d9c76f699d7"
                    },
                    "username": "GeekOverlord",
                    "email": "orange@email.com",
                    "profileImage": "https://i.pinimg.com/236x/8e/31/21/8e31210724a36c9da5ac4705074e1015.jpg",
                    "bannerImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFlLCkE8cxJzkCT4R3Y03Fj4waL3HIwt1ULg&s",
                    "password": "123",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.950Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.950Z"
                    },
                    "bio": "Hardcore gamer, from retro to next-gen.\nI like building custom PCs & testing new gadgets\nBooks I read: Sci-fi & fantasy bookworm (Dune, LOTR, The Expanse)",
                    "joinedForums": [],
                    "following": [],
                    "followersCount": 0,
                    "postsCount": 5,
                    "commentsCount": 25,
                    "votes": []
                  },
                  {
                    "_id": {
                      "$oid": "67c792cfb3ba6d9c76f699d8"
                    },
                    "username": "CreativeChaos",
                    "email": "melon@email.com",
                    "profileImage": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ca4244a3-4ba1-4186-809b-31a4358d3605/desdu2p-4a865ea7-3507-438e-9d95-ad71d33cb88b.png/v1/fill/w_894,h_894,q_70,strp/new_pfp_by_pokerfacedartist_desdu2p-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcL2NhNDI0NGEzLTRiYTEtNDE4Ni04MDliLTMxYTQzNThkMzYwNVwvZGVzZHUycC00YTg2NWVhNy0zNTA3LTQzOGUtOWQ5NS1hZDcxZDMzY2I4OGIucG5nIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.T6M9PbfBN0Fg7q4Ig7539mElSLu5DdVFdX-ffnuv4jk",
                    "bannerImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2NOgi9e8n-cllUR8gZdMYMqK0kNEckeCViA&s",
                    "password": "123",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.950Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.950Z"
                    },
                    "bio": "🎨 Artist | DIY Enthusiast | Vintage Collector\n🖌 Sketching & painting when inspiration hits\n📺 Fixing up old tech & restoring vintage finds\n✂️ Always working on a new DIY or craft project",
                    "joinedForums": [],
                    "following": [],
                    "followersCount": 0,
                    "postsCount": 5,
                    "commentsCount": 25,
                    "votes": []
                  },
                  {
                    "_id": {
                      "$oid": "67c792cfb3ba6d9c76f699d9"
                    },
                    "username": "FitnessJunkie42",
                    "email": "kiwi@email.com",
                    "profileImage": "https://archive.org/download/twitter-default-pfp/e.png",
                    "bannerImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHafTgWDYkDRsGd7eM07ZA-WaADtunM88ig&s",
                    "password": "123",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.950Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.950Z"
                    },
                    "bio": "when life gets hard, I get harder",
                    "joinedForums": [],
                    "following": [],
                    "followersCount": 0,
                    "postsCount": 5,
                    "commentsCount": 25,
                    "votes": []
                  }];

                await usersCollection.insertMany(sampleUsers);
                console.log("5 sample users inserted.");
            } else {
                console.log("Users data already exists.");
            }
        } catch (error) {
            console.error("Error inserting sample users: ", error);
        }
    },

    async insertSamplePosts() {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);
            const commentsCollection = db.collection(commentsVar);

            const existingPosts = await postsCollection.countDocuments();
            if (existingPosts === 0) {
                const forums = {
                    "Minecraft": "67c7b80a8f936822ab91789f",
                    "Valorant": "67c7b80a8f936822ab9178a0",
                    "Fortnite": "67c7b80a8f936822ab9178a1",
                    "Anime": "67c7b80a8f936822ab9178a2",
                    "CSGO": "67c7b80a8f936822ab9178a3"
                };

                const users = {
                    "apple": "67c792cfb3ba6d9c76f699d5",
                    "banana": "67c792cfb3ba6d9c76f699d6",
                    "orange": "67c792cfb3ba6d9c76f699d7",
                    "melon": "67c792cfb3ba6d9c76f699d8",
                    "kiwi": "67c792cfb3ba6d9c76f699d9"
                };

                const ids = [
                    "67c94be9b7d17daa0a4df1a3", "67c94be9b7d17daa0a4df1a4", "67c94be9b7d17daa0a4df1a5",
                    "67c94be9b7d17daa0a4df1a6", "67c94be9b7d17daa0a4df1a7", "67c94be9b7d17daa0a4df1a8",
                    "67c94be9b7d17daa0a4df1a9", "67c94be9b7d17daa0a4df1aa", "67c94be9b7d17daa0a4df1ab",
                    "67c94be9b7d17daa0a4df1ac", "67c94be9b7d17daa0a4df1ad", "67c94be9b7d17daa0a4df1ae",
                    "67c94be9b7d17daa0a4df1af", "67c94be9b7d17daa0a4df1b0", "67c94be9b7d17daa0a4df1b1",
                    "67c94be9b7d17daa0a4df1b2", "67c94be9b7d17daa0a4df1b3", "67c94be9b7d17daa0a4df1b4",
                    "67c94be9b7d17daa0a4df1b5", "67c94be9b7d17daa0a4df1b6", "67c94be9b7d17daa0a4df1b7",
                    "67c94be9b7d17daa0a4df1b8", "67c94be9b7d17daa0a4df1b9", "67c94be9b7d17daa0a4df1ba",
                    "67c94be9b7d17daa0a4df1bb"].map(id => new ObjectId(id));

                let index = 0;
                let samplePosts = [];
                let sampleComments = [];

                samplePosts = [{
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1a3"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab91789f"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d5"
                    },
                    "title": "Best Redstone Builds",
                    "content": "Share your craziest redstone contraptions!",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.958Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.958Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1a4"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab91789f"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d6"
                    },
                    "title": "Hardcore Mode Tips",
                    "content": "What's the best way to survive in Hardcore?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.958Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.958Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1a5"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab91789f"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d7"
                    },
                    "title": "Nether Base Ideas",
                    "content": "Need cool design inspirations for my nether base.",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.958Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.958Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1a6"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab91789f"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d8"
                    },
                    "title": "Speedrun Strategies",
                    "content": "What’s the fastest way to beat the Ender Dragon?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.958Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.958Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1a7"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab91789f"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d9"
                    },
                    "title": "Favorite Texture Packs",
                    "content": "Which packs do you guys recommend?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.958Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.958Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1a8"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a0"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d5"
                    },
                    "title": "Best Agents for Ranked",
                    "content": "Who should I main for climbing in Ranked?",
                    "createdAt": {
                      "$date": "2023-02-05T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2023-03-05T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1a9"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a0"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d6"
                    },
                    "title": "Aim Training Drills",
                    "content": "What’s the best way to improve crosshair placement?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1aa"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a0"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d7"
                    },
                    "title": "Vandal vs Phantom",
                    "content": "Which gun do you prefer and why?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1ab"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a0"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d8"
                    },
                    "title": "Toxic Teammates",
                    "content": "How do you deal with toxic teammates in comp?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1ac"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a0"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d9"
                    },
                    "title": "Best Valorant Skins",
                    "content": "Which skin bundle is worth buying?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1ad"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a1"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d5"
                    },
                    "title": "Best Landing Spots",
                    "content": "Where do you drop for easy wins?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1ae"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a1"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d6"
                    },
                    "title": "Fortnite OG is Back!",
                    "content": "What are your thoughts on the OG map returning?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1af"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a1"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d7"
                    },
                    "title": "Best Fortnite Skins",
                    "content": "Which skins are a must-have?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1b0"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a1"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d8"
                    },
                    "title": "Building vs Zero Build",
                    "content": "Do you prefer the classic building mode or Zero Build?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1b1"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a1"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d9"
                    },
                    "title": "Tips for New Players",
                    "content": "What’s the best way for new players to improve?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1b2"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a2"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d5"
                    },
                    "title": "Top 10 Anime of All Time",
                    "content": "Let’s rank our top 10 anime!",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1b3"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a2"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d6"
                    },
                    "title": "Best New Anime 2024",
                    "content": "What are the best anime from this year?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1b4"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a2"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d7"
                    },
                    "title": "Underrated Anime Gems",
                    "content": "Share anime that deserve more recognition.",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1b5"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a2"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d8"
                    },
                    "title": "Manga vs Anime",
                    "content": "Do you prefer reading manga or watching anime?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1b6"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a2"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d9"
                    },
                    "title": "Best Shonen Protagonist",
                    "content": "Who’s the best protagonist in shonen anime?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1b7"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a3"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d5"
                    },
                    "title": "Best Pistol for Eco Rounds?",
                    "content": "Do you prefer P250, Five-Seven, or Deagle?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1b8"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a3"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d6"
                    },
                    "title": "AWP vs Scout",
                    "content": "Which one is better for aggressive playstyle?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1b9"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a3"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d7"
                    },
                    "title": "CS:GO vs CS2",
                    "content": "Which version do you prefer?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1ba"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a3"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d8"
                    },
                    "title": "Clutch Situations",
                    "content": "What’s the best way to stay calm in 1vX?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67c94be9b7d17daa0a4df1bb"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a3"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d9"
                    },
                    "title": "Best Map for Beginners",
                    "content": "Which map should new players learn first?",
                    "createdAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-07T04:25:45.959Z"
                    },
                    "comments": [],
                    "voteValue": 0,
                    "commentsCount": 5
                  },
                  {
                    "_id": {
                      "$oid": "67cd7021b8b17b78e305942c"
                    },
                    "forumId": {
                      "$oid": "67c7b80a8f936822ab9178a3"
                    },
                    "authorId": {
                      "$oid": "67c792cfb3ba6d9c76f699d5"
                    },
                    "title": "zx",
                    "content": "zx",
                    "voteValue": 0,
                    "comments": [],
                    "createdAt": {
                      "$date": "2025-03-09T10:40:33.430Z"
                    },
                    "updatedAt": {
                      "$date": "2025-03-09T10:40:33.430Z"
                    },
                    "commentsCount": 0
                  }];
/*
                for (const [forumName, forumId] of Object.entries(forums)) {
                    for (const [username, userId] of Object.entries(users)) {
                        const postId = ids[index];

                        samplePosts.push({
                            _id: postId,
                            forumId: new ObjectId(forumId),
                            authorId: new ObjectId(userId),
                            title: `${username} in ${forumName}`,
                            content: `User ${username} posting something in ${forumName}`,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            comments: [],
                            voteValue: 0,
                            commentsCount: 5
                        });

                        for (const [user, userId] of Object.entries(users)) {
                            sampleComments.push({
                                _id: new ObjectId(),
                                postId: new ObjectId(postId),
                                authorId: new ObjectId(userId),
                                parentId: null,
                                content: `${user}'s comment on post ${postId}`,
                                createdAt: new Date(),
                                updatedAt: new Date(),
                                voteValue: 0,
                            });
                        }

                        index++;
                    }
                }*/

                await postsCollection.insertMany(samplePosts);
                await commentsCollection.insertMany(sampleComments);

                console.log(`${samplePosts.length} Sample posts inserted successfully.`);
                console.log(`${sampleComments.length} Sample comments inserted successfully.`);
            } else {
                console.log("Posts data already exists.");
            }
        } catch (error) {
            console.error("Error inserting sample posts: ", error);
        }
    },

    ////////////////////// FORUM INTERACTIONS ////////////////////////

    async getForums(sortBy, order, limit, skip) {
        try {
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            return await forumsCollection.find().sort({ [sortBy]: order, _id: order }).skip(skip).limit(limit).toArray();
        } catch (error) {
            console.error("Error fetching forums: ", error);
            return [];
        }
    },

    async getForumById(forumId) {
        try {
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            return await forumsCollection.findOne({ _id: new ObjectId(forumId) });
        } catch (error) {
            console.error("Error fetching forum by ID: ", error);
            return null;
        }
    },

    async getForumByName(forumName) {
        try {
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            // Regex to remove case sensitivity
            const forum = await forumsCollection.findOne({
                name: { $regex: `^${forumName}$`, $options: "i" }
            });

            return forum;
        } catch (error) {
            console.error("Error fetching forum by name: ", error);
            return null;
        }
    },

    async addForum(forumData) {
        try {
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            const newForum = {
                _id: new ObjectId(),
                ...forumData,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const result = await forumsCollection.insertOne(newForum);
            return result.insertedId;
        } catch (error) {
            console.error("Error adding forum: ", error);
            return null;
        }
    },

    async updateForum(forumId, updatedData) {
        try {
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            updatedData.updatedAt = new Date(updatedData.updatedAt);

            const result = await forumsCollection.updateOne(
                { _id: new ObjectId(forumId) },
                { $set: updatedData }
            );

            return { success: true, message: "Forum updated successfully!" };
        } catch (error) {
            console.error("Error updating forum: ", error);
            return { success: false, message: "Error updating forum" };;
        }
    },

    async updateForums(forums) {
        try {
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            for (let forum of forums) {
                const { _id, ...updatedData } = forum;
                updatedData.updatedAt = new Date(updatedData.updatedAt);

                await forumsCollection.updateOne(
                    { _id: new ObjectId(_id) },
                    { $set: updatedData }
                );
            }

            return { success: true, message: "Forums updated successfully!" };
        } catch (error) {
            console.error("Error updating forums: ", error);
            return { success: false, message: "Error updating forums" };
        }
    },

    async deleteForum(forumId) {
        try {
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            const result = await forumsCollection.deleteOne({ _id: new ObjectId(forumId) });
            return { success: true, message: "Forum deleted successfully!" };
        } catch (error) {
            console.error("Error deleting forum: ", error);
            return { success: false, message: "Error deleting forum" };
        }
    },

    /////////////////////// USER INTERACTIONS ///////////////////////////////

    async getUsers(sortBy, order, limit, skip) {
        try {
            const db = client.db(dbName);
            const usersCollection = db.collection(usersVar);

            return await usersCollection.find().sort({ [sortBy]: order, _id: order }).skip(skip).limit(limit).toArray();

        } catch (error) {
            console.error("Error fetching users: ", error);
            return [];
        }
    },

    async getUserById(userId) {
        try {
            const db = client.db(dbName);
            const userCollection = db.collection(usersVar);

            return await userCollection.findOne({ _id: new ObjectId(userId) });
        } catch (error) {
            console.error("Error fetching user by ID: ", error);
            return null;
        }
    },

    async getUserByName(username) {
        try {
            const db = client.db(dbName);
            const userCollection = db.collection(usersVar);

            // Regex to remove case sensitivity
            const user = await userCollection.findOne({
                username: { $regex: `^${username}$`, $options: "i" }
            });

            return user;
        } catch (error) {
            console.error("Error fetching user by name: ", error);
            return null;
        }
    },

    async getUserByEmail(email) {
        try {
            const db = client.db(dbName);
            const userCollection = db.collection(usersVar);

            // Regex to remove case sensitivity
            const user = await userCollection.findOne({
                email: { $regex: `^${email}$`, $options: "i" }
            });

            return user;
        } catch (error) {
            console.error("Error fetching user by name: ", error);
            return null;
        }
    },

    async addUser(userData) {
        try {
            const db = client.db(dbName);
            const userCollection = db.collection(usersVar);

            const newUser = {
                _id: new ObjectId(),
                ...userData,
                createdAt: new Date(),
                updatedAt: new Date(),
                followersCount: 0,
                postsCount: 5,
                commentsCount: 0,
                votes: [],
                commentVotes: []
            };

            const result = await userCollection.insertOne(newUser);
            return result.insertedId;
        } catch (error) {
            console.error("Error adding user: ", error);
            return null;
        }
    },

    async updateUser(userId, updatedData) {
        try {
            const db = client.db(dbName);
            const usersCollection = db.collection(usersVar);

            updatedData.updatedAt = new Date(updatedData.updatedAt);

            const result = await usersCollection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: updatedData }
            );

            return { success: true, message: "User updated successfully!" };
        } catch (error) {
            console.error("Error updating user: ", error);
            return { success: false, message: "Error updating user" };;
        }
    },

    async updateUsers(users) {
        try {
            const db = client.db(dbName);
            const usersCollection = db.collection(usersVar);

            for (let user of users) {
                const { _id, ...updatedData } = user;
                updatedData.updatedAt = new Date(updatedData.updatedAt);

                const result = await usersCollection.updateOne(
                    { _id: new ObjectId(_id) },
                    { $set: updatedData }
                );
            }

            return { success: true, message: "Users updated successfully!" };
        } catch (error) {
            console.error("Error updating users: ", error);
            return { success: false, message: "Error updating users" };
        }
    },

    async deleteUser(userId) {
        try {
            const db = client.db(dbName);
            const usersCollection = db.collection(usersVar);

            const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) });
            return { success: true, message: "User deleted successfully!" };
        } catch (error) {
            console.error("Error deleting forum: ", error);
            return { success: false, message: "Error deleting user" };;
        }
    },

    // async getUserActivities(userId, sortBy, order, limit, skip) {
    //     try {
    //         const db = client.db(dbName);
    //         const postsCollection = db.collection(usersVar);
    //         const commentsCollection = db.collection(usersVar);

    //         return await usersCollection.find().sort({ [sortBy]: order, _id: order }).skip(skip).limit(limit).toArray();

    //     } catch (error) {
    //         console.error("Error fetching users: ", error);
    //         return [];
    //     }
    // },

    async getUserActions(userId, sortBy = "createdAt", order = -1, limit = 10, skip = 0) {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection("posts");
            const commentsCollection = db.collection("comments");
    
            const [posts, comments] = await Promise.all([
                postsCollection.find({ authorId: userId }).toArray(),
                commentsCollection.find({ authorId: userId }).toArray()
            ]);
    
            let activities = [
                ...posts.map(p => ({ ...p, type: "post" })),
                ...comments.map(c => ({ ...c, type: "comment" })),
            ];
    
            activities.sort((a, b) => {
                if (order === 1) return new Date(a[sortBy]) - new Date(b[sortBy]);
                else return new Date(b[sortBy]) - new Date(a[sortBy]);
            });
    
            // Apply pagination (skip & limit)
            activities = activities.slice(skip, skip + limit);
    
            return activities;
        } catch (error) {
            console.error("Error fetching user actions: ", error);
            return [];
        }
    },
    
    //////////////////////// ACCOUNT INTERACTIONS /////////////////////
    async toggleForumJoin(userId, forumId) {
        try {
            const db = client.db(dbName);
            const usersCollection = db.collection(usersVar);
            const forumsCollection = db.collection(forumsVar);

            const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

            if (!user) {
                return { success: false, message: "User not found" };
            }

            const isJoined = user.joinedForums.includes(forumId);

            if (isJoined) {
                await usersCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $pull: { joinedForums: forumId } }
                );

                await forumsCollection.updateOne(
                    { _id: new ObjectId(forumId) },
                    { $inc: { membersCount: -1 } }
                );
            } else {
                await usersCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $push: { joinedForums: forumId } }
                );

                await forumsCollection.updateOne(
                    { _id: new ObjectId(forumId) },
                    { $inc: { membersCount: 1 } }
                );
            }

            return {
                success: true,
                message: isJoined ? "Successfully left forum" : "Successfully joined joined",
                presentStatus: isJoined ? false : true
            };
        } catch (error) {
            console.error("Error toggling forum join: ", error);
            return { success: false, message: "Error toggling forum join" };
        }
    },

    async toggleUserFollow(currentUserId, targetUserId) {
        try {
            const db = client.db(dbName);
            const usersCollection = db.collection(usersVar);

            const user = await usersCollection.findOne({ _id: new ObjectId(currentUserId) });

            if (currentUserId === targetUserId) {
                return { success: false, message: "Cannot follow self" };
            }

            const isFollowed = user.following.includes(targetUserId);

            if (isFollowed) {
                await usersCollection.updateOne(
                    { _id: new ObjectId(currentUserId) },
                    { $pull: { following: targetUserId } }
                );

                await usersCollection.updateOne(
                    { _id: new ObjectId(targetUserId) },
                    { $inc: { followersCount: -1 } }
                );
            } else {
                await usersCollection.updateOne(
                    { _id: new ObjectId(currentUserId) },
                    { $push: { following: targetUserId } }
                );

                await usersCollection.updateOne(
                    { _id: new ObjectId(targetUserId) },
                    { $inc: { followersCount: 1 } }
                );
            }

            return {
                success: true,
                message: isFollowed ? "Successfully unfollowed" : "Successfully followed",
                presentStatus: isFollowed ? false : true
            };
        } catch (error) {
            console.error("Error toggling follow: ", error);
            return { success: false, message: "Error toggling follow" };
        }
    },

    //////////////////////// POST INTERACTIONS /////////////////////
    async getPosts() {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);

            return await postsCollection.find().toArray();
        } catch (error) {
            console.error("Error fetching posts: ", error);
            return [];
        }
    },

    async getPostsByForumId(forumId, sortBy, order, limit, skip) {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);
    
            const now = new Date();
    
            if (sortBy === "hot") {
                // Perform a forum-wide search since hotRating needs to be computed manually

                let posts = await postsCollection.find({ forumId: new ObjectId(forumId) }).toArray();
    
                const exponent = 1.5; 

                posts.forEach(post => {
                    const ageInHours = (now - new Date(post.createdAt)) / (1000 * 60 * 60);
                    post.hotRating = post.voteValue / Math.pow(1 + ageInHours, exponent);
                });

                posts.sort((a, b) => (order === 1 ? a.hotRating - b.hotRating : b.hotRating - a.hotRating));
    
                return posts.slice(skip, skip + limit);
            } else {
                return await postsCollection.find({ forumId: new ObjectId(forumId) }).sort({ [sortBy]: order, _id: order }).skip(skip).limit(limit).toArray();
            }
        } catch (error) {
            console.error("Error fetching posts by forum ID: ", error);
            return [];
        }
    },    

    async getPostsByForumIds(forumIds, sortBy, order, limit, skip) {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);
            const now = new Date();
    
            let idArray = [];
    
            if (typeof forumIds === "string") {
                console.log("string");

                if (forumIds === "all") {
                    idArray = [];
                }
                else {
                    idArray = forumIds.split(",").map(id => {
                        return new ObjectId(id.trim());
                    });
                }
            }

            else {
                idArray = forumIds.map(id => new ObjectId(id.trim()));
            }
        
            let posts;
    
            if (sortBy === "hot") {
                if (idArray.length > 0) {
                    posts = await postsCollection.find({ forumId: { $in: idArray } }).toArray();
                } else {
                    posts = await postsCollection.find().toArray();
                }
    
                const exponent = 1.5;
                posts.forEach(post => {
                    const ageInHours = (now - new Date(post.createdAt)) / (1000 * 60 * 60);
                    post.hotRating = post.voteValue / Math.pow(1 + ageInHours, exponent);
                });
    
                posts.sort((a, b) => (order === 1 ? a.hotRating - b.hotRating : b.hotRating - a.hotRating));
    
                return posts.slice(skip, skip + limit);
            } else {
                let query = idArray.length > 0 ? { forumId: { $in: idArray } }: {};
        
                posts = await postsCollection.find(query).sort({ [sortBy]: order, _id: order }).skip(skip).limit(limit).toArray();
                return posts;
            }
        } catch (error) {
            console.error("Error fetching posts by forum ID:", error);
            return [];
        }
    },    
    

    async getPostsByUserId(userId) {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);

            return await postsCollection.find({ userId: new ObjectId(userId) }).toArray();
        } catch (error) {
            console.error("Error fetching posts by user ID: ", error);
            return [];
        }
    },

    async updatePosts(posts) {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);

            for (let post of posts) {
                const { _id, ...updatedData } = post;
                updatedData.updatedAt = new Date(updatedData.updatedAt);

                const result = await postsCollection.updateOne(
                    { _id: new ObjectId(_id) },
                    { $set: updatedData }
                );
            }

            return { success: true, message: "Posts updated successfully" };
        } catch (error) {
            console.error("Error updating posts: ", error);
            return { success: false, message: "Error updating posts" };
        }
    },

    async updatePost(postId, updatedData) {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);

            updatedData.updatedAt = new Date(updatedData.updatedAt);

            const result = await postsCollection.updateOne(
                { _id: new ObjectId(postId) },
                { $set: updatedData }
            );

            return { success: true, message: "Post updated successfully!" };
        } catch (error) {
            console.error("Error updating post: ", error);
            return { success: false, message: "Error updating post" };;
        }
    },

    async addPost(postData) {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);
            const usersCollection = db.collection(usersVar);
            const forumsCollection = db.collection(forumsVar);

            const forumId = new ObjectId(postData.forumId);
            const authorId = new ObjectId(postData.authorId);

            const newPost = {
                _id: new ObjectId(),
                ...postData,
                forumId: forumId,
                authorId: authorId,
                createdAt: new Date(),
                updatedAt: new Date(),
                comments: [],
                voteValue: 0,
                commentsCount: 0
            };

            const result = await postsCollection.insertOne(newPost);

            await usersCollection.updateOne(
                { _id: authorId },
                { $inc: { postsCount: 1 } }
            );

            await forumsCollection.updateOne(
                { _id: forumId },
                { $inc: { postsCount: 1 } }
            );

            return result.insertedId;
        } catch (error) {
            console.error("Error adding post: ", error);
            return null;
        }
    },

    async deletePost(postId) {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);
            const usersCollection = db.collection(usersVar);
            const forumsCollection = db.collection(forumsVar);

            const post = await postsCollection.findOne({ _id: new ObjectId(postId) });

            const result = await postsCollection.deleteOne({ _id: new ObjectId(postId) });

            await usersCollection.updateOne(
                { _id: post.authorId },
                { $inc: { postsCount: -1 } }
            );

            await forumsCollection.updateOne(
                { _id: post.forumId },
                { $inc: { postsCount: -1 } }
            );

            return { success: true, message: "Post deleted successfully!" };
        } catch (error) {
            console.error("Error deleting forum: ", error);
            return { success: false, message: "Error deleting post" };;
        }
    },

    async toggleVote(userId, postId, voteValue) {
        // console.log("PREVIOUS: ", voteValue);
        try {
            const db = client.db(dbName);
            const usersCollection = db.collection(usersVar);
            const postsCollection = db.collection(postsVar);

            const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
            if (!user) {
                return { success: false, message: "User not found" };
            }

            const post = await postsCollection.findOne({ _id: new ObjectId(postId) });
            if (!post) {
                return { success: false, message: "Post not found" };
            }

            let voteChange = 0;

            const existingVote = user.votes.find(entry => String(entry.postId) === String(post._id));

            if (existingVote) {
                // console.log("Existing Vote: ", existingVote);

                await usersCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $pull: { votes: { postId: post._id } } }
                );

                if (existingVote.vote === voteValue) {
                    voteChange = -voteValue;
                } else {
                    await usersCollection.updateOne(
                        { _id: new ObjectId(userId) },
                        { $push: { votes: { postId: post._id, vote: voteValue } } }
                    );
                    voteChange = voteValue - existingVote.vote;
                }
            } else {
                await usersCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $push: { votes: { postId: post._id, vote: voteValue } } }
                );
                voteChange = voteValue;
            }

            await postsCollection.updateOne(
                { _id: new ObjectId(postId) },
                { $inc: { voteValue: voteChange } }
            );

            const updatedPost = await postsCollection.findOne({ _id: new ObjectId(postId) });

            return { success: true, message: "Vote updated successfully", voteValue: updatedPost.voteValue };
        } catch (error) {
            console.error("Error toggling vote: ", error);
            return { success: false, message: "Error toggling vote" };
        }
    },

    /////////////////// COMMENT INTERACTIONS ///////////
    async getCommentsByPostId(postId) {
        try {
            const db = client.db(dbName);
            const commentsCollection = db.collection(commentsVar);

            return await commentsCollection.find({ postId: new ObjectId(postId) }).toArray();
        } catch (error) {
            console.error("Error fetching posts by forum ID: ", error);
            return [];
        }
    },

    async updateComment(commentId, updatedData) {
        try {
            const db = client.db(dbName);
            const commentsCollection = db.collection(commentsVar);

            updatedData.updatedAt = new Date(updatedData.updatedAt);

            const result = await commentsCollection.updateOne(
                { _id: new ObjectId(commentId) },
                { $set: updatedData }
            );

            return { success: true, message: "Comment updated successfully!" };
        } catch (error) {
            console.error("Error updating comment: ", error);
            return { success: false, message: "Error updating comment" };;
        }
    },

    async addComment(commentData) {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);
            const usersCollection = db.collection(usersVar);
            const commentsCollection = db.collection(commentsVar);

            const postId = new ObjectId(commentData.postId);
            const authorId = new ObjectId(commentData.authorId);

            const newComment = {
                _id: new ObjectId(),
                ...commentData,
                postId: postId,
                authorId: authorId,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const result = await commentsCollection.insertOne(newComment);

            await usersCollection.updateOne(
                { _id: authorId },
                { $inc: { commentsCount: 1 } }
            );

            await postsCollection.updateOne(
                { _id: postId },
                { $inc: { commentsCount: 1 } }
            );

            return result.insertedId;
        } catch (error) {
            console.error("Error adding comment: ", error);
            return null;
        }
    },

    async deleteComment(commentId) {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);
            const usersCollection = db.collection(usersVar);
            const commentsCollection = db.collection(commentsVar);

            const comment = await commentsCollection.findOne({ _id: new ObjectId(commentId) });
            const result = await commentsCollection.deleteOne({ _id: new ObjectId(commentId) });

            await usersCollection.updateOne(
                { _id: comment.authorId },
                { $inc: { commentsCount: -1 } }
            );

            await postsCollection.updateOne(
                { _id: comment.postId },
                { $inc: { commentsCount: -1 } }
            );

            return { success: true, message: "Comment deleted successfully!" };
        } catch (error) {
            console.error("Error deleting comment: ", error);
            return { success: false, message: "Error deleting comment" };;
        }
    },

    async toggleCommentVote(userId, commentId, voteValue) {
        try {
            const db = client.db(dbName);
            const usersCollection = db.collection(usersVar);
            const commentsCollection = db.collection(commentsVar);

            const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
            if (!user) {
                return { success: false, message: "User not found" };
            }

            const comment = await commentsCollection.findOne({ _id: new ObjectId(commentId) });
            if (!comment) {
                return { success: false, message: "Comment not found" };
            }

            let voteChange = 0;

            const existingVote = user.commentVotes.find(entry => String(entry.commentId) === String(comment._id));

            if (existingVote) {
                // console.log("Existing Vote: ", existingVote);

                await usersCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $pull: { commentVotes: { commentId: comment._id } } }
                );

                if (existingVote.vote === voteValue) {
                    voteChange = -voteValue;
                } else {
                    await usersCollection.updateOne(
                        { _id: new ObjectId(userId) },
                        { $push: { commentVotes: { commentId: comment._id, vote: voteValue } } }
                    );
                    voteChange = voteValue - existingVote.vote;
                }
            } else {
                await usersCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $push: { commentVotes: { commentId: comment._id, vote: voteValue } } }
                );
                voteChange = voteValue;
            }

            await commentsCollection.updateOne(
                { _id: new ObjectId(commentId) },
                { $inc: { voteValue: voteChange } }
            );

            const updatedComment = await commentsCollection.findOne({ _id: new ObjectId(commentId) });

            return { success: true, message: "Vote updated successfully", voteValue: updatedComment.voteValue };
        } catch (error) {
            console.error("Error toggling comment vote: ", error);
            return { success: false, message: "Error toggling comment vote" };
        }
    },

};

module.exports = mongo;
