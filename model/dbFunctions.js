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
                        postsCount: 5,
                        commentsCount: 25,
                        votes: [],
                        commentVotes: []
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
                        postsCount: 5,
                        commentsCount: 25,
                        votes: [],
                        commentVotes: []
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
                        postsCount: 5,
                        commentsCount: 25,
                        votes: [],
                        commentVotes: []
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
                        postsCount: 5,
                        commentsCount: 25,
                        votes: [],
                        commentVotes: []
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
                        postsCount: 5,
                        commentsCount: 25,
                        votes: [],
                        commentVotes: []
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
                }

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

    // async getPostsByForumId(forumId, sortBy, order, limit, skip) {
    //     try {
    //         const db = client.db(dbName);
    //         const postsCollection = db.collection(postsVar);

    //         // NOTE FOLLOWING REDDIT'S HOT RATING
    //         // Log(abs(Upvotes-Downvotes)) + (age/45000)
    //         const now = new Date();
    //         const age = 0; // Just created    
    //         const hotRating = Math.log10(Math.abs(postData.voteValue));

    //         return await postsCollection.find({ forumId: new ObjectId(forumId) }).sort({ [sortBy]: order, _id: order }).skip(skip).limit(limit).toArray();;
    //     } catch (error) {
    //         console.error("Error fetching posts by forum ID: ", error);
    //         return [];
    //     }
    // },

    async getPostsByForumId(forumId, sortBy, order, limit, skip) {
        try {
            const db = client.db(dbName);
            const postsCollection = db.collection(postsVar);
    
            const now = new Date();

            console.log("HERE:", forumId, sortBy, order, limit, skip)
    
            if (sortBy === "hot") {
                // Perform a forum-wide search since hotRating needs to be computed manually
                // NOTE FOLLOWING REDDIT'S HOT RATING
                // Log(abs(Upvotes-Downvotes)) - (age/45000)

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
