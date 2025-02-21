export type UserProfile = {
    name: string,
    contactData: string,
    posts: Post[]
}

export type Post = {
    tag: Tag
    resources: Resource[],
}

export type Resource = {
    tag: ResourceType
    description: string,
}

export type ResourceType = "experience" | "project" | "bug" | "docs"

export type Tag = {
    type: "language" | "methodology" | "library",
    name: string
}