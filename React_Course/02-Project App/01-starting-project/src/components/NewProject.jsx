import Input from "./Input";
import { useRef, useEffect, useState } from "react";
import Modal from "./Modal";
import Tasks from "./Tasks";

export default function NewProject({onAdd, onCancel, onSelectProject, onAddTask, onDeleteTask}) {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();

    // to connect modal
    const modalRef = useRef();

    useEffect(() => {
        // If onSelectProject is provided, populate the form with the selected project data
        if (onSelectProject) {
            titleRef.current.value = onSelectProject.title || '';
            descriptionRef.current.value = onSelectProject.description || '';
            dueDateRef.current.value = onSelectProject.dueDate || '';
        }
    }, [onSelectProject]);

    function handleSave(){
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const dueDate = dueDateRef.current.value;

        // Here you would typically handle the save logic, e.g., sending the data to a server or updating state.
        console.log("Project Saved:", { title, description, dueDate });

        // check for empty fields
        if (title.trim() === '' || description.trim() === '' || dueDate.trim() === '') {
            // use a modal to show an error message
            modalRef.current.open();
            return;
        }

        onAdd({ title, description, dueDate });

        // Reset the form fields after saving
        titleRef.current.value = '';
        descriptionRef.current.value = '';
        dueDateRef.current.value = '';
        // Optionally, you could also close the NewProject component or reset the state to indicate that the project has been added.    

    }

    return(
        <>
        <Modal ref={modalRef} buttonCaption={'close'}>
            <h2 className="text-lg font-bold text-stone-50">Error</h2>
            <p className="text-stone-400">Please fill in all fields before saving.</p>
        </Modal>
        <div className="w-[35rem] mt-16>">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li><button onClick={onCancel} className="text-stone-800 hover:text-stone-950">Cancle</button></li>
                <li><button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50  hover:text-stone-950">Save</button></li>
            </menu>
            <div>
               <Input ref={titleRef} label={"Title"} placeholder={"Project Title"}/>
               <Input ref={descriptionRef} label={"Description"} placeholder={"Project Description"} textarea />
               <Input ref={dueDateRef} label={"Due Date"} type={"date"} />
            </div>
            { onSelectProject.id && (
                <section className="mt-8">
                    <h3 className="text-stone-50 font-semibold mb-2">Tasks</h3>
                    <Tasks
                        tasks={onSelectProject.tasks}
                        onDeleteTask={id => onDeleteTask(onSelectProject.id, id)}
                    />

                    <div className="mt-4 flex gap-2">
                    <input
                        className="flex-1 p-2 rounded"
                        placeholder="New task title"
                        value={newTaskTitle}
                        onChange={e => setNewTaskTitle(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            if (!newTaskTitle.trim()) return;
                            onAddTask(onSelectProject.id, { title: newTaskTitle, description: "" });
                            setNewTaskTitle("");
                        }}
                        className="px-4 py-2 bg-stone-800 rounded text-stone-50"
                    >
                        + Task
                    </button>
                    </div>
                </section>
            )}
        </div>
        </>
    )
}