export default class JobModel {
  constructor(
    id,
    company,
    type,
    role,
    location,
    salary,
    skill,
    positions,
    date,
    userEmail,
    applicants
  ) {
    this.id = id;
    this.company = company;
    this.type = type;
    this.role = role;
    this.location = location;
    this.salary = salary;
    this.skill = skill;
    this.positions = positions;
    this.date = date;
    this.userEmail = userEmail;
    this.applicants = applicants;
  }
  static getAllJobs() {
    return jobs;
  }
  static createJob(newJob, userEmail) {
    let job = new JobModel(
      jobs.length + 1,
      newJob.company,
      newJob.type,
      newJob.role,
      newJob.location,
      newJob.salary,
      newJob.skill,
      newJob.positions,
      newJob.date,
      userEmail,
      0
    );
    console.log(job);
    jobs.push(job);
  }
  static getJobsById(id) {
    const index = jobs.findIndex((job) => job.id == id);
    if (index == -1) {
      return false;
    }
    return jobs[index];
  }

  static updateJob(id, newJob) {
    const index = jobs.findIndex((job) => job.id == id);
    if (index == -1) {
      return false;
    }
    jobs[index] = Object.assign({}, jobs[index], newJob);
    return jobs[index];
  }

  static deleteJob(id) {
    const index = jobs.findIndex((job) => job.id == id);
    if (index == -1) {
      return false;
    }

    jobs.map((job) => {
      if (job.id > id) {
        job.id = job.id - 1;
      }
    });
    console.log(jobs);

    jobs.splice(index, 1);
    return true;
  }

  static updateApplicants(jobId) {
    const job = JobModel.getJobsById(jobId);
    job.applicants += 1;
  }

  static searchJob(search) {
    return jobs.filter((job) => {
      return (
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.type.toLowerCase().includes(search.toLowerCase()) ||
        job.role.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
}

let jobs = [];

jobs.push(
  new JobModel(
    1,
    "Coding Ninja",
    "Tech",
    "SDE",
    "Gurgaon HR IND Remote",
    "14-20lpa",
    ["React", "NodeJS", "JS", "SQL", "MongoDB", "Express", "AWS"],
    5,
    "2023-08-30",
    "abc@gmail.com",
    1
  ),
  new JobModel(
    2,
    "Go Digit",
    "Tech",
    "Angular Developer",
    "Pune IND On-Site",
    "6-10lpa",
    ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
    7,
    "2023-08-30",
    "abc@gmail.com",
    0
  ),
  new JobModel(
    3,
    "Juspay",
    "Tech",
    "SDE",
    "Bangalore IND",
    "20-26lpa",
    ["React", "NodeJS", "JS", "SQL", "MongoDB", "Express", "AWS"],
    3,
    "2023-08-30",
    "abc@gmail.com",
    0
  )
);
