export const tasksData = {
    page: 1,
    total_pages: 1,
    total_results: 3,
    tasks: [
        { 
            id: "1", 
            title: "Dishes", 
            description: "Empty dishwasher", 
            deadline: "Today", 
            done: false, 
            priority: "low",
            created_at: new Date().toISOString(),  
            updated_at: new Date().toISOString()  
        },
        { 
            id: "2", 
            title: "Laundry", 
            description: "Fold clothes and put away", 
            deadline: "Tomorrow", 
            done: false, 
            priority: "medium",
            created_at: new Date().toISOString(), 
            updated_at: new Date().toISOString() 
        },
        { 
            id: "3", 
            title: "Tidy up", 
            deadline: "Today", 
            done: false, 
            priority: "high",
            created_at: new Date().toISOString(), 
            updated_at: new Date().toISOString() 
        }
    ]
};
