function User() {
    return {
        insert: function (data) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ message: 'saved', data: data });
                }, 1000);
            });
        },
    };
}

const getToDoList = async () => {
    const tasksId = [1, 3, 5, 7, 9, 11, 13];
    const togoList = [];

    await Promise.all(tasksId.map(async (id) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const result = await response.json();
        const task = {
            id: result.id,
            userId: result.userId,
            title: result.title,
            remark: `Title ${result.title} Write by ${result.userId}`,
            status: result.completed ? 'Complete' : 'Not complete',
        }

        const data = User.insert(task);

        togoList.push({
            status: data.message === 'saved',
            result: data,
        });
    }));
};