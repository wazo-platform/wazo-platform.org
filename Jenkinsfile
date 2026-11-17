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
          // --delay-updates: hold updated files in .~tmp~ dirs, rename them into place at end of transfer (fast, not atomic)
          // --delete-after: delete extraneous files after the transfer, not during
          // -f 'R .~tmp~/': let --delete-after remove .~tmp~ dirs left by a failed run
          // -c: skip files based on checksum, not mod-time & size (each build sets new mtimes)
          // -v --itemize-changes: log each updated, created and deleted file, then transfer stats
          sh """
            set -xe
            cat > ${WORKSPACE}/webserver.wazo.community.known_hosts << EOF
webserver.wazo.community ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIezVt71SDQZ2KsL7yzjGqbvjyt95HEIi0TpxXoaZywf
EOF

            rsync \
              -rlDcv --itemize-changes --delete-after --delay-updates -f 'R .~tmp~/' \
              -e "ssh -o UserKnownHostsFile=${WORKSPACE}/webserver.wazo.community.known_hosts" \
              public-corporate/ root@webserver.wazo.community:/var/www/api/

            rsync \
              -rlDcv --itemize-changes --delete-after --delay-updates -f 'R .~tmp~/' \
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
