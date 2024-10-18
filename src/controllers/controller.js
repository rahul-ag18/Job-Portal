import path from "path";
import JobModel from "../models/job.model.js";
import Applicant from "../models/applicant.model.js";
export default class Controller {
  getHome(req, res) {
    res.render("home", {
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  getLogin(req, res) {
    if (req.session.userEmail) {
      req.session.destroy();
      return res.redirect("login");
    }

    res.render("login", {
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  getJob(req, res) {
    var jobs = JobModel.getAllJobs();
    res.render("job", {
      jobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  getDetails(req, res) {
    const id = req.params.id;
    const jobDetail = JobModel.getJobsById(id);
    if (!JobModel) {
      return res.render(home, {
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    }
    res.render("details", {
      jobDetail,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  createNewJob(req, res) {
    res.render("createNewJob", {
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  postNewJob(req, res) {
    const newJob = req.body;
    console.log(newJob);
    JobModel.createJob(newJob, req.session.userEmail);
    let jobs = JobModel.getAllJobs();
    res.render("job", {
      jobs: jobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  apply(req, res) {
    const jobId = req.params.id;
    const { name, email, contact } = req.body;
    const resumePath = path.join("uploads", req.file.filename);
    console.log(jobId);
    console.log(req.body);
    console.log(req.file);
    let applicant = Applicant.createApplicant(
      name,
      email,
      contact,
      resumePath,
      jobId
    );
    JobModel.updateApplicants(jobId);
    console.log(applicant);
    const jobs = JobModel.getAllJobs();
    res.render("job", {
      jobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  getApplicants(req, res) {
    const jobId = req.params.jobId;
    const job = JobModel.getJobsById(jobId);

    if (job.userEmail != req.session.userEmail) {
      return res.render("oops", {
        err: "You are not allowed to view this page",
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    }
    let applicants = Applicant.getFilteredApplicants(jobId);
    console.log(applicants);
    res.render("applicant", {
      applicants,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  getUpdateJob(req, res) {
    const id = req.params.id;
    console.log(id);
    let job = JobModel.getJobsById(id);
    if (job.userEmail == req.session.userEmail) {
      console.log(job);
      return res.render("updateJob", {
        job: job,
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    }
    res.render("oops", {
      err: "You are not allowed to update this job",
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  postUpdateJob(req, res) {
    const id = req.params.id;
    const updatedJob = JobModel.updateJob(id, req.body);
    console.log(updatedJob);
    if (updatedJob) {
      let jobs = JobModel.getAllJobs();
      return res.render("job", {
        jobs,
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    }
  }

  deleteJob(req, res) {
    const id = req.params.id;
    const job = JobModel.getJobsById(id);
    if (job.userEmail != req.session.userEmail) {
      return res.render("oops", {
        err: "You are not allowed to delete this job",
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    }

    const deleteJob = JobModel.deleteJob(id);
    if (deleteJob) {
      let jobs = JobModel.getAllJobs();
      return res.render("job", {
        jobs,
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    }

    if (!deleteJob) {
      return res.render("oops", {
        err: "Job not found",
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    }
  }

  searchJob(req, res) {
    const search = req.query.search;
    const jobs = JobModel.searchJob(search);
    console.log(jobs);
    if(jobs.length == 0){
      return res.render("oops", {
        err: "No job found",
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    }
    res.render("job", {
      jobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
    
  }
}
