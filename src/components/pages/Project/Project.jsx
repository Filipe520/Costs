import styles from "./Project.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
      })
      .catch((error) => console.error("Error fetching project:", error));
  }, [id]);
  return (
    <div className={styles.project_container}>
      <h1>{project.name}</h1>
      <p>This is the project page.</p>
    </div>
  );
};

export default Project;
