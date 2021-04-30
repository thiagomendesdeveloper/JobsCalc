module.exports = {
    remainingDays(job) {
    //ajustes no job
    //calculo restante do tempo
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    const createdDate = new Date(job.created_at)
    const dueDay = createdDate.getDate() + Number(remainingDays)
    const dueDate = createdDate.setDate(dueDay)
    const timeDiffnMs = dueDate - Date.now()
    //transformar millisegundos em dias
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.floor(timeDiffnMs / dayInMs)

    //retorna x dias
    return dayDiff
    },

    calculatebudget: (job, valueHour) => valueHour * job['total-hours']
}