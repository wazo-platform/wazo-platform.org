pipeline {
  agent {
    label 'general-amd64-debian12-medium'
  }
  triggers {
    githubPush()
    pollSCM 'H 0 * * *'
  }
  options {
    timestamps()
    disableConcurrentBuilds()
  }
  environment {
    CONFIG_FILE_PATH = credentials('wazo-doc-tools-credentials')
  }
  stages {
    stage ("Prepare") {
      steps {
        sh '''
          set -xe
          cp "${CONFIG_FILE_PATH}" config.js

          rm -rf public-corporate public-platform

          make builder
          make ENV=CORPORATE=1 build
          mv public public-corporate
          make build
          mv public public-platform
          docker compose down

          rm config.js
        '''
      }
    }
    stage ("Deploy") {
      steps {
        sshagent(credentials: ['ssh-private-key-for-webserver']) {
          // --delay-updates and --delete-after leave the live website untouched
          // until the transfer is complete (e.g. if rsync fails with "Broken pipe")
          sh """
            set -xe
            cat > ${WORKSPACE}/webserver.wazo.community.known_hosts << EOF
webserver.wazo.community ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIezVt71SDQZ2KsL7yzjGqbvjyt95HEIi0TpxXoaZywf
EOF

            rsync \
              -rlD --delete-after --delay-updates \
              -e "ssh -o UserKnownHostsFile=${WORKSPACE}/webserver.wazo.community.known_hosts" \
              public-corporate/ root@webserver.wazo.community:/var/www/api/

            rsync \
              -rlD --delete-after --delay-updates \
              -e "ssh -o UserKnownHostsFile=${WORKSPACE}/webserver.wazo.community.known_hosts" \
              public-platform/ root@webserver.wazo.community:/var/www/wazo-platform/
          """
        }
      }
    }
  }
  post {
    failure {
      mattermostSend color: 'danger', channel: '#monitoring', message: "wazo-platform.org publication [failed](${BUILD_URL}) :nuke:"
    }
  }
}
