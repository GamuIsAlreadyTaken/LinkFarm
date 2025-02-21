import Gun from "gun"
import type { UserProfile, Tag, Post, Resource } from "$lib/types"


const db = Gun().get("tmtupqylqymdpptpedqseqflndbqsliaiqisatpaqiae")
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
// UserProfile { get, list, post, put }
export const getUserProfile: (name: string) => UserProfile | undefined =
    name => {
        return tempdb.users.find(p => p.name == name)
    }
export const listUserProfile: (tag: Tag) => UserProfile[] =
    tag => {
        return tempdb.users.filter(u => u.posts.find(p=>p.tag == tag))
    }

export const postUserProfile: (user: UserProfile) => void =
    user => {
        tempdb.users.push(user)
    }

export const putUserProfile: (user: UserProfile) => void =
    user => {
        tempdb.users.forEach(u => {
            if (u.contactData == user.contactData) u.posts = user.posts
        })
    }
// Tag { list, post }
export const listTags: () => Tag[] =
    () => {
        return tempdb.tags
    }
export const postTag: (tag: Tag) => void =
    tag => {
        tempdb.tags.push(tag)
    }
// Post { list, post }
export const listPost: (user: UserProfile) => Post[] =
    user => {
        return tempdb.users.find(u => u.contactData == user.contactData)?.posts ?? []
    }
// Resource { list, post }