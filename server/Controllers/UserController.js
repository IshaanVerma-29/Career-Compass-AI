const Users = require("../Schemas/UserSchema")

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const createUser = async (req, res) => {

    try {
        const { name, picture, email } = req.body

        const existingUser = await Users.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' })
        }

        var [firstName, lastName] = name.split(' ')
        if (lastName == undefined) {
            lastName = ''
        }
        const userId = Math.floor(Math.random() * 10000) + 1

        const newUser = {
            name,
            FirstName: capitalize(firstName),
            LastName: capitalize(lastName),
            UserId: userId,
            picture,
            email,
            portfolios: [],
            profile: {
                fullName: "",
                phoneNumber: "",
                role: "",
                emailAddress: "",
                bio: "",
                resume: "",
                skills: [],
                socialLinks: {
                    website: "",
                    facebook: "",
                    twitter: "",
                    instagram: "",
                    linkedin: "",
                    github: "",
                    behance: "",
                    dribbble: "",
                },
                education: {
                    degree: "",
                    fieldOfStudy: "",
                    institution: "",
                    graduationYear: null,
                },
                workExperience: [
                    {
                        jobTitle: "",
                        organization: "",
                        duration: "",
                        description: "",
                    },
                ],
                achievements: [
                    {
                        title: "",
                        description: "",
                        year: null,
                    },
                ],
                projects: [
                    {
                        name: "",
                        description: "",
                        imgLink: "",
                        stack: [],
                        SourceCode: "",
                        livePreview: "",
                    },
                    {
                        name: "",
                        description: "",
                        imgLink: "",
                        stack: [],
                        SourceCode: "",
                        livePreview: "",
                    },
                    {
                        name: "",
                        description: "",
                        imgLink: "",
                        stack: [],
                        SourceCode: "",
                        livePreview: "",
                    },
                ],
            },
        }

        await Users.create(newUser)

        const userData = await Users.findOne({ email: email })

        if (userData) {
            res.status(201).json(userData)
        }

    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.find()
        res.status(200).json(allUsers)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const getUser = async (req, res) => {
    const userId = Number(req.params.id); // Convert to Number

    try {
        const data = await Users.findOne({ UserId: userId });

        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getUserByEmail = async (req, res) => {
    const userEmail = req.query.email
    const userData = await Users.findOne({ email: userEmail })
    if (userData) {
        res.status(200).json(userData)
    } else {
        res.status(404).json({ error: "User not found" })
    }
}

const updatePortfolios = async (req, res) => {
    try {
        const { email, portfolio } = req.body

        const user = await Users.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        user.portfolios.push(portfolio)

        await user.save()

        res.status(200).json({ message: 'Portfolios updated successfully', user })
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { email, profile, name } = req.body

        const existingUser = await Users.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' })
        }
        var [firstName, lastName] = name.split(' ')
        if (lastName == undefined) {
            lastName = ''
        }
        existingUser.FirstName = capitalize(firstName),
            existingUser.LastName = capitalize(lastName),
            existingUser.name = name
        existingUser.profile = profile
        await existingUser.save()

        const updatedUser = await Users.findOne({ email })

        if (updatedUser) {
            res.status(200).json(updatedUser)
        } else {
            res.status(404).json({ error: 'User not found after update' })
        }

    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}


module.exports = { createUser, getAllUsers, getUser, getUserByEmail, updatePortfolios, updateUserProfile }