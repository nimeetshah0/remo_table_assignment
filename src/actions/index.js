
export const assignTable = (tableId, userId, photoUrl) => {
    return {
        type: 'ASSIGN_TABLE',
        tableId: tableId,
        userId: userId,
        photo: photoUrl
    }
}

export const loginUser = (userDetails) => {
    return {
        type: 'LOGIN',
        userDetails: userDetails
    }
}