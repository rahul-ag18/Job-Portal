export default class Applicant {
  constructor(id, name, email, contact, resumePath, jobId) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.resumePath = resumePath;
    this.jobId = jobId;
  }
  static getAllApplicants() {
    return applicants;
  }

  static getFilteredApplicants(jobId) {
    return applicants.filter((applicant) => applicant.jobId == jobId);
  }
  
  static createApplicant(name, email, contact, resumePath, jobId) {
    let applicant = new Applicant(
      applicants.length + 1,
      name,
      email,
      contact,
      resumePath,
      jobId
    );
    applicants.push(applicant);
    return applicant;
  }
}
let applicants = [];
applicants.push(
  new Applicant(
    1,
    "John W. Smith ",
    "jwsmith@colostate.edu",
    7839358367,
    "uploads/Dummy.pdf",
    1
  )
);
