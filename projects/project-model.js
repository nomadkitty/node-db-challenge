const db = require("../data/db-config.js");

module.exports = {
  getProjects,
  addProject,
  getResourcesOfProject,
  addResourceOfProject,
  getTasks,
  addTask,
};

function getProjects() {
  return db("projects");
}

function getTasks(project_id) {
  return db("projects as p")
    .where("p.id", project_id)
    .join("tasks as t", "p.id", "t.project_id")
    .select(
      "p.name as Project Name",
      "p.description as Project Description",
      "t.description as task",
      "t.notes as task notes",
      "t.is_complete",
    );
}

function getResourcesOfProject(project_id) {
  return db("projects as p")
    .where("p.id", project_id)
    .join("project_resource as pr", "p.id", "pr.project_id")
    .join("resources as r", "pr.resource_id", "r.id")
    .select(
      "p.name as Project Name",
      "p.description as Project Description",
      "r.name as Resource Name",
      "r.description as Resource Description",
    );
}

function addProject(projectData) {
  return db("projects").insert(projectData);
  // .then(([id]) => {
  //   db("projects").where("id", id);
  // });
}

function addTask(taskData, project_id) {
  return db("tasks").insert({ ...taskData, project_id: project_id });
}

function addResourceOfProject(resourceData, project_id) {
  return db("resources")
    .insert(resourceData)
    .then(([resourceId]) => {
      db("project_resource").insert({
        project_id: project_id,
        resource_id: resourceId,
      });
    });
}
