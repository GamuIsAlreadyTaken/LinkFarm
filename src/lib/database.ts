import Gun from "gun"
import type { UserProfile, Tag, Post, Resource } from "$lib/types"


const db = Gun().get("tmtupqylqymdpptpedqseqflndbqsliaiqisatpaqiaetttmtmgpnspq")
const tempdb = {
    users: [
        {
            name: "pepe",
            contactData: "me gritas",
            posts: [
                {
                    tag: { type: "language", name: "bloste" },
                    resources: [
                        { type: "project", description: "blosteando el camino" },
                        { type: "bug", description: "no salen las lukas" },
                        { type: "docs", description: "crotolamos en la naturaleza" },
                    ]
                },
                {
                    tag: { type: "language", name: "crotolamo" },
                    resources: [
                        { type: "project", description: "blosteando el camino" },
                        { type: "bug", description: "no salen las lukas" },
                        { type: "docs", description: "crotolamos en la naturaleza" },
                    ]
                },
            ]
        },
        {
            name: "juan",
            contactData: "me llamas",
            posts: [
                {
                    tag: { type: "language", name: "bloste" },
                    resources: [
                        { type: "project", description: "blosteando el camino" },
                        { type: "bug", description: "no salen las lukas" },
                        { type: "docs", description: "crotolamos en la naturaleza" },
                    ]
                },
                {
                    tag: { type: "language", name: "crotolamo" },
                    resources: [
                        { type: "project", description: "blosteando el camino" },
                        { type: "bug", description: "no salen las lukas" },
                        { type: "docs", description: "crotolamos en la naturaleza" },
                    ]
                },
            ]
        }
    ] as UserProfile[],
    tags: [
        { type: "language", name: "bloste" },
        { type: "language", name: "crotolamo" },
        { type: "language", name: "padalustro" },
        { type: "language", name: "luka" },
        { type: "language", name: "contexto" }
    ] as Tag[]
}

type Filter<T> = (_: T) => boolean

const postHasTag: (tag: Tag) => Filter<Post> =
    tag => post => tagEq(post.tag, tag)

const tagLike: (tagPart: string) => Filter<Tag> =
    part => tag => tag.name.includes(part)

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

export const postUserProfile: (user: UserProfile) => void =
    user => {
        tempdb.users.push(user)
    }

const userEq: (a: UserProfile, b: UserProfile) => boolean =
    (a, b) => a.contactData === b.contactData

// Tag { list, post }
export const listTags: (filter: Filter<Tag>) => Tag[] =
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

export const postPost: (user: UserProfile, post: Post) => void =
    (user, post) => {
        tempdb.users.find(u => user.contactData == u.contactData)?.posts.push(post)
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
