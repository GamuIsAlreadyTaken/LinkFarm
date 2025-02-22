
3 pages { Login, UserExpositor, Searcher }

Login -> contactData => UserExpositor (user)
    get user (contactData)

Searcher -> tag > user [] => UserExpositor (user)
    list tag (filter)
    list user (filter')

UserExpositor(user, tag?) -> tag > user.post [] > post.resource []
    list tag (filter)
    list posts (user)
    list resources (user, post)

types { user, tag, post, resource }

user    : list(filter), get(contactData)
tag     : list(filter)
post    : list(user)
resource: list(user, post)
