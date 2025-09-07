import noProjectImage from '../assets/no-projects.png';
import Button from './Button';
export default function NoProjectSelected({ onStartAddProject }) {
    return (
        <div className="w-[35rem] mt-16 mx-auto flex flex-col items-center">
            <img src={noProjectImage} alt="No Project Selected" className="w-full h-48 object-cover mb-4 mx-auto" />
            <h1 className="text-2xl font-bold mb-4">No Project Selected</h1>
            <p className="text-stone-600 mb-8 text-center">Please select a project from the sidebar to view its details or create new.</p>
            <Button onClick={onStartAddProject}>Create a Projects</Button>
        </div>
    );
}
