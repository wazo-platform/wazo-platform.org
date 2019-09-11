Title: Multiple users building on the XiVO packaging machine
Date: 2011-08-09 16:23
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: multiple-users-building-on-the-xivo-packaging-machine
Status: published

#### multiuser locking

The packaging-farm command does not behave well when two are run
simultaneously to build the same package. Nothing bad happens but fixing
the result involves umounting a number of aufs corrupted file systems
and it is inconvenient. To avoid this, the packaging-farm command was
[modified to set a lock based on the last
argument](http://packaging-farm.dachary.org/trac/changeset/8855a9c5fc09b088edaa055a33de1e820f30cc42).

~~~
When packaging-farm is run, a lock is set on  its  last  argument.  For
       instance,

              packaging-farm asterisk

       will  set a lock on /var/lock/packaging-farm/asterisk and another invo-
       cation of the same command while this one is still  running  will  wait
       for the first command to finish. Unless the command completes on error,
       the second invocation will just echo that  nothing  needs  to  be  done
       because the previous command did all the work.

       If the command

              packaging-farm gallifrey

       is  run  and that the gallifrey package depends on the asterisk package
       and needs to build it, the same mechanism will be used.  For  instance,
       if  user  A runs packaging-farm gallifrey after user B started to build
       packaging-farm asterisk, the higher level command gallifrey will  pause
       until asterisk has finished building and then resume.
~~~


#### multiple builds of the same version

It was possible to build the same version of a given version of a
package multiple times. While this comes handy in some cases, it is
confusing in general. The user has to remember that a --reinstall is
required to get the latest version. The reprepro(1) tool refuses the new
package because it has a different checksum than the previous one. A
[+build prefix was
appended](http://packaging-farm.dachary.org/trac/changeset/893a93e8a352b1cf0739d325603dc8d3eef38d13)
to avoid this confusion.

~~~
REBUILDING PACKAGES AND PUBLISHING REPOSITORIES
       packaging-farm  allows  to  rebuild  the same version of a package. For
       instance, let say foo-1.2 was built and was made available,  either  as
       part  of  the package specific repository created with dpkg-scanpackage
       or as part of a meta package repository created with reprepro(1) A user
       then installs the package using

              apt-get update
              apt-get install foo

       At  this  point  in  time,  the  developer of foo finds a minor bug and
       rebuilds the package on packaging-farm  without  changing  the  version
       number.   packaging-farm  allows  the developer to do that, in the same
       way pbuilder or sbuild does. However, contrary to these tools,  packag-
       ing-farm  publishes the packages and provides a safeguard to avoid pub-
       lishing the same package version multiple times.

       If version 1.0-1 of a package is built and no previous version has been
       built,  nothing is done. If version 1.0-1 has already been built and is
       rebuilt because a package it depends on has been  upgraded,  packaging-
       farm  will add the +build1 suffix to the package version and it will be
       1.0-1+build1 In all further builds of the same version, the last number
       will be incremented as in 1.0-1+build2 If a new version of the package,
       say 1.1-1 is published, it will be compared to the last  built  version
       using dpkg --compare-version Because it is found to be greater, it will
       be used as if there was no previous build.
~~~


</p>

