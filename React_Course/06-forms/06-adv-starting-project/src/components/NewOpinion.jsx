import { useActionState, useContext } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  // using useContext to access the OpinionsContext
  const { addOpinion } = useContext(OpinionsContext);

  // functions to handle form actions can be added here
  async function shareOptinionAction(preFormData, formData) {
    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    let errors = [];
    if (!userName || userName.length < 3) {
      errors.push('User name must be at least 3 characters long.');
    }
    if (!title || title.length < 5) {
      errors.push('Title must be at least 5 characters long.');
    }
    if (!body || body.length < 10) {
      errors.push('Opinion body must be at least 10 characters long.');
    }

    if (errors.length > 0) {
      return { errors };
    }

    // If no errors, create the opinion object
    const opinion = {
      userName,
      title,
      body,
      votes: 0,
      id: Math.random().toString(), // Simulating an ID generation
    };
    
    // Call the addOpinion function from the context to save the opinion
    await addOpinion(opinion);
    return {errors: [], opinion: { userName, title, body } };
     
  }

  const [formState, formAction] = useActionState(shareOptinionAction, {errors: null });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}> 
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.opinion?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.opinion?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.opinion?.body}></textarea>
        </p>

        {formState.errors && formState.errors.length > 0 && (
          <ul className="errors">
            {formState.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

      <Submit/>
      </form>
    </div>
  );
}
