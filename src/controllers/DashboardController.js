const Job = require('../model/job')
const jobUtils = require('../utils/jobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {   
        const Jobs = await Job.get()
        const profile = await Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: Jobs.length
        }

        let jobTotalHours = 0

        const updatedJobs = Jobs.map((job) => {
        //mudanças no job
        const remaining = jobUtils.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'

        //status = done
        //statusCount[done] += 1
        //somando a quantidade de status
        statusCount[status] += 1

        jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

        return {
            ...job,
            remaining,
            status,
            budget: jobUtils.calculatebudget(job, profile["value-hour"])
            }
        })



        //quantidade de horas que quero trabalhar 
        //MENOS
        //quantidade de horas/dia de cada job em progress
        const freeHours = profile['hours-per-day'] - jobTotalHours

        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    }

}