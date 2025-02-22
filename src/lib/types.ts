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
    type: ResourceType,
    description: string,
    reference: string
}

export type ResourceType = "experience" | "project" | "bug" | "docs"

export type Tag = {
    type: "language" | "methodology" | "library",
    name: string
}

