node("ci-node") {

  def branchName = env.BRANCH_NAME
  def instancesNumber = 2;
  def branchEnvMapping = new HashMap<String, String>()
  branchEnvMapping.put("develop", "int")
  branchEnvMapping.put("master", "prod")

  def commitSHA = null
  def environment = branchEnvMapping.get(branchName)


  stage("checkout") {
    checkout scmGit(branches: [[name: branchName]], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Samlogy/microservices-front']])
    commitSHA = sh(script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
  }


  stage("build") {
    sh "npm install"
    sh "npm run build"
  }

  stage("build image") {
    sh "sudo docker build -t eco-ui ."
  }

  stage("push docker image") {
    withCredentials([usernamePassword(credentialsId: 'sam', usernameVariable: 'username',
      passwordVariable: 'password')]) {
      sh "sudo docker login -u sammmmmm -p $password"
      sh "sudo docker tag eco-ui sammmmmm/eco-ui:$branchName"
      sh "sudo docker push sammmmmm/eco-ui:$branchName"
      sh "sudo docker rmi sammmmmm/eco-ui:$branchName"
      sh "sudo docker rmi eco-ui"
      stash includes: 'docker-compose.yml', name: 'utils'
    }
  }

  def nodeNamePrefix = environment + "-node-"

  for (int i = 1; i <= instancesNumber; i++) {
    node(nodeNamePrefix + i) {
      stage("deploy-" + environment + "-instance-" + i) {
        unstash 'utils'
        sh "echo TAG=$branchName > .env"
        try {
          sh "sudo docker-compose down"
          sh "sudo docker-compose pull"
          sh "sudo docker-compose up -d"

        } catch (Exception e) {
          println "No Docker Compose Running"
          sh "sudo docker-compose pull"
          sh "sudo docker-compose up -d"
        }

      }
    }
  }
}