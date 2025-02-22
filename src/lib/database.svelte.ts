import Gun from "gun"
import type { UserProfile, Tag, Post, Resource } from "$lib/types"

const tags = [
    { type: "language", name: "JS" },
    { type: "language", name: "TS" },
    { type: "language", name: "C" },
    { type: "language", name: "C++" },
    { type: "library", name: "string.h" }
] as Tag[]

const tempdb = $state({
    users: [
        {
            name: "José Manuel Villar García",
            //contactData: "jose.villarg",
            contactData: "j",
            posts: [
                {
                    tag: tags[3],
                    resources: [
                        {
                            type: "project", description: "(Insert Project description)",
                            reference: "https://static.wikia.nocookie.net/memes-pedia/images/7/74/Clown_Pepe.jpg/revision/latest?cb=20221219220721&path-prefix=es"
                        },
                        { type: "bug", description: "(Bug description + solution)", reference: "https://static.wikia.nocookie.net/memes-pedia/images/7/74/Clown_Pepe.jpg/revision/latest?cb=20221219220721&path-prefix=es" },
                        { type: "docs", description: "(Documentation)", reference: "https://static.wikia.nocookie.net/memes-pedia/images/7/74/Clown_Pepe.jpg/revision/latest?cb=20221219220721&path-prefix=es" },
                    ]
                },
                {
                    tag: tags[2],
                    resources: [
                        { type: "project", description: "(Insert Project description)" },
                        { type: "bug", description: "(Bug description + solution)" },
                        { type: "bug", description: "(Bug description + solution)" },
                        { type: "bug", description: "(Bug description + solution)" },
                        { type: "docs", description: "(Documentation)" },
                    ]
                },
            ]
        },
        {
            name: "Sergio Regueiro Martínez",
            //contactData: "sergio.regueiro.martinez",
            contactData: "s",
            posts: [
                {
                    tag: tags[0],
                    resources: [
                        {
                            type: "project", description: "(Insert Project description)",
                            reference: "https://static.wikia.nocookie.net/memes-pedia/images/7/74/Clown_Pepe.jpg/revision/latest?cb=20221219220721&path-prefix=es"
                        },
                        { type: "bug", description: "(Bug description + solution)", reference: "https://static.wikia.nocookie.net/memes-pedia/images/7/74/Clown_Pepe.jpg/revision/latest?cb=20221219220721&path-prefix=es" },
                        { type: "docs", description: "(Documentation)", reference: "https://static.wikia.nocookie.net/memes-pedia/images/7/74/Clown_Pepe.jpg/revision/latest?cb=20221219220721&path-prefix=es" },
                    ]
                },
                {
                    tag: tags[4],
                    resources: [
                        { type: "project", description: "(Insert Project description)" },
                        { type: "bug", description: "(Bug description + solution)" },
                        { type: "docs", description: "(Documentation)" },
                    ]
                },
                {
                    tag: tags[2],
                    resources: [
                        { type: "project", description: "(Insert Project description)" },
                        { type: "bug", description: "(Bug description + solution)" },
                        { type: "docs", description: "(Documentation)" },
                    ] 
                },
                {
                    tag: tags[1],
                    resources: [
                        { type: "project", description: "(Insert Project description)" },
                        { type: "bug", description: "(Bug description + solution)" },
                        { type: "docs", description: "(Documentation)" },
                    ]
                },
            ]
        }
    ] as UserProfile[],
    tags
})

type Filter<T> = (_: T) => boolean

const postHasTag: (tag: Tag) => Filter<Post> =
    tag => post => tagEq(post.tag, tag)

const tagLike: (tagPart: string) => Filter<Tag> =
    part => tag => tag.name.toLocaleLowerCase().includes(part.toLocaleLowerCase())

export const filters = {
    postHasTag,
    tagLike,
}

// UserProfile { get, list, post }
export const getUserProfile: (contactData: string) => UserProfile | undefined =
    contactData => {
        return tempdb.users.find(p => p.contactData == contactData)
    }

export const listUserProfile: (filter: Filter<Post>) => UserProfile[] = //Lista de perfiles de usuario 
    filter => {
        return tempdb.users.filter(u => u.posts.find(filter))
    }

export const postUserProfile: (user: Pick<UserProfile, "contactData" | "name">) => void =
    user => {
        tempdb.users.push({ ...user, posts: [] })
    }

const userEq: (a: UserProfile, b: UserProfile) => boolean =
    (a, b) => a && b && a.contactData === b.contactData

// Tag { list, post }
export const listTag: (filter: Filter<Tag>) => Tag[] =
    filter => {
        return tempdb.tags.filter(filter)
    }

export const postTag: (tag: Tag) => void =
    tag => {
        tempdb.tags.push(tag)
    }

const tagEq: (a: Tag, b: Tag) => boolean =
    (a, b) => a.name === b.name && a.type === b.type
// Post { list, post }
export const listPost: (user: UserProfile) => Post[] =
    user => {
        return tempdb.users.find(u => u.contactData == user.contactData)?.posts ?? []
    }

export const postPost: (user: UserProfile, post: Pick<Post, "tag">) => void =
    (user, post) => {
        tempdb.users.find(u => user.contactData == u.contactData)?.posts.push({ ...post, resources: [] })
    }
// Resource { post }
export const listResource: (user: UserProfile, tag: Tag) => Resource[] =
    (user, tag) => {
        return tempdb.users.find(u => userEq(user, u))
            ?.posts.find(p => tagEq(p.tag, tag))
            ?.resources ?? []
    }

export const postResource: (user: UserProfile, tag: Tag, resource: Resource) => void =
    (user, tag, resource) => {
        tempdb.users
            .find(u => u.contactData == user.contactData)
            ?.posts.find(p => p.tag == tag)
            ?.resources.push(resource)
    }


// ## Real ##
export const db = Gun().get("tmtupqylqymdpptpedqseqflndbqsliaiqisatpaqiaetttmtmgpnspq2")
const TIMEOUT = 500

export const real_getUserProfile: (contactData: string) => Promise<UserProfile | undefined> =
    contactData => new Promise((ok, err) => {
        db.get("users")
            .once().map().once(user => {
                if (user?.contactData === contactData) ok(user)
            }).off()
        setTimeout(() => ok(undefined), TIMEOUT)
    })

export const real_listUserProfile: (filter: Filter<Post>) => Promise<UserProfile[]> =
    filter => new Promise((ok, err) => {
        const users: UserProfile[] = []
        db.get("users")
            .once().map().once(user => {
                if (filter(user)) users.push(user) // Maybe should add statistics to UserProfile
            }).off()
        setTimeout(() => ok(users), TIMEOUT) // Todo sort by resource count
    })
/** Creates a new user without any posts */
export const real_postUserProfile: (user: Pick<UserProfile, "contactData" | "name">) => void =
    ({ name, contactData }) => {
        db.get("users").set({ name, contactData })
    }
export const real_listTag: (filter: Filter<Tag>) => Promise<Tag[]> =
    filter => new Promise((ok, err) => {
        const tags: Tag[] = []
        db.get("tags")
            .once().map().once(tag => {
                if (filter(tag)) tags.push(tag)
            })
        setTimeout(() => ok(tags), TIMEOUT)
    })
export const real_postTag: (tag: Tag) => void =
    tag => db.get("tags").set(tag)

export const real_listPost: (user: UserProfile) => Promise<Post[]> =
    user => new Promise((ok, err) => {
        const posts: Post[] = []

        db.get("users").map(u => u && userEq(u, user) ? u : undefined).once(
            (_, key) => db.get(key).get("posts").map().once(post => posts.push(post))
        )

        setTimeout(() => ok(posts), TIMEOUT)
    })
export const real_postPost: (user: UserProfile, post: Pick<Post, "tag">) => void =
    (user, post) => {
        console.log({ post })
        db.get("users").map(u => u && userEq(u, user) ? u : undefined)
            .once(
                (_, key) => db.get(key).get("posts").set(post)
            )
    }
export const real_listResource: (user: UserProfile, tag: Tag) => Promise<Resource[]> =
    (user, tag) => new Promise((ok, err) => {

        return tempdb.users.find(u => userEq(user, u))
            ?.posts.find(p => tagEq(p.tag, tag))
            ?.resources ?? []

        const resources: Resource[] = []

        db.get("users")
            .once().map(u => userEq(u, user) ? u : undefined)
            .once()

    })


