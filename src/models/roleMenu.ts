interface RoleMenu {
    message: string
    choices: RoleMenuChoices[]
}

interface RoleMenuChoices { 
    role: string,
    emoji: string
}