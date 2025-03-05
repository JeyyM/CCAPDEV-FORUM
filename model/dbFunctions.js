const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb://localhost:27017";
const dbName = "forum";
const forumsVar = "forums";
const usersVar = "users"
const postsVar = "posts"

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
                        postsCount: 0,
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
                        postsCount: 0,
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
                        postsCount: 0,
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
                        postsCount: 0,
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
                        postsCount: 0,
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
                        username: "apple",
                        email: "apple@email.com",
                        profileImage: "https://hips.hearstapps.com/hmg-prod/images/ripe-apple-royalty-free-image-1659454396.jpg?crop=0.924xw:0.679xh;0.0197xw,0.212xh&resize=980:*",
                        bannerImage: "https://images.everydayhealth.com/images/diet-nutrition/apples-101-about-1440x810.jpg",
                        password: "123",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        bio: "I love apples",
                        joinedForums: [],
                        following: [],
                        followersCount: 0,
                        postsCount: 0,
                        commentsCount: 0,
                        votes: []
                    },
                    {
                        _id: new ObjectId("67c792cfb3ba6d9c76f699d6"),
                        username: "banana",
                        email: "banana@email.com",
                        profileImage: "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bunch-of-bananas-67e91d5.jpg",
                        bannerImage: "https://images-prod.healthline.com/hlcmsresource/images/AN_images/bananas-1296x728-feature.jpg",
                        password: "123",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        bio: "I love bananas",
                        joinedForums: [],
                        following: [],
                        followersCount: 0,
                        postsCount: 0,
                        commentsCount: 0,
                        votes: []
                    },
                    {
                        _id: new ObjectId("67c792cfb3ba6d9c76f699d7"),
                        username: "orange",
                        email: "orange@email.com",
                        profileImage: "https://www.quanta.org/orange/orange.jpg",
                        bannerImage: "https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg",
                        password: "123",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        bio: "I love oranges",
                        joinedForums: [],
                        following: [],
                        followersCount: 0,
                        postsCount: 0,
                        commentsCount: 0,
                        votes: []
                    },
                    {
                        _id: new ObjectId("67c792cfb3ba6d9c76f699d8"),
                        username: "melon",
                        email: "melon@email.com",
                        profileImage: "https://cdn.britannica.com/99/143599-050-C3289491/Watermelon.jpg",
                        bannerImage: "https://veritablevegetable.com/wp-content/uploads/2021/06/Melon-Assorted-scaled.jpg",
                        password: "123",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        bio: "I love melons",
                        joinedForums: [],
                        following: [],
                        followersCount: 0,
                        postsCount: 0,
                        commentsCount: 0,
                        votes: []
                    },
                    {
                        _id: new ObjectId("67c792cfb3ba6d9c76f699d9"),
                        username: "kiwi",
                        email: "kiwi@email.com",
                        profileImage: "https://nationalzoo.si.edu/sites/default/files/animals/northislandbrownkiwi-001.jpg",
                        bannerImage: "https://assets3.thrillist.com/v1/image/2624055/792x456/scale;webp=auto;jpeg_quality=60;progressive.jpg",
                        password: "123",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        bio: "I love kiwis",
                        joinedForums: [],
                        following: [],
                        followersCount: 0,
                        postsCount: 0,
                        commentsCount: 0,
                        votes: []
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

    async insertSamplePosts() {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);
    
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
    
                const samplePosts = [];
    
                Object.entries(forums).forEach(([forumName, forumId]) => {
                    Object.entries(users).forEach(([username, userId]) => {
                        samplePosts.push({
                            _id: new ObjectId(),
                            forumId: new ObjectId(forumId),
                            authorId: new ObjectId(userId),
                            title: `${username} in ${forumName}`,
                            content: `User ${username} posting something in ${forumName}`,
                            createdAt: new Date(),
                            lastUpdated: new Date(),
                            comments: [],
                            voteValue: 0
                        });
                    });
                });
    
                await postsCollection.insertMany(samplePosts);
                console.log(`${samplePosts.length} Sample posts inserted successfully.`);
            } else {
                console.log("Posts data already exists.");
            }
        } catch (error) {
            console.error("Error inserting sample posts: ", error);
        }
    },    

    ////////////////////// FORUM INTERACTIONS ////////////////////////
    
    async getForums() {
        try {
            const db = client.db(dbName);
            const forumsCollection = db.collection(forumsVar);

            return await forumsCollection.find().toArray();
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

            const result = await forumsCollection.updateOne(
                { _id: new ObjectId(forumId) },
                { $set: updatedData }
            );

            return { success: true, message: "Forum updated successfully!" };
        } catch (error) {
            console.error("Error updating forum: ", error);
            return { success: false, error: "Error updating forum" };;
        }
    },

    async updateForums(forums) {
        try {
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
            console.error("Error updating forums: ", error);
            return { success: false, error: "Error updating forums" };
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
            return { success: false, error: "Error deleting forum" };
        }
    },

    /////////////////////// USER INTERACTIONS ///////////////////////////////

    async getUsers() {
        try {
            const db = client.db(dbName);
            const usersCollection = db.collection(usersVar);

            return await usersCollection.find().toArray();
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
                votes: []
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

            const result = await usersCollection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: updatedData }
            );

            return { success: true, message: "User updated successfully!" };
        } catch (error) {
            console.error("Error updating user: ", error);
            return { success: false, error: "Error updating user" };;
        }
    },

    async updateUsers(users) {
        try {
            const db = client.db(dbName);
            const usersCollection = db.collection(usersVar);

            for (let user of users) {
                const { _id, ...updatedData } = user;

                const result = await usersCollection.updateOne(
                    { _id: new ObjectId(_id) },
                    { $set: updatedData }
                );    
            }

            return { success: true, message: "Users updated successfully!" };
        } catch (error) {
            console.error("Error updating users: ", error);
            return { success: false, error: "Error updating users" };
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
            return { success: false, error: "Error deleting user" };;
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
                    {$pull: { joinedForums: forumId }}
                );
    
                await forumsCollection.updateOne(
                    { _id: new ObjectId(forumId) },
                    { $inc: { membersCount: -1 }}
                );
            } else {
                await usersCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    {$push: { joinedForums: forumId }}
                );
    
                await forumsCollection.updateOne(
                    { _id: new ObjectId(forumId) },
                    { $inc: { membersCount: 1 }}
                );
            }

            return { success: true, 
                     message: isJoined ? "Successfully left forum" : "Successfully joined joined",
                     presentStatus: isJoined ? false : true 
                    };
        } catch (error) {
            console.error("Error toggling forum join: ", error);
            return { success: false, error: "Error toggling forum join" };
        }
    },

    async toggleUserFollow(currentUserId, targetUserId) {
        try {
            const db = client.db(dbName);
            const usersCollection = db.collection(usersVar);

            const user = await usersCollection.findOne({ _id: new ObjectId(currentUserId) });

            if (currentUserId === targetUserId){
                return { success: false, message: "Cannot follow self" };
            }

            const isFollowed = user.following.includes(targetUserId);
                        
            if (isFollowed) {
                await usersCollection.updateOne(
                    { _id: new ObjectId(currentUserId) },
                    {$pull: { following: targetUserId }}
                );
    
                await usersCollection.updateOne(
                    { _id: new ObjectId(targetUserId) },
                    { $inc: { followersCount: -1 }}
                );
            } else {
                await usersCollection.updateOne(
                    { _id: new ObjectId(currentUserId) },
                    {$push: { following: targetUserId }}
                );
    
                await usersCollection.updateOne(
                    { _id: new ObjectId(targetUserId) },
                    { $inc: { followersCount: 1 }}
                );
            }

            return { success: true, 
                     message: isFollowed ? "Successfully unfollowed" : "Successfully followed",
                     presentStatus: isFollowed ? false : true 
                    };
        } catch (error) {
            console.error("Error toggling follow: ", error);
            return { success: false, error: "Error toggling follow" };
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

    async getPostsByForumId(forumId) {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);

            return await postsCollection.find({ forumId: new ObjectId(forumId) }).toArray();
        } catch (error) {
            console.error("Error fetching posts by forum ID: ", error);
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

};

module.exports = mongo;
