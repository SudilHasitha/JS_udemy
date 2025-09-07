// task component that displays a list of tasks if exist otherwise a paragraph there is no tasks
import { Trash2 } from 'lucide-react';
export default function Tasks({ tasks = [], onDeleteTask }) {
    return (
        <div className="mt-8">
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <div className="p-4 bg-stone-800 rounded-md mb-4">
                    <h2 className="text-lg font-semibold text-stone-50">{task.title}</h2>
                    <p className="text-stone-400">{task.description}</p>
                    <div className="mt-2 flex justify-between">
                        <button
                            onClick={() => onDeleteTask(task.id)} className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                        </button>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-stone-400">No tasks available.</p>
            )}
        </div>
    );
}
