const Job = require('../model/job')
const jobUtils = require('../utils/jobUtils')
const Profile = require('../model/Profile')

module.exports = {

    create(req,res){
        return res.render("job")
    },

    async save(req,res){
        // req.body = { name: 'fdsf', 'daily-hours': '0.3', 'total-hours': '2' }
        
        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // atribuindo a data atual
        })
            
        return res.redirect('/')
    },

    async show(req,res){
        const jobId = req.params.id
        
        const jobs = await Job.get()

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job){
            return res.send('job not found!')
        }

        const profile = await Profile.get()

        job.budget = jobUtils.calculatebudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    },

    async update(req,res){
        const jobId = req.params.id

        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId)
    },

    async delete(req,res){
        const jobId = req.params.id

        await Job.delete(jobId)

        return res.redirect('/')
    }
}