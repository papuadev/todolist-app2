import { useEffect, useState } from "react"
import type { Todo, FilterType, SortOrder } from '../types/todo';

function generateId() : string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function saveTodos(todos : Todo[]) : void{
    localStorage.setItem("todos", JSON.stringify(todos))
}

function loadTodos() : Todo[] {
    const data = localStorage.getItem("todos");
    if (!data) return [];
    try {
        return JSON.parse(data) as Todo[];
    } catch (error) {
        console.error("Gagal memuat todos:", error);
        return []
        
    }
}

export function useTodo(){
    const [todos, setTodos] = useState<Todo[]>(loadTodos)

    const [filter, setFilter] = useState<FilterType>('all')

    const [sortOrder, setSortOrder] = useState<SortOrder>('newest')

    const [searchQuery, setSearchQuery] = useState<string>('')

    useEffect(()=>{
        saveTodos(todos);
    }, [todos])

    function addTodo(text : string) : void {
        const newTodo : Todo = {    
            id : generateId(),
            text : text,
            completed : false,
            createdAt : Date.now()
        }
        setTodos([newTodo, ...todos])
    }
    function toggleTodo (id: string) : void{
        setTodos(todos.map(item=>{
            if (item.id === id) {
                return {
                    ...item, completed : !item.completed
                }
            } else {
                return item
            }
        }))
    }

    function deleteTodo (id : string) : void {
        setTodos(todos.filter(item=>item.id !== id))
    }

    const displayTodos = todos
    .filter(item=>{
        if (filter=== 'active') return !item.completed
        if (filter === 'completed') return item.completed
        return true
    })
    .filter(item => item.text.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))
    .sort((a,b)=>{
        if (sortOrder === 'newest') {
            return b.createdAt - a.createdAt
        } else {
            return a.createdAt - b.createdAt
        }       
    })

    // const filteredTodos = todos.filter(item=>{
    //     if (filter === 'active') return !item.completed
    //     if (filter === 'completed') return item.completed
    //     return true
    // })

    // const sortedTodos = [...filteredTodos].sort((a, b)=>{
    //     if (sortOrder === 'newest') {
    //         return b.createdAt - a.createdAt
    //     } else {
    //         return a.createdAt - b.createdAt
    //     }
    // })

    const toggleSortOrder = () : void => {
        setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')
    }
    return {
        todos,
        addTodo,
        toggleTodo, 
        deleteTodo,
        filter,
        setFilter,
        toggleSortOrder,
        sortOrder,
        setSortOrder,
        displayTodos,
        searchQuery,
        setSearchQuery
    }

}