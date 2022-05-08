const URL_API = "http://localhost:8080/api/"

 const consumer = {
    findAllListTodo: async () => {
        return fetch(URL_API + "list").catch(error => console.error("Error", error))
    },

    saveNewListTodo: async (request) => {
        return fetch(URL_API + "todolist", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(error => console.error("Error", error))
    },

    deleteListTodoByID: async (listId) => {
        return fetch(URL_API +listId+"/todolist", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(error => console.error("Error", error))
    }
};

export default consumer;