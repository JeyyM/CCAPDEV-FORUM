const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb://localhost:27017";
const dbName = "forum";
const forumsVar = "forums";
const usersVar = "users"

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

            // Indexes are so we can query faster and limit them
            // 1 means oldest to newest
            await db.collection(forumsVar).createIndex({ createdAt: 1 });
            await db.collection(usersVar).createIndex({ createdAt: 1 });
        } catch (error) {
            console.error("Connection Error: ", error);
        }
    },

    async insertSampleForum() {
        try {
            await client.connect();
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);
    
            const existingForums = await forumsCollection.countDocuments();
            if (existingForums === 0) {
                const sampleForums = [
                    {
                        _id: new ObjectId(),
                        name: "Minecraft",
                        description: "I love miners",
                        forumImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Minecraft-creeper-face.jpg/800px-Minecraft-creeper-face.jpg",
                        bannerImage: "https://store-images.s-microsoft.com/image/apps.58378.13850085746326678.826cc014-d610-46af-bdb3-c5c96be4d22c.64287a91-c69e-4723-bb61-03fecd348c2a?q=90&w=480&h=270",
                        createdAt: new Date(),
                        membersCount: 0,
                        postsCount: 0,
                        admins: [],
                        bannedUsers: []
                    },
                    {
                        _id: new ObjectId(),
                        name: "Valorant",
                        description: "Tactical FPS shooter discussion.",
                        forumImage: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Valorant_cover.jpg/220px-Valorant_cover.jpg",
                        bannerImage: "https://assets.xboxservices.com/assets/4e/bc/4ebcb533-e184-42f3-833b-9aa47a81f39e.jpg?n=153142244433_Poster-Image-1084_1920x720.jpg",
                        createdAt: new Date(),
                        membersCount: 0,
                        postsCount: 0,
                        admins: [],
                        bannedUsers: []
                    },
                    {
                        _id: new ObjectId(),
                        name: "Fortnite",
                        description: "Battle Royale & Creative Mode fun.",
                        forumImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK92FCICZrxikCaiZ6uy3SxTj3f3RH-6r3Aw&s",
                        bannerImage: "https://cdn2.unrealengine.com/social-image-chapter4-s3-3840x2160-d35912cc25ad.jpg",
                        createdAt: new Date(),
                        membersCount: 0,
                        postsCount: 0,
                        admins: [],
                        bannedUsers: []
                    },
                    {
                        _id: new ObjectId(),
                        name: "Anime",
                        description: "Discuss your favorite anime & manga.",
                        forumImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA-9w-zOzzGAyK-ExVZvG6IU4fznAvxDylAg&s",
                        bannerImage: "https://assets-prd.ignimgs.com/2022/08/17/top25animecharacters-blogroll-1660777571580.jpg",
                        createdAt: new Date(),
                        membersCount: 0,
                        postsCount: 0,
                        admins: [],
                        bannedUsers: []
                    },
                    {
                        _id: new ObjectId(),
                        name: "CSGO",
                        description: "Counter-Strike Global Offensive chat.",
                        forumImage: "https://chrischow.github.io/dataandstuff/img/csgo_full.png",
                        bannerImage: "https://images.squarespace-cdn.com/content/v1/611d60fe1bdfad3944022ea3/1631105961707-JPE2RY0093NEBB6SXZ4C/CSGO-Operation-10-Details.jpg",
                        createdAt: new Date(),
                        membersCount: 0,
                        postsCount: 0,
                        admins: [],
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
            await client.connect();
            const db = client.db(dbName);
            const usersCollection = db.collection(usersVar);
    
            const existingUsers = await usersCollection.countDocuments();
            if (existingUsers === 0) {
                const sampleUsers = [
                    {
                        _id: new ObjectId(),
                        username: "apple",
                        email: "apple@email.com",
                        profileImage: "https://hips.hearstapps.com/hmg-prod/images/ripe-apple-royalty-free-image-1659454396.jpg?crop=0.924xw:0.679xh;0.0197xw,0.212xh&resize=980:*",
                        bannerImage: "https://images.everydayhealth.com/images/diet-nutrition/apples-101-about-1440x810.jpg",
                        password: "123",
                        createdAt: new Date(),
                        bio: "I love apples",
                        joinedForums: [],
                        followers: []
                    },
                    {
                        _id: new ObjectId(),
                        username: "banana",
                        email: "banana@email.com",
                        profileImage: "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bunch-of-bananas-67e91d5.jpg",
                        bannerImage: "https://images-prod.healthline.com/hlcmsresource/images/AN_images/bananas-1296x728-feature.jpg",
                        password: "123",
                        createdAt: new Date(),
                        bio: "I love bananas",
                        joinedForums: [],
                        followers: []
                    },
                    {
                        _id: new ObjectId(),
                        username: "orange",
                        email: "orange@email.com",
                        profileImage: "https://www.quanta.org/orange/orange.jpg",
                        bannerImage: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg",
                        password: "123",
                        createdAt: new Date(),
                        bio: "I love oranges",
                        joinedForums: [],
                        followers: []
                    },
                    {
                        _id: new ObjectId(),
                        username: "melon",
                        email: "melon@email.com",
                        profileImage: "https://cdn.britannica.com/99/143599-050-C3289491/Watermelon.jpg",
                        bannerImage: "https://veritablevegetable.com/wp-content/uploads/2021/06/Melon-Assorted-scaled.jpg",
                        password: "123",
                        createdAt: new Date(),
                        bio: "I love melons",
                        joinedForums: [],
                        followers: []
                    },
                    {
                        _id: new ObjectId(),
                        username: "kiwi",
                        email: "kiwi@email.com",
                        profileImage: "https://nationalzoo.si.edu/sites/default/files/animals/northislandbrownkiwi-001.jpg",
                        bannerImage: "https://assets3.thrillist.com/v1/image/2624055/792x456/scale;webp=auto;jpeg_quality=60;progressive.jpg",
                        password: "123",
                        createdAt: new Date(),
                        bio: "I love kiwis",
                        joinedForums: [],
                        followers: []
                    }
                ];
    
                await usersCollection.insertMany(sampleUsers);
                console.log("5 sample users inserted.");
            } else {
                console.log("Users data already exists.");
            }
        } catch (error) {
            console.error("Error inserting sample users: ", error);
        }
    },
    
    async getForums() {
        try {
            await client.connect();
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            return await forumsCollection.find().toArray();
        } catch (error) {
            console.error("Error fetching forums:", error);
            return [];
        }
    },

    async getForumById(forumId) {
        try {
            await client.connect();
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            return await forumsCollection.findOne({ _id: new ObjectId(forumId) });
        } catch (error) {
            console.error("Error fetching forum by ID:", error);
            return null;
        }
    },

    async getForumByName(forumName) {
        try {
            await client.connect();
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);
    
            // Regex to remove case sensitivity
            const forum = await forumsCollection.findOne({
                name: { $regex: `^${forumName}$`, $options: "i" }
            });
    
            return forum;
        } catch (error) {
            console.error("Error fetching forum by name:", error);
            return null;
        }
    },

    async addForum(forumData) {
        try {
            await client.connect();
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            const newForum = {
                _id: new ObjectId(),
                ...forumData,
                createdAt: new Date(),
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
            await client.connect();
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            const result = await forumsCollection.updateOne(
                { _id: new ObjectId(forumId) },
                { $set: updatedData }
            );

            return result.modifiedCount > 0;
        } catch (error) {
            console.error("Error updating forum:", error);
            return false;
        }
    },

    async updateForums(forums) {
        try {
            await client.connect();
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            for (let forum of forums) {
                const { _id, ...updatedData } = forum;
                await forumsCollection.updateOne(
                    { _id: new ObjectId(_id) },
                    { $set: updatedData }
                );
            }

            return { success: true, message: "Forums updated successfully!" };
        } catch (error) {
            console.error("Error updating forums:", error);
            return { success: false, error: "Error updating forums" };
        }
    },

    async deleteForum(forumId) {
        try {
            await client.connect();
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            const result = await forumsCollection.deleteOne({ _id: new ObjectId(forumId) });
            return result.deletedCount > 0;
        } catch (error) {
            console.error("Error deleting forum:", error);
            return false;
        }
    }
};

module.exports = mongo;
