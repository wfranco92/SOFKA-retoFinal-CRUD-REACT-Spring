const URL_API = "http://localhost:8080/api/"

const consumer = {
    findAllTodoBylist: async (listId) => {
        return fetch(URL_API + listId + "/todos").catch(error => console.error("Error", error))
    },

    saveNewTodoByList: async (listId, request) => {
        return fetch(URL_API + listId + "/todo", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(error => console.error("Error", error))
    },

    updateTodoByList: (listId, request) => {
        return fetch(URL_API + listId + "/todo", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(error => console.error("Error", error))
    },

    deleteTodoById: async (id) => {
        return fetch(URL_API + id + "/todo", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(error => console.error("Error", error))
    }
}
export default consumer;