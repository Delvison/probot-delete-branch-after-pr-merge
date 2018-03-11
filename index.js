module.exports = function (robot) {
  robot.on([
    'pull_request',
    // 'pull_request.closed',
  ], async context => {
    const pr = context.payload.pull_request
    // robot.log(pr)

    if (context.payload.action === 'closed' && pr.merged === true) {
      const head = {
        owner: pr.head.repo.owner.login,
        repo: pr.head.repo.name,
        ref: `heads/${pr.head.ref}`,
      }
      robot.log(head)
      const deleteBranch = async () =>
        context.github.gitdata.deleteReference(head)

      const res = await deleteBranch()

      robot.log(res)

      const message = `Deleted merged branch ${head.ref}`

      return context.github.pullRequests.createComment({body: message})
    }
  })
}
