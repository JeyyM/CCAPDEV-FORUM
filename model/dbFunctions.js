const { MongoClient, ObjectId } = require('mongodb');
const argon2 = require('argon2');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
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
            console.log("Connected to Mongo Atlas");

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
                const sampleUsers = [
                    {
                        _id: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        username: "WanderlustNomad",
                        email: "apple@email.com",
                        profileImage: "https://cdn.gigwise.com/wp-content/uploads/2024/12/Balancing-Work-and-Wanderlust%E2%80%94Lessons-from-a-Digital-Nomad-1024x574.png",
                        bannerImage: "https://assets.entrepreneur.com/content/3x2/2000/20180405210852-GettyImages-639808346.jpeg",
                        password: "123",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        bio: "Exploring the world one country at a time. Currently obsessed with trying street food everywhere. I'm also an amateur photographer capturing landscapes & cultures",
                        joinedForums: [new ObjectId("67c7b80a8f936822ab91789f")],
                        following: [],
                        followersCount: 0,
                        postsCount: 5,
                        commentsCount: 25,
                        votes: [],
                        commentVotes: []
                    },
                    {
                        _id: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        username: "MidnightPhilosopher",
                        email: "banana@email.com",
                        profileImage: "https://img.freepik.com/free-photo/front-view-epiphany-day-candles-with-copy-space-gift-box_23-2148746758.jpg",
                        bannerImage: "https://images.unsplash.com/photo-1485498128961-422168ba5f87?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d3JpdGluZyUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D",
                        password: "123",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        bio: "Yes bio.",
                        joinedForums: [],
                        following: [],
                        followersCount: 0,
                        postsCount: 5,
                        commentsCount: 25,
                        votes: [],
                        commentVotes: []
                    },
                    {
                        _id: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        username: "GeekOverlord",
                        email: "orange@email.com",
                        profileImage: "https://i.pinimg.com/236x/8e/31/21/8e31210724a36c9da5ac4705074e1015.jpg",
                        bannerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFlLCkE8cxJzkCT4R3Y03Fj4waL3HIwt1ULg&s",
                        password: "123",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        bio: "Hardcore gamer, from retro to next-gen.\nI like building custom PCs & testing new gadgets\nBooks I read: Sci-fi & fantasy bookworm (Dune, LOTR, The Expanse)",
                        joinedForums: [],
                        following: [],
                        followersCount: 0,
                        postsCount: 5,
                        commentsCount: 25,
                        votes: [],
                        commentVotes: []
                    },
                    {
                        _id: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        username: "CreativeChaos",
                        email: "melon@email.com",
                        profileImage: "https://i.pinimg.com/236x/5f/46/86/5f4686be55c9916e18cd0201606379c9.jpg",
                        bannerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2NOgi9e8n-cllUR8gZdMYMqK0kNEckeCViA&s",
                        password: "123",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        bio: "🎨 Artist | DIY Enthusiast | Vintage Collector\n🖌 Sketching & painting when inspiration hits\n📺 Fixing up old tech & restoring vintage finds\n✂️ Always working on a new DIY or craft project",
                        joinedForums: [],
                        following: [],
                        followersCount: 0,
                        postsCount: 5,
                        commentsCount: 25,
                        votes: [],
                        commentVotes: []
                    },
                    {
                        _id: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        username: "FitnessJunkie42",
                        email: "kiwi@email.com",
                        profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ64jHaeW5QzPDKo_vqI2O4zTlUN8ZSy8mtWg&s",
                        bannerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHafTgWDYkDRsGd7eM07ZA-WaADtunM88ig&s",
                        password: "123",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        bio: "when life gets hard, I get harder",
                        joinedForums: [],
                        following: [],
                        followersCount: 0,
                        postsCount: 5,
                        commentsCount: 25,
                        votes: [],
                        commentVotes: []
                    }
                ];
                for(let user of sampleUsers){
                    user.password = await argon2.hash(user.password);
                    // console.log("Encrypt pass: "+ user.password);
                }
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
                    "WanderlustNomad": "67c792cfb3ba6d9c76f699d5",
                    "MidnightPhilosopher": "67c792cfb3ba6d9c76f699d6",
                    "GeekOverlord": "67c792cfb3ba6d9c76f699d7",
                    "CreativeChaos": "67c792cfb3ba6d9c76f699d8",
                    "FitnessJunkie42": "67c792cfb3ba6d9c76f699d9"
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

                samplePosts = [
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1a3"),
                        forumId: new ObjectId("67c7b80a8f936822ab91789f"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        title: "Best Redstone Builds",
                        content: "Share your craziest redstone contraptions!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1a4"),
                        forumId: new ObjectId("67c7b80a8f936822ab91789f"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        title: "Hardcore Mode Tips",
                        content: "What's the best way to survive in Hardcore?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1a5"),
                        forumId: new ObjectId("67c7b80a8f936822ab91789f"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        title: "Nether Base Ideas",
                        content: "Need cool design inspirations for my nether base.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1a6"),
                        forumId: new ObjectId("67c7b80a8f936822ab91789f"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        title: "Speedrun Strategies",
                        content: "What’s the fastest way to beat the Ender Dragon?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1a7"),
                        forumId: new ObjectId("67c7b80a8f936822ab91789f"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        title: "Favorite Texture Packs",
                        content: "Which packs do you guys recommend?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1a8"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a0"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        title: "Best Agents for Ranked",
                        content: "Who should I main for climbing in Ranked?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1a9"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a0"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        title: "Aim Training Drills",
                        content: "What’s the best way to improve crosshair placement?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1aa"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a0"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        title: "Vandal vs Phantom",
                        content: "Which gun do you prefer and why?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1ab"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a0"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        title: "Toxic Teammates",
                        content: "How do you deal with toxic teammates in comp?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1ac"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a0"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        title: "Best Valorant Skins",
                        content: "Which skin bundle is worth buying?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1ad"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a1"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        title: "Best Landing Spots",
                        content: "Where do you drop for easy wins?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1ae"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a1"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        title: "Fortnite OG is Back!",
                        content: "What are your thoughts on the OG map returning?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1af"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a1"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        title: "Best Fortnite Skins",
                        content: "Which skins are a must-have?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1b0"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a1"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        title: "Building vs Zero Build",
                        content: "Do you prefer the classic building mode or Zero Build?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1b1"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a1"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        title: "Tips for New Players",
                        content: "What’s the best way for new players to improve?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1b2"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a2"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        title: "Top 10 Anime of All Time",
                        content: "Let’s rank our top 10 anime!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1b3"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a2"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        title: "Best New Anime 2024",
                        content: "What are the best anime from this year?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1b4"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a2"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        title: "Underrated Anime Gems",
                        content: "Share anime that deserve more recognition.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1b5"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a2"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        title: "Manga vs Anime",
                        content: "Do you prefer reading manga or watching anime?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1b6"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a2"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        title: "Best Shonen Protagonist",
                        content: "Who’s the best protagonist in shonen anime?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1b7"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        title: "Best Pistol for Eco Rounds?",
                        content: "Do you prefer P250, Five-Seven, or Deagle?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1b8"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        title: "AWP vs Scout",
                        content: "Which one is better for aggressive playstyle?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1b9"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        title: "CS:GO vs CS2",
                        content: "Which version do you prefer?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1ba"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        title: "Clutch Situations",
                        content: "What’s the best way to stay calm in 1vX?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    },
                    {
                        _id: new ObjectId("67c94be9b7d17daa0a4df1bb"),
                        forumId: new ObjectId("67c7b80a8f936822ab9178a3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        title: "Best Map for Beginners",
                        content: "Which map should new players learn first?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: [],
                        voteValue: 0,
                        commentsCount: 5
                    }
                ];

                sampleComments = [
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2a5"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "I built an automatic farm while waiting at the airport once!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2a6"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "Redstone logic is oddly meditative. Like solving philosophy riddles with blocks",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2a7"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "Redstone is basically coding with blocks! I made a fully automated XP farm using observers and pistons",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2a8"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "I prefer aesthetic builds, but I respect redstone engineers!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2a9"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Efficiency is key. Hidden piston doors save time!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2aa"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a4"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "First rule of survival: never dig straight down. Second rule: always carry a water bucket!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2ab"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a4"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "Hardcore is a metaphor for life: No second chances, so make every block count",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2ac"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a4"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "AFK fish farms = infinite enchanted gear. Just saying",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2ad"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a4"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "I spend more time decorating than surviving... maybe that’s why I always die?",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2ae"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a4"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Max out food efficiency. Golden carrots for the win!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2af"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a5"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "I love lava-themed bases! They remind me of volcanic islands.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2b0"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a5"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "A base in the Nether is a statement: ‘I have embraced chaos.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2b1"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a5"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "I once made a full piglin trading hall inside a basalt delta. It’s efficient but dangerous.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2b2"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a5"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "Nether bases NEED crimson and warped wood for contrast. Trust me.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2b3"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a5"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Don’t forget blast resistance. Ghasts will ruin your day",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2b4"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a6"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Speedrunning Minecraft is like planning the shortest airport layover. No wasted steps!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2b5"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a6"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "Speedrunning is a reflection of discipline. Every move must be intentional",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2b6"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a6"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "The best method? Ruined portal -> Bastion loot -> Nether fortress. RNG-dependent but fast!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2b7"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a6"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "I’d speedrun, but I keep stopping to build random things.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2b8"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a6"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Treat it like a workout. Optimize movement, reduce waste, and execute perfectly",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2b9"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a7"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "I use a realistic pack because I want my world to feel like a vacation.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2ba"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a7"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "Faithful for nostalgia, but a minimalist pack makes the experience feel meditative.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2bb"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a7"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "I stick to default, but with shaders. The vanilla experience is already perfect!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2bc"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a7"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "Pixel perfection is key. I love painterly-styled packs that make everything feel magical",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2bd"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a7"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "High FPS packs only. Performance > aesthetics.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2be"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a8"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Duelists are the backpackers of Valorant. Solo queue life!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2bf"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a8"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "The best agent is the one you master. That’s your philosophy lesson for today.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2c0"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a8"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "Killjoy turret + Viper’s Pit = free site control!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2c1"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a8"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "Cypher setups are like painting a masterpiece. But instead of paint, it’s tripwires.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2c2"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a8"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Want to rank up? Play a controller. Smokes win games.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2c3"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a9"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Travel tip: Bring your laptop. Play aim labs between flights!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2c4"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a9"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "Aim is like mindfulness. Be present, steady your breath, and click heads.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2c5"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a9"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "Adjust your crosshair placement. Half the fight is won before you even fire a bullet",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2c6"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a9"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "I suck at aiming, so I just play Sage and make healing my art",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2c7"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1a9"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "100 Kovaak’s shots before bed. That’s the grind",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2c8"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1aa"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Vandal = high risk, high reward. Phantom = stability",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2c9"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1aa"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "Both are just tools. The user determines the outcome",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2ca"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1aa"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "ntom is better for spraying, Vandal is better for raw aim",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2cb"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1aa"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "I choose my gun based on the best skin design. Function follows aesthetics",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2cc"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1aa"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "One-tap potential? Vandal all the way",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2cd"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ab"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Toxicity exists everywhere. Just mute and focus on your game!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2ce"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ab"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "You cannot control others, only your response to them. Inner peace > arguing",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2cf"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ab"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "Toxicity disappears when you top frag. Win = silence",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2d0"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ab"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "Block, report, and move on. Some people aren’t worth the energy",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2d1"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ab"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "If you let them tilt you, they win. Mental strength is a skill too",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2d2"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ac"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Skins are like souvenirs. I collect one from each bundle!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2d3"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ac"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "A good skin doesn’t improve skill, but it can improve confidence.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2d4"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ac"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "RGX Phantom is the closest thing to an aim-bot look.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2d5"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ac"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "Spectrum skins feel like playing in a nightclub. Best visuals ever!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2d6"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ac"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "I pick skins based on reload speed animations. Smooth is better!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2d7"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ad"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Dropping in new locations is like exploring new countries. Gotta experience it all",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2d8"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ad"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "It’s not about where you land, but how you adapt.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2d9"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ad"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "Land near a gas station. More loot, fewer fights, easy rotation.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2da"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ad"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "Landing spots are great, but have you seen some of these map designs? Pure creativity.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2db"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ad"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Hot drops = high risk, high reward. Tilted Towers or bust!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2dc"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ae"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Nostalgia hits hard. This takes me back to Chapter 1, and I love it!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2dd"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ae"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "Everything old is new again. We chase the past while living in the present",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2de"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ae"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "OG map is back, but mechanics have changed. Adapt or lose.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2df"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ae"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "The original map had the best aesthetic. The colors, the vibe—it’s all coming back!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2e0"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ae"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Peak Fortnite nostalgia. Nothing beats the thrill of Tilted Towers again!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2e1"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1af"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "ins are like souvenirs from different seasons. My go-to is Drift—it reminds me of my first Battle Pass!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2e2"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1af"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "A skin is an extension of the player. If it makes you play better, then it’s the best one for you",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2e3"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1af"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "Omega with full armor will always be legendary. If you know, you know",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2e4"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1af"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "The Celestial skins are peak design. Glowing effects + smooth animations = perfection",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2e5"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1af"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Superhero skins are OP. Custom colors + tight hitbox = best competitive choice",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2e6"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b0"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Zero Build rewards movement, Building rewards strategy. Both are fun!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2e7"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b0"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "It’s a mindset shift. Strategy in one, reflexes in the other.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2e8"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b0"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "Zero Build makes aim training way more important. I like the change!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2e9"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b0"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "Building fights are beautiful when done right. It’s like an aerial dance!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2ea"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b0"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Zero Build is where it’s at. Makes positioning and aim the true skill test",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2eb"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b1"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Take it slow. Explore the map, learn rotations, and have fun!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2ec"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b1"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "It’s not about where you land, but how you adapt.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2ed"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b1"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: " on the edge of the circle early. Positioning > loot.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2ee"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b1"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "Experiment with different loadouts. Find a playstyle that suits you",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2ef"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b1"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: " UP before playing. Creative mode is your best friend!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2f0"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b2"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "One Piece isn’t just a story, it’s an adventure!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2f1"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b2"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "Ranking anime is like ranking philosophies. Subjective, ever-changing, and highly debated.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2f2"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b2"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "Steins;Gate rewired my brain. Science and anime in one? Yes, please",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2f3"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b2"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "Violet Evergarden is pure art. Every frame is a painting.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2f4"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b2"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Haikyuu made me want to start volleyball. That’s impact",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2f5"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Checking out international anime festivals to see what’s trending!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2f6"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "Every new anime adds another thread to the vast tapestry of storytelling",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2f7"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "The new cyberpunk anime looks insane. High hopes for the animation quality",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2f8"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "I’m all about unique art styles. Anything that stands out visually, I’ll watch",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2f9"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b3"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "I’m hoping for more solid sports anime. The last few years have been great for them!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2fa"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b4"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "March Comes in Like a Lion is so underrated. Emotional journey",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2fb"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b4"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "A hidden gem is only hidden until someone shares it. Pass on the knowledge!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2fc"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b4"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "Kaiba is underrated. Sci-fi, but with such a unique and deep story",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2fd"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b4"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "The Tatami Galaxy. A surrealist masterpiece. More people should watch it!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2fe"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b4"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Megalo Box. Classic boxing anime vibes, but with a modern twist!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa2ff"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b5"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Manga is the director’s cut. No filler, just the raw story!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa300"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b5"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "Reading manga lets you pace the story yourself. Anime dictates your experience",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa301"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b5"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "Some anime adaptations butcher pacing. Manga keeps it pure",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa302"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b5"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "Anime gives us OSTs and fluid motion. Some stories are better in motion",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa303"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b5"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Manga lets me binge faster. I can read 100 chapters in one day",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa304"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b6"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Luffy embodies adventure. He makes you want to explore the world!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa305"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b6"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "Guts from Berserk. The ultimate test of resilience and willpower",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa306"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b6"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "Light Yagami is technically a protagonist… until he isn’t",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa307"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b6"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "Asta from Black Clover. Watching him grow is pure motivation!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa308"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b6"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Naruto. Started from nothing, became the best. Simple but inspiringkiwi's comment on post 67c94be9b7d17daa0a4df1b6",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa309"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b7"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Eco rounds are like budget traveling. You make the most with what you have!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa30a"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b7"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "A wise man once said, ‘You miss 100% of the shots you don’t take.’ Take that Glock burst shot",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa30b"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b7"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "P250 is king. Cheap, accurate, and punches through armor.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa30c"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b7"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "Dualies. Not because they’re good, but because they look cool",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa30d"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b7"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "I just deagle one-tap. No eco round needed",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa30e"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b8"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "AWP feels like traveling first class. Scout is economy with an unexpected upgrade!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa30f"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b8"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "The difference is mindset: AWP dominates, Scout outplays",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa310"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b8"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "AWP for power, Scout for speed. If you have cracked aim, go Scout!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa311"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b8"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "AWP skins are way cooler. That’s the real decision-maker.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa312"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b8"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "I move too much for AWP. Scout quick-switching feels smoother",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa313"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b9"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "CS:GO had that raw, gritty feel. CS2 is polished, but I miss the classic vibe",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa314"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b9"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "One represents nostalgia, the other innovation. Both have their place",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa315"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b9"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "CS2 fixes tick rate issues. It’s an upgrade, hands down.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa316"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b9"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "CS2’s new lighting makes every map feel fresh. It’s beautiful!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa317"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1b9"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "CS2 movement feels weird at first, but once you adapt, it’s cleaner",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa318"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ba"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Breathe. Play for info. Think like a traveler—expect the unexpected!",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa319"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ba"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: " clutch is won in the mind before the game. Visualize success",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa31a"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ba"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "Crosshair placement + pre-aim = 80% of clutch wins.",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa31b"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ba"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "Clutches are art. Movement, angles, and timing—beautiful",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa31c"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1ba"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Stay unpredictable. Reposition constantly and take duels on your terms",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa31d"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1bb"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d5"),
                        parentId: null,
                        content: "Mirage is a classic, but I’d say Dust2 for pure aim training",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa31e"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1bb"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        parentId: null,
                        content: "Beginners should master one map first before expanding",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa31f"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1bb"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        parentId: null,
                        content: "Inferno is great for learning nades. Utility is key in CS",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa320"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1bb"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        parentId: null,
                        content: "I play Ancient just for the aesthetics. Looks like a lost temple",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    },
                    {
                        _id: new ObjectId("67ca75498ac961e54eafa321"),
                        postId: new ObjectId("67c94be9b7d17daa0a4df1bb"),
                        authorId: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        parentId: null,
                        content: "Train your muscle memory on Cache. Simple angles, good fights",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        voteValue: 0
                    }
                ];
                
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
                postsCount: 0,
                commentsCount: 0,
                votes: [],
                commentVotes: []
            };
            newUser.password = await argon2.hash(newUser.password); //hash password
            // console.log("Encrypt pass: "+ newUser.password);
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

            console.log("in getPostsByForumIds", forumIds, sortBy, order, limit, skip);
    
            let idArray = [];
    
            if (typeof forumIds === "string") {
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
                idArray = forumIds.map(id => new ObjectId(id));
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

    async getPostsBySearch(keyword, community){
        try{
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);
            let query = {};
            if(keyword){
                query = {
                    $or: [
                        {title: {$regex: keyword, $options: 'i'}},
                        {content: {$regex: keyword, $options: 'i'}}
                    ]
                }
            }
            if(community && community !== "*"){ //filter community
                const forum = await this.getForumByName(community);
                if(forum){
                    query.forumId = new ObjectId(forum._id);
                }
                else{
                    return [];
                }
            }
            const posts = await postsCollection.aggregate([
                {
                    $match: query
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'authorId',
                        foreignField: '_id',
                        as: 'author'
                    }
                },
                {
                    $unwind: '$author'
                },
                {
                    $lookup: {
                        from: 'forums',
                        localField: 'forumId',
                        foreignField: '_id',
                        as: 'forum'
                    }
                },
                {
                    $unwind: '$forum'
                }
            ]).toArray();
            return posts;
            // return await postsCollection.find(query).toArray();
        } catch(error){
            console.error("Error fetching posts by keyword: ", error);
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

            return { success: true, message: "Post updated successfully!", postId: postId };
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

    // async deletePost(postId) {
    //     try {
    //         const db = client.db(dbName);
    //         const postsCollection = db.collection(postsVar);
    //         const usersCollection = db.collection(usersVar);
    //         const forumsCollection = db.collection(forumsVar);

    //         const post = await postsCollection.findOne({ _id: new ObjectId(postId) });

    //         const result = await postsCollection.deleteOne({ _id: new ObjectId(postId) });

    //         await usersCollection.updateOne(
    //             { _id: post.authorId },
    //             { $inc: { postsCount: -1 } }
    //         );

    //         await forumsCollection.updateOne(
    //             { _id: post.forumId },
    //             { $inc: { postsCount: -1 } }
    //         );

    //         return { success: true, message: "Post deleted successfully!" };
    //     } catch (error) {
    //         console.error("Error deleting forum: ", error);
    //         return { success: false, message: "Error deleting post" };;
    //     }
    // },

    async deletePost(postId) {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);
            const usersCollection = db.collection(usersVar);
            const forumsCollection = db.collection(forumsVar);
            const commentsCollection = db.collection(commentsVar);
    
            const postObjectId = new ObjectId(postId);
            const post = await postsCollection.findOne({ _id: postObjectId });
            if (!post) {
                return { success: false, message: "Post not found" };
            }
    
            const postComments = await commentsCollection.find({ postId: postObjectId }).toArray();
    
            const allDeletedIds = postComments.map(comment => comment._id);
            const userDictionary = {};
    
            for (const comment of postComments) {
                const userId = comment.authorId.toString();
                if (!userDictionary[userId]) userDictionary[userId] = 0;
                userDictionary[userId]++;
    
                await usersCollection.updateMany(
                    {},
                    { $pull: { commentVotes: { commentId: comment._id } } }
                );
            }
    
            for (const [userId, count] of Object.entries(userDictionary)) {
                await usersCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $inc: { commentsCount: -count } }
                );
            }
    
            if (allDeletedIds.length > 0) {
                await commentsCollection.deleteMany({ _id: { $in: allDeletedIds } });
            }
    
            await usersCollection.updateOne(
                { _id: post.authorId },
                { $inc: { postsCount: -1 } }
            );
    
            await forumsCollection.updateOne(
                { _id: post.forumId },
                { $inc: { postsCount: -1 } }
            );
    
            await postsCollection.deleteOne({ _id: postObjectId });
    
            return { success: true, message: "Post and all comments deleted successfully" };
        } catch (error) {
            console.error("Error deleting post: ", error);
            return { success: false, message: "Error deleting post" };
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

    async getCommentsByAuthorId(authorId) {
        try {
            const db = client.db(dbName);
            const commentsCollection = db.collection(commentsVar);

            return await commentsCollection.find({ authorId: new ObjectId(authorId) }).toArray();
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

    // async deleteComment(commentId) {
    //     try {
    //         const db = client.db(dbName);
    //         const postsCollection = db.collection(postsVar);
    //         const usersCollection = db.collection(usersVar);
    //         const commentsCollection = db.collection(commentsVar);

    //         const comment = await commentsCollection.findOne({ _id: new ObjectId(commentId) });
    //         const result = await commentsCollection.deleteOne({ _id: new ObjectId(commentId) });

    //         await usersCollection.updateOne(
    //             { _id: comment.authorId },
    //             { $inc: { commentsCount: -1 } }
    //         );

    //         await postsCollection.updateOne(
    //             { _id: comment.postId },
    //             { $inc: { commentsCount: -1 } }
    //         );

    //         return { success: true, message: "Comment deleted successfully!" };
    //     } catch (error) {
    //         console.error("Error deleting comment: ", error);
    //         return { success: false, message: "Error deleting comment" };;
    //     }
    // },

    async deleteComment(commentId) {
        try {
            // GOALS
            // set the main comment
            // find all children
                // recursion to find more children
            // make a dictionary for all users involved to use as a counter
            // remove each comment to delete from all commentVotes
            // deduct all users commentCounts using dictionary
            // deduct length of all deleted from a post's commentsCount

            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);
            const usersCollection = db.collection(usersVar);
            const commentsCollection = db.collection(commentsVar);
    
            const mainId = new ObjectId(commentId);
            const mainComment = await commentsCollection.findOne({ _id: mainId });
            if (!mainComment) {
                return { success: false, message: "Comment not found" };
            }
    
            const toDeleteList = [mainComment];
            const currentTargets = [mainId];
    
            while (currentTargets.length > 0) {
                const currentId = currentTargets.pop();
                const children = await commentsCollection.find({ parentId: currentId }).toArray();
                toDeleteList.push(...children);
                children.forEach(child => currentTargets.push(child._id));
            }
    
            const userDictionary = {};
            const allDeletedIds = toDeleteList.map(c => c._id);
    
            for (const comment of toDeleteList) {
                const authorId = comment.authorId.toString();
                if (!userDictionary[authorId]) {
                    userDictionary[authorId] = 0;
                }
                userDictionary[authorId]++;
                await usersCollection.updateOne(
                    { _id: comment.authorId },
                    { $pull: { commentVotes: { commentId: comment._id } } }
                );
            }
    
            for (const [userId, count] of Object.entries(userDictionary)) {
                await usersCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $inc: { commentsCount: -count } }
                );
            }
    
            await postsCollection.updateOne(
                { _id: mainComment.postId },
                { $inc: { commentsCount: -toDeleteList.length } }
            );
    
            await commentsCollection.deleteMany({ _id: { $in: allDeletedIds } });
    
            return { success: true, message: "Comment and all children deleted successfully" };
        } catch (error) {
            console.error("Error deleting comment: ", error);
            return { success: false, message: "Error deleting comment" };
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

    ////////////// USER ACTIVITY //////////////
    async getUserActivity(userId, sortBy = "createdAt", order = -1, limit = 10, skip = 0, type = "all") {
        // console.log("User Activity: ", userId, sortBy, order, limit, skip, type);
    
        const db = client.db(dbName);
        const postsCollection = db.collection(postsVar);
        const usersCollection = db.collection(usersVar);
        const commentsCollection = db.collection(commentsVar);
        const forumsCollection = db.collection(forumsVar);
    
        const now = new Date();
        const userObjectId = new ObjectId(userId);
    
        const deletedUser = {
            username: "[ DELETED USER ]",
            email: "deleted@email.com",
            profileImage: "https://thumbs.dreamstime.com/b/vector-illustration-missing-person-graphic-wanted-poster-lost-anonymous-missing-person-graphic-wanted-poster-lost-anonymous-106106416.jpg",
            bannerImage: "https://thumbs.dreamstime.com/b/vector-illustration-missing-person-graphic-wanted-poster-lost-anonymous-missing-person-graphic-wanted-poster-lost-anonymous-106106416.jpg",
            password: "DELETED",
            createdAt: now,
            updatedAt: now,
            bio: "Deleted User",
            joinedForums: [],
            following: [],
            followersCount: 0,
            postsCount: 0,
            commentsCount: 0,
            votes: [],
            commentVotes: []
        };
    
        const deletedPost = {
            title: "[ DELETED POST ]",
            content: "[ deleted ]",
            comments: [],
            voteValue: 0,
            commentsCount: 0,
            createdAt: now,
            updatedAt: now,
            forumId: null,
            authorId: null
        };
    
        const deletedForum = {
            name: "[ DELETED FORUM ]",
            description: "[ DELETED FORUM ]",
            forumImage: "https://www.rafflespaint.com/cdn/shop/products/PURE_BLACK_RP0-1_bb8afd96-bd13-4bfd-83e3-ef063ae9fef7.jpg?v=1566778832",
            bannerImage: "https://www.rafflespaint.com/cdn/shop/products/PURE_BLACK_RP0-1_bb8afd96-bd13-4bfd-83e3-ef063ae9fef7.jpg?v=1566778832",
            createdAt: now,
            updatedAt: now,
            membersCount: 0,
            postsCount: 0,
            admins: [],
            bannedUsers: []
        };
    
        const userDictionary = {};
        const commentDictionary = {};
    
        const userPosts = await postsCollection.find({ authorId: userObjectId }).toArray();
        const userComments = await commentsCollection.find({ authorId: userObjectId }).toArray();
        const allForums = await forumsCollection.find().toArray();
    
        const forumDictionary = Object.fromEntries(allForums.map(f => [f._id.toString(), f]));
    
        for (const post of userPosts) {
            const authorIdStr = post.authorId?.toString?.() || "deleted";
            if (!userDictionary[authorIdStr]) {
                const user = post.authorId ? await usersCollection.findOne({ _id: post.authorId }) : null;
                userDictionary[authorIdStr] = user || { ...deletedUser, _id: post.authorId || new ObjectId() };
            }
        }
    
        const postActivities = userPosts.map(post => {
            const user = userDictionary[post.authorId?.toString()] || deletedUser;
            const forum = forumDictionary[post.forumId?.toString()] || deletedForum;
    
            return {
                type: "post",
                ...post,
                user,
                forum,
                thread: []
            };
        });
    
        const postIds = userComments.map(c => new ObjectId(c.postId));
        const sourcePosts = await Promise.all(
            postIds.map(async (id) => {
                const post = await postsCollection.findOne({ _id: id });
                return post ? post : { ...deletedPost, _id: id };
            })
        );
    
        for (const post of sourcePosts) {
            const authorIdStr = post.authorId?.toString?.() || "deleted";
            if (!userDictionary[authorIdStr]) {
                const user = post.authorId ? await usersCollection.findOne({ _id: post.authorId }) : null;
                userDictionary[authorIdStr] = user || { ...deletedUser, _id: post.authorId || new ObjectId() };
            }
        }
    
        async function getCommentThread(comment) {
            const thread = [comment];
            let current = comment;
    
            const authorIdStr = comment.authorId?.toString?.() || "deleted";
            if (!userDictionary[authorIdStr]) {
                const user = comment.authorId ? await usersCollection.findOne({ _id: comment.authorId }) : null;
                userDictionary[authorIdStr] = user || { ...deletedUser, _id: comment.authorId || new ObjectId() };
            }
    
            comment.user = userDictionary[authorIdStr];
    
            while (current.parentId) {
                const parentId = current.parentId.toString();
                current = await commentsCollection.findOne({ _id: new ObjectId(parentId) });
                if (!current) break;
    
                const parentAuthorIdStr = current.authorId?.toString?.() || "deleted";
                if (!userDictionary[parentAuthorIdStr]) {
                    const user = current.authorId ? await usersCollection.findOne({ _id: current.authorId }) : null;
                    userDictionary[parentAuthorIdStr] = user || { ...deletedUser, _id: current.authorId || new ObjectId() };
                }
    
                current.user = userDictionary[parentAuthorIdStr];
                commentDictionary[parentId] = current;
    
                thread.push(current);
            }
    
            return thread.reverse();
        }
    
        const commentActivities = [];
        for (let i = 0; i < userComments.length; i++) {
            const comment = userComments[i];
            const thread = await getCommentThread(comment);
            const post = sourcePosts[i];
            const user = userDictionary[post.authorId?.toString()] || deletedUser;
            const forum = forumDictionary[post.forumId?.toString()] || deletedForum;
    
            commentActivities.push({
                type: "comment",
                ...post,
                user,
                forum,
                thread
            });
        }
    
        let allActivity = [...postActivities, ...commentActivities];
    
        if (type === "post") {
            allActivity = allActivity.filter(a => a.type === "post");
        } else if (type === "comment") {
            allActivity = allActivity.filter(a => a.type === "comment");
        }
    
        if (sortBy === "title") {
            allActivity.sort((a, b) => {
                const aTitle = (a.title || "").toLowerCase();
                const bTitle = (b.title || "").toLowerCase();
                return order === 1 ? aTitle.localeCompare(bTitle) : bTitle.localeCompare(aTitle);
            });
        } else if (sortBy === "voteValue") {
            allActivity.sort((a, b) => {
                const aVotes = a.voteValue || 0;
                const bVotes = b.voteValue || 0;
                return order === 1 ? aVotes - bVotes : bVotes - aVotes;
            });
        } else if (sortBy === "createdAt") {
            allActivity.sort((a, b) => {
                const aDate = new Date(a.createdAt);
                const bDate = new Date(b.createdAt);
                return order === 1 ? aDate - bDate : bDate - aDate;
            });
        } else if (sortBy === "hot") {
            const exponent = 1.5;
            const nowTime = now.getTime();
    
            allActivity.forEach(activity => {
                const ageInHours = (nowTime - new Date(activity.createdAt).getTime()) / (1000 * 60 * 60);
                const score = activity.voteValue || 0;
                activity.hotRating = score / Math.pow(1 + ageInHours, exponent);
            });
    
            allActivity.sort((a, b) => {
                return order === 1 ? a.hotRating - b.hotRating : b.hotRating - a.hotRating;
            });
        }
    
        return allActivity.slice(skip, skip + limit);
    }
    
};

module.exports = mongo;