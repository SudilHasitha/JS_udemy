import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";

function App() {
  const [projectState, setProjectState] = useState({
    // why undefined instead of null?
    // because undefined is the default value for uninitialized variables in JavaScript.
    // It indicates that the variable has not been assigned a value yet.
    // Using null would imply that the variable has been intentionally set to no value,
    // which is not the case here.
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: null, // null indicates that no project is currently selected
    }));
  }

  function handleCancleAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined, // undefined indicates that no project is selected
    }));
  }

  function handleAddProject(projectData) {
  setProjectState(prev => {
    const isEdit = prev.selectedProjectId != null; // explicit null/undefined check

    const newProjects = isEdit
      ? prev.projects.map(project =>
          project.id === prev.selectedProjectId
            ? { ...project, ...projectData }
            : project
        )
      : [
          ...prev.projects,
          {
            id: Math.random().toString(36).substring(2, 9),
            ...projectData,
          },
        ];

    return {
      ...prev,
      projects: newProjects,
      selectedProjectId: null,    // consistently clear selection
    };
  });
}

  function handleSelectProject(projectId) {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: projectId, // Set the selected project ID
    }));

  }

  function handleDeleteProject(projectId) {
    setProjectState((prevState) => ({
      ...prevState,
      projects: prevState.projects.filter(project => project.id !== projectId),
      selectedProjectId: undefined, // Reset to no project selected after deletion
    }));
  }

  function handleAddTask(projectId, task){
    setProjectState(prev => ({
      ...prev,
      projects: prev.projects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: [
                    ...(project.tasks || []),
                    {
                      id: Math.random().toString(36).substring(2, 9),
                      ...task
                    },
                  ], // Ensure tasks array exists
          };
        }
        return project;
      })
    }));   
  }

  function handleDeleteTask(projectId, taskId) {
    setProjectState(prev => ({
      ...prev,
      projects: prev.projects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.filter(task => task.id !== taskId), // Filter out the deleted task
          };
        }
        return project;
      })
    }));
  }

  // pick the actual project
  const selectedProject = typeof projectState.selectedProjectId === 'string' ?
    projectState.projects.find(project => project.id === projectState.selectedProjectId) :
    null;

  console.log("Project State:", projectState);

  let content;
  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancleAddProject} onSelectProject={handleSelectProject}/>;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else{
    content = (
      <NewProject 
        onAdd={handleAddProject} 
        onCancel={handleCancleAddProject} 
        onSelectProject={selectedProject} // Pass the selected project to populate the form
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap=8">
      <ProjectSidebar 
        onStartAddProject={handleStartAddProject} 
        currentProjects={projectState} 
        onSelectProject={handleSelectProject}
        onDelete={handleDeleteProject}
      />
      {content}
    </main>
  );
}

export default App;
